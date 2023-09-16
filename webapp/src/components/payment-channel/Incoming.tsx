import React, { useEffect, useState } from "react";
import { Alert, Button, Drawer, Space, Table, Tag } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "src/controller/hooks";
import { getClaims, getIncomingChannels } from "src/core";
import { useAddress } from "src/hooks/useAddress";
import { RecievedClaims } from "./RecievedClaim";

const Incoming = () => {
  const dispatch = useAppDispatch();
  const { account } = useAppSelector((state) => state.account);
  const { getShortAddress } = useAddress();
  const { incomingChannels } = useAppSelector((state) => state.channel);
  const [openDetail, setOpenDetail] = useState(false);

  const showDrawerDetail = () => {
    setOpenDetail(true);
  };

  const onCloseDetail = () => {
    setOpenDetail(false);
  };

  const colorMap = (status: number) => {
    let color = "blue";
    if (!status) return color;
    switch (status) {
      case 1:
        color = "blue";
        break;
      case 2:
        color = "geekblue";
        break;
      case 3:
        color = "purple";
        break;
      default:
        break;
    }
    return color;
  };

  const statusMap = (status: number) => {
    let st = "active";
    if (!status) return st;
    switch (status) {
      case 1:
        st = "active";
        break;
      case 2:
        st = "closed";
        break;
      default:
        break;
    }

    return st;
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Payer",
      dataIndex: "payer",
      key: "payer",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<CopyOutlined />}
          onClick={() => navigator.clipboard.writeText(record.payer)}
        >
          {getShortAddress(record.payer)}
        </Button>
      ),
    },
    {
      title: "Claims",
      dataIndex: "claims",
      key: "claims",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleClaims(record)}>
          Details
        </Button>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (_, record) => (
        <Tag>{new Date(record.created_at).toLocaleString()}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Tag color={colorMap(record.status)}>{statusMap(record.status)}</Tag>
      ),
    },
  ];

  const handleClaims = (record: any) => {
    dispatch(getClaims(record));
    showDrawerDetail();
  };

  useEffect(() => {
    if (account) {
      dispatch(getIncomingChannels());
    }
  }, [account]);

  return (
    <Space wrap direction="vertical">
      <Alert
        type="success"
        showIcon
        message="Prior to accepting a claim, it is essential to verify the channel balance. If the channel balance is not greater than the claim amount, the transaction will not succeed, and the SUI coins will not be transferred to your wallet. In such a situation, it is recommended to contact the payer and request additional funding for the channel to ensure a successful transaction."
      />
      <Table
        pagination={{
          pageSize: 10,
          position: ["bottomCenter"],
        }}
        dataSource={incomingChannels}
        columns={columns}
      />

      <Drawer
        title="Received Claims"
        size="large"
        placement="right"
        onClose={onCloseDetail}
        visible={openDetail}
      >
        <RecievedClaims />
      </Drawer>
    </Space>
  );
};

export default Incoming;
