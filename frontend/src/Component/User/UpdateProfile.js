import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, UpdateProfile } from "../../actions/userActions";
import { toast } from "react-toastify";
import { ClearupdateProfile } from "../../Slices/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../layouts/loader";

export default function UpdateProfilePage() {
  let nav=useNavigate()
  let dispatch = useDispatch();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");

  let { error, isUpdated, user,loading } = useSelector((state) => state.authState);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_image.png"
  );
  const handleData = (e) => {
    if (e.target.name === "avatar") {
      let reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    dispatch(UpdateProfile(formData));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);

      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }

    if (isUpdated) {
      toast.success("Profile updated successfully!", {
        position: "bottom-center",
        onOpen:()=>{
          setTimeout(()=>{
            dispatch(
              ClearupdateProfile()
            )

          },3000)

         
        }
      });
      
      nav('/myProfile')

      return;
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          setTimeout(()=>{

            dispatch(clearAuthError);
          },3000)
        },
      });
      return;
    }
  }, [error, dispatch, user, isUpdated]);

  return (
    <Fragment>

      {
        loading? <Loader/>:  <div className="row mt-5 justify-content-center">
        <div className="col-xl-6">
          <div className="card p-2 login-card">
            <form onSubmit={handleSubmit}>
              <h2>Update Profile</h2>
  
              <div className="form-group my-4">
                <label htmlFor="username " className="mb-2">
                  UserName:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="UserName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                />
              </div>
              <div className="form-group my-4">
                <label htmlFor="email" className="mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="avatar"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      onChange={handleData}
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>
  
              <button type="submit" className="btn btn-success my-2" disabled={loading}>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
      }

    </Fragment>
  
  );
}
