import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Layout } from 'antd'
import styled from 'styled-components';
import { Button, message, Space, Tag, Progress } from 'antd';
import { Parallax } from 'react-parallax';
import { getResult } from '../utils/requests';
import { CircularProgressbar } from 'react-circular-progressbar';
import { ProList } from '@ant-design/pro-components';
import { rankingRequest } from "../utils/requests";
import LoadingIcon from "../components/LoadingIcon";
import 'react-circular-progressbar/dist/styles.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../assets/LogoBlue.png';


const ResultCardContainer = styled.div`
    display: flex;
    /* flex-direction: column; */
    height: 400px;
    width: 1200px;
    background: hsla(0,0%,100%,.95);
    margin-top: 10%;
    border-radius: 10px;
    border: solid #89c5d1;
`

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
    color: #ffffff;
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
    const [expandedRowKeys, setExpandedRowKeys] = React.useState([]);
    const [listData, setData] = React.useState(null);
    React.useEffect(() => {
      rankingRequest().then(res => {
        if (res.ok) {
          res.json().then(
            data => {
              // setRanking(data);
              // console.log(ranking);
              // console.log(Array.from(data))
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
        console.log(newData)
        console.log(rankIndex)
        for (let i = 0; i < rankIndex.length; i++) {
          let tags = {
            score: newData[i].score,
            rankNo: rankIndex[i],
            times: newData[i].time.split(' ')[0]
          }
          newData[i].tags = tags;
        }
        setData(newData);
  
      }
    }, [ranking])

    const themeColor_light = '#89c5d1';

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
        navigate('/users/dashboard');
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

    return (
        <>
            <Parallax className='image' blur={0} bgImage={require('../assets/banner1.jpg')} strength={800} bgImageStyle={{ minHeight: "100vh" }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Navbar>
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
                            (<Content className="hi" style={{
                              margin: '10% 0% 0%', borderRadius: 20, width: '1200px',
                              overflow: "hidden"
                            }}>
                              <ProList
                                rowKey="title"
                                headerTitle="Ranking List"
                                toolBarRender={() => {
                                  return [
                                    <Button key="3" type="primary" onClick={() => handleClick()}>
                                      New test
                                    </Button>,
                                  ];
                                }}
                                expandable={{ expandedRowKeys, onExpandedRowsChange: setExpandedRowKeys }}
                                dataSource={listData}
                                split='true'
                                pagination={{
                                  pageSize: 8,
                                }}
                                metas={{
                                  title: {
                                    dataIndex: 'org',
                                  },
                                  subTitle: {
                                    dataIndex: 'tags',
                                    render: (tags) => {
                                      return (
                                        <Space size={20}>
                                          <Tag style={{marginLeft:'10rem', marginRight:'7rem'}} color="blue">No. {tags.rankNo}</Tag>
                                          <Tag style={{marginLeft:'5rem', marginRight:'8rem'}}color="#5BD8A6">Score: {tags.score}</Tag>
                                          <Tag style={{marginLeft:'5rem'}}color="#5BD8A6">{tags.times}</Tag>
                                        </Space>
                                      );
                                    },
                                  },
                                  description: {
                                    dataIndex: 'detail',
                                    render: (details) => {
                                      return (
                                        <div style={{ display: 'flex' }}>
                                          <div style={{
                                            width: '200px',
                                            marginRight: '1rem',
                                          }}>Energy Score:
                                            <Progress type="circle" strokeColor={{
                                              '0%': '#108ee9',
                                              '100%': '#87d068',
                                            }} percent={details.energy} />
                                          </div>
                                          <div style={{
                                            width: '200px',
                                            marginRight: '3rem',
                                          }}>Location Score:
                                            <Progress type="circle" strokeColor={{
                                              '0%': '#108ee9',
                                              '100%': '#87d068',
                                            }} percent={details.location} />
                                          </div>
                                          <div style={{
                                            width: '200px',
                                            marginRight: '6rem',
                                          }}>Transport Score:
                                            <Progress type="circle" strokeColor={{
                                              '0%': '#108ee9',
                                              '100%': '#87d068',
                                            }} percent={details.transport} />
                                          </div>
                                          <div style={{
                                            width: '200px',
                                          }}>Certification Score:
                                            <Progress type="circle" strokeColor={{
                                              '0%': '#108ee9',
                                              '100%': '#87d068',
                                            }} percent={details.Certification} />
                                          </div>
                                        </div>
                                      );
                                    },
                                  },
                                  avatar: {
                                    dataIndex: 'photo',
                                  },
                                  content: {
                                  },
                                }}
                              />

                            </Content>) : (<Layout style={{
                              margin: '10% 0% 0%', borderRadius: 20, width: '1200px', height:"200px", display: 'flex', justifyContent: 'center',
                              overflow: "hidden"}}><LoadingIcon></LoadingIcon></Layout>)}
            </Parallax>
        </>
    )
}

export default PublicRanking