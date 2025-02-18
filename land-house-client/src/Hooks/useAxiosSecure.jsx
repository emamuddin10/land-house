import axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials:true
  });

const useAxiosSecure = () => {
    return instance;
};

export default useAxiosSecure;