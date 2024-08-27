import { Link } from "react-router-dom"


export default function Product ({Product,col}){

   

    return(
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`} >
        <div className="card p-3 rounded">
          <img
            className="card-img-top mx-auto"
            src={Product?.images[0]?.image}
            alt={Product.name}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">
              <Link to={`/product/${Product._id}`}>
               {Product.name}
              </Link>
            </h5>
            <div className="ratings mt-auto">
              <div className="rating-outer">
              <div className="rating-inner" style={{ width: `${(Product.ratings / 5) * 100}%` }}></div>

              </div>

              <span id="no_of_reviews">({Product.numOfReviews}  Reviews)</span>
            </div>
            <p className="card-text">${Product.price}</p>
            <Link to={`/product/${Product._id}`} id="view_btn" className="btn btn-block">
              View Details
            </Link>
          </div>
        </div>
      </div>
    )
}