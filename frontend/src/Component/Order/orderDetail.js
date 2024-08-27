import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearOrderError, orderDetailRequest } from "../../Slices/orderSlice";
import { toast } from "react-toastify";
import { OrderDetail as OrderDetailAction } from "../../actions/orderActions";
import Loader from "../layouts/loader";

export const OrderDetail = () => {
  let dispatch = useDispatch();

  const { orderDetail={}, loading, error } = useSelector(
    (state) => state.orderState
  );

  const {
    shippingInfo = {},
    user = {},
    orderStatus = "Processing",
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;
  let { id } = useParams();

  useEffect(() => {
    dispatch(OrderDetailAction(id));

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearOrderError);
        },
      });
      return;
    }
  }, [dispatch, id, error]);


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order # {orderDetail._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {user.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address:</b>
                {shippingInfo?.address},{shippingInfo?.city},{" "}
                {shippingInfo?.postalCode},{shippingInfo?.state},
                {shippingInfo?.country}
              </p>
              <p>
                <b>Amount:</b> ${totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              {isPaid ? (
                <p className="greenColor">
                  <b>PAID</b>
                </p>
              ) : (
                <p className="redColor">
                  <b> NOT PAID</b>
                </p>
              )}

              <h4 className="my-4">Order Status:</h4>
              <p
                className={
                  orderStatus && orderStatus.includes("Delivered")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item, i) => {
                    return (
                      <div className="row my-5" key={i}>
                        <div className="col-4 col-lg-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            height="45"
                            width="65"
                          />
                        </div>

                        <div className="col-5 col-lg-5">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <p>{item.quantity} Piece(s)</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <hr />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
