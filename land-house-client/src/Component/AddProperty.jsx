import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddProperty = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure()
  const [image,setImage] = useState();
  const {register,handleSubmit} = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const property = {
      PropertyImage: image,
      PropertyTitle: data?.propertyTitle,
      agentName: data?.agentName,
      agentImage: user?.photoURL,
      agentEmail: data?.agentEmail,
      description: data?.description,
      propertyLocation: data?.propertyLocation,
      verificationStarus: "pending",
      minPrice: parseFloat(data?.minPrice),
      maxPrice: parseFloat(data?.maxPrice),
    };
    console.log(property);
    axios.post("/addProperty",{property})
    .then(res=>{
      console.log(res.data)
      const toastId = toast.loading("property is creating")
      if(res.data.insertedId){
        toast.success("property added successfully",{id:toastId})
      }
    })
    .catch(err=> console.log(err))
   
  };

  const handleimage = (event) => {
    const selectedImage = event.target.files[0];
    const Imagebb_URL = `https://api.imgbb.com/1/upload?key=2696e7096f8a68ed603d6ebaba2646d2`;
    const formData = new FormData();
    formData.append("image", selectedImage);
    fetch(Imagebb_URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.display_url) {
          setImage(data?.data?.display_url);
        }
      });
  };

  return (
    <div className="">
      <div className=" flex items-center justify-center min-h-screen py-10">
        <div className="w-auto md:max-w-max h-auto bg-blue-600/10 backdrop-blur-lg p-10 rounded-md ">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            {/* row num 1 */}
            <div className="md:flex items-center gap-5">
              <div className="form-control md:w-1/2 ">
                <label className="label">
                  <span className="label-text text-white"> Property title</span>
                </label>
                <input
                  type="text"
                  {...register("propertyTitle", { required: true })}
                  placeholder="Enter your property title"
                  className="input input-bordered text-black"
                  required
                />
              </div>
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-white"> Property Location</span>
                </label>
                <input
                  type="text"
                  {...register("propertyLocation", { required: true })}
                  placeholder="Enter your location"
                  className="input input-bordered text-black"
                  required
                />
              </div>
             
            </div>
            {/* row 2 num  */}
            <div className="md:flex justify-center items-center gap-5">
              <div className="form-control md:w-1/2 ">
                <label className="label">
                  <span className="lavel-text text-white">Agent Name</span>
                </label>
                <input
                  {...register("agentName")}
                  defaultValue={user?.displayName}
                  readOnly
                  type="name"
                  className="input input-bordered text-black"
                />
              </div>
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-white">Agent Email</span>
                </label>
                <input
                  {...register("agentEmail")}
                  defaultValue={user?.email}
                  type="email"
                  readOnly
                  className="input input-bordered text-black"
                />
              </div>
            </div>
            {/* row 3 num  */}
            <div className="md:flex justify-center items-center gap-5">
              <div className="form-control md:w-1/2 ">
                <label className="label">
                  <span className="label-text text-white">Minimum price</span>
                </label>
                <input
                  {...register("minPrice", { required: true })}
                  type="number"
                  placeholder="minimum price"
                  className="input input-bordered text-black"
                  required
                />
              </div>
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-white">Miximum price</span>
                </label>
                <input
                  {...register("maxPrice", { required: true })}
                  type="number"
                  placeholder="max Price"
                  className="input input-bordered text-black"
                  required
                />
              </div>
            </div>
           {/* row num 4 */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Property description</span>
              </label>
              <textarea
                {...register("description", { required: true })}
                cols="30"
                rows="10"
                className="input input-bordered text-black"
                placeholder="Message"
                required
              ></textarea>
            </div>
            {/* row num 5 */}
            <div className="md:flex items-center gap-5 ">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text text-white">Area</span>
                </label>
                <input
                  type="text"
                  {...register("propertyTitle", { required: true })}
                  placeholder="Enter your land Area"
                  className="input input-bordered text-black"
                  required
                />
              </div>
              <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text text-white">Property Image</span>
              </label>
              <input
                {...register("propertyEmail", { required: true })}
                type="file"
                onChange={handleimage}
                required
              />
            </div>
             
            </div>
            
            <div className="form-control mt-6">
              <button
                type="submit"
                className="border border-[#0690E3] p-3 bg-blue-400/10 backdrop-blur-xl hover:bg-gradient-to-br from-sky-400 via-[#0690E3] transition-all duration-200 rounded"
              >
                Add property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
