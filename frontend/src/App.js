import { useEffect } from "react";
import "./App.css";
import Router from "./Router";
import store from "./Store";
import { loadUser } from "./actions/userActions";
import axios from "axios"; // Import axios once
import { BrowserRouter } from "react-router-dom";

// Set default Axios configuration
axios.defaults.withCredentials = true;

function App() {
  useEffect(() => {
    store.dispatch(loadUser); // Call loadUser as a function
  }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
