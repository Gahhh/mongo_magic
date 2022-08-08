import React from "react";
import { Layout } from 'antd';
import { Avatar, message, Button, Progress, Table } from 'antd';
import LoadingIcon from "../components/LoadingIcon";
import { rankingRequest } from "../utils/requests";
import '@ant-design/pro-components/dist/components.css';
import { useNavigate } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import noAvatar from '../assets/noAvatar.png'
import es_ES from 'antd/es/locale/es_ES';
const { Content } = Layout;


const Ranking = () => {

  const navigate = useNavigate();
  const [ranking, setRanking] = React.useState(null);
  const [listData, setData] = React.useState(null);
  const getWindowSize = () => ({
    innerWidth: (window.innerWidth <= 1920) ? window.innerWidth : 1920,
  });

  const [windowSize, setWindowSize] = React.useState(getWindowSize());
  const handleResize = () => {
    setWindowSize(getWindowSize());
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  React.useEffect(() => {
    rankingRequest().then(res => {
      if (res.ok) {
        res.json().then(
          data => {
            setRanking(data);
          }
        )
      }
      else {
        res.json().then(
          body => {
            message.error({
              content: body.message,
              duration: 1.2,
              style: {
                marginTop: '20vh',
              }
            });
          }
        )
      }
    })
  }, []);

  React.useEffect(() => {
    if (ranking) {

      const newData = Object.values(ranking);
      const rankIndex = Object.keys(ranking);
      for (let i = 0; i < rankIndex.length; i++) {
        newData[i].date = newData[i].time.split(' ')[0];
        newData[i].rankIndex = rankIndex[i];
        newData[i].energy = newData[i].detail['energy'];
        newData[i].location = newData[i].detail['location'];
        newData[i].transport = newData[i].detail['transport'];
        newData[i].Certification = newData[i].detail['Certification'];
        let company = {
          org: newData[i].org,
          photo: newData[i].photo,
        }
        newData[i].company = company;
      }
      setData(newData);

    }
  }, [ranking])


  const handleClick = () => {
    if (localStorage.getItem('userToken')) {
      navigate('/assessment');
    }
  }
  const columns = [
    {
      title: 'Organisation',
      dataIndex: 'company',
      key: 'Company',
      width: 400,
      render: (data) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}><Avatar src={data.photo ? data.photo : noAvatar} /><div style={{ marginLeft: '5px' }}>{data.org}</div></div>
        )
      },
    },
    {
      title: 'Rank',
      dataIndex: 'rankIndex',
      key: 'rankIndex',
      width: 400,
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'Score',
      width: 300,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 400,
    },
  ];



  return (
    <>

      {(listData) ? (<Content className="hi" style={{
        margin: '5% 10% 0%', borderRadius: 20, width: '80%',
        overflow: "hidden",
      }}>
        <ConfigProvider locale={es_ES}
        >

          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h3 style={{ float: 'left', marginBottom: '0' }}>Ranking List</h3>
              <Button type="primary" style={{ float: 'right' }} onClick={() => handleClick()}>New Assessment</Button>
            </div>
            <Table
              columns={columns}
              pagination={{
                pageSize: 7,
              }}
              size='large'
              rowKey={'org'}
              style={{
                border: '1px',
                borderStyle: 'solid',
                borderRadius: '10px',
                borderColor: 'rgb(240,242,245)',
                padding: '30px',
                backgroundColor: 'white'
              }}
              expandable={{
                expandedRowRender: (record) => (
                  <div style={{ display: 'flex' }}>
                    <div style={{
                      display: "flex",
                      flexDirection: 'column',
                      margin: 'auto'
                    }}>Energy Score:
                      <Progress type="circle" strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }} percent={record.energy} />
                    </div>
                    <div style={{
                      display: "flex",
                      flexDirection: 'column',
                      margin: 'auto'
                    }}>Location Score:
                      <Progress type="circle" strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }} percent={record.location} />
                    </div>
                    <div style={{
                      display: "flex",
                      flexDirection: 'column',
                      margin: 'auto'
                    }}>Transport Score:
                      <Progress type="circle" strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }} percent={record.transport} />
                    </div>
                    <div style={{
                      display: "flex",
                      flexDirection: 'column',
                      margin: 'auto'
                    }}>Certification Score:
                      <Progress type="circle" strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }} percent={record.Certification} />
                    </div>
                  </div>
                ),
                rowExpandable: (record) => record.name !== 'Not Expandable',
              }}
              dataSource={listData}
            />
          </div>
        </ConfigProvider>
      </Content>) : (<Layout style={{ display: 'flex', justifyContent: 'center' }}><LoadingIcon></LoadingIcon></Layout>)}

    </>
  );
}
export default Ranking;