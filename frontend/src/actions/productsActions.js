import {
  adminproductsFail,
  adminproductsRequest,
  adminproductsSuccess,
  productsFail,
  productsRequest,
  productsSuccess,
} from "../Slices/productsSlice";
import axios from "axios";


import {
  createReviewFail,
  createReviewRequest,
  createReviewSuccess,
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  deleteReviewFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  newProductFail,
  newProductRequest,
  newProductSuccess,
  productFail,
  productRequest,
  productSuccess,
  reviewsFail,
  reviewsRequest,
  reviewsSuccess,
  updateProductFail,
  updateProductRequest,
  updateProductSuccess,
} from "../Slices/productSlice";


export const getProducts = (keyword, price,category,rating, currentPage) => async (dispatch) => {
  try {
    dispatch(productsRequest());

    // Build the query string
    let link = `/cart/products?page=${currentPage}`;

    if (keyword) {
      link += `&keyword=${encodeURIComponent(keyword)}`;
    }

    if (price && Array.isArray(price) && price.length === 2) {
      const [minPrice, maxPrice] = price;
      if (minPrice !== undefined && maxPrice !== undefined) {
        link += `&price[gte]=${encodeURIComponent(minPrice)}&price[lte]=${encodeURIComponent(maxPrice)}`;
      }
    }
    if(category){
      link +=`&category=${category}`
    }
    if(rating){
      link +=`&ratings=${rating}`
    }

    // Make the API request
    const res = await axios.get(link);
    
    // Dispatch success action with data
    dispatch(productsSuccess(res.data));
    
  } catch (error) {
    // Dispatch failure action with error message
    dispatch(productsFail(error.response?.data?.message || error.message));
  }
};






export const getProduct = id => async (dispatch) => {
  try {
    dispatch(productRequest());

    let res = await axios.get(`/cart/product/${id}`);

    dispatch(productSuccess(res.data));
  } catch (error) {
    dispatch(productFail(error.response?.data?.message || error.message));
  }
};


export const CreateReview = reviewData => async (dispatch) => {
  try {
    dispatch(createReviewRequest());

    console.log(reviewData)

    const config={
      header:{
        
        'Content-Type':'application/json'
      }
    }

    let {data} = await axios.put(`/cart/review`,reviewData,config);

    dispatch(createReviewSuccess(data ));
  } catch (error) {
    dispatch(createReviewFail(error.response?.data?.message || error.message));
  }
};


export const AdminProducts=()=> async(dispatch)=>{

  try{
    dispatch(adminproductsRequest())


    let {data}=await axios.get(`/cart/admin/products`)

    dispatch(adminproductsSuccess(data))

  }
  catch(error){
    dispatch(adminproductsFail(error.response?.data?.message||error.message))
  }

}




export const CreateAdminProduct= productData  => async (dispatch)=>{

  try{
    dispatch(newProductRequest())
    let {data}=await axios.post(`/cart/admin/product/new`,productData)
    dispatch(newProductSuccess(data))

  }
  catch(error){
    dispatch(  newProductFail(error.response?.data?.message||error.message))
  }

}
export const DeleteAdminProduct= id => async (dispatch)=>{

  try{
    dispatch(deleteProductRequest())
    await axios.delete(`/cart/product/${id}`)
    dispatch(deleteProductSuccess())

  }
  catch(error){
    dispatch(  deleteProductFail(error.response?.data?.message||error.message))
  }

}
export const UpdateAdminProduct= (formData,id) => async (dispatch)=>{

  try{
    dispatch(updateProductRequest())
   let {data}= await axios.put(`/cart/admin/product/${id}`,formData)
    dispatch(updateProductSuccess(data))

  }
  catch(error){
    dispatch(  updateProductFail(error.response?.data?.message||error.message))
  }

}



export const getReviews = id=>async (dispatch) => {
  try {
    dispatch(reviewsRequest());

    let {data} = await axios.get(`/cart/admin/reviews`,{params:{id}});

    dispatch(reviewsSuccess(data));
  } catch (error) {
    dispatch(reviewsFail(error.response?.data?.message || error.message));
  }
};
export const deleteReviews = (productId,id)=>async (dispatch) => {
  try {
    dispatch(deleteReviewRequest());

     await axios.delete(`/cart/admin/review`,{params:{productId,id}});

    dispatch(deleteReviewSuccess());
  } catch (error) {
    dispatch(deleteReviewFail(error.response?.data?.message || error.message));
  }
};