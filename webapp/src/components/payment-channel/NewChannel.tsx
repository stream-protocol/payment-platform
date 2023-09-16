import React from "react";
import { Alert, Button, Card, Collapse, Descriptions, Divider, Form, Input, Space } from "antd";
import { useAppSelector, useAppDispatch } from "src/controller/hooks";
import { createChannel as createChannelAction } from "src/core";
import { AiOutlineWallet } from "react-icons/ai";
import { ChannelCreationProgress } from "./ChannelCreationProgress";

const { Item } = Form;
const { Panel } = Collapse;

const NewChannel = () => {
  const dispatch = useAppDispatch();
  const { createChannel } = useAppSelector((state) => state.process);
  const { status } = useAppSelector((state) => state.createChannel);

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
    dispatch(createChannelAction(values));
  };

  const channelSettingsGuide = () => (
    <Descriptions column={1} layout="vertical">
      <Descriptions.Item>
        This feature is a valuable addition to StreamPay™, as it enables users to establish payment channels between payers and payees, 
        streamlining the process of making multiple payments through individual claims. 
        It essentially functions as a digital invoicing system, which is commonly used when customers need to make recurring or multiple payouts to service or product providers. 
        This feature not only enhances convenience but also brings efficiency and transparency to financial transactions within the platform.
      </Descriptions.Item>
    </Descriptions>
  );

  const renderActionButton = () => {
    switch (status) {
      case 0:
        return (
          <Button type="primary" htmlType="submit" loading={createChannel.processing}>
            Deploy Channel Onchain
          </Button>
        );
      case 1:
        return (
          <Button type="primary" htmlType="submit" loading={createChannel.processing}>
            Initialize Channel
          </Button>
        );
      case 2:
        return (
          <Space style={{ width: "100%" }} direction="vertical">
            <Alert style={{ width: "100%" }} message="Your Channel is deployed onchain" type="success" />
          </Space>
        );
      default:
        return null;
    }
  };

  return (
    <Form onFinish={onFinish} style={{ maxWidth: 600, margin: "auto" }} layout="vertical">
      <Alert
        message="Payment Channel"
        description={
          <p>
            A payment channel has been established between the payer and payee, enabling the payee to withdraw money from the channel multiple times. Each withdrawal is secured by a claim containing a signed signature from the payer. <br /><br />This payment channel setup reduces transaction fees for the payer, and the payee is responsible for paying the transaction fees. This method facilitates micro payments on the blockchain, making small transactions more efficient and cost-effective.
          </p>
        }
        type="success"
        showIcon
      />

      <br />
      <ChannelCreationProgress />
      <br />
      <Card size="default" title="Settings">
        <Item name="title" rules={[{ required: true, message: 'Missing title' }]}>
          <Input size="large" placeholder="Title" />
        </Item>
        <Item name="description" rules={[{ required: true, message: 'Missing title' }]}>
          <Input.TextArea size="large" placeholder="Description" />
        </Item>
        <Item name="payee" rules={[{ required: true, message: 'Missing payee address' }]}>
          <Input addonBefore={<AiOutlineWallet />} size="large" placeholder="Payee address" />
        </Item>
      </Card>
      <Divider />
      <Collapse
        expandIconPosition="right"
        bordered={false}
        defaultActiveKey={['1']}
        ghost
      >
        <Panel header="How to use payment channel?" key="1">
          {channelSettingsGuide()}
        </Panel>
      </Collapse>
      <Divider />
      <Item>
        {renderActionButton()}
      </Item>
    </Form>
  );
};

export default NewChannel;
