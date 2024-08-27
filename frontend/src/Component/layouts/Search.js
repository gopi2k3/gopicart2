import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Search() {
  let [value, setValue] = useState("");

  let nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    nav(`/search/${value}`);
  };

  let location = useLocation();

  const clearKey = () => {
    setValue("");
  };

  useEffect(() => {
    if (location.pathname == "/") {
      clearKey();
      
    }
  }, [location]);


  return (
    <div className="col-12 col-md-6 mt-2 mt-md-0">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Enter Product Name ..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
