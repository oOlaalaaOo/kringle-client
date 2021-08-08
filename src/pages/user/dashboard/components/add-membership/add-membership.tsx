import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  minLengthMsg,
  requiredMsg,
} from "../../../../../utils/form-error-message.util";
import { Copy } from "react-feather";
import InputGroup from "../../../../../components/common/input-group/input-group";
import Input from "../../../../../components/common/input/input";
import InputError from "../../../../../components/common/input/input-error";
import Button from "../../../../../components/common/button/button";
import BlockchainService from "../../../../../services/api/blockchain.service";
import MembershipService from "../../../../../services/api/membership.service";

interface IProps {
  onSubmitSuccess: () => void;
}

const AddMembershipForm: React.FC<IProps> = ({ onSubmitSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const membershipPlanPriceRef = useRef<any>();
  const adminBtcWalletRef = useRef<any>();
  const [loading, setLoading] = useState(true);
  const [currentBtcValue, setCurrentBtcValue] = useState(0);
  const [membershipPlans, setMembershipPlans] = useState<any>([]);
  const [membershipPlanId, setMembershipPlanId] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const membershipPlansResult =
        await MembershipService.getMembershipPlans();

      if (
        membershipPlansResult.data &&
        membershipPlansResult.data.membershipPlans &&
        Array.isArray(membershipPlansResult.data.membershipPlans) &&
        membershipPlansResult.data.membershipPlans.length > 0
      ) {
        const usdToBtcResult = await BlockchainService.getUsdToBtc(
          membershipPlansResult.data.membershipPlans[0].price
        );

        setMembershipPlans(membershipPlansResult.data.membershipPlans);
        setMembershipPlanId(membershipPlansResult.data.membershipPlans[0]._id);
        setCurrentBtcValue(usdToBtcResult.data);
      }

      setLoading(false);
    })();
  }, []);

  const membershipPlainIdOnChangeHandler = async (value: any) => {
    const membershipPlanResult = await MembershipService.getMembershipPlanById(
      value
    );

    const usdToBtcResult = await BlockchainService.getUsdToBtc(
      membershipPlanResult.data.membershipPlan.price
    );

    setCurrentBtcValue(usdToBtcResult.data);
  };

  const onSubmit = async (data: any) => {
    const userDetails = localStorage.getItem("userDetails");

    if (!userDetails) {
      alert("no saved user details");

      return;
    }

    const parsedUserDetails = JSON.parse(userDetails);

    await MembershipService.addMembership(
      parsedUserDetails._id,
      data.referralCode,
      adminBtcWalletRef.current.value,
      data.transactionHash,
      membershipPlanId
    );

    onSubmitSuccess();
  };

  if (loading === true) {
    return (
      <div className="flex items-center justify-center my-10">
        <h1 className="text-xl">Loading...</h1>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <Input
          type="text"
          id="referralCode"
          label="Referral Code"
          placeholder="Referral Code"
          {...register("referralCode", {
            required: true,
            validate: async (value) => {
              const result =
                await MembershipService.checkMembershipReferrerCode(value);

              return result.data.success;
            },
          })}
        />

        {errors.referralCode && errors.referralCode.type === "required" && (
          <InputError error={requiredMsg()} />
        )}
        {errors.referralCode && errors.referralCode.type === "minLength" && (
          <InputError error={minLengthMsg(5)} />
        )}
        {errors.referralCode && errors.referralCode.type === "validate" && (
          <InputError error="Referral Code does not exists." />
        )}
      </InputGroup>

      <InputGroup>
        {membershipPlanId !== null && (
          <>
            <label htmlFor="membershipPlanId">Membership Plans</label>
            <select
              id="membershipPlanId"
              className="w-full border px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => {
                const value = e.target.value;

                setMembershipPlanId(value);
                membershipPlainIdOnChangeHandler(value);
              }}
              value={membershipPlanId}
            >
              {membershipPlans.map((plan: any) => {
                return (
                  <option value={plan._id} key={plan._id}>
                    {String(plan.name).toUpperCase()}
                  </option>
                );
              })}
            </select>
          </>
        )}
      </InputGroup>

      <InputGroup>
        <Input
          name="membershipPlanPrice"
          type="text"
          id="membershipPlanPrice"
          label="Membership Plan Price"
          value={currentBtcValue}
          readOnly={true}
          ref={membershipPlanPriceRef}
          iconRight={
            <Copy
              size={20}
              color="#999"
              className="cursor-pointer"
              onClick={() => {
                membershipPlanPriceRef.current?.select();
                document.execCommand("copy");
              }}
            />
          }
        />
      </InputGroup>

      <InputGroup>
        <Input
          name="adminBtcWallet"
          type="text"
          id="adminBtcWallett"
          label="Admin BTC Wallet"
          readOnly={true}
          value="bc1q6pwaz7sh3vgk0muee2c5nvyw2cmlruxa8hgp3d"
          ref={adminBtcWalletRef}
          iconRight={
            <Copy
              size={20}
              color="#999"
              className="cursor-pointer"
              onClick={() => {
                adminBtcWalletRef.current?.select();
                document.execCommand("copy");
              }}
            />
          }
        />

        <p className="text-xs mt-1 text-gray-500">
          Please send your payment on this BTC wallet address.
        </p>
      </InputGroup>

      <InputGroup>
        <Input
          type="text"
          id="transactionHash"
          label="Transaction Hash"
          placeholder="Transaction Hash"
          {...register("transactionHash", {
            required: true,
            validate: async (value) => {
              const result =
                await MembershipService.checkMembershipTransactionHash(value);

              return result.data.success;
            },
          })}
        />

        <p className="text-xs mt-1 text-gray-500">
          Please enter the transaction hash code when you send your payment.
        </p>

        {errors.transactionHash &&
          errors.transactionHash.type === "required" && (
            <InputError error={requiredMsg()} />
          )}
        {errors.transactionHash &&
          errors.transactionHash.type === "validate" && (
            <InputError error="Transaction Hash already exits." />
          )}
      </InputGroup>

      <InputGroup>
        <Button label="Submit Membership" theme="primary" type="submit" />
      </InputGroup>
    </form>
  );
};

export default AddMembershipForm;
