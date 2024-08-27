import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/loader";
import { Link, useNavigate } from "react-router-dom";
import {
  decreaseCartItemQty,
  increaseCartItemQty,
  removeItemFromCart,
} from "../../Slices/cartSlice";


export default function Cart() {
  let dispatch = useDispatch();
  let nav=useNavigate()
  const { loading, items: cartItems } = useSelector((state) => state.cartState);

  const increaseQty = (item) => {
    console.log(item.quantity);
    const count = Number(item.quantity);

    // Check if the stock is 0 or the quantity has reached the stock limit
    if (item.stock === 0 || item.stock <= count) {
      // Optional: Add a return statement or a message to exit early
      return;
    }

    // If the condition is not met, increase the quantity
    dispatch(increaseCartItemQty(item.product));
  };

  const decreaseQty = (item) => {
    const count = item.quantity;

    if (count == 1) return;

    dispatch(decreaseCartItemQty(item.product));
  };

  const checkOutHandler=()=>{
    nav('/?redirect=shipping')
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {cartItems.length == 0 ? (
            <h2 className="mt-5">Your Cart is Empty</h2>
          ) : (
            <Fragment>
              <h2 className="mt-5">
                Your Cart: <b>{cartItems.length} items</b>
              </h2>

              <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8">
                  <div className="dash-card">

                  {cartItems.map((item, i) => {
                    return (
                      <Fragment key={i}>
                        <hr />

                        <div className="cart-item">
                          <div className="row">
                            <div className="col-4 col-lg-3">
                              <img
                                src={item.image}
                                alt="Laptop"
                                height="90"
                                width="115"
                              />
                            </div>

                            <div className="col-5 col-lg-3">
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </div>

                            <div className="col-4 col-lg-2 mt-4 mt-lg-0"></div>
                            <p id="card_item_price">${item.price}</p>

                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                              <div className="stockCounter d-inline">
                                <span
                                  className="btn btn-danger minus"
                                  onClick={() => decreaseQty(item)}
                                >
                                  -
                                </span>
                                <input
                                  type="number"
                                  className="form-control count d-inline"
                                  value={item.quantity}
                                  readOnly
                                />

                                <span
                                  className="btn btn-primary plus"
                                  onClick={() => increaseQty(item)}
                                >
                                  +
                                </span>
                              </div>
                            </div>

                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                              <i
                                id="delete_cart_item"
                                className="fa fa-trash btn btn-danger"
                                onClick={() =>
                                  dispatch(removeItemFromCart(item.product))
                                }
                              ></i>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                  </div>
                </div>

                <div className="col-12 col-lg-3 my-4">
                  <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>
                      Subtotal:{" "}
                      <span className="order-summary-values">
                        {cartItems.reduce((acc, item) => (acc + item.quantity), 0)}
                        (Units)
                      </span>
                    </p>
                    <p>
                      Est. total:{" "}
                      <span className="order-summary-values">$
                      {cartItems.reduce((acc, item) => (acc + item.quantity * item.price), 0)}

                      </span>
                    </p>

                    <hr />
                    <button
                      id="checkout_btn"
                      className="btn btn-primary btn-block"
                      onClick={checkOutHandler}
                    >
                      Check out
                    </button>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
