import axios from "axios";

//else is node_env in production
const baseURL = process.env.NODE_ENV == "development" ? process.env.REACT_APP_BASEURL : 'https://hiddencomment.herokuapp.com';

console.log('baseurl', baseURL)

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

export default axiosInstance;
