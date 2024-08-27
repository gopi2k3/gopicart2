import React, { Fragment, useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button} from 'react-bootstrap'
import {MDBDataTable} from 'mdbreact'
import Loader from '../layouts/loader'
import  {toast} from 'react-toastify'
import MetaData from '../layouts/MetaData'
import AdminHeaad from './adminHeader'
import { deleteReviews, getReviews } from '../../actions/productsActions'
import { clearError, deleteReviewClear } from '../../Slices/productSlice'

export default function ReviewList(){

    let dispatch=useDispatch()

    let[productId,setProductID]=useState()

    let {reviews=[],error,loading,isReviewDeleted}=useSelector((state)=>state.productState)


    const setReviews=()=>{
        const data={
            columns:[
                {
                    label:'ID',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'Rating',
                    field:'rating',
                    sort:'asc'
                },
                {
                    label:'User',
                    field:'user',
                    sort:'asc'
                },
                {
                    label:'Comment',
                    field:'comment',
                    sort:'asc'
                },
                {
                    label:'Actions',
                    field:'actions',
                    sort:'asc'
                },
            ],


            rows:[]

        }
        reviews.forEach(review=>{
            data.rows.push({
                id:review._id,
                rating:review.rating,
                user:review?.user?.name,
                comment:review.comment,
                actions:(
                    <Fragment>
                        
                        <Button onClick={(e)=>handleDelete(e,review._id)} className='btn btn-danger py-1 px-2 ml-2'>
                            <i className='fa fa-trash'></i>
                        </Button>
                    </Fragment>
                )

            })
        })
        return data
    }

    const handleDelete=(e,id)=>{
        e.target.disabled=true 
        dispatch(deleteReviews(productId,id))
    }


    useEffect(()=>{

        if (isReviewDeleted) {
            toast.success("Review Deleted successfully!", {
              position: "bottom-center",
              onOpen:()=>{dispatch(deleteReviewClear())}
            });
            dispatch(getReviews(productId))
            return;
          }

        if (error) {
            toast.error(error , {
              position: "bottom-center",
              type: "error",
              onOpen:()=>{dispatch(clearError())}
      
            });

            return;
          }


    },[error,dispatch,isReviewDeleted])



   const handleSubmit=(e)=>{
    e.preventDefault();
    


    dispatch(getReviews(productId))


   }
    


    return(
        <Fragment >
            <MetaData title={'Admin Products'}/>
            <AdminHeaad/>
            <div className='main-content'>

                <h2>Review List</h2>

                <div className='row justify-content-center mt-5'>
                    <div className='col-4'>
                        <form onSubmit={handleSubmit}>

                            <div className='form-group'>
                                <label>Product Id</label>
                                <input type='text' onChange={(e)=>setProductID(e.target.value)}
                                value={productId}
                                className='form-control'
                                disabled={loading}
 
                                />

                                <button 
                                type='submit'
                                className='btn btn-primary btn-block my-2' >Search Product</button>

                            </div>

                        </form>
                    </div>

                </div>


                {
                    loading?<Loader/>:
                    <Fragment>
            <div className="table-responsive">

                        <MDBDataTable data={setReviews()}
                        bordered
                        striped
                        hover
                        className='px-3'
                        />
                        </div>
                    </Fragment>
                }




            

            </div>
        
        </Fragment>

    )
}