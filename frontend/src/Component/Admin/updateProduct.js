import React, { Fragment, useEffect, useState } from "react";

import MetaData from "../layouts/MetaData";
import AdminHead from "./adminHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateAdminProduct, getProduct } from "../../actions/productsActions";
import { clearError, clearProductUpdated } from "../../Slices/productSlice";
import { toast } from "react-toastify";

export default function UpdateProduct() {
  let { id } = useParams();
  let nav = useNavigate();
  let dispatch = useDispatch();
  const [name, setName] = useState("");

  const [price, setPrice] = useState(0);

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);

  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, isProductUpdated, error, product } = useSelector(
    (state) => state.productState
  );

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Cloths/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  useEffect(() => {
    if (isProductUpdated) {
      toast.success("Product Updated successfully!", {
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearProductUpdated());
        },
      });
      nav("/admin/products");
      return;
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          setTimeout(() => {
            dispatch(clearError());
          }, 3000);
        },
      });
      return;
    }

    dispatch(getProduct(id));

  }, [isProductUpdated, error, dispatch, nav]);

  const onImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("seller", seller);
    formData.append("description", description);
    formData.append("category", category);

    images.forEach((image) => {
      formData.append("images", image);
    });

    formData.append("imagesCleared", imagesCleared);
    dispatch(UpdateAdminProduct(formData, id));
  };

  const clearImageHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  };

  useEffect(() => {
    // Only set the state if the product is fetched successfully
    if (product._id) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description);
      setSeller(product.seller);
      setCategory(product.category);

      let images=[]
  
       product.images.map((image) => {
        images.push(image.image)
      });
      setImagesPreview(images);
    }
  }, [product, id]);


  console.log(imagesPreview)
  
  

  return (
    <Fragment>
      <MetaData title={"Admin Products"} />
      <AdminHead />
      <div className="main-content">
        <Fragment>
          <h1>Update Product</h1>

          <div className="wrapper my-2">
            <form
              className="shadow-lg"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <h1 className="mb-4">Update Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="number"
                  id="price_field"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select
                  className="form-control"
                  id="category_field"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="">Select</option>
                  {categories.map((e, i) => {
                    return (
                      <option key={i} value={e}>
                        {e}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  value={seller}
                  onChange={(e) => setSeller(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Images</label>

                <div className="custom-file">
                  <input
                    type="file"
                    name="product_images"
                    className="custom-file-input"
                    id="customFile"
                    multiple
                    onChange={onImageChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>
                {imagesPreview.length > 0 && (
                  <span
                    className="mr-2"
                    style={{ cursor: "pointer" }}
                    onClick={clearImageHandler}
                  >
                    <i className="fa fa-trash"></i>
                  </span>
                )}
                {imagesPreview.length > 0 &&
                  imagesPreview.map((e, i) => {
                    return (
                      <img
                        className="mt-3 mr-2"
                        key={i}
                        src={e}
                        alt="Image Preview"
                        width="55"
                        height="52"
                      />
                    );
                  })}
              </div>

              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading}
              >
                UPDATE
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
}
