import moment from "moment";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import UserTopNavbar from "../../../components/shared/user-top-navbar/user-top-navbar";
import WithAuth from "../../../hoc/with-auth";
import MembershipService from "../../../services/api/membership.service";

const DashboardPage: FC<any> = () => {
  const { referrerCode } = useParams<any>();

  const [downlines, setDownlines] = useState([]);

  useEffect(() => {
    getMembershipDownlines(referrerCode);
  }, [referrerCode]);

  const getMembershipDownlines = async (referrerCode: string) => {
    const result = await MembershipService.getMembershipsByReferrerCode(
      referrerCode
    );

    console.log("result", result);

    setDownlines(result.data.memberships);
  };

  return (
    <>
      <UserTopNavbar />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-4xl mb-5">Downlines</h1>

        <div className=" mt-5">
          <div className="flex flex-row flex-wrap h-15">
            <div className="w-3/12">
              <div className="border-t h-full p-2">
                <p className="font-semibold">User</p>
              </div>
            </div>
            <div className="w-3/12">
              <div className="border-t h-full p-2">
                <p className="font-semibold">Membership Plan</p>
              </div>
            </div>
            <div className="w-3/12">
              <div className="border-t h-full p-2">
                <p className="font-semibold">Created Date</p>
              </div>
            </div>
            <div className="w-3/12">
              <div className="border-t h-full p-2">
                <p className="font-semibold">Status</p>
              </div>
            </div>
          </div>

          {downlines.length > 0 ? (
            <>
              {downlines.map((membership: any) => {
                return (
                  <div
                    className="flex flex-row flex-wrap h-15"
                    key={membership._id}
                  >
                    <div className="w-3/12">
                      <div className="border-t h-full p-2 flex items-center">
                        <p>
                          {String(membership.user.name).toLocaleUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="w-3/12">
                      <div className="border-t h-full p-2 flex items-center">
                        <p>
                          {String(
                            membership.membershipPlan.name
                          ).toLocaleUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="w-3/12">
                      <div className="border-t h-full p-2 flex items-center">
                        <p>
                          {moment(membership.createdDate).format(
                            "YYYY-MM-DD hh:mm a"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="w-3/12">
                      <div className="border-t h-full p-2 flex items-center">
                        <p>{String(membership.status).toLocaleUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="flex flex-row flex-wrap h-15">
              <div className="w-full">
                <div className="border-t h-full p-2 flex items-center justify-center">
                  <p>No Downlines</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WithAuth(DashboardPage);
