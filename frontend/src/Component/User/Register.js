import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthError, Register } from "../../actions/userActions";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const nav = useNavigate();
  let dispatch=useDispatch()
  let [userData, setUserData] = useState({ name: "", email: "", password: "" });

  let{loading,error,isAuthenticated}=useSelector((state)=>state.authState)

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "./images/default_image.png"
  );

  const handleData = (e) => {
    if (e.target.name === "avatar") {
      let reader = new FileReader();
      reader.onload = () => {
        if(reader.readyState===2){
            setAvatarPreview(reader.result)
            setAvatar(e.target.files[0])
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }

    else{

        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit =(e) => {
    e.preventDefault();

    const formData=new FormData()

    formData.append('name',userData.name)
    formData.append('email',userData.email)
    formData.append('password',userData.password)
    formData.append('avatar',avatar)

    dispatch(Register(formData))


  };

  useEffect(()=>{
    if(isAuthenticated){

        nav(`/home`)

    }

    if (error) {

        toast.error(error, {
          position: "bottom-center",
          type:'error',
          onOpen:()=>{
            setTimeout(()=>{
              dispatch(clearAuthError)
            },3000)
          }
        });
        return
      }

  },[error,isAuthenticated,dispatch,nav])

  return (
    <>
      <div className="container">
        <div className="row mt-5 justify-content-center">
          <div className="col-xl-6">
            <div className="card p-2 login-card">
              <form onSubmit={handleSubmit}>
                <h2>SignUp</h2>

                <div className="form-group my-4">
                  <label htmlFor="username " className="mb-2">
                    UserName:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="UserName"
                    value={userData.name}
                    onChange={handleData}
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
                    value={userData.email}
                    onChange={handleData}
                    name="email"
                  />
                </div>
                <div className="form-group my-4">
                  <label htmlFor="password" className="mb-2">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="****"
                    value={userData.password}
                    onChange={handleData}
                    name="password"
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
                  Register
                </button>
                <p>
                  Have a Account? <Link to="/">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
