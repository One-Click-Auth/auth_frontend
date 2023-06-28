import { API_DOMAIN } from "@/constants";
import axios from "axios";

type UserValue = {
  username: string;
  password: string;
  full_name: string;
  is_pool: boolean;
  ref: string;
  link: string | boolean;
  types: string;
}

const defaultType = async (type: any) => {
  return type;
};

const loginUser = async (data: any) => {
  return data.type;
};

// signup user
const signupUser = async (data: any) => {
  let response;
  let userValue: UserValue = {
    username: "",
    password: "",
    full_name: "",
    is_pool: false,
    ref: "",
    link: "",
    types: "",
  };
  if (data && data.formData && data.formData.type && !data.type) {
    data.type = data.formData.type;
  }
  if (data.type === "participant") {
    userValue = {
      username: data.formData.username,
      password: data.formData.password,
      full_name: data.formData.fullName,
      is_pool: false,
      ref: data.formData.referal,
      link: true,
      types: "email",
    };
  } else {
    userValue = {
      username: data.formData.username,
      password: data.formData.password,
      full_name: data.formData.fullName,
      is_pool: true,
      ref: data.formData.referal,
      link: true,
      types: "email",
    };
  }
  try {
    response = await axios.post("https://api.trustauthx.com/api/Signup", userValue);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

// otp verify
const verifyEmail = async (data: any) => {
  let response;
  try {
    response = await axios.post(`https://api.trustauthx.com/api/verify_email/${data.link}`, data);
  } catch (error: any) {
    response = error.response;
  }
  if (response.status === 406) {
    return "Wrong OTP";
  } else {
    return response.data;
  }
};

// login user
const loginToken = async (data: any) => {
  let response;
  try {
    const body = {
      otp: "100000",
      grant_type: "",
      username: data.username || data.email,
      password: data.password,
      scope: "",
      client_id: "",
      client_secret: data?.otp ? Number(data?.otp) : "100000",
    };
    response = await axios.post(`${API_DOMAIN}/token`, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/x-www-form-urlencoded",
      },
    });
    if (response.data) {
      localStorage.setItem("token", response.data.access_token);
    }
  } catch (error: any) {
    response = error?.response;
  }
  if (response.status === 401) {
  } else {
    return response.data;
  }
};

const signinUser = async (data: any) => {
  return data.type;
};
const logOutUser = async () => {
  localStorage.removeItem("token");
};

const authService = {
  defaultType,
  loginUser,
  signinUser,
  logOutUser,
  loginToken,
  signupUser,
  verifyEmail,
};

export default authService;
