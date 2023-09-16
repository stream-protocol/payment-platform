import { CopyOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useAppSelector } from "src/controller/hooks";
import { getMembers } from "src/core";
import { removeMember as removeMemberAction, leave as leaveAction } from "src/core"; // Import leave action
import { useAddress } from "src/hooks/useAddress";

const Members = () => {
  const { daoFromDB, members } = useAppSelector((state) => state.daoDetail);
  const { account } = useAppSelector((state) => state.account);
  const { getShortAddress } = useAddress();
  const { removeMember, leave } = useAppSelector((state) => state.process);
  const [selectedMember, setSelectedMember] = useState(null); // Track selected member for removal
  const [leaveConfirmationVisible, setLeaveConfirmationVisible] = useState(
    false
  ); // Track leave confirmation dialog visibility

  useEffect(() => {
    if (daoFromDB.address) {
      getMembers(0);
    }
  }, [daoFromDB.address]);

  const columns = [
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<CopyOutlined />}
          onClick={() => navigator.clipboard.writeText(record.address)}
        >
          {getShortAddress(record.address)}
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const isAccountOwner = account === record.address;
        return (
          <>
            <Button
              loading={isAccountOwner && leave.processing}
              onClick={() => handleLeave(isAccountOwner)}
              danger={isAccountOwner}
              disabled={!isAccountOwner}
            >
              {isAccountOwner ? "Leave" : "Remove"}
            </Button>
          </>
        );
      },
    },
  ];

  const handleLeave = (isAccountOwner) => {
    if (isAccountOwner) {
      setLeaveConfirmationVisible(true);
      setSelectedMember(account);
    } else {
      removeMemberAction(selectedMember);
    }
  };

  const handleLeaveConfirm = () => {
    if (selectedMember) {
      // Perform the actual leave action here
      // Replace the placeholder with your leave logic
      // Example: leaveAction(selectedMember);
      message.success("You have left the DAO.");
      setLeaveConfirmationVisible(false);
      setSelectedMember(null);
    } else {
      message.error("Selected member is invalid.");
    }
  };

  const handleLeaveCancel = () => {
    setLeaveConfirmationVisible(false);
    setSelectedMember(null);
  };

  return (
    <>
      <Table
        pagination={{
          pageSize: 6,
        }}
        dataSource={members.map((address, index) => ({
          key: index,
          address: address,
        }))}
        columns={columns}
      />
      <Modal
        title="Confirm Leave"
        visible={leaveConfirmationVisible}
        onOk={handleLeaveConfirm}
        onCancel={handleLeaveCancel}
      >
        <p>
          Are you sure you want to leave this DAO? You won't be able to perform
          actions in the DAO after leaving.
        </p>
      </Modal>
    </>
  );
};

export default Members;
