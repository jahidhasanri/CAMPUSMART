import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home.jsx";
import Main from "../components/Main.jsx";
import Login from "../Pages/Login.jsx";
import Register from "../Pages/Register.jsx";
import Posts from "../Pages/Posts/Posts.jsx";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout.jsx";
import Services from "../Pages/services/Services.jsx";
import AboutUs from "../Pages/aboutUs/AboutUs.jsx";
import ContactUs from "../Pages/ContactUs/ContactUs.jsx";
import DashboardHome from "../Pages/Dashboard/DashboardHome.jsx";
import MyPosts from "../Pages/Dashboard/User/MyPosts.jsx";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers.jsx";
import ProfileSettings from "../Pages/Dashboard/Shared/ProfileSettings.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import CreatePost from "../Pages/Dashboard/User/CreatePost.jsx";
import MyOrders from "../Pages/Dashboard/User/MyOrders.jsx";
import MyWishlist from "../Pages/Dashboard/User/MyWishlist.jsx";
import Cart from "../Pages/card/Card.jsx";
import PaymentSuccess from "../Pages/payments/PaymentSuccess.jsx";
import PaymentFail from "../Pages/payments/PaymentsFail.jsx";
import PaymentCancel from "../Pages/payments/PaymentCancle.jsx";

import AdminRoute from "../Pages/Dashboard/Admin/AdminRoute.jsx";
import ManagePosts from "../Pages/Dashboard/Admin/ManagePosts.jsx";
import AllOrders from "../Pages/Dashboard/Admin/AllOrders.jsx";
import PageNotFound from "../Pages/NotFound/PageNotFound.jsx";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<PageNotFound></PageNotFound>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/all-posts",
        element: <Posts></Posts>,
      },
      {
        path: "/services",
        Component: Services,
      },
      {
        path: "/about",
        Component: AboutUs,
      },
      {
        path: "/contact",
        Component: ContactUs,
      },
      {
        path: "/cart",
        Component: Cart,
      },
      {
         path: "/payment-success/:tranId",
         Component:PaymentSuccess
      },
      {
         path: "/payment-fail/:tranId",
         Component:PaymentFail
      },
      {
        path:"/payment-cancel/:tranId",
        Component:PaymentCancel
      }
      
    ],
  },
  {
    path: "/dashboard",
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute> ,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "posts",
        Component: MyPosts,
      },
      {
        path: "create-post",
        Component:CreatePost,
      },
      {
        path: "my-orders",
        Component:MyOrders,
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-posts",
        element: (
          <AdminRoute>
            <ManagePosts />
          </AdminRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <AdminRoute>
            <AllOrders />
          </AdminRoute>
        ),
      },
      {
        path: "settings",
        Component: ProfileSettings,
      },
    ],
  },
]);

export default Router;
