import { Card, Col, Row, Statistic } from "antd";
import { useEffect } from "react";
import PayoutChart from "src/components/home/PayoutChart";
import { useAppSelector } from "src/controller/hooks";
import { getStatistic } from "src/core";
import { statisticCard, statisticCardRight } from "src/theme/layout";

export default function Statistics() {
    const { dao, proposal, channel, stream, members, executedProposal } = useAppSelector(state => state.statistic.generalStatistic);
    const { totalPayout } = useAppSelector(state => state.statistic.payoutStatistic);

    useEffect(() => {
        getStatistic();
    }, []);

    return (
        <>
            <Row gutter={16}>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={statisticCard}>
                        <Statistic title="DAOs" value={dao} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={statisticCard}>
                        <Statistic title="Proposals" value={proposal} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={statisticCard}>
                        <Statistic title="Channel" value={channel} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={statisticCard}>
                        <Statistic title="Stream" value={stream} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={24} style={{ marginTop: 24 }}>
                <Col xs={24} lg={6}>
                    <Card style={statisticCardRight}>
                        <Statistic title="Payout" value={(totalPayout && totalPayout[0]) ? totalPayout[0].sum : 0} precision={3} suffix="ETH" />
                    </Card>
                    <Card style={statisticCardRight}>
                        <Statistic title="Funding" value={(totalPayout && totalPayout[1]) ? totalPayout[1].sum : 0} precision={3} suffix="ETH" />
                    </Card>
                    <Card style={statisticCardRight}>
                        <Statistic title="Members" value={members} />
                    </Card>
                    <Card style={statisticCardRight}>
                        <Statistic title="Executed Proposals" value={executedProposal} />
                    </Card>
                </Col>
                <Col xs={24} lg={18}>
                    <PayoutChart />
                </Col>
            </Row>
        </>
    );
}
