import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "../../../components/common/alert/alert";
import Button from "../../../components/common/button/button";
import InputGroup from "../../../components/common/input-group/input-group";
import Input from "../../../components/common/input/input";
import InputError from "../../../components/common/input/input-error";
import UserTopNavbar from "../../../components/shared/user-top-navbar/user-top-navbar";
import WithAuth from "../../../hoc/with-auth";
import AuthService from "../../../services/api/auth.service";
import UserService from "../../../services/api/user.service";
import {
  requiredMsg,
  minLengthMsg,
} from "../../../utils/form-error-message.util";

const AccountPage: FC<any> = ({ user }) => {
  useEffect(() => {
    if (!user) return;

    getUser(user._id);
  }, [user]);

  const getUser = async (userId: string) => {
    await UserService.getUser(userId);
  };

  return (
    <>
      <UserTopNavbar />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-4xl mb-5">Account</h1>

        <div className="mt-5 flex flex-row flex-wrap w-full">
          <div className="w-6/12 px-2">
            <UpdatePasswordForm user={user} />
          </div>

          <div className="w-6/12 px-2">
            <UpdateDetailsForm user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

const UpdatePasswordForm: FC<{ user: any }> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [updatePasswordError, setUpdatePasswordError] = useState<any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      setUpdatePasswordError(null);

      await AuthService.updatePassword(
        user._id,
        data.currentPassword,
        data.newPassword
      );

      setLoading(false);
    } catch (err) {
      if (err && err.response) {
        setUpdatePasswordError(err.response.data.error.message);
      }

      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {updatePasswordError !== null && <Alert message={updatePasswordError} />}

      <InputGroup>
        <Input
          type="password"
          id="currentPassword"
          label="Current Password"
          placeholder="Current password"
          {...register("currentPassword", {
            required: true,
            minLength: 5,
          })}
        />

        {errors.currentPassword &&
          errors.currentPassword.type === "required" && (
            <InputError error={requiredMsg()} />
          )}
        {errors.currentPassword &&
          errors.currentPassword.type === "minLength" && (
            <InputError error={minLengthMsg(5)} />
          )}
      </InputGroup>

      <InputGroup>
        <Input
          type="password"
          id="newPassword"
          label="New Password"
          placeholder="New Password"
          {...register("newPassword", { required: true, minLength: 5 })}
        />

        {errors.newPassword && errors.newPassword.type === "required" && (
          <InputError error={requiredMsg()} />
        )}
        {errors.newPassword && errors.newPassword.type === "minLength" && (
          <InputError error={minLengthMsg(5)} />
        )}
      </InputGroup>

      <InputGroup>
        <Input
          type="password"
          id="confirmNewPassword"
          label="Confirm New Password"
          placeholder="Confirm new password"
          {...register("confirmNewPassword", {
            required: true,
            minLength: 5,
          })}
        />

        {errors.confirmNewPassword &&
          errors.confirmNewPassword.type === "required" && (
            <InputError error={requiredMsg()} />
          )}
        {errors.confirmNewPassword &&
          errors.confirmNewPassword.type === "minLength" && (
            <InputError error={minLengthMsg(5)} />
          )}
      </InputGroup>

      <InputGroup>
        <Button
          label="Update Password"
          theme="primary"
          type="submit"
          loading={loading}
          loadingText={"Processing..."}
        />
      </InputGroup>
    </form>
  );
};

const UpdateDetailsForm: FC<{ user: any }> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [updateDetailsError, setUpdateDetailsError] = useState<any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      btcWallet: user.btcWallet,
      tbcWallet: user.tbcWallet,
      mobileNo: user.mobileNo,
      gcashNo: user.gcashNo,
      paymayaNo: user.paymayaNo,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      setUpdateDetailsError(null);

      const result = await UserService.updateUser(
        user._id,
        data.btcWallet,
        data.tbcWallet,
        data.mobileNo,
        data.gcashNo,
        data.paymayaNo
      );

      setLoading(false);
    } catch (err) {
      if (err && err.response) {
        setUpdateDetailsError(err.response.data.error.message);
      }

      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {updateDetailsError !== null && <Alert message={updateDetailsError} />}

      <InputGroup>
        <Input
          type="text"
          id="btcWallet"
          label="BTC Wallet"
          placeholder="BTC Wallet"
          {...register("btcWallet", {
            required: true,
          })}
        />

        {errors.btcWallet && errors.btcWallet.type === "required" && (
          <InputError error={requiredMsg()} />
        )}
      </InputGroup>

      <InputGroup>
        <Input
          type="text"
          id="tbcWallet"
          label="TBC Wallet"
          placeholder="TBC Wallet"
          {...register("tbcWallet", { required: true })}
        />

        {errors.tbcWallet && errors.tbcWallet.type === "required" && (
          <InputError error={requiredMsg()} />
        )}
      </InputGroup>

      <InputGroup>
        <Input
          type="text"
          id="mobileNo"
          label="Mobile No"
          placeholder="Mobile No"
          {...register("mobileNo", {
            required: true,
            minLength: 5,
          })}
        />

        {errors.mobileNo && errors.mobileNo.type === "required" && (
          <InputError error={requiredMsg()} />
        )}
      </InputGroup>

      <InputGroup>
        <Input
          type="text"
          id="gcashNo"
          label="GCash No"
          placeholder="Mobile No"
          {...register("gcashNo", {
            required: true,
            minLength: 5,
          })}
        />

        {errors.gcashNo && errors.gcashNo.type === "required" && (
          <InputError error={requiredMsg()} />
        )}
      </InputGroup>

      <InputGroup>
        <Input
          type="text"
          id="paymayaNo"
          label="Paymaya No"
          placeholder="Paymaya No"
          {...register("paymayaNo", {
            required: true,
            minLength: 5,
          })}
        />

        {errors.paymayaNo && errors.paymayaNo.type === "required" && (
          <InputError error={requiredMsg()} />
        )}
      </InputGroup>

      <InputGroup>
        <Button
          label="Update Details"
          theme="primary"
          type="submit"
          loading={loading}
          loadingText={"Processing..."}
        />
      </InputGroup>
    </form>
  );
};

export default WithAuth(AccountPage);
