import React, { useState } from "react";
import styled from "styled-components";
import { Layout, message, Table, Progress, Button } from 'antd';
import themeColor from "../config/theme";
import { resultListRequest } from "../utils/requests";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../components/LoadingIcon";

const { Content } = Layout;

const ResultsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-style: normal;
`

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [newdata, setData] = useState(null);
  React.useEffect(() => {
    resultListRequest().then(res => {
      if (res.ok) {
        res.json().then(
          data => {
            if(data.length === 0){
              setResults("empty");
            } else {
              setResults(data);
            }
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
                marginLeft: '15rem'
              }
            });
          }
        )
      }
    })
  }, []);
  const handleClick = (id) => {
    if (localStorage.getItem('userToken')) {
      navigate(`/assessment/result/${id}`);
    }
  }

  const Newtest = () => {
    if (localStorage.getItem('userToken')) {
      navigate(`/assessment/`);
    }
  }

  React.useEffect(() => {
    if (results && results !== 'empty') {
      for (let i = 0; i < results.length; i++) {
        results[i]['certification/measures'] = (results[i]['certification/measures'] * 100 <= 100) ? parseInt(results[i]['certification/measures'] * 100) : 100;
        results[i]['energy'] = (results[i]['energy'] * 100 <= 100) ? parseInt(results[i]['energy'] * 100) : 100;
        results[i]['location'] = (results[i]['location'] * 100 <= 100) ? parseInt(results[i]['location'] * 100) : 100;
        results[i]['public_transport'] = (results[i]['public_transport'] * 100 <= 100) ? parseInt(results[i]['public_transport'] * 100) : 100;
        results[i]['test_time'] = results[i]['test_time'].split(' ')[0];
      }
      results.reverse();
      setData(results);
    } else if(results === 'empty'){
      setData('empty')
    }
  }, [results])

  const columns = [
    {
      title: 'Organisation',
      dataIndex: 'org',
      key: 'Company',
      width: 400,
    },
    {
      title: 'Score',
      dataIndex: 'raw_score',
      key: 'Score',
      width: 300,
    },
    {
      title: 'Date',
      dataIndex: 'test_time',
      key: 'test_time',
      width: 400,
    },
    {
      title: 'Action',
      dataIndex: 'test_id',
      key: 'x',
      width: 300,
      render: (data) => <Button type="default" onClick={() => handleClick(data)}>Get report</Button>,
    },
  ];

  if (newdata) {
    return (
      <>
        {newdata !== 'empty' ?
          (<Content style={{
            margin: '6% 8% 3%', borderRadius: 20, width: '80%', padding: '20px'
          }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h3 style={{ float: 'left', marginBottom: '0' }}>Assessment Results List</h3>
                <Button type="primary" style={{ float: 'right' }} onClick={() => Newtest()}>New Assessment</Button>
              </div>


              <Table
                columns={columns}
                pagination={{
                  pageSize: 7,
                }}
                size='large'
                rowKey={'test_id'}
                style={{
                  border: '1px',
                  borderStyle: 'solid',
                  borderRadius: '10px',
                  borderColor: 'rgb(240,242,245)',
                  padding: '5px'
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
                        }} percent={record['public_transport']} />
                      </div>
                      <div style={{
                        display: "flex",
                        flexDirection: 'column',
                        margin: 'auto'
                      }}>Certification Score:
                        <Progress type="circle" strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }} percent={record['certification/measures']} />
                      </div>
                    </div>
                  ),
                  rowExpandable: (record) => record.name !== 'Not Expandable',
                }}
                dataSource={newdata}
              /></div> </Content>
          ) : (<Content style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <ResultsContainer>
              {results ?
                  (   <span style={{ fontSize:'20px' }}>
                              No Result,
                          <a href='/assessment' style= {{ color:`${themeColor}` }}> Get Tested Now >></a>
                      </span>
                  )
                  :
                  (<h1>Result Content</h1>)}
          </ResultsContainer>
      </Content>)}
      </>
    );
  } else {
    return(
      <Layout style={{ display: 'flex', justifyContent: 'center' }}><LoadingIcon></LoadingIcon></Layout>
    )
  }

}

export default Results;