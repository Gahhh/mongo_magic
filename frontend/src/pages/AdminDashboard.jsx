import { React } from "react";
import { Layout } from 'antd';
import '../App.css';
import { useContext } from 'react';
import { ProfileContext } from "../App";
import { LikeOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';
const { Content } = Layout;

const AdminDashboard = (props) => {
  const profile = useContext(ProfileContext);
  // console.log((profile?.providerProfile?.profile?.email == undefined));

  return (
    <>
      <Content style={{ minWidth:'500px',display:'flex', alignItems:'center', justifyContent:'center' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
        </Col>
        <Col span={12}>
          <Statistic title="Unmerged" value={93} suffix="/ 100" />
        </Col>
      </Row>
      </Content>
    </>
  );

}
export default AdminDashboard;