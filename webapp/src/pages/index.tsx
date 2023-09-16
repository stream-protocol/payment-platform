import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Row, Space } from "antd";
import { useEffect } from "react";

import { Typography } from 'antd';
import { useRouter } from "next/router";
import { FeatureImageSlides } from "src/components/home/FeatureImageSlides";

const { Title, Text } = Typography;
const { Meta } = Card;

const cardStyle = {
    borderRadius: 8, // Adding border radius of 8
};

export default function Index() {
    const router = useRouter();

    return (
        <div style={{ maxWidth: 1440, margin: "auto", padding: 10 }}>
            <div style={{ textAlign: "center", maxWidth: 600, margin: "auto" }}>
                <Text style={{ color: "blue" }} strong>FEATURES &#111827;</Text>
                <Title level={2} style={{ fontWeight: 700 }}>Unlocking the Potential of DAOs and Seamless Payments!</Title>
            </div>
            <br />
            <Row gutter={16}>

                <Col span={8}>
                    <Card
                        style={cardStyle} // Apply the custom card style here
                        cover={
                            <FeatureImageSlides key={"dao-slides"} imageUrls={["/DAO.png", "/PROPOSAL.png"]} />
                        }
                        actions={[
                            <Button size="large" type="primary" onClick={() => router.push("/dao/list")}>VIEW MORE</Button>,
                            <Button size="large" onClick={() => router.push("/dao/new")}>NEW DAO</Button>
                        ]}
                    >
                        <Meta
                            style={{ minHeight: 140 }}
                            title={<Text strong style={{ fontSize: 18 }}>DAO Management</Text>}
                            description="This module grants users the ability to effectively oversee DAOs, treasuries, members, and payment proposals. It can be utilized to manage member payments or provide funding for other DAOs."
                        />
                    </Card>
                </Col>
                {/* ... (similarly for other columns) */}
            </Row>
        </div>
    )
}
