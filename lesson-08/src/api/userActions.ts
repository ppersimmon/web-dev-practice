import api from "./axiosInstance";
import { User } from "../interfaces/userType";

interface LoginData {
  username?: string;
  password?: string;
}

export const registerUser = async ({ username, password }: LoginData) => {
  const response = await api.post("/users/register", {
    username,
    password,
  });
  return response.data;
};

export const loginUser = async ({ username, password }: LoginData) => {
  const response = await api.post("/api/auth/login", {
    username,
    password,
  });
  return response.data;
};

export const getUserData = async () => {
  const response = await api.get<User>("/users/my-profile");
  return response.data;
};
