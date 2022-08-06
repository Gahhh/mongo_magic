import React from "react";
import { Layout } from 'antd';
import { Avatar, List, Space, message, Button, Progress, Tag, Row, Col } from 'antd';
import LoadingIcon from "../components/LoadingIcon";
import { ProList } from '@ant-design/pro-components';
import { rankingRequest } from "../utils/requests";
import '@ant-design/pro-components/dist/components.css';
import { useNavigate } from 'react-router-dom'
import { flexbox } from "@mui/system";

const { Content } = Layout;


const Ranking = () => {

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


  const handleClick = () => {
    if (localStorage.getItem('userToken')) {
      navigate('/assessment');
    }
  }


  return (
    <>
      {/* <Navbar page='Ranking'></Navbar> */}

      {(listData) ? (<Content className="hi" style={{
        margin: '10% 10% 0%', borderRadius: 20, width: '80%',
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
                  // <Content style={{ display: 'flex', }}>
                  <Space size={20}>
                    <Tag style={{marginLeft:'10rem', marginRight:'7rem'}} color="blue">No. {tags.rankNo}</Tag>
                    <Tag style={{marginLeft:'5rem', marginRight:'8rem'}}color="#5BD8A6">Score: {tags.score}</Tag>
                    <Tag style={{marginLeft:'5rem'}}color="#5BD8A6">{tags.times}</Tag>
                  </Space>
                  // <Row style={{width:"800px", marginLeft:'5rem'}}justify="space-around">
                  //   <Col xs={4} sm={4} md={4} lg={8} xl={8}>
                  //     <Tag  color="blue">No. {tags.rankNo}</Tag>
                  //   </Col>
                  //   <Col xs={4} sm={4} md={4} lg={8} xl={8} style={{display:flexbox, justifyContent:"center", alignContent:"center"}}>
                  //   <Tag  color="blue">No. {tags.rankNo}</Tag>
                  //   </Col>
                  //   <Col xs={4} sm={4} md={4} lg={8} xl={8}>
                  //   <Tag  color="blue">No. {tags.rankNo}</Tag>
                  //   </Col>
                  // </Row>
                  // {/* </Content> */}
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
                      // marginLeft: '1rem',
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
              // render: () => (
              //   <div
              //     style={{
              //       minWidth: 200,
              //       flex: 1,
              //       display: 'flex',
              //       justifyContent: 'flex-end',
              //     }}
              //   >
              //     <div
              //       style={{
              //         width: '200px',
              //       }}
              //     >
              //       <div>发布中</div>
              //       <Progress percent={80} />
              //     </div>
              //   </div>
              // ),
            },
          }}
        />
        {/* <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={data}
          footer={
            <div>
              <b>ant design</b> footer part
            </div>
          }
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        /> */}
      </Content>) : (<Layout style={{ display: 'flex', justifyContent: 'center' }}><LoadingIcon></LoadingIcon></Layout>)}

    </>
  );
}
export default Ranking;