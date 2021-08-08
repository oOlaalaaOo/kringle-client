import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import InputGroup from "../../../components/common/input-group/input-group";
import Input from "../../../components/common/input/input";
import InputError from "../../../components/common/input/input-error";
import UserTopNavbar from "../../../components/shared/user-top-navbar/user-top-navbar";
import WithAuth from "../../../hoc/with-auth";
import MembershipService from "../../../services/api/membership.service";
import { minMsg, requiredMsg } from "../../../utils/form-error-message.util";

const CashoutPage = () => {
  const { membershipId } = useParams<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getMemhershipDetails(membershipId);
  }, [membershipId]);

  const getMemhershipDetails = async (membershipId: string) => {
    await MembershipService.getMembershipsById(membershipId);
  };

  const onSubmit = (data: any) => {
    console.log("data", data);
  };

  return (
    <>
      <UserTopNavbar />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-4xl mb-5">Cashout</h1>

        <div className="mt-5 flex flex-row flex-wrap w-full">
          <div className="w-6/12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputGroup>
                <Input
                  type="text"
                  id="referralPoints"
                  label="Referral Points"
                  placeholder="Referral points"
                  {...register("referralPoints", { required: true, min: 10 })}
                />

                {errors.referralPoints &&
                  errors.referralPoints.type === "required" && (
                    <InputError error={requiredMsg()} />
                  )}
                {errors.referralPoints &&
                  errors.referralPoints.type === "min" && (
                    <InputError error={minMsg(5)} />
                  )}
              </InputGroup>

              <InputGroup>
                <Input
                  type="text"
                  id="btcWallet"
                  label="Your BTC Wallet"
                  placeholder="BTC wallet"
                  {...register("btcWallet", { required: true })}
                />

                {errors.btcWallet && errors.btcWallet.type === "required" && (
                  <InputError error={requiredMsg()} />
                )}
              </InputGroup>

              <InputGroup>
                <Input
                  type="text"
                  id="transactionHash"
                  label="Transaction Hash"
                  placeholder="Transaction hash"
                  {...register("transactionHash", { required: true })}
                />

                {errors.transactionHash &&
                  errors.transactionHash.type === "required" && (
                    <InputError error={requiredMsg()} />
                  )}
              </InputGroup>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithAuth(CashoutPage);
