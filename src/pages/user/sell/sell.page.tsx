import { useEffect, useRef, useState } from "react";
import { Copy } from "react-feather";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import Button from "../../../components/common/button/button";
import InputGroup from "../../../components/common/input-group/input-group";
import Input from "../../../components/common/input/input";
import InputError from "../../../components/common/input/input-error";
import UserTopNavbar from "../../../components/shared/user-top-navbar/user-top-navbar";
import WithAuth from "../../../hoc/with-auth";
import MembershipService from "../../../services/api/membership.service";
import { requiredMsg } from "../../../utils/form-error-message.util";

const SellPage = () => {
  const { membershipId } = useParams<any>();
  const adminTbcWalletRef = useRef<any>();
  const [paymentMethod, setPaymentMethod] = useState("gcash");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getMemhershipDetails(membershipId);
  }, [membershipId]);

  const getMemhershipDetails = async (membershipId: string) => {
    const result = await MembershipService.getMembershipsById(membershipId);

    console.log("result", result);
  };

  const onSubmit = (data: any) => {
    console.log("data", data);
  };

  return (
    <>
      <UserTopNavbar />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-4xl mb-5">Sell</h1>

        <div className="mt-5 flex flex-row flex-wrap w-full">
          <div className="w-6/12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputGroup>
                <Input
                  type="text"
                  id="tbcAmount"
                  label="TBC Amount"
                  placeholder="TBC Amount"
                  {...register("tbcAmount", { required: true })}
                />

                {errors.tbcAmount && errors.tbcAmount.type === "required" && (
                  <InputError error={requiredMsg()} />
                )}
              </InputGroup>

              <InputGroup>
                <Input
                  name="adminBtcWallet"
                  type="text"
                  id="adminBtcWallett"
                  label="Admin BTC Wallet"
                  readOnly={true}
                  value="NC5SKLJOCUK6FILDIFHH6Q275MSJHXHO66M6I7NZ"
                  ref={adminTbcWalletRef}
                  iconRight={
                    <Copy
                      size={20}
                      color="#999"
                      className="cursor-pointer"
                      onClick={() => {
                        adminTbcWalletRef.current?.select();
                        document.execCommand("copy");
                      }}
                    />
                  }
                />

                <p className="text-xs mt-1 text-gray-500">
                  Please send your payment on this TBC wallet address.
                </p>
              </InputGroup>

              <InputGroup>
                <Input
                  type="text"
                  id="transactionHash"
                  label="Transaction Hash (the hash that is generated when you send your TBC)"
                  placeholder="Transaction hash"
                  {...register("transactionHash", { required: true })}
                />

                {errors.transactionHash &&
                  errors.transactionHash.type === "required" && (
                    <InputError error={requiredMsg()} />
                  )}
              </InputGroup>

              <hr className="mt-7 mb-7" />

              <InputGroup>
                <label htmlFor="paymentMethod">
                  Where you want us to send our payment?
                </label>
                <select
                  id="paymentMethod"
                  className="w-full border px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    const value = e.target.value;

                    setPaymentMethod(value);
                  }}
                  value={paymentMethod}
                >
                  <option value="gcash">GCash</option>
                  <option value="paymaya">Paymaya</option>
                  <option value="coins-ph">Coins.ph</option>
                </select>
              </InputGroup>

              <InputGroup>
                <>
                  {paymentMethod === "gcash" && (
                    <>
                      <Input
                        type="text"
                        id="gcashNo"
                        label="Gcash No."
                        placeholder="Gcash No."
                        {...register("gcashNo", { required: true })}
                      />

                      {errors.gcashNo && errors.gcashNo.type === "required" && (
                        <InputError error={requiredMsg()} />
                      )}
                    </>
                  )}

                  {paymentMethod === "paymaya" && (
                    <>
                      <Input
                        type="text"
                        id="paymayaNo"
                        label="Paymaya No."
                        placeholder="Paymaya No."
                        {...register("paymayaNo", { required: true })}
                      />

                      {errors.paymayaNo &&
                        errors.paymayaNo.type === "required" && (
                          <InputError error={requiredMsg()} />
                        )}
                    </>
                  )}

                  {paymentMethod === "coins-ph" && (
                    <>
                      <Input
                        type="text"
                        id="coinsPh"
                        label="Paymaya No."
                        placeholder="Paymaya No."
                        {...register("coinsPh", { required: true })}
                      />

                      {errors.coinsPh && errors.coinsPh.type === "required" && (
                        <InputError error={requiredMsg()} />
                      )}
                    </>
                  )}
                </>
              </InputGroup>

              <InputGroup>
                <Button
                  label="Submit"
                  theme="primary"
                  type="submit"
                />
              </InputGroup>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithAuth(SellPage);
