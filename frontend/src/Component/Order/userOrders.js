import React, { Fragment, useEffect } from "react"
import MetaData from "../layouts/MetaData"
import {MDBDataTable} from 'mdbreact'
import { useDispatch, useSelector } from "react-redux"
import { UserOrders } from "../../actions/orderActions"
import { Link } from "react-router-dom"

export const UserOrdersPage=()=>{


  const {userOrders={}}=  useSelector((state)=>state.orderState)

  let dispatch=useDispatch()

  useEffect(()=>{


    dispatch(UserOrders)


  },[dispatch,UserOrders])


  const setOrders=()=>{
    const data={

        columns:[
            {
                label:'Order Id',
                field:'id',
                sort:'asc'
            },
            {
                label:'Number Of Items',
                field:'numOfItems',
                sort:'asc'
            },
            {
                label:'Amount',
                field:'amount',
                sort:'asc'
            },
            {
                label:'Status',
                field:'status',
                sort:'asc'
            }
            ,
            {
                label:'Actions',
                field:'actions',
                sort:'asc'
            }
        ],
        rows:[

        ]

    }


    userOrders.forEach(element => {

        data.rows.push({
            id:element._id,
            numOfItems:element.orderItems.length,
            amount:`$ ${element.totalPrice}`,
            status:element.orderStatus && element.orderStatus.includes('Delivered')? 
            (<p style={{color:'green'}}>{element.orderStatus}</p>):
            (<p style={{color:'red'}}>{element.orderStatus}</p>),
            actions:<Link to={`/order/${element._id}`} className="btn btn-primary">
                <i className="fa fa-eye"></i>
            </Link>
        })
        
    });

    return data
  }


    return(
        <Fragment>
            <MetaData title={`My Orders`}/>
            <h1 className="mt-5">My Orders</h1>
            <MDBDataTable className="px-3" bordered striped hover data={setOrders()}/>
        </Fragment>
    )

}