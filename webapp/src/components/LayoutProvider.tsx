import React, { useState } from "react";
import { Layout, Menu, Button, Form, Space, Image } from 'antd';
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  GithubOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import {
  AiOutlineDashboard,
  FaSuperscript,
  GrDocumentTime,
  GrGroup,
  LiaDiscord,
  MdOutlineWaterDrop,
  TfiLoop
} from "react-icons/all"; // Import all icons

import AutoSearch from './common/AutoSearch';
import { ConnectButton } from './common/ConnectButton';

const { Header, Sider, Content, Footer } = Layout;

const LayoutProvider = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} onCollapse={toggleCollapse} collapsed={collapsed} style={{ background: colorBgContainer }}>
        <div style={{ height: 50, margin: 16 }}>
          {
            !collapsed ? <Image src={"/logo.png"} alt="dpay" preview={false} width={150} /> : <Image src={"/ICON.png"} alt="dpay" preview={false} width={50} height={50} />
          }
        </div>

        <Menu
          style={{ fontWeight: 600 }}
          inlineIndent={10}
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          {/* Define your menu items here */}
        </Menu>
      </Sider>
      <Layout>
        <Header //@ts-ignore
          style={{ padding: 0, backgroundColor: colorBgContainer }}>
          <Space align="center" style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapse}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Form layout="inline">

              <Form.Item >
                <AutoSearch />
              </Form.Item>
              <Form.Item>
                <ConnectButton />
              </Form.Item>
            </Form>
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0 16px',
            padding: 16,
            boxSizing: "border-box",
            background: colorBgContainer
          }}
        >
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center', maxHeight: 50 }}>© 2023 StreamPayments™ Created by Stream Protocol</Footer>
      </Layout>

    </Layout>
  );
};

export default LayoutProvider;
