import { Fragment, useEffect } from "react";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateShipping } from "./Shipping";
import CheckoutStep from "./CheckStepOut";
import axios from "axios";
import { toast } from "react-toastify";
import { orderCompleted } from "../../Slices/cartSlice";
import { createOrder } from "../../actions/orderActions";

import { clearOrderError } from "../../Slices/orderSlice";

export default function PaymentPage() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")) || {};

  const{error:OrderError}=useSelector((state)=>state.orderState)

  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo={} } = useSelector(
    (state) => state.cartState
  );

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100) || 0,
    shipping: {
      name: user?.name || "Guest",
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country,
        state: shippingInfo.state,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNo,
    },
  };

  const order = {
    orderItems: cartItems,
    shippingInfo,
    itemPrice: orderInfo.itemPrice,
    shippingPrice: orderInfo.shippingPrice,
    taxPrice: orderInfo.taxPrice,
    totalPrice: orderInfo.totalPrice,
  };

  useEffect(() => {
    if(OrderError){
      toast.error(OrderError, {
        position: "bottom-center",
        type:'error',
        onOpen:()=>{
          dispatch(clearOrderError())
        }
      });
      return
    }

    validateShipping(shippingInfo, nav);
  }, [OrderError,dispatch]);  

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    document.querySelector("#pay_btn").disabled = true;

    try {
      const { data } = await axios.post(
        "http://localhost:8080/cart/payment/process",
        paymentData
      );

      const client_secret = data.client_secret;

      const res = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (res.error) {
        toast.error(res.error.message, {
          position: "bottom-center",
        });
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (res.paymentIntent.status === "succeeded") {
          toast.success("Payment Success", {
            position: "bottom-center",
          });


          order.paymentInfo={
            id:res.paymentIntent.id,
            status:res.paymentIntent.status
          }

          console.log(order)


          dispatch(createOrder(order))
          
          dispatch(orderCompleted());
          nav("/order/success");

        } else {
          toast.warning("Please try again", {
            position: "bottom-center",
          });
          document.querySelector("#pay_btn").disabled = false;
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Please try again later.", {
        position: "bottom-center",
      });
      document.querySelector("#pay_btn").disabled = false;
    }
  };

  return (
    <Fragment>
      <CheckoutStep shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handlePaymentSubmit}>
            <h1 className="mb-4">Card Info</h1>
            <div className="htmlForm-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="htmlForm-control"
              />
            </div>

            <div className="htmlForm-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="htmlForm-control"
              />
            </div>

            <div className="htmlForm-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="htmlForm-control"
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay {`$ ${order && order.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
