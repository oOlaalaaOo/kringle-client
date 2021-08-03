import React, { useEffect, useState } from "react";
import Button from "../../../components/common/button/button";
import AdminTopNavbar from "../../../components/shared/admin-top-navbar/admin-top-navbar";
import WithAdminAuth from "../../../hoc/with-admin-auth";
import MembershipService from "../../../services/api/membership.service";
import moment from "moment";
import Modal from "../../../components/common/modal/modal";

const AdminMembershipsPage = () => {
  const [memberships, setMemberships] = useState<any>([]);
  const [confirmMembershipModal, setConfirmMembershipModal] =
    useState<boolean>(false);
  const [selectedMembership, setSelectedMembership] = useState<any>(null);

  useEffect(() => {
    getMemberships();
  }, []);

  const getMemberships = async () => {
    const result = await MembershipService.getMembershipsByStatus("all");

    console.log("result", result);

    setMemberships(result.data.memberships);
  };

  const confirmMembership = async (membershipId: string) => {
    try {
      const result = await MembershipService.confirmMembership(membershipId);

      console.log("result", result);

      setConfirmMembershipModal(false);

      getMemberships();
    } catch (err) {
      console.log("err", err);
      setConfirmMembershipModal(false);
    }
  };

  return (
    <>
      <AdminTopNavbar />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-8">
        <h1 className="text-4xl mb-5">Memberships</h1>

        <div className="border mt-5">
          <div className="flex flex-row flex-wrap h-15">
            <div className="w-2/12">
              <div className="border h-full p-2">
                <p className="font-semibold">User</p>
              </div>
            </div>
            <div className="w-2/12">
              <div className="border h-full p-2">
                <p className="font-semibold">Membership Plan</p>
              </div>
            </div>
            <div className="w-1/12">
              <div className="border h-full p-2">
                <p className="font-semibold">Referral</p>
              </div>
            </div>
            <div className="w-2/12">
              <div className="border h-full p-2">
                <p className="font-semibold">Status</p>
              </div>
            </div>
            <div className="w-2/12">
              <div className="border h-full p-2">
                <p className="font-semibold">Created Date</p>
              </div>
            </div>
            <div className="w-3/12">
              <div className="border h-full p-2"></div>
            </div>
          </div>

          {memberships.map((membership: any) => {
            return (
              <div
                className="flex flex-row flex-wrap h-15"
                key={membership._id}
              >
                <div className="w-2/12">
                  <div className="border h-full p-2 flex items-center">
                    <p>{membership.user.name}</p>
                  </div>
                </div>
                <div className="w-2/12">
                  <div className="border h-full p-2 flex items-center">
                    <p>
                      {String(
                        membership.membershipPlan.name
                      ).toLocaleUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="w-1/12">
                  <div className="border h-full p-2 flex items-center">
                    <p>{membership.referralPoints}</p>
                  </div>
                </div>
                <div className="w-2/12">
                  <div className="border h-full p-2 flex items-center">
                    <p>{String(membership.status).toLocaleUpperCase()}</p>
                  </div>
                </div>
                <div className="w-2/12">
                  <div className="border h-full p-2 flex items-center">
                    <p>
                      {moment(membership.createdDate).format(
                        "YYYY-MM-DD hh:mm a"
                      )}
                    </p>
                  </div>
                </div>
                <div className="w-3/12">
                  <div className="border h-full p-2 flex items-center justify-center">
                    <Button
                      type="button"
                      label="Deny"
                      theme="default"
                      onClick={() => console.log("asd")}
                      disabled={membership.status !== "pending"}
                    />
                    <Button
                      type="button"
                      label="Confirm"
                      theme="primary"
                      onClick={() => {
                        setSelectedMembership(membership);
                        setConfirmMembershipModal(true);
                      }}
                      disabled={membership.status !== "pending"}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Modal
          show={confirmMembershipModal}
          onClose={() => setConfirmMembershipModal(false)}
        >
          <div className="flex">
            <div className="mt-1">
              <h3 className="text-3xl leading-6 font-medium">
                Confirm Membership
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Please click "Confirm" button to submit.
                </p>

                <div className="mt-5 flex flex-row justify-end">
                  <Button
                    type="button"
                    label="Cancel"
                    theme="default"
                    onClick={() => setConfirmMembershipModal(false)}
                  />
                  <Button
                    type="button"
                    label="Confirm"
                    theme="primary"
                    onClick={() => {
                      confirmMembership(selectedMembership._id);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default WithAdminAuth(AdminMembershipsPage);
