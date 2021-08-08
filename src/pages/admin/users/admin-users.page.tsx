import { useEffect, useState } from "react";
import Button from "../../../components/common/button/button";
import AdminTopNavbar from "../../../components/shared/admin-top-navbar/admin-top-navbar";
import WithAdminAuth from "../../../hoc/with-admin-auth";
import UserService from "../../../services/api/user.service";
import moment from "moment";

const AdminUsersPage = () => {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const result = await UserService.getUsers();

    setUsers(result.data.users);
  };

  return (
    <>
      <AdminTopNavbar />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-4xl mb-5">Users</h1>

        <div className="border mt-5">
          <div className="flex flex-row flex-wrap h-15">
            <div className="w-3/12">
              <div className="border h-full p-2">
                <p className="font-semibold">Details</p>
              </div>
            </div>
            <div className="w-5/12">
              <div className="border h-full p-2">
                <p className="font-semibold">Wallets</p>
              </div>
            </div>
            <div className="w-2/12">
              <div className="border h-full p-2">
                <p className="font-semibold">Created Date</p>
              </div>
            </div>
            <div className="w-2/12">
              <div className="border h-full p-2"></div>
            </div>
          </div>

          {users.map((user: any) => {
            return (
              <div className="flex flex-row flex-wrap h-15" key={user._id}>
                <div className="w-3/12">
                  <div className="border h-full p-2 flex flex-col">
                    <p>Username: {user.username}</p>
                    <p>Name: {user.name}</p>
                    <p>Mobile No: {user.mobileNo}</p>
                    <p>Active: {user.isActive === true ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                
                <div className="w-5/12">
                  <div className="border h-full p-2 flex flex-col">
                    <p>BTC Wallet: {user.btcWallet}</p>
                    <p>TBC Wallet: {user.tbcWallet}</p>
                  </div>
                </div>
                <div className="w-2/12">
                  <div className="border h-full p-2 flex flex-col">
                    <p>
                      {moment(user.createdDate).format("YYYY-MM-DD hh:mm a")}
                    </p>
                  </div>
                </div>
                <div className="w-2/12">
                  <div className="border h-full p-2 flex items-center justify-center">
                    <Button
                      type="button"
                      label="Deactivate"
                      theme="secondary"
                      onClick={() => console.log("asd")}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default WithAdminAuth(AdminUsersPage);
