import { FC, useEffect, useRef, useState } from "react";
import { Copy } from "react-feather";
import { useHistory } from "react-router";
// import { useHistory } from "react-router";
import Button from "../../../components/common/button/button";
import Input from "../../../components/common/input/input";
import Modal from "../../../components/common/modal/modal";
import Notification from "../../../components/common/notification/notification";
import UserTopNavbar from "../../../components/shared/user-top-navbar/user-top-navbar";
import WithAuth from "../../../hoc/with-auth";
import MembershipService from "../../../services/api/membership.service";
import AddMembershipForm from "./components/add-membership/add-membership";

const DashboardPage: FC<any> = () => {
  const history = useHistory();

  const [addMembershipModal, setAddMembershipModal] = useState(false);
  const [memberships, setMemberships] = useState([]);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  useEffect(() => {
    getUserMemberships();
  }, []);

  const getUserMemberships = async () => {
    const userDetails = localStorage.getItem("userDetails");

    if (!userDetails) return;

    const parsedUserDetails = JSON.parse(userDetails);

    const result = await MembershipService.getMembershipsByUserId(
      parsedUserDetails._id
    );

    setMemberships(result.data.memberships);
  };

  return (
    <>
      <UserTopNavbar />

      <Notification show={showCopyNotification} title="Successfully Copied!" />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-4xl mb-5">Dashboard</h1>

        <div className="mt-5">
          <Button
            label="Add Membership"
            onClick={() => setAddMembershipModal(true)}
            type="button"
            theme="primary"
          />
        </div>

        <div className="mt-5">
          <div className="flex flex-row flex-wrap h-15">
            <div className="w-2/12">
              <div className="border-t h-full p-2">
                <p className="font-semibold">Membership Plan</p>
              </div>
            </div>
            <div className="w-1/12">
              <div className="border-t h-full p-2">
                <p className="font-semibold">Referral</p>
              </div>
            </div>
            <div className="w-4/12">
              <div className="border-t h-full p-2">
                <p className="font-semibold">Referral Code</p>
              </div>
            </div>
            <div className="w-2/12">
              <div className="border-t h-full p-2">
                <p className="font-semibold">Status</p>
              </div>
            </div>
            <div className="w-3/12">
              <div className="border-t h-full p-2"></div>
            </div>
          </div>

          {memberships.length > 0 ? (
            <>
              {memberships.map((membership: any) => {
                return (
                  <div
                    className="flex flex-row flex-wrap h-15"
                    key={membership._id}
                  >
                    <div className="w-2/12">
                      <div className="border-t h-full p-2 flex items-center">
                        <a
                          href="#downlines"
                          onClick={(e) => {
                            e.preventDefault();

                            history.push(
                              `/user/downlines/${membership.referralCode}`
                            );
                          }}
                          className="underline text-indigo-600"
                          style={{ textUnderlineOffset: "3px" }}
                        >
                          {String(
                            membership.membershipPlan.name
                          ).toLocaleUpperCase()}
                        </a>
                      </div>
                    </div>
                    <div className="w-1/12">
                      <div className="border-t h-full p-2 flex">
                        <p>{membership.referralPoints}</p>
                      </div>
                    </div>
                    <div className="w-4/12">
                      <div className="border-t h-full p-2 flex items-center">
                        <ReferralCodeCopy
                          referralCode={membership.referralCode}
                          onClick={() => {
                            setShowCopyNotification(true);

                            setTimeout(() => {
                              setShowCopyNotification(false);
                            }, 3000);
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-2/12">
                      <div className="border-t h-full p-2 flex items-center">
                        <p>{String(membership.status).toLocaleUpperCase()}</p>
                      </div>
                    </div>
                    <div className="w-3/12">
                      <div className="border-t h-full p-2 flex items-center justify-center">
                        <div className="px-1">
                          <Button
                            type="button"
                            label="Cashout Referral Points"
                            theme="primary"
                            disabled={true}
                            onClick={() =>
                              history.push(`/user/cashout/${membership._id}`)
                            }
                          />
                        </div>

                        <div className="px-1">
                          <Button
                            type="button"
                            label="Sell TBC"
                            theme="primary"
                            disabled={true}
                            onClick={() =>
                              history.push(`/user/sell/${membership._id}`)
                            }
                          />
                        </div>
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
                  <p>No Memberships</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <Modal
          show={addMembershipModal}
          onClose={() => setAddMembershipModal(false)}
        >
          <div className="flex">
            <div className="mt-1">
              <h3 className="text-3xl leading-6 font-medium">Add Membership</h3>
              <div className="mt-2">
                <AddMembershipForm
                  onSubmitSuccess={() => {
                    setAddMembershipModal(false);
                    getUserMemberships();
                  }}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

const ReferralCodeCopy: React.FC<{
  referralCode: string;
  onClick?: () => void;
}> = ({ referralCode, onClick }) => {
  const referralCodeRef = useRef<any>();

  return (
    <div className="w-full">
      <Input
        name={`referralCode`}
        type="text"
        id={`referralCode`}
        readOnly={true}
        value={referralCode}
        ref={referralCodeRef}
        className="border-0 border-white"
        iconRight={
          <Copy
            size={20}
            color="#999"
            className="cursor-pointer "
            onClick={() => {
              referralCodeRef.current?.select();
              document.execCommand("copy");
              if (onClick) onClick();
            }}
          />
        }
      />
    </div>
  );
};
export default WithAuth(DashboardPage);
