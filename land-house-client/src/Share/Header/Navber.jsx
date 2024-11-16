import { NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import userImg from "../../assets/user.png";
import logo from "../../assets/logo.png"

const Navber = () => {
  const { logOut, user } = useAuth();
  const navMenu = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? ""
              : isActive
              ? "text-white py-2 px-4 rounded-full bg-cyan-400 text-base font-semibold"
              : "text-white bg-cyan-400/10 py-2 px-5 rounded-full"
          }
        >
          Home
        </NavLink>
      </li>
      <li className="">
        <NavLink
          to="/login"
          className={({ isActive, isPending }) =>
            isPending
              ? "text-red-600 bg-emerald-500"
              : isActive
              ? "text-white py-2 px-4 rounded-full bg-cyan-400 text-base font-semibold"
              : "text-white bg-cyan-400/10 py-2 px-5 rounded-full"
          }
        >
          Login 
        </NavLink>
      </li>

      {user && (
        <>
          <li className="">
            <NavLink
              to="/addProperty"
              className={({ isActive, isPending }) =>
                isPending
                  ? "text-red-600 bg-emerald-500"
                  : isActive
                  ? "text-white py-2 px-4 rounded-full bg-cyan-400 text-base font-semibold"
                  : "text-white bg-cyan-400/10 py-2 px-5 rounded-full"
              }
            >
              Add Property
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const handleLogout = () => {
    logOut().then(() => {
      toast.success("Sign out successfully");
    });
  };
  return (
    <div className="bg-blue-400/10 backdrop-blur-xl sticky top-0 w-full z-[999]">
      <div className="md:container mx-auto">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {navMenu}
              </ul>
            </div>
            <div className="">
            <img src={logo} alt="" className="w-24" />
            </div>
          </div>

            <div className="navbar-start hidden lg:flex text-right">
              <ul className="flex flex-1 gap-x-5">{navMenu}</ul>
            </div>
          <div className="navbar-end">
            {user && (
              <div className="dropdown dropdown-end">
                {user?.photoURL ? (
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div tabIndex={0} className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user?.photoURL}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div tabIndex={0} className="w-10 rounded-full ">
                      <img
                        alt="Tailwind CSS Navbar component"
                        className="text-white"
                        src={userImg}
                      />
                    </div>
                  </div>
                )}
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 text-black active:text-teal-400 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">Profile</a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="">
                      LogOut
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navber;
