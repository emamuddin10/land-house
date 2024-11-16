import {
    createBrowserRouter,
  } from "react-router-dom";
import Layout from "../Main-layout/Layout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AddProperty from "../Component/AddProperty";


  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/addProperty',
            element:<AddProperty></AddProperty>
        },
        {
          path:'login',
          element:<Login></Login>
        },
       
      ]
    },
    {
      path:'signUp',
      element:<SignUp></SignUp>
    }
   
  ]);

 export default Router; 