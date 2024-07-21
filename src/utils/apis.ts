import axios from "axios";

export const userSignup = async (data: any) => {
    const response = await axios.post('http://localhost:3000/api/users/signup', data);
    return response
};
export const userLogin = async (data: any) => {
    const response = await axios.post('http://localhost:3000/api/users/login', data);
    return response
};
export const forgotPassword = async (data: any) => {
    const response = await axios.post('http://localhost:3000/api/users/forgotPassword', data);
    return response
};
export const verifyOtp = async (data: any) => {
    const response = await axios.post('http://localhost:3000/api/users/verifyOtp', data);
    return response
};
export const createNewPassword = async (data: any) => {
    const response = await axios.post('http://localhost:3000/api/users/createNewPassword', data);
    return response
};
export const verifyEmail = async (data: any) => {
    const response = await axios.post('http://localhost:3000/api/users/verifyEmail', data);
    return response
};