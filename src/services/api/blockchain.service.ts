import { axiosInstance, errorHandler } from "../api.service";

const getUsdToBtc = async (amount: number) => {
  try {
    return await axiosInstance().get("https://blockchain.info/tobtc?", {
      params: {
        currency: "USD",
        value: amount,
      },
    });
  } catch (err) {
    return Promise.reject(errorHandler(err));
  }
};

const BlockchainService = {
  getUsdToBtc,
};

export default BlockchainService;
