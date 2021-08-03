import logo from "../../assets/images/logo.png";
import landingLogo from "../../assets/images/landing-logo.png";
import Button from "../../components/common/button/button";
import { useHistory } from "react-router";

const HomePage = () => {
  const history = useHistory();

  return (
    <div className="w-full">
      <div className="mx-32">
        <div className="w-full flex flex-row mb-5 py-5">
          <div className="w-10/12 flex flex-row items-center">
            <div style={{ width: "47px", height: "40px" }}>
              <img src={logo} className="w-full h-full" alt="Kringle UK" />
            </div>
            <div>
              <h1
                className="font-bold text-2xl ml-2 tracking-wider"
                style={{ color: "#1E00FE" }}
              >
                Kringle UK
              </h1>
            </div>
          </div>
          <div className="w-2/12 flex flex-row justify-end">
            <div>
              <Button label="Login" theme="primary" onClick={() => history.push('/user/auth/login')} />
            </div>
            <div>
              <Button label="Register" theme="secondary" onClick={() => history.push('/user/auth/register')} />
            </div>
          </div>
        </div>

        <div className="flex flex-row mt-40 items-center">
          <div className="w-7/12">
            <h1 className="text-6xl mb-5 font-bold tracking-wider">
              Where will crypto take you?
            </h1>
            <p className="mb-7">
              With Kringle UK exchanger has never been easier and more exciting.
            </p>
            {/* <a
              href="#"
              className="font-medium text-xl underline"
              style={{ color: "#1E00FE", textUnderlineOffset: "3px" }}
            >
              Create Account Now
            </a> */}
            <Button label="Create Account Now" theme="primary" onClick={() => history.push('/user/auth/register')} />
          </div>
          <div className="w-5/12">
            <img src={landingLogo} alt="Kringle UK TBC Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
