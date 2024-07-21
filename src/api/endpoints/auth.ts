import axiosInstance from "../http";
import {
  ForgetPasswordIPros,
  LoginIPros,
  RegiterIProps,
  OtpVerificationIPros,
  resetPasswordIPros,
  profileUpdateIPros,
  poiFavoriteIPros,
  QuickSingupIPros,
} from "../intefaces";
import * as Cookies from "js-cookie";

const loginEndpoint = async (payload: LoginIPros) => {
  try {
    const x = await axiosInstance.post("/auth/login", payload);

    if (x.data.access_token) {
      Cookies.default.set("user", JSON.stringify(x.data.record));
    }
    if (
      x?.data?.record?.active === true &&
      x?.data?.record?.Questionnaire?.length !== 0
    ) {
      Cookies.default.set("access_token", x.data.access_token);
    }

    return x;
  } catch (error: any) {
    return error?.response
      ? error?.response
      : "Request failed, Please contact admin.";
  }
};

const quickSignupEndpoint = async (payload: QuickSingupIPros) => {
  try {
    const x = await axiosInstance.post("/auth/quick-signup", payload);

    if (x.data.access_token) {
      Cookies.default.set("user", JSON.stringify(x.data.record));
      Cookies.default.set("access_token", x.data.access_token);
    }
    if (
      x?.data?.record?.active === true &&
      x?.data?.record?.Questionnaire?.length !== 0
    ) {
      Cookies.default.set("access_token", x.data.access_token);
    }

    return x;
  } catch (error: any) {
    return error?.response
      ? error?.response
      : "Request failed, Please contact admin.";
  }
};

const registerEndpoint = async (payload: RegiterIProps) => {
  // console.log(payload, 'paylodeRegester');
  try {
    const x = await axiosInstance.post("/auth/register", payload);
    if (x.data.access_token) {
      Cookies.default.set("access_token", x.data.access_token);
      Cookies.default.set("remember_token", x.data.remember_token);
      Cookies.default.set("user", JSON.stringify(x.data.record));
    }
    return x;
  } catch (error: any) {
    return error?.response
      ? error?.response
      : "Request failed, Please contact admin.";
  }
};
const userQuestions = async (payload: RegiterIProps) => {
  // console.log(payload, 'paylodeRegester');
  try {
    const x = await axiosInstance.post("/auth/questionnaire", payload);
    return x;
  } catch (error: any) {
    return error?.response
      ? error?.response
      : "Request failed, Please contact admin.";
  }
};

const forgetPasswordEndpoint = async (payload: ForgetPasswordIPros) => {
  try {
    const x = await axiosInstance.post("/auth/forgot-password", payload);
    return x;
  } catch (error: any) {
    return error?.response
      ? error?.response
      : "Request failed, Please contact admin.";
  }
};
const resetPasswordEndPoint = async (payload: resetPasswordIPros) => {
  try {
    const x = await axiosInstance.post("/auth/reset-password", payload);
    return x;
  } catch (error: any) {
    return error?.response
      ? error?.response
      : "Request failed, Please contact admin.";
  }
};

const otpVerificationEndPoint = async (payload: OtpVerificationIPros) => {
  try {
    const x = await axiosInstance.post("/auth/otp-verification", payload);
    if (x.data.access_token) {
      x.data.access_token &&
        Cookies.default.set("access_token", x.data.access_token);
      x.data.remember_token &&
        Cookies.default.set("remember_token", x.data.remember_token);
      x.data.record &&
        Cookies.default.set("user", JSON.stringify(x.data.record));
      //  local-storage
      x.data.access_token &&
        localStorage.setItem("access_token", x.data.access_token);
      x.data.remember_token &&
        localStorage.setItem("remember_token", x.data.remember_token);
      x.data.record &&
        localStorage.setItem("user", JSON.stringify(x.data.record));
    }
    return x;
  } catch (error: any) {
    return error?.response
      ? error?.response
      : "Request failed, Please contact admin.";
  }
};
const otpRegenerateEndPoint = async (payload: ForgetPasswordIPros) => {
  try {
    const x = await axiosInstance.post("/auth/otp-regenerate", payload);
    return x;
  } catch (error: any) {
    return error?.response
      ? error?.response
      : "Request failed, Please contact admin.";
  }
};

const profileUpdateEndPoint = async (payload: profileUpdateIPros) => {
  try {
    const x = await axiosInstance.put("/me", payload);
    if (x.data.access_token) {
      x.data.access_token &&
        Cookies.default.set("access_token", x.data.access_token);
      Cookies.default.set("user", JSON.stringify(x.data.record));
    }
    return x;
  } catch (error: any) {
    return error?.response
      ? error?.response
      : "Request failed, Please contact admin.";
  }
};

const poiFavoriteEndPoint = async (payload: poiFavoriteIPros) => {
  try {
    const x = await axiosInstance.post("/users/favorite", payload);
    if (x.data.access_token) {
      x.data.access_token &&
        Cookies.default.set("access_token", x.data.access_token);
      Cookies.default.set("user", JSON.stringify(x.data.record));
    }
    return x;
  } catch (error: any) {
    return error?.response
      ? error?.response
      : "Request failed, Please contact admin.";
  }
};

export default {
  loginEndpoint,
  quickSignupEndpoint,
  registerEndpoint,
  userQuestions,
  poiFavoriteEndPoint,
  forgetPasswordEndpoint,
  otpVerificationEndPoint,
  resetPasswordEndPoint,
  otpRegenerateEndPoint,
  profileUpdateEndPoint,
};
