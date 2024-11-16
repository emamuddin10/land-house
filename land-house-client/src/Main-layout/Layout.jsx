import { Outlet } from "react-router-dom";
import Navber from "../Share/Header/Navber";
import MainFooter from "../Share/Fooder2/MainFooter";
import Footer from "../Share/Footer/Footer";

const Layout = () => {
  return (
    <div className="">
      <Navber></Navber>
      <div className="min-h-screen  md:container md:mx-auto">
        <Outlet></Outlet>
      </div>
      
      <Footer></Footer>
    </div>
  );
};

export default Layout;
