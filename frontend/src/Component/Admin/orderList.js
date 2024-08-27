import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { MDBDataTable } from "mdbreact";
import Loader from "../layouts/loader";
import { toast } from "react-toastify";
import MetaData from "../layouts/MetaData";
import AdminHeaad from "./adminHeader";
import { AdminOrders, DeleteOrder } from "../../actions/orderActions";
import { clearOrderDelete, clearOrderError } from "../../Slices/orderSlice";

export default function OrderList() {
  let dispatch = useDispatch();

  let {
    adminOrders = [],
    loading = true,
    error,
    isOrderDeleted,
    isOrderUpdated,
  } = useSelector((state) => state.orderState);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num Of Items",
          field: "noOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],

      rows: [],
    };
    adminOrders.forEach((order) => {
      data.rows.push({
        id: order._id,
        noOfItems: order.orderItems.length,
        amount: `$ ${order.totalPrice}`,
        status: (
          <p
            style={{
              color: order.orderStatus.includes("Processing") ? "red" : "green",
            }}
          >
            {order.orderStatus}
          </p>
        ),
        action: (
          <Fragment>
            <Link to={`/admin/order/${order._id}`} className="btn btn-primary">
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              onClick={(e) => handleDelete(e, order._id)}
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

  const handleDelete = (e, id) => {
    e.target.disabled = true;
    dispatch(DeleteOrder(id));
  };

  useEffect(() => {
    if (isOrderDeleted) {
      toast.success("Order Deleted successfully!", {
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearOrderDelete());
        },
      });
      return;
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });
      return;
    }

    dispatch(AdminOrders);
  }, [error, dispatch, isOrderDeleted]);

  return (
    <Fragment>
      <MetaData title={"Admin Products"} />
      <AdminHeaad />
      <div className="main-content">
        <h2>Order List</h2>

        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="table-responsive">
              <MDBDataTable
                data={setOrders()}
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
