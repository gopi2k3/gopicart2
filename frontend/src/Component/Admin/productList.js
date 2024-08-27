import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { clearError } from '../../Slices/productsSlice';
import { AdminProducts, DeleteAdminProduct } from '../../actions/productsActions';
import { MDBDataTable } from 'mdbreact';
import Loader from '../layouts/loader';
import { toast } from 'react-toastify';
import MetaData from '../layouts/MetaData';
import AdminHeaad from './adminHeader';
import { clearProductDeleted } from '../../Slices/productSlice';

export default function ProductList() {
  const dispatch = useDispatch();

  const { products = [], loading = true, error } = useSelector((state) => state.productsState);
  const { isProductDeleted, error: productError } = useSelector((state) => state.productState);

  const setProducts = () => {
    const data = {
      columns: [
        { label: 'ID', field: 'id', sort: 'asc' },
        { label: 'Name', field: 'name', sort: 'asc' },
        { label: 'Price', field: 'price', sort: 'asc' },
        { label: 'Stock', field: 'stock', sort: 'asc' },
        { label: 'Action', field: 'action', sort: 'asc' },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$ ${product.price}`,
        stock: product.stock,
        action: (
          <Fragment key={product._id}>
            <Link to={`/admin/product/${product._id}`} className="btn btn-primary">
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              onClick={(e) => handleDelete(e, product._id)}
              className="btn btn-danger py-1 px-2 ml-2"
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      });
    });
    return data;
  };

  useEffect(() => {
    if (isProductDeleted) {
      toast.success('Product Deleted successfully!', {
        position: 'bottom-center',
        onOpen: () => {
          dispatch(clearProductDeleted());
        },
      });
      return;
    }

    if (error || productError) {
      toast.error(error || productError, {
        position: 'bottom-center',
        type: 'error',
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }

    dispatch(AdminProducts()); // Corrected invocation

  }, [dispatch, error, isProductDeleted, productError]);

  const handleDelete = (e, id) => {
    e.target.disabled = true;
    dispatch(DeleteAdminProduct(id)); // Corrected invocation
  };

  return (
    <Fragment>
      <MetaData title="Admin Products" />
      <AdminHeaad />
      <div className="main-content">
        <h2>ProductList</h2>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="table-responsive">

            <MDBDataTable
              data={setProducts()}
              bordered
              striped
              hover
              className="px-3"
            />
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}
