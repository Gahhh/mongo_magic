import React, { useContext, useEffect, useState } from "react";
import { Layout, Button } from 'antd';
import { ProfileContext } from '../App';
import LoadingIcon from "../components/LoadingIcon";
import { getUserDiagramData, resultListRequest } from "../utils/requests";
import ReactECharts from 'echarts-for-react';
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const Analytics = () => {
    const prof = useContext(ProfileContext);
    const [dateList, setDateList] = useState([]);
    const [valueList, setValueList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortedResults, setSortedResults] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserDiagramData().then(res => {
            if (res.ok) {
                res.json().then(
                    data => {
                        setValueList(data.result.map(d => d.raw_score).reverse());
                        setDateList(data.result.map(d => (d.test_time.substring(0, d.test_time.indexOf(' ')))).reverse())
                        setLoading(false);
                    }
                )
            }
        })
        resultListRequest().then(res => {
            if (res.ok) {
                res.json().then(
                    data => {
                        const scoreList = data.map(d => [d.raw_score, d.test_time.substring(0, d.test_time.indexOf(' '))]);
                        setSortedResults(scoreList.sort(([a,b],[c,d]) => c-a || d-b));
                    }
                )
            }
        })
        }, []);

        const getOption = () => {
            return {
                maintainAspectRatio:false,
                visualMap:
                {
                    show: false,
                    type: 'continuous',
                    seriesIndex: 0,
                    min: 0,
                    max: 100,
                    inRange: {
                        color: ['#CC1104', '#FB5145', '#DDF197', '#33ff00', '#00FF00',]
                    },
                },
                title: [
                    {
                        left: 'center',
                        text: 'Your Most Recent Assessment Results',
                        textStyle: {
                            color: '#4D7393'
                        }
                    }
                ],
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: [
                    {
                        data: dateList
                    }
                ],
                yAxis:
                {
                    min: 0,
                    max: 100
                },
                series:
                {
                    type: 'line',
                    showSymbol: true,
                    data: valueList
                }
            }
        }

        const goAssessment = () => {
            navigate('/assessment');
        }


        return (
            <>
                {prof.providerProfile.profile && !loading && sortedResults!==null ? (
                    <Content style={{ display: 'flex',  alignItems: 'center', flexDirection:'column', justifyContent:'center' }}>
                        {valueList.length > 0 ? (
                        <>
                            <ReactECharts option={getOption()} style={{ minHeight: '500px', minWidth: '800px', marginTop: '100px' }}></ReactECharts>
                            <h1 style={{ fontSize: '20px', color: '#4D7393', position:'relative', top:'0' }}> Highest Score: {sortedResults[0][0]}, assessed on {sortedResults[0][1]}</h1>
                            <h1 style={{ fontSize: '20px', color: '#4D7393', position:'relative', top:'0' }}> Lowest Score: {sortedResults[sortedResults.length - 1][0]}, assessed on {sortedResults[sortedResults.length - 1][1]}</h1>
                            <h1 style={{ fontSize: '20px', color: '#4D7393', position:'relative', top:'0' }}> Most Recent Score: {valueList[valueList.length-1]}, assessed on {dateList[valueList.length-1]}</h1>
                        </>
                        ) :
                            (<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <h1 style={{ fontSize: '30px', color: '#4D7393' }}>You have not taken any assessment yet!</h1>
                                <Button style={{ backgroundColor: '#7395AE', color: '#FFFDFF', height: '48px', width: '180px', fontSize: '20px' }} onClick={goAssessment}>Get Tested Now</Button>
                            </div>)}
                    </Content>
                ) : (<Layout style={{ display: 'flex', justifyContent: 'center' }}><LoadingIcon></LoadingIcon></Layout>)}
            </>
        )
    }
export default Analytics;