import React from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "../../../../components/shared/login-form/login-form";
import logo from "../../../../assets/images/logo.png";

const LoginPage: React.FC<any> = () => {
  const history = useHistory();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={logo} alt="Kringle UK" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <a
              href="#register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={(e) => {
                e.preventDefault();

                history.push("/user/auth/register");
              }}
            >
              {" "}
              create your account now
            </a>
          </p>
        </div>

        <LoginForm
          asAdmin={false}
          onLoginSuccess={(value) => {
            if (value === true) {
              history.push("/user/dashboard");
            }
          }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
