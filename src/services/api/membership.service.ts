import { axiosInstance, errorHandler } from "../api.service";

const addMembership = async (
  userId: string,
  referrerCode: string,
  adminBtcWallet: string,
  transactionHash: string,
  membershipPlanId: string
) => {
  try {
    return await axiosInstance(true).post("/membership/add", {
      userId: userId,
      referralCode: "test",
      referrerCode: referrerCode,
      adminBtcWallet: adminBtcWallet,
      transactionHash: transactionHash,
      membershipPlanId: membershipPlanId,
    });
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const checkMembershipReferrerCode = async (referrerCode: string) => {
  try {
    return await axiosInstance(true).post("/membership/referrer-code/check", {
      referrerCode: referrerCode,
    });
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const checkMembershipTransactionHash = async (transactionHash: string) => {
  try {
    return await axiosInstance(true).post(
      "/membership/transaction-hash/check",
      {
        transactionHash: transactionHash,
      }
    );
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const getMembershipPlans = async () => {
  try {
    return await axiosInstance(true).get("/membership/plan");
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const getMembershipPlanById = async (id: string) => {
  try {
    return await axiosInstance(true).get(`/membership/plan/${id}`);
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const getMembershipsByUserId = async (userId: string) => {
  try {
    return await axiosInstance(true).get(`/membership/user/${userId}`);
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const getMembershipsByStatus = async (status: string) => {
  try {
    return await axiosInstance(true, true).get(`/membership/status/${status}`);
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const confirmMembership = async (membershipId: string) => {
  try {
    return await axiosInstance(true, true).post(`/membership/confirm/`, {
      membershipId: membershipId,
    });
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const getMembershipsByReferrerCode = async (referrerCode: string) => {
  try {
    return await axiosInstance(true).get(`/membership/downlines/${referrerCode}`);
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const getMembershipsById = async (membershipId: string) => {
  try {
    return await axiosInstance(true).get(`/membership/${membershipId}`);
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

export default {
  addMembership,
  checkMembershipReferrerCode,
  checkMembershipTransactionHash,
  getMembershipPlans,
  getMembershipPlanById,
  getMembershipsByUserId,
  getMembershipsByStatus,
  confirmMembership,
  getMembershipsByReferrerCode,
  getMembershipsById
};
