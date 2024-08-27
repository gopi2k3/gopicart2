import React,{ Fragment, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import AdminHeaad from "./adminHeader";
import { useDispatch, useSelector } from "react-redux";
import { AdminProducts  } from "../../actions/productsActions";
import { AdminOrders } from "../../actions/orderActions";
import { getUsers } from "../../actions/userActions";
import { Link } from "react-router-dom";
// import {AdminHeaad} from "./adminHeader";
export default function DashBoard (){
  let dispatch=useDispatch()

  let {loading,products=[]} =useSelector((state)=>state.productsState)
  let {adminOrders:orders} =useSelector((state)=>state.orderState)
  let {users} =useSelector((state)=>state.userState)

  let outOfStock=0;

  let totalAmount=0

  if(products.length>0){

    products.forEach(product => {

      if(product.stock==0 || product.stock <0){
        outOfStock +=1
      }
      
    });
      
  }
  if(orders.length>0){

    orders.forEach(order => {


    totalAmount+=order.totalPrice
      
    });
      
  }

  useEffect(()=>{


    dispatch(AdminProducts)

    dispatch(AdminOrders)

    dispatch(getUsers)

  },[dispatch])


    return (
        <Fragment >
            <MetaData title={'Admin DashBoard'}/>
           <AdminHeaad/>
            <div className='main-content'>

                <h2>Dash Board</h2>

                <div className="row mt-4">
           
                <div className="col-lg-12 col-md-6 col-sm-12 col-xl-12" >
                  <div className="dash-card mb-4 p-4">
                    <div className="dash-row">
                      <div>
                        <h6 className="card-title text-center">Total Amount</h6>
                        <div className="data-group">
                          <div className="dash-amount text-center"> $ {totalAmount.toFixed(2)}</div>
                          <div></div>
                        </div>
                      </div>
                      <div>
                        

                      </div>
                    </div>
                  
                  </div>

                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3" >
                  <div className="dash-card mb-4 p-4">
                    <div className="dash-row">
                      <div>
                        <Link   to='/admin/products' style={{textDecoration:'none',color:'black'}}>
                        
                        <h6 className="card-title">Products</h6>
                        <div className="data-group">
                          <div className="dash-amount">{products.length}</div>
                          <div></div>
                        </div>
                        </Link>
                      </div>
                      <div>
                        

                      </div>
                    </div>
                  
                  </div>

                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3" >
                  <div className="dash-card mb-4 p-4">
                    <div className="dash-row">
                      <div >
                        <Link to='/admin/orders' style={{textDecoration:'none',color:'black'}}>
                        <h6 className="card-title">Orders</h6>
                        <div className="data-group">
                          <div className="dash-amount">{orders.length}</div>
                          <div></div>
                        </div>
                        </Link>
                      </div>
                      <div>
                        

                      </div>
                    </div>
                  
                  </div>

                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3" >
                  <div className="dash-card mb-4 p-4">
                    <div className="dash-row">
                      <div>
                        <Link  to='/admin/users' style={{textDecoration:'none',color:'black'}}>


                        <h6 className="card-title">Users</h6>
                        <div className="data-group">
                          <div className="dash-amount">{users.length}</div>
                          <div></div>
                        </div>
                        </Link>
                      </div>
                      <div>
                        

                      </div>
                    </div>
                  
                  </div>

                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3" >
                  <div className="dash-card mb-4 p-4">
                    <div className="dash-row">
                      <div>
                        <h6 className="card-title">Out Of Stock</h6>
                        <div className="data-group">
                          <div className="dash-amount">{outOfStock}</div>
                          <div></div>
                        </div>
                      </div>
                      <div>
                        

                      </div>
                    </div>
                  
                  </div>

                </div>
            
          </div>

            </div>
        
        </Fragment>
    )
}