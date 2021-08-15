import React from "react";
import { useForm } from "react-hook-form";
import {
  confirmPasswordMsg,
  minLengthMsg,
  requiredMsg,
} from "../../../utils/form-error-message.util";
import Button from "../../common/button/button";
import InputGroup from "../../common/input-group/input-group";
import Input from "../../common/input/input";
import InputError from "../../common/input/input-error";
import AuthService from "../../../services/api/auth.service";
import UserService from "../../../services/api/user.service";

interface IProps {
  onRegisterSuccess?: (value: boolean) => void;
}

const RegisterForm: React.FC<IProps> = ({ onRegisterSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await AuthService.register(data.username, data.password, data.name);
      if (typeof onRegisterSuccess !== "undefined") onRegisterSuccess(true);
    } catch (err) {
      console.log("err", err);
      if (typeof onRegisterSuccess !== "undefined") onRegisterSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <Input
          type="text"
          id="username"
          label="Username"
          placeholder="Username"
          {...register("username", {
            required: true,
            minLength: 5,
            validate: async (value) => {
              const result = await UserService.checkUsername(value);

              return result.data.success;
            },
          })}
        />

        {errors.username && errors.username.type === "required" && (
          <InputError error={requiredMsg()} />
        )}
        {errors.username && errors.username.type === "minLength" && (
          <InputError error={minLengthMsg(5)} />
        )}
        {errors.username && errors.username.type === "validate" && (
          <InputError error="Username already exists." />
        )}
      </InputGroup>

      <div className="flex flex-row">
        <div className="w-6/12 pr-2">
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
        <div className="w-6/12 pl-2">
          <InputGroup>
            <Input
              type="password"
              id="confirmPassword"
              label="Confirm password"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: true,
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();

                    return password === value;
                  },
                },
              })}
            />

            {errors.confirmPassword &&
              errors.confirmPassword.type === "required" && (
                <InputError error={requiredMsg()} />
              )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "minLength" && (
                <InputError error={minLengthMsg(5)} />
              )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "matchesPreviousPassword" && (
                <InputError error={confirmPasswordMsg()} />
              )}
          </InputGroup>
        </div>
      </div>

      <InputGroup>
        <Input
          type="text"
          id="name"
          label="Name"
          placeholder="Full Name"
          {...register("name", { required: true, minLength: 5 })}
        />

        {errors.username && errors.username.type === "required" && (
          <InputError error={requiredMsg()} />
        )}
        {errors.username && errors.username.type === "minLength" && (
          <InputError error={minLengthMsg(5)} />
        )}
      </InputGroup>

      <InputGroup>
        <Button
          label="Create Account"
          onClick={() => console.log("clicked")}
          theme="primary"
          type="submit"
        />
      </InputGroup>
    </form>
  );
};

export default RegisterForm;
