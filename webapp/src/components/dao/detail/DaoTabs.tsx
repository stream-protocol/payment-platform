import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { Members } from './Members';
import { Proposals } from './Proposals';
import { TreasuryInfo } from './TreasuryInfo';

export const DaoTabs = () => {
    const tabPaneList: TabsProps['tabPaneList'] = [
        {
            key: '1',
            tab: `Proposals`,
            content:  <Proposals />,
        },
        {
            key: '3',
            tab: `Treasury Details`,
            content: <TreasuryInfo />,
        },
        {
            key: '4',
            tab: `Members`,
            content: <Members />,
        },
    ];

    return (
        <Tabs defaultActiveKey="1" tabPaneList={tabPaneList} onChange={() => { }} />
    );
}
