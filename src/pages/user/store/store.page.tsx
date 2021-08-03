import { FC } from "react";
import UserTopNavbar from "../../../components/shared/user-top-navbar/user-top-navbar";
import WithAuth from "../../../hoc/with-auth";

const StorePage: FC<any> = ({ user }) => {
  return (
    <>
      <UserTopNavbar />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-4xl mb-5">Store</h1>

        <p>This page is currently in progress...</p>
      </div>
    </>
  );
};

export default WithAuth(StorePage);
