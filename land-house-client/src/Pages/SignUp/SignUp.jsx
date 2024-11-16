import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Authcontext } from "../../AuthProvider/AuthProvider";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

const SignUp = () => {
  const { createUser,googleSignIn } = useContext(Authcontext);
  const [image,setImage] = useState('')
  const navigate = useNavigate()
  console.log(image)


  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password,image);
    const toastId = toast.loading("user is creating...")
    createUser(email, password,photo)
      .then((result) => {
        console.log(result.user.photoURL);
        toast.success("Sign Up Successfully",{id:toastId})
        const user = result.user;
        // add name and photo 
        updateProfile(user,{
          displayName:name, photoURL:image
        })
        e.target.reset();
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.code || err.error.message)
      });
  };

// google sign in
  const handleGoogle=()=>{
    googleSignIn()
    .then(result=>{
      console.log(result.user)
      toast(" User Sign up successfully")
      navigate('/')
    })
    .catch(err=>{
      console.log(err)
      toast("something went wrong please try again")
    })
  }
  
  // set a img 
  const handleimage = (event) => {
    const selectedImage = event.target.files[0];
    const Imagebb_URL = `https://api.imgbb.com/1/upload?key=2696e7096f8a68ed603d6ebaba2646d2`
    const formData = new FormData();
    formData.append('image', selectedImage);
    fetch(Imagebb_URL, {
        method: "POST",
        body: formData
    }).then(res => res.json()).then(data => {
        if (data?.data?.display_url) {
            console.log(data?.data?.display_url)
            setImage(data?.data?.display_url)
        }
    })
}

  return (
    <div className="">
      <div className="min-h-screen flex items-center justify-center py-5">
        <div className="w-auto md:max-w-max md:max-h-screen bg-blue-600/10 backdrop-blur-lg p-10 rounded-md ">
          <form className="" onSubmit={handleForm}>
            <div className="form-control w-full mb-5">
              <label className="label">
                <span className="label-text text-white">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="enter your name"
                className="flex-1 w-full bg-blue-400/10 backdrop-blur-xl rounded text-white p-3 border border-[#0690E3]  focus:text-[#0690E3] focus:border-[#0690E3]"
                required
              />
            </div>

            <div className="form-control w-full mb-5">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="enter your email"
                className="flex-1 w-full bg-blue-400/10 backdrop-blur-xl rounded text-white p-3 border border-[#0690E3]  focus:text-[#0690E3] focus:border-[#0690E3]"
                required
              />
            </div>
            <div className="flex items-start justify-center space-x-2">
              <div className="form-control w-full  md:w-1/2">
                <label className="label">
                  <span className="label-text text-white">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className=" flex-1 w-[100%] bg-blue-400/10 backdrop-blur-xl rounded text-white p-3 border border-[#0690E3]  focus:text-[#0690E3] focus:border-[#0690E3] "
                  required
                />
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover text-white"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control w-full md:w-1/2">
                <label className="label">
                  <span className="label-text text-white">Choose your photo</span>
                </label>
                <input
                  type="file"
                  onChange={handleimage}
                  name="photo"
                  placeholder="enter your name"
                  className="flex-1 w-full bg-blue-400/10 backdrop-blur-xl rounded text-white p-2 border border-[#0690E3]  focus:text-[#0690E3] focus:border-[#0690E3]"
                  required
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="border border-[#0690E3] p-3 bg-blue-400/10 backdrop-blur-xl hover:bg-gradient-to-br from-sky-400 via-[#0690E3] transition-all duration-200 rounded"
              >
                Sign Up
              </button>
              <div className="divider">OR</div>
              {/* google sign in */}
              <div className="flex items-center justify-center space-x-5 text-3xl">
                <FcGoogle onClick={handleGoogle}></FcGoogle>
                <FaFacebook></FaFacebook>
                <FaGithub></FaGithub>
              </div>
              <p className="pt-5 text-center ">
                Already have a account please{" "}
                <Link to="/login" className="text-[#0690E3]">
                  {" "}
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
