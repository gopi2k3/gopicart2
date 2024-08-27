import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import AdminHead from "./adminHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, UpdateUser as UpdateUserAction } from "../../actions/userActions";
import { clearUserError, clearUserUpdate } from "../../Slices/userSlice";
import { toast } from "react-toastify";

export default function UpdateUser() {
  let { id } = useParams();
  let nav = useNavigate();
  let dispatch = useDispatch();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const { loading, isUserUpdated, error, user = {} } = useSelector(
    (state) => state.userState
  );

  const {user:authUser}=useSelector((state)=>state.authState)



  useEffect(() => {
    if (isUserUpdated) {
      toast.success("User updated successfully!", {
        position: "bottom-center",
      });
      nav("/admin/users"); // Navigate back to the user list or another page
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onClose: () => {
          dispatch(clearUserError());
        },
      });
    }

    if (!user._id || user._id !== id) {
      dispatch(getUser(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    return () => {
      // Clear any leftover state on unmount
      dispatch(clearUserUpdate());
    };
  }, [dispatch, isUserUpdated, error, user, id, nav]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
        name,
        email,
        role
    }

   
    
    dispatch(UpdateUserAction(id, formData));
  };

  return (
    <Fragment>
      <MetaData title={"Update User"} />
      <AdminHead />
      <div className="main-content">
        <Fragment>
          <h1>Update User</h1>

          <div className="wrapper my-2">
            <form
              className="shadow-lg"
              encType="multipart/form-data"
              onSubmit={handleSubmit}
            >
              <h1 className="mb-4">Update User</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role_field">Role</label>
                <select
                disabled={user._id==authUser._id }
                  className="form-control"
                  id="role_field"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                >
                  <option value="">Select</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button
                id="update_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading}
              >
                UPDATE
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
}
