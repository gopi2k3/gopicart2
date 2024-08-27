import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layouts/loader";
import { toast } from "react-toastify";
import Product from "./product/product";
import Pagenation from "react-js-pagination";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "bottom-center",
      });
    }
    dispatch(getProducts(null,null,null,null,currentPage));
  }, [error, dispatch,currentPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((e, i) => {
                  return <Product col={3} Product={e} key={e._id} />;
                })}
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="d-flex justify-content-center mt-5">
              <Pagenation
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass={"page-item"}
                linkClass="page-link"
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
