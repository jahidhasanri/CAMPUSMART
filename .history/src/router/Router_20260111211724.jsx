import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home.jsx";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
]);

export default Router;
