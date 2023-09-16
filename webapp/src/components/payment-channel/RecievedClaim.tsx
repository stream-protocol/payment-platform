import React from "react";
import { Alert, Button, Collapse, Descriptions, Divider, Space, Tag } from "antd";
import { useAppSelector } from "src/controller/hooks";
import { acceptClaim as acceptClaimAction, rejectClaim as rejectClaimAction } from "src/core";

const RecievedClaims = () => {
  const { currentClaims } = useAppSelector((state) => state.channel);
  const { acceptClaim } = useAppSelector((state) => state.process);

  const statusMap = (status: number) => {
    switch (status) {
      case 1:
        return "active";
      case 2:
        return "completed";
      case 3:
        return "rejected";
      default:
        return "active";
    }
  };

  const handleAccept = (claim) => {
    acceptClaimAction(claim);
  };

  const handleReject = (claim) => {
    rejectClaimAction(claim);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {currentClaims.map((claim, index) => (
        <Collapse key={`claim-${index}`} items={[{ key: '1', label: claim.title, children: renderClaim(claim) }]} />
      ))}
    </Space>
  );

  function renderClaim(claim) {
    return (
      <Descriptions column={1} layout="vertical">
        <Descriptions.Item label="Document">
          <a href={claim.meta_url} target="_blank" rel="noopener noreferrer">
            Document Link
          </a>
        </Descriptions.Item>
        <Descriptions.Item label="Amount">{claim.amount} ETH</Descriptions.Item>
        <Descriptions.Item label="Signature">
          <Alert type="info" showIcon={false} message={claim.signature} />
        </Descriptions.Item>
        <Descriptions.Item label="Created At">{new Date(claim.created_at).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color="blue">{statusMap(claim.status)}</Tag>
        </Descriptions.Item>
        <Descriptions.Item>
          <Space.Compact block>
            <Button disabled={claim.status !== 1} type="primary" loading={acceptClaim.processing} onClick={() => handleAccept(claim)}>
              Accept
            </Button>
            <Button disabled={claim.status !== 1} onClick={() => handleReject(claim)}>
              Reject
            </Button>
          </Space.Compact>
        </Descriptions.Item>
      </Descriptions>
    );
  }
};

export default RecievedClaims;
