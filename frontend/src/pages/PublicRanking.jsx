import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Avatar, Table } from 'antd'
import styled from 'styled-components';
import { Button, message, Progress } from 'antd';
import { rankingRequest } from "../utils/requests";
import noAvatar from '../assets/noAvatar.png'
import LoadingIcon from "../components/LoadingIcon";
import logo from '../assets/LogoBlue.png';




const Navbar = styled.div`
    font-weight: 600;
    font-size: 30px;
    line-height: 40px;
    letter-spacing: 0.02em;
    color: #ffffff;
    display: flex;
    flex-direction: row;
    max-width: 1200px;
    margin: auto;
    justify-content: space-between;
    padding-top: 1.2rem;
`

const Logoimg = styled.img`
    width: 56px;
    height:56px;
    `


const Atag = styled.a`
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height */
    text-align: center;
    color: #183B56;
    margin: 1rem;
`

const Span = styled.span`
  right: 10%;
  top: 1rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
`



const PublicRanking = () => {
  const { Content } = Layout
  const navigate = useNavigate();
  const [ranking, setRanking] = React.useState(null);
  const [listData, setData] = React.useState(null);
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

  const turnToLogin = () => {
    navigate('/login');
  }

  const turnToRegister = () => {
    navigate('/signup');
  }

  const handleClick = () => {
    if (localStorage.getItem('userToken')) {
      navigate('/assessment');
    }
    else {
      turnToLogin();
    }
  }

  const turnToDashboard = () => {
    if (localStorage.getItem('userType') === "1") {
      navigate('/users/dashboard');
    } else if (localStorage.getItem('userType') === "0") {
      navigate('/admin/dashboard');
    }
  }

  const logout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  }

  const turnToAbout = () => {
    navigate('/about')
  }

  const turnToHelp = () => {
    navigate('/help')
  }
  const turnToHome = () => {
    navigate('/')
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
    <div  >      <Navbar>
        <div className='logo-title'>
          <Logoimg src={logo} alt="logo" />
          <div className='title'>G'Tracker </div>
        </div>
        <Span>
          <Atag onClick={turnToHome}>Home</Atag>
          <Atag>Ranking</Atag>
          <Atag onClick={turnToHelp}>Help</Atag>
          <Atag onClick={turnToAbout}>About</Atag>
          {
            localStorage.getItem('userToken') ?
              <div style={{ margin: '1rem', lineHeight: '0' }}>
                <Atag onClick={turnToDashboard}>Dashboard</Atag>
                <Atag onClick={logout}>Logout</Atag>
              </div>
              :
              <div style={{ margin: '1rem', lineHeight: '0' }}>
                <Atag onClick={turnToLogin}>Login</Atag>
                <Atag onClick={turnToRegister}>Sign up</Atag>
              </div>
          }
        </Span>
      </Navbar>
      {(listData) ?
        (<Content style={{
          margin: '5% 0% 5%', borderRadius: 20, display:'flex', alignItems:'center', flexDirection:'column',
          overflow: "hidden"
        }}>
<div style={{backgroundColor: 'white', padding:'20px', borderRadius:'10px', width:'80%', maxWidth: '1200px'}}>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'10px'}}>
                <h3 style={{float: 'left', marginBottom: '0'}}>Ranking List</h3>
                <Button type="primary" style={{float: 'right'}} onClick={() => handleClick()}>New Assessment</Button>
              </div>
          <Table
                columns={columns}
                pagination={{
                  pageSize: 7,
                }}
                size='large'
                rowKey={'org'}
                style = {{
                  border:'1px',
                  borderStyle:'solid',
                  borderRadius:'10px',
                  borderColor:'rgb(240,242,245)',
                  padding:'30px',
                  backgroundColor:'white'
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
        </Content>) : (<div className='content'style={{display:'flex', justifyContent:'center', marginTop:'20rem', marginBottom:'2rem'}} >
          <LoadingIcon></LoadingIcon></div>)}
   </div>
  )
}

export default PublicRanking