import React from "react";
import { Layout } from 'antd';
import '../App.css';
import { Card, Progress, Statistic } from 'antd';
import { getStatsData } from "../utils/requests";
import LoadingIcon from "../components/LoadingIcon";

const { Content } = Layout;

const AdminDashboard = (props) => {
  const [stats, setStats] = React.useState({});

  const getStats = async () => {
    await getStatsData().then(res => {
      if (res.ok) {
        res.json().then(
          data => {
            setStats(data);
          }
        )
      }
    })
  }
  React.useEffect(() => {
    getStats();
  } , []);

  return (
    <>
      <Content >
        {JSON.stringify(stats) === '{}' ? <div style={{height:'100%', display:'flex', justifyContent:'center', alignItems:'center' }}><LoadingIcon/></div> :
        (<div className="admin-dashboard-total-card">
          <div>
            <Card
              title="Total Users Registered"
              bordered={false}
              style={{ marginBottom: '10px' }}
            >
            <Statistic value={stats.user_total} />
            </Card>
            <Card
              title="Total Assessments Taken"
              bordered={false}
              style={{ marginBottom: '10px' }}
            >
            <Statistic value={stats.result_total} />
            </Card>
            <Card
              title="Average Score"
              bordered={false}
              style={{ marginBottom: '10px' }}
            >
            <Statistic value={stats.avg_score} />
            </Card>
          </div>
          <Card
              title="Detailed Average Performance"
              bordered={false}
            >
          <div className="admin-dashboard-circle-group">
            <div className="admin-dashboard-circle">
                <div className="admin-dashboard-circle-text">Energy</div>
                <Progress
                  type="circle"
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  percent={stats.avg_energy} />
              </div>
              <div className="admin-dashboard-circle">
                <div className="admin-dashboard-circle-text">Location</div>
                <Progress
                  type="circle"
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  percent={stats.avg_location} />
              </div>
              <div className="admin-dashboard-circle">
                <div className="admin-dashboard-circle-text">Public Transport</div>
                <Progress
                  type="circle"
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  percent={stats.avg_pt} />
              </div>
              <div className="admin-dashboard-circle">
                <div className="admin-dashboard-circle-text">Certification</div>
                <Progress
                  type="circle"
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  percent={stats.avg_ct} />
              </div>
            </div>
            </Card>
        </div>)}
      </Content>
    </>
  )

}
export default AdminDashboard;