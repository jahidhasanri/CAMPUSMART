import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home.jsx";
import Main from "../components/Main.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import Posts from "../Pages/Posts.jsx";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
        {
            index:true,
            element:<Home></Home>
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/register",
          element:<Register></Register>
        },
        {
          path:"/posts",
          element:<Posts></Posts>
        }
    ]
  },
]);

export default Router;
