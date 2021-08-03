import { axiosInstance, errorHandler } from "../api.service";

const login = async (username: string, password: string) => {
  try {
    return await axiosInstance().post("/auth/login", {
      username: username,
      password: password,
    });
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const register = async (username: string, password: string, name: string) => {
  try {
    return await axiosInstance().post("/auth/register", {
      username: username,
      password: password,
      name: name,
    });
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const authUser = async () => {
  try {
    return await axiosInstance(true).post("/auth/me");
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const loginAsAdmin = async (username: string, password: string) => {
  try {
    return await axiosInstance().post("/auth/admin/login", {
      username: username,
      password: password,
    });
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const authUserAsAdmin = async () => {
  try {
    return await axiosInstance(true, true).post("/auth/admin/me");
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const updatePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  try {
    return await axiosInstance(true).post("/auth/update/password", {
      userId: userId,
      currentPassword: currentPassword,
      newPassword: newPassword,
    });
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

export default {
  login,
  register,
  authUser,
  authUserAsAdmin,
  loginAsAdmin,
  updatePassword,
};
