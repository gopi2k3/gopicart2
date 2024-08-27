import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, matchPath } from "react-router-dom";
import Home from "./Component/Home";
import ProductDetail from "./Component/product/productDetail";
import Header from "./Component/layouts/Header";
import Footer from "./Component/layouts/Footer";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductSearch from "./Component/product/productSearch";
import LoginPage from "./Component/User/Login";
import RegisterPage from "./Component/User/Register";
import MyProfile from "./Component/User/Profile";
import ProductedRoute from "./Component/route/prodectedRoute";
import UpdateProfilePage from "./Component/User/UpdateProfile";
import UpdatePasswordPage from "./Component/User/updatePass";
import ForgotPage from "./Component/User/Forgot";
import ResetPage from "./Component/User/ResetPass";
import Cart from "./Component/Cart/Cart";
import ShippingPage from "./Component/Cart/Shipping";
import ConfirmOrder from "./Component/Cart/ConfirmOrder";
import PaymentPage from "./Component/Cart/Payment";

import axios from "axios";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { OrderSuccessPage } from "./Component/Cart/OrderSuccess";
import { UserOrdersPage } from "./Component/Order/userOrders";
import { OrderDetail } from "./Component/Order/orderDetail";
import DashBoard from "./Component/Admin/Dash";
import ProductList from "./Component/Admin/productList";
import NewProduct from "./Component/Admin/newProdect";
import UpadteProduct from "./Component/Admin/updateProduct";
import OrderList from "./Component/Admin/orderList";
import UpdateOrder from "./Component/Admin/UpdateOrder";
import UserList from "./Component/Admin/userList";
import UpdateUser from "./Component/Admin/updateUser";
import ReviewList from "./Component/Admin/ReviewList";

const Router = () => {
  const [stripeKey, setStripeKey] = useState("");

  const { isAuthenticated } = useSelector((state) => state.authState);

  useEffect(() => {
    if (isAuthenticated) {
      const getStripeKey = async () => {
        const { data } = await axios.get(
          `/cart/stripeapi`
        );
        setStripeKey(data.stripeApikey);
      };

      getStripeKey();
    }
  }, [isAuthenticated]);

  console.log(stripeKey);

  const ConditionalHeader = ({ children }) => {
    const location = useLocation();
    const noHeaderRoutes = [
      "/",
      "/register",
      "/password/reset/:token",
      "/password/forgot",
      "/admin/dashboard",
      "/admin/products",
      "/admin/products/create",
      "/admin/orders",
      "/admin/product/:id",
      "/admin/users",
      "/admin/order/:id",
      "/admin/user/:id",
      "/myProfile/update",
      "/myProfile/update/password",
      "/admin/reviews"
    ];

    const shouldHideHeader = noHeaderRoutes.some((route) =>
      matchPath({ path: route, exact: true }, location.pathname)
    );

    return (
      <>
        {!shouldHideHeader && <Header />}
        {children}
      </>
    );
  };

  return (
    <ConditionalHeader>
      <HelmetProvider>
        <div className="container container-fluid">
          <ToastContainer theme="dark" />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/password/reset/:token" element={<ResetPage />} />
            <Route path="/password/forgot" element={<ForgotPage />} />
            <Route
              path="/myProfile"
              element={
                <ProductedRoute>
                  <MyProfile />
                </ProductedRoute>
              }
            />
            <Route
              path="/myProfile/update"
              element={
                <ProductedRoute>
                  <UpdateProfilePage />
                </ProductedRoute>
              }
            />
            <Route
              path="/myProfile/update/password"
              element={
                <ProductedRoute>
                  <UpdatePasswordPage />
                </ProductedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProductedRoute>
                  <Home />
                </ProductedRoute>
              }
            />
            <Route
              path="/search/:keyword"
              element={
                <ProductedRoute>
                  <ProductSearch />
                </ProductedRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductedRoute>
                  <ProductDetail />
                </ProductedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProductedRoute>
                  <Cart />
                </ProductedRoute>
              }
            />
            <Route
              path="/shipping"
              element={
                <ProductedRoute>
                  <ShippingPage />
                </ProductedRoute>
              }
            />
            <Route
              path="/order/confirm"
              element={
                <ProductedRoute>
                  <ConfirmOrder />
                </ProductedRoute>
              }
            />
            {stripeKey && (
              <Route
                path="/payment"
                element={
                  <ProductedRoute>
                    <Elements stripe={loadStripe(stripeKey)}>
                      <PaymentPage />
                    </Elements>
                  </ProductedRoute>
                }
              />
            )}
            <Route
              path="/order/success"
              element={
                <ProductedRoute>
                  <OrderSuccessPage />
                </ProductedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProductedRoute>
                  <UserOrdersPage />
                </ProductedRoute>
              }
            />
            <Route
              path="/order/:id"
              element={
                <ProductedRoute>
                  <OrderDetail />
                </ProductedRoute>
              }
            />
          </Routes>
        </div>

        {/* Admin Routes */}
        <Routes>
          <Route
            path="/admin/dashboard"
            element={
              <ProductedRoute isAdmin={true}>
                <DashBoard />
              </ProductedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProductedRoute isAdmin={true}>
                <ProductList />
              </ProductedRoute>
            }
          />
          <Route
            path="/admin/products/create"
            element={
              <ProductedRoute isAdmin={true}>
                <NewProduct />
              </ProductedRoute>
            }
          />
          <Route
            path="/admin/product/:id"
            element={
              <ProductedRoute isAdmin={true}>
                <UpadteProduct />
              </ProductedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProductedRoute isAdmin={true}>
                <OrderList />
              </ProductedRoute>
            }
          />
          <Route
            path="/admin/order/:id"
            element={
              <ProductedRoute isAdmin={true}>
                <UpdateOrder />
              </ProductedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProductedRoute isAdmin={true}>
                <UserList />
              </ProductedRoute>
            }
          />

          <Route
            path="/admin/user/:id"
            element={
              <ProductedRoute isAdmin={true}>
                <UpdateUser />
              </ProductedRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProductedRoute isAdmin={true}>
                <ReviewList/>
              </ProductedRoute>
            }
          />
        </Routes>
        <Footer />
      </HelmetProvider>
    </ConditionalHeader>
  );
};

export default Router;
