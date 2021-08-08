import React, { useState } from "react";
import { useHistory } from "react-router";
import RegisterForm from "../../../../components/shared/register-form/register-form";
import logo from "../../../../assets/images/logo.png";
import Alert from "../../../../components/common/alert/alert";

const RegisterPage: React.FC<any> = () => {
  const history = useHistory();
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState<any>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={logo} alt="Kringle UK" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <a
              href="#login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={(e) => {
                e.preventDefault();

                history.push("/user/auth/login");
              }}
            >
              {" "}
              login to your account now
            </a>
          </p>
        </div>

        {isRegistrationSuccess !== null && isRegistrationSuccess === true && (
          <Alert message="Successfully Registered" />
        )}
        <RegisterForm
          onRegisterSuccess={(value) => {
            setIsRegistrationSuccess(value);
          }}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
