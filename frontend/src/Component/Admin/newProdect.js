import React, { Fragment, useEffect, useState } from "react";

import MetaData from "../layouts/MetaData";
import AdminHeaad from "./adminHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateAdminProduct } from "../../actions/productsActions";
import { clearError, clearProductCreated } from "../../Slices/productSlice";
import {toast} from 'react-toastify'
export default function NewProduct() {
  let nav=useNavigate()
  let dispatch=useDispatch()
  const[name,setName]=useState('')

  const[price,setPrice]=useState(0)

 const[description,setDiscription]=useState('')

 const[category,setCategory]=useState('')
 const[stock,setStock]=useState(0)
 const[seller,setSeller]=useState('')
 const[images,setImages]=useState([])

 const[imagesPreview,setImagesPreview]=useState([])

 const {loading,isProductCreated,error}=useSelector((state)=>state.productState)


 const categories= ["Electronics",
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
        "Home",]


        useEffect(()=>{

          if (isProductCreated) {
            toast.success("Product Created successfully!", {
              position: "bottom-center",
              onOpen:()=>{dispatch(clearProductCreated())}
            });
            nav('/admin/products')
            return;
          }


          if (error) {
            toast.error(error, {
              position: "bottom-center",
              type: "error",
              onOpen: () => {
                setTimeout(()=>{

                  dispatch(clearError());
                },3000)
              },
            });
            return;
          }
          


        },[isProductCreated,error,dispatch])


        const onImageChange=(e)=>{
          const files=Array.from(e.target.files)

          files.forEach(file=>{
            const reader=new FileReader()
            reader.onload=()=>{
              if(reader.readyState==2){
                setImagesPreview(oldArray=>[...oldArray,reader.result])
                setImages(oldArray=>[...oldArray,file])
              }
            }

            reader.readAsDataURL(file)
          })

        }


        const handleSubmit=(e)=>{
          e.preventDefault();
          
          let formData=new FormData();

          formData.append('name',name)
          formData.append('price',price)
          formData.append('stock',stock)
          formData.append('seller',seller)
          formData.append('description',description)
          formData.append('category',category)

          images.forEach(image=>{
            formData.append('images',image)
          })

          dispatch(CreateAdminProduct(formData))
        }

  return (
    <Fragment>
      <MetaData title={"Admin Products"} />
      <AdminHeaad />
      <div className="main-content">
        <Fragment>
          <h1>New Product</h1>

          <div className="wrapper my-2">
            <form className="shadow-lg" encType="multipart/form-data" onSubmit={handleSubmit}>
              <h1 className="mb-4">New Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="numberx"
                  id="price_field"
                  className="form-control"
                  value={price}
                  onChange={(e)=>setPrice(e.target.value)}

                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  value={description}
                  onChange={(e)=>setDiscription(e.target.value)}
                  
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select className="form-control" id="category_field" onChange={(e)=>setCategory(e.target.value)}>
                  <option value=''>Select</option>
                 {
                  categories.map((e,i)=>{
                    return (

                      <option key={i} value={e}>{e}</option>
                    )
                  })
                 }
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  value={stock}
                  onChange={(e)=>setStock(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  value={seller}
                  onChange={(e)=>setSeller(e.target.value)}

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
                {
                  imagesPreview.map((e,i)=>{
                    return(
                      <img
                      className="mt-3 mr-2"
                      key={i}
                      src={e}
                      alt="Image Preview"
                      width='55'
                      height='52'

                      />
                    )
                  })
                }
              </div>

              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading}
              >
                CREATE
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
}
