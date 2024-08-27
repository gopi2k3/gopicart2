import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layouts/loader";

export default function ProductedRoute({children,isAdmin}){

    const{isAuthenticated,loading,user}=useSelector((state)=>state.authState)


    if(!isAuthenticated && !loading){
       return <Navigate to='/'/>
    }

    if(isAuthenticated){

        if(isAdmin===true && user.role !=='admin' ){

          return <Navigate to='/home'/>


        }
        return children
    }
    if(loading){
        return <Loader/>
    }
}