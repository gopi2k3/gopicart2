import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import AdminHead from "./adminHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { OrderDetail, UpdateOrder as UpdateOrderAction } from "../../actions/orderActions";
import { clearOrderError, clearOrderUpdate } from "../../Slices/orderSlice";

export default function UpdateOrder() {
  let { id:orderId } = useParams();
  let nav = useNavigate();
  let dispatch = useDispatch();
  
  const { loading, isOrderUpdated, error, orderDetail={} } = useSelector(
    (state) => state.orderState
  );

  let {user={},orderItems=[],shippingInfo={},totalPrice=0,paymentInfo={}}=orderDetail

  const isPaid=paymentInfo.status === 'succeeded' ? true :false

  const [orderStatus,setOrderStstus]=useState('Processing')


 
  useEffect(() => {
    if (isOrderUpdated) {
      toast.success("Order Updated successfully!", {
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearOrderUpdate());
        },
      });
      return;
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          setTimeout(() => {
            dispatch(clearOrderError());
          }, 3000);
        },
      });
      return;
    }

    dispatch(OrderDetail(orderId));

  }, [isOrderUpdated, error, dispatch, nav]);

 

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData={}

    orderData.orderStatus=orderStatus

    dispatch(UpdateOrderAction(orderId,orderData));
  };

 

  useEffect(() => {
    // Only set the state if the product is fetched successfully
    if (orderDetail._id) {

        setOrderStstus(orderDetail.orderStatus)
    }
  }, [orderDetail]);


  
  

  return (
    <Fragment>
      <MetaData title={"Admin Products"} />
      <AdminHead />
      <div className="main-content">
        <Fragment>
          <h1>Update Order</h1>

          <div className="row d-flex justify-content-around">
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
            <div className="col-12 col-lg-3 mt-5 ">
                <h4 className="my-4">Order Status</h4>

                <div className="form-group"> 
                    <select className="form-control" onChange={(e)=>setOrderStstus(e.target.value)} value={orderStatus}>
                      <option value={'Processing'}>Processing</option>
                      <option value={'Shipped'}>Shipped</option>
                      <option value={'Delivered'}>Delivered</option>
                        
                    </select>
                </div>
                <button className="btn btn-primary btn-block" disabled={loading} onClick={handleSubmit}>Update</button>


            </div>
          </div>

          
        </Fragment>
      </div>
    </Fragment>
  );
}
