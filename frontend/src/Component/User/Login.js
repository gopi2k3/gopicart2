import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import Metadata from '../layouts/MetaData'
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, Login } from "../../actions/userActions";
import { toast } from "react-toastify";

const LoginPage = () => {

const location=useLocation()

const redirect=location.search? '/' + location.search.split('=')[1]:'/home'

    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')


    let dispatch=useDispatch()

    let nav=useNavigate()


    let {error,loading,isAuthenticated}=useSelector((state)=>state.authState)

 

    const handleSubmit=(e)=>{
        e.preventDefault();
       
            dispatch(Login(email,password))
        
    }

    useEffect(()=>{
        if(isAuthenticated){

            nav(redirect)

        }
        if (error) {

            toast.error(error, {
              position: "bottom-center",
              type:'error',
              onOpen:()=>{

                setTimeout(()=>{
                    dispatch(clearAuthError)
                },5000)
              }
            });
            return
          }


         

    },[error,isAuthenticated,nav,dispatch])
 
 
    return (
        <>
        <Metadata title={`Login`}/>
        
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-xl-6">
                        <div className="card p-2 login-card">

                            <form onSubmit={handleSubmit}>
                                <h2>Login.</h2>
                                <div className="form-group my-4">
                                    <label htmlFor="email" className="mb-2">Email:</label>
                                    <input type="email" className="form-control" placeholder="Email" value={email}  onChange={(e)=>setEmail(e.target.value)}  name="email" />
                                </div>

                                <div className="form-group my-4" >
                                    <label htmlFor="password" className="mb-2">Password:</label>
                                    <input type="password" className="form-control" placeholder="****" value={password} onChange={(e)=>setPassword(e.target.value)}   name="password"/>
                                </div>


                                <button type="submit" className="btn btn-success my-2" disabled={loading}>Login</button>
                                <br></br>

                                <Link to='/password/forgot'>Forgot Pssword</Link>
                                <p>Don't Have Account? <Link to='/register'>New User</Link></p>
                            </form>

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}


export default LoginPage