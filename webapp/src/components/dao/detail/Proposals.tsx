import React, { useEffect } from "react";
import { Button, Table, Tag } from "antd";
import { useRouter } from "next/router";
import { useAppSelector } from "src/controller/hooks";
import { getDaoProposals } from "src/core";

const Proposals = () => {
  const router = useRouter();
  const { proposals, daoFromDB } = useAppSelector((state) => state.daoDetail);

  const colorMap = (pt) => {
    let color = "blue";
    if (!pt) return color;
    switch (parseInt(pt.toString())) {
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

  const paymentTypeMap = (pt) => {
    let ptype = "Instant payout";
    if (!pt) return ptype;
    switch (parseInt(pt.toString())) {
      case 1:
        ptype = "Payout";
        break;
      case 2:
        ptype = "Funding";
        break;
      case 3:
        ptype = "Streaming";
        break;
      default:
        break;
    }
    return ptype;
  };

  const statusMap = (status) => {
    let st = "active";
    if (!status) return st;
    switch (parseInt(status.toString())) {
      case 1:
        st = "active";
        break;
      case 2:
        st = "completed";
        break;
      case 3:
        st = "completed";
        break;
      default:
        break;
    }
    return st;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Type",
      key: "proposal_type",
      render: (_, record) => (
        <Tag color={colorMap(record.proposalType)}>
          {paymentTypeMap(record.proposal_type)}
        </Tag>
      ),
    },
    {
      title: "ETH",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Tag color={colorMap(record.executed ? 2 : record.status)}>
          {statusMap(record.executed ? 2 : record.status)}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (_, record) => formatDate(record.created_at),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            router.push(`/proposal/${daoFromDB.address}/${record.id}`);
          }}
        >
          Detail
        </Button>
      ),
    },
  ];

  useEffect(() => {
    if (daoFromDB.address) {
      getDaoProposals(daoFromDB.address);
    }
  }, [daoFromDB.address]);

  return (
    <Table
      pagination={{
        pageSize: 6,
        position: ["bottomCenter"],
      }}
      dataSource={proposals}
      columns={columns}
    />
  );
};

export default Proposals;
