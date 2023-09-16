import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Select, Button, Card, Col, Divider, Row } from "antd";
import { AiOutlineWallet } from "react-icons/ai";
import { Editor } from "@tinymce/tinymce-react";
import { createPayoutProposal } from "src/core";
import { useAppSelector } from "src/controller/hooks";

export const NewPayout = () => {
  const { createProposal } = useAppSelector((state) => state.process);
  const editorRef = useRef(null);
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    const correctedValues = {
      ...values,
      allow_early_execution: values.allow_early_execution === "1",
    };
    dispatch(createPayoutProposal(correctedValues))
      .then(() => {
        // Proposal creation successful, you can navigate or show a success message here.
      })
      .catch((error) => {
        // Handle proposal creation error, e.g., display an error message.
        console.error("Proposal creation error:", error);
      });
  };

  const defaultContent = "Your proposal content here";

  const editorConfig = {
    apiKey: '1n11uzr2bd1kkoxh5dtycsp075phj3ivlopf4veknfhgxfyo',
    height: 350,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount',
    ],
    toolbar: 'undo redo | formatselect | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | help',
    content_style: 'body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; }',
  };

  return (
    <Form
      onFinish={onFinish}
      initialValues={{
        proposal_type: "1",
        allow_early_execution: "1",
        content: `<p>${defaultContent}</p>`,
      }}
      layout="vertical"
    >
      <Card title="General">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Missing title' }]}
        >
          <Input size="large" placeholder="Title" />
        </Form.Item>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Start Time"
              name="start_date"
              rules={[{ required: true, message: 'Missing start date' }]}
            >
              <Input size="large" type="datetime-local" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="End Time"
              name="end_date"
              rules={[{ required: true, message: 'Missing end date' }]}
            >
              <Input size="large" type="datetime-local" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Divider />
      <Card title="Execution Settings">
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Proposal type"
              name="proposal_type"
              rules={[{ required: true, message: 'Missing proposal type' }]}
            >
              <Select size="large">
                <Select.Option value="1">Payout to an user</Select.Option>
                <Select.Option value="2">Funding another DAO</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Allow early execution"
              name="allow_early_execution"
              rules={[{ required: true, message: 'Missing allow early execution' }]}
            >
              <Select size="large">
                <Select.Option value="1">Yes</Select.Option>
                <Select.Option value="0">No</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Divider />
      <Card title="Recipient">
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Address or Contract ID"
              name="recipient"
              rules={[{ required: true, message: 'Required Address or Contract ID' }]}
              extra="Please provide the contract ID if this proposal involves funding."
            >
              <Input size="large" placeholder="Address" addonBefore={<AiOutlineWallet />} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Amount"
              name="amount"
              rules={[{ required: true, message: 'Missing amount' }]}
            >
              <Input size="large" type="number" addonAfter="ETH" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Divider />
      <Card size="default" title="Description">
        <Form.Item label="Content" name="content" noStyle>
          <Input size="large" placeholder="Content" type="hidden" />
        </Form.Item>
        <Editor
          {...editorConfig}
          onChange={() => form.setFieldsValue({ content: editorRef.current.getContent() })}
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue={`<p>${defaultContent}</p>`}
        />
        <br />
        <Form.Item
          label="Content reference"
          name="content_type"
          rules={[{ required: true, message: 'Missing content type' }]}
          extra="If the proposal content relies on information from an external source, please choose one of the options and provide the corresponding external URL."
        >
          <Select size="large">
            <Select.Option value="1">No</Select.Option>
            <Select.Option value="2">From a Github issue</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Proposal Discussion URL" name="external_url">
          <Input addonBefore="URL" size="large" placeholder="Proposal Discussion URL" />
        </Form.Item>
      </Card>
      <Divider />
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={createProposal.processing}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};