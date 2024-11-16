import { useContext } from "react";
import { FaFacebook, FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { Authcontext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const {loginUser} = useContext(Authcontext)
  const navigate = useNavigate()

  const handleLogin=async(e)=>{
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const toastId = toast.loading("login in...");

    try{
    await loginUser(email,password)
      toast.success("login successfully",{id:toastId})
      navigate('/')
    }catch(err){
      toast.error("please provide valid email & password",{id: toastId})
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-auto md:w-96 md:h-auto bg-blue-600/10 backdrop-blur-lg p-10 rounded-md">
        <form className="" onSubmit={handleLogin} >
          <div className="form-control w-full mb-5">
            <label className="label">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="flex-1 w-full bg-blue-400/10 backdrop-blur-xl rounded text-white p-3 border border-[#0690E3]  focus:text-[#0690E3] focus:border-[#0690E3]"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              className=" flex-1 w-[100%] bg-blue-400/10 backdrop-blur-xl rounded text-white p-3 border border-[#0690E3]  focus:text-[#0690E3] focus:border-[#0690E3] "
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover text-white">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
          <button className='border border-[#0690E3] p-3 bg-blue-400/10 backdrop-blur-xl hover:bg-gradient-to-br from-sky-400 via-[#0690E3] transition-all duration-200 rounded'>Login</button>
          <div className="divider">OR</div>
              {/* google sign in */}
              <div className="flex items-center justify-center space-x-5 text-3xl">
                 <FcGoogle></FcGoogle>
                 <FaFacebook></FaFacebook>
                 <FaGithub></FaGithub>
              </div>
          <p className="pt-5 text-center ">If you have no account please <Link to='/signUp' className="text-[#0690E3] ">Sign Up</Link> </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
