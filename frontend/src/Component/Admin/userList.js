import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { MDBDataTable } from "mdbreact";
import Loader from "../layouts/loader";
import { toast } from "react-toastify";
import MetaData from "../layouts/MetaData";
import AdminHeaad from "./adminHeader";
import { clearUserDelete, clearUserError } from "../../Slices/userSlice";
import { deleteUser, getUsers } from "../../actions/userActions";

export default function UserList() {
  let dispatch = useDispatch();

  let {
    user,
    users = [],
    error,
    loading,
    isUserDeleted,
  } = useSelector((state) => state.userState);

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],

      rows: [],
    };
    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <Fragment>
            <Link to={`/admin/user/${user._id}`} className="btn btn-primary">
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              onClick={(e) => handleDelete(e, user._id)}
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
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (isUserDeleted) {
      toast.success("User Deleted successfully!", {
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearUserDelete());
        },
      });
      return;
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearUserError());
        },
      });
      return;
    }

    dispatch(getUsers);
  }, [error, dispatch, isUserDeleted]);

  return (
    <Fragment>
      <MetaData title={"Admin Products"} />
      <AdminHeaad />
      <div className="main-content">
        <h2>User List</h2>

        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="table-responsive">
              <MDBDataTable
                data={setUsers()}
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
