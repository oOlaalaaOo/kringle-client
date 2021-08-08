import { axiosInstance, errorHandler } from "../api.service";

const getUsers = async () => {
  try {
    return await axiosInstance(true, true).get("/user");
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const getUser = async (userId: string) => {
  try {
    return await axiosInstance(true).get(`/user/${userId}`);
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const updateUser = async (
  userId: string,
  btcWallet: string,
  tbcWallet: string,
  mobileNo: string,
  gcashNo: string,
  paymayaNo: string
) => {
  try {
    return await axiosInstance(true).post("/user/update", {
      userId: userId,
      btcWallet: btcWallet,
      tbcWallet: tbcWallet,
      mobileNo: mobileNo,
      gcashNo: gcashNo,
      paymayaNo: paymayaNo,
    });
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const checkUsername = async (username: string) => {
  try {
    return await axiosInstance().post(`/user/username/check`, {
      username: username,
    });
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const UserService = {
  getUsers,
  getUser,
  updateUser,
  checkUsername,
};

export default UserService;
