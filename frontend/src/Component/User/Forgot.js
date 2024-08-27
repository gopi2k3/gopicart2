import React,{ useState ,useEffect, Fragment} from "react"
import { useDispatch, useSelector } from "react-redux";
import { ForgotPassword,clearAuthError } from "../../actions/userActions";
import { toast } from "react-toastify";
import Loader from "../layouts/loader";

export default function ForgotPage(){
    let[email,setEmail]=useState('')

    let dispatch=useDispatch()

    let{loading,error,message}=useSelector((state)=>state.authState)


    const handleSubmit=(e)=>{
        e.preventDefault();
        

        let formData=new FormData()

        formData.append('email',email)

        dispatch(ForgotPassword(formData))

    }

    useEffect(()=>{
        if(message){
            toast.success(message,{
              position: "bottom-center",

                
            })

        }
       
        if (error) {
            toast.error(error, {
              position: "bottom-center",
              type: "error",
              onOpen: () => {
                dispatch(clearAuthError);
              },
            });
            return;
          }

    },[dispatch,error,message])

    return(
        <Fragment>
            {
                loading? <Loader/>:  <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={handleSubmit}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Send Email
                    </button>

                    </form>
                </div>
            </div>
                
            }
        </Fragment>
      
    )
}