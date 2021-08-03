import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../common/button/button";
import InputGroup from "../../common/input-group/input-group";
import Input from "../../common/input/input";
import InputError from "../../common/input/input-error";
import {
  requiredMsg,
  minLengthMsg,
} from "../../../utils/form-error-message.util";
import AuthService from "../../../services/api/auth.service";
import Alert from "../../common/alert/alert";

interface IUserForm {
  username: string;
  password: string;
}

interface ILoginForm {
  asAdmin: boolean;
  onSuccessLogin?: () => void;
}

const LoginForm: React.FC<ILoginForm> = ({
  asAdmin = false,
  onSuccessLogin,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: IUserForm) => {
    if (asAdmin === true) {
      loginAsAdminHandler(data.username, data.password);
    } else {
      loginAsUserHandler(data.username, data.password);
    }
  };

  const loginAsUserHandler = async (username: string, password: string) => {
    try {
      setLoginError("");
      setLoading(true);

      const resp = await AuthService.login(username, password);

      saveAccessTokenHandler(resp.data.accessToken);
      saveUserDetailsHandler(resp.data.user);

      setLoading(false);
      if (typeof onSuccessLogin !== "undefined") onSuccessLogin();
    } catch (err) {
      setLoading(false);

      if (err.response) {
        setLoginError(err.response.data.error.message);
      }
    }
  };

  const loginAsAdminHandler = async (username: string, password: string) => {
    try {
      setLoginError("");
      setLoading(true);

      const resp = await AuthService.loginAsAdmin(username, password);

      saveAccessTokenHandler(resp.data.accessToken);
      saveUserDetailsHandler(resp.data.user);

      setLoading(false);
      if (typeof onSuccessLogin !== "undefined") onSuccessLogin();
    } catch (err) {
      setLoading(false);

      if (err.response) {
        setLoginError(err.response.data.error.message);
      }
    }
  };

  const saveAccessTokenHandler = (accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
  };

  const saveUserDetailsHandler = (user: any) => {
    localStorage.setItem("userDetails", JSON.stringify(user));
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm -space-y-px">
        {loginError !== "" && <Alert message={loginError} />}

        <InputGroup>
          <Input
            type="text"
            id="username"
            label="Username"
            placeholder="Username"
            {...register("username", { required: true, minLength: 5 })}
          />

          {errors.username && errors.username.type === "required" && (
            <InputError error={requiredMsg()} />
          )}
          {errors.username && errors.username.type === "minLength" && (
            <InputError error={minLengthMsg(5)} />
          )}
        </InputGroup>

        <InputGroup>
          <Input
            type="password"
            id="password"
            label="Password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 5 })}
          />

          {errors.password && errors.password.type === "required" && (
            <InputError error={requiredMsg()} />
          )}
          {errors.password && errors.password.type === "minLength" && (
            <InputError error={minLengthMsg(5)} />
          )}
        </InputGroup>
      </div>

      <div>
        <Button
          label="Sign in"
          onClick={() => console.log("clicked")}
          theme="primary"
          type="submit"
          loading={loading}
          loadingText={"Processing..."}
        />
      </div>
    </form>
  );
};

export default LoginForm;
