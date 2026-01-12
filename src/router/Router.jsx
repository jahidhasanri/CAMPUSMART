import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home.jsx";
import Main from "../components/Main.jsx";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
        {
            index:true,
            element:<Home></Home>
        }
    ]
  },
]);

export default Router;
