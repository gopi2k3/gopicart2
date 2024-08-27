import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateReview, getProduct } from "../../actions/productsActions";
import { useParams } from "react-router-dom";
import Loader from "../layouts/loader";
import { toast } from "react-toastify";

import { Button, Carousel } from "react-bootstrap";
import MetaData from "../layouts/MetaData";
import { AddCartItem } from "../../actions/cartActions";

import { Modal } from "react-bootstrap";
import { clearError, clearProduct, clearReviewSubmitted } from "../../Slices/productSlice";
import { ProductReview } from "./productReviews";

const ProductDetail = () => {
  const { product={}, loading, error, isReviewSubmited } = useSelector(
    (state) => state.productState
  );
  const dispatch = useDispatch();

  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (product.stock == 0 || count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;

    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber == 1) return;

    const qty = count.valueAsNumber - 1;

    setQuantity(qty);
  };

  useEffect(() => {
   
    if (isReviewSubmited) {
      handleClose();

      toast("Review Submitted Successfully", {
        type: "success",
        position: "bottom-center",
        onOpen: () => dispatch(clearReviewSubmitted()),
      });

    }
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        type: "error",

        onOpen: () => dispatch(),
      });
      return;
    }

    if (!product._id || isReviewSubmited) {
      dispatch(getProduct(id));
    }

    return ()=>{
      dispatch(clearProduct())
    }

   
  }, [dispatch, id, error, isReviewSubmited]);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const [rating, setRating] = useState(1);

  const [comment, setComment] = useState("");

  const reviewHandler = () => {
    let obj = {
      rating,
      comment,
      productId: id,
    };

    dispatch(CreateReview(obj));
  };

  const handleClose = () => {
    setShow(false);
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((e) => {
                    return (
                      <Carousel.Item key={e._id}>
                        <img
                          className="d-block w-100"
                          src={e.image}
                          alt={product.name}
                          height="500"
                          width="500"
                        />
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product # {product._id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

              <hr />

              <p id="product_price">${product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span className="btn btn-primary plus" onClick={increaseQty}>
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={product.stock == 0 ? true : false}
                onClick={() =>{

                  dispatch(AddCartItem(product._id, quantity))

                  toast("Cart Item Added", {
                    type: "success",
                    position: "bottom-center",
                  });
                } 
              }
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{" "}
                <span
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                  id="stock_status"
                >
                  {product.stock > 0 ? "In stock" : "Out of Stock"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>

              <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
                onClick={handleShow}
              >
                Submit Your Review
              </button>

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Submit Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="modal-body">
                        <ul className="stars">
                          {[1, 2, 3, 4, 5].map((star, i) => {
                            return (
                              <li
                                className={`star ${
                                  star <= rating ? "orange" : ""
                                }`}
                                key={i}
                                value={star}
                                onClick={() => setRating(star)}
                                onMouseOver={(e) =>
                                  e.target.classList.add("yellow")
                                }
                                onMouseOut={(e) =>
                                  e.target.classList.remove("yellow")
                                }
                              >
                                <i className="fa fa-star"></i>
                              </li>
                            );
                          })}
                        </ul>

                        <textarea
                          name="review"
                          id="review"
                          className="form-control mt-3"
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        className="btn my-3 float-right review-btn px-4 text-white"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={reviewHandler}
                        disabled={loading}
                      >
                        Submit
                      </button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          {
            product.reviews && product.reviews.length >0 ? <ProductReview reviews={product.reviews}/>:null
          }
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetail;
