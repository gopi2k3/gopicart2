import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearAuthError, UpdatePassword } from "../../actions/userActions"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




export default function UpdatePasswordPage(){
    let nav=useNavigate()
    let[password,setPassword]=useState('')
    let[newpassword,setNewPassword]=useState('')

    let dispatch=useDispatch()

    const{loading,error,isUpdated}=useSelector((state)=>state.authState)

    const handleSubmit=(e)=>{
        e.preventDefault();
     let formData=new FormData()
     formData.append('oldPassword',password)
     formData.append('password',newpassword)

     dispatch(UpdatePassword(formData))

    }
    useEffect(()=>{
        if (isUpdated) {
            toast.success("Password updated successfully!", {
              position: "bottom-center",
            });

            setPassword('')
            setNewPassword('')

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

    },[dispatch,error,isUpdated])
    return(
        <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={handleSubmit}>
                <h1 className="mt-2 mb-5">Update Password</h1>
                <div className="form-group">
                    <label htmlFor="old_password_field">Old Password</label>
                    <input
                        type="password"
                        id="old_password_field"
                        className="form-control"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}

                    />
                </div>

                <div className="form-group">
                    <label htmlFor="new_password_field">New Password</label>
                    <input
                        type="password"
                        id="new_password_field"
                        className="form-control"
                        value={newpassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading}>Update Password</button>
            </form>
        </div>
    </div>

    )
}