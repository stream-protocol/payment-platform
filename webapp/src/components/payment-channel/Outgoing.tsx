import React, { useState, useCallback, useEffect } from "react";
import { Alert, Button, Divider, Drawer, Input, Popover, Space, Table, Tag } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useAppSelector } from "src/controller/hooks";
import {
  closeChannel as closeChannelAction,
  createClaim as createClaimAction,
  fundChannel as fundChannelAction,
  getClaims,
  getOutgoingChannels,
} from "../../core";
import { useAddress } from "src/hooks/useAddress";
import { CreatedClaims } from "./CreatedClaims";
import { Channel } from "src/controller/channel/channelSlice";

const { Column } = Table;

const Outgoing = () => {
  const { getShortAddress } = useAddress();
  const { account } = useAppSelector((state) => state.account);
  const [openFundChannelPopup, setOpenFundChannelPopup] = useState<string | null>(null);

  const [openCreateClaimPopup, setOpenCreateClaimPopup] = useState<string | null>(null);
  const [claimAmount, setClaimAmount] = useState<string>("");
  const [claimTitle, setClaimTitle] = useState<string>("");
  const [claimMetaURL, setClaimMetaURL] = useState<string>("");

  const [fundAmount, setFundAmount] = useState<string>("");
  const { fundChannel, createClaim, closeChannel } = useAppSelector((state) => state.process);
  const { outgoingChannels } = useAppSelector((state) => state.channel);

  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const showDrawerDetail = () => {
    setOpenDetail(true);
  };

  const onCloseDetail = () => {
    setOpenDetail(false);
  };

  const handleOpenFundChannelPopupChange = (newOpen: boolean, channelId: string) => {
    setOpenFundChannelPopup(newOpen ? channelId : null);
  };

  const handleOpenCreateClaimPopupChange = (newOpen: boolean, channelId: string) => {
    setOpenCreateClaimPopup(newOpen ? channelId : null);
  };

  const handleFundChannel = useCallback(
    (channel: Channel) => {
      if (fundAmount && parseFloat(fundAmount) > 0) {
        fundChannelAction(channel, parseFloat(fundAmount));
      }
    },
    [fundAmount]
  );

  const handleCreateClaim = useCallback(
    (channel: Channel) => {
      if (claimTitle && claimMetaURL && claimAmount && parseFloat(claimAmount) > 0) {
        createClaimAction(channel, {
          title: claimTitle,
          meta_url: claimMetaURL,
          amount: parseFloat(claimAmount),
        });
      }
    },
    [claimTitle, claimMetaURL, claimAmount]
  );

  const colorMap = (status: number) => {
    switch (status) {
      case 1:
        return "blue";
      case 2:
        return "geekblue";
      case 3:
        return "purple";
      default:
        return "blue";
    }
  };

  const statusMap = (status: number) => {
    switch (status) {
      case 1:
        return "active";
      case 2:
        return "closed";
      default:
        return "active";
    }
  };

  useEffect(() => {
    if (account) {
      getOutgoingChannels();
    }
  }, [account]);

  return (
    <Space direction="vertical">
      <Alert
        type="success"
        showIcon
        message="As the payer, it is crucial to maintain a channel balance that is sufficient to cover the created claim amounts. This will enable payees to accept claims, ensuring successful transactions. Please ensure that the channel balance is adequate to facilitate seamless claim acceptance by the payees."
      />
      <Table
        dataSource={outgoingChannels}
        pagination={{
          pageSize: 10,
          position: ["bottomCenter"],
        }}
        rowKey={(record) => record.id}
      >
        <Column title="Title" dataIndex="title" key="title" />
        <Column
          title="Payee"
          dataIndex="payee"
          key="payee"
          render={(text, record: Channel) => (
            <Button type="primary" icon={<CopyOutlined />} onClick={() => navigator.clipboard.writeText(record.payee)}>
              {getShortAddress(record.payee)}
            </Button>
          )}
        />
        <Column
          title="Claims"
          dataIndex="claims"
          key="claims"
          render={(text, record: Channel) => (
            <Button type="primary" onClick={() => showDrawerDetail()}>
              Details
            </Button>
          )}
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(text, record: Channel) => (
            <Tag color={colorMap(record.status)}>{statusMap(record.status)}</Tag>
          )}
        />
        <Column
          title="Actions"
          key="actions"
          render={(text, record: Channel) => (
            <Space block>
              <Popover
                content={
                  <>
                    <Input
                      size="large"
                      name="amount"
                      type="number"
                      value={fundAmount}
                      onChange={(e) => setFundAmount(e.target.value)}
                      addonAfter="ETH"
                    />
                    <Divider />
                    <Button
                      disabled={record.status !== 1}
                      type="primary"
                      onClick={() => handleFundChannel(record)}
                      loading={fundChannel.processing}
                    >
                      Send
                    </Button>
                  </>
                }
                title="Amount"
                trigger="click"
                visible={openFundChannelPopup === record.id}
                onVisibleChange={(visible) => handleOpenFundChannelPopupChange(visible, record.id)}
              >
                <Button disabled={record.status !== 1} type="primary">
                  Fund
                </Button>
              </Popover>
              <Popover
                content={
                  <Space direction="vertical">
                    <Input
                      size="large"
                      placeholder="Title"
                      name="title"
                      value={claimTitle}
                      onChange={(e) => setClaimTitle(e.target.value)}
                    />
                    <Input
                      size="large"
                      placeholder="Document URL"
                      type="URL"
                      name="meta_url"
                      value={claimMetaURL}
                      onChange={(e) => setClaimMetaURL(e.target.value)}
                    />
                    <Input
                      size="large"
                      placeholder="Amount"
                      name="amount"
                      type="number"
                      addonAfter="ETH"
                      value={claimAmount}
                      onChange={(e) => setClaimAmount(e.target.value)}
                    />
                    <Divider />
                    <Button
                      disabled={record.status !== 1}
                      type="primary"
                      onClick={() => handleCreateClaim(record)}
                      loading={createClaim.processing}
                    >
                      Submit
                    </Button>
                  </Space>
                }
                title="Create Claim"
                trigger="click"
                visible={openCreateClaimPopup === record.id}
                onVisibleChange={(visible) => handleOpenCreateClaimPopupChange(visible, record.id)}
              >
                <Button disabled={record.status !== 1}>New Claim</Button>
              </Popover>
              <Button
                loading={closeChannel.processing}
                disabled={record.status !== 1}
                onClick={() => closeChannelAction(record)}
              >
                Close
              </Button>
            </Space>
          )}
        />
      </Table>
      <Drawer title="Claims" size="large" placement="right" onClose={onCloseDetail} visible={openDetail}>
        <CreatedClaims />
      </Drawer>
    </Space>
  );
};

export default Outgoing;
