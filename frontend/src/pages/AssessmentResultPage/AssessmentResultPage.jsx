import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Layout, Image } from 'antd'
import styled from 'styled-components';
import { Button } from 'antd';
import { Parallax } from 'react-parallax';
import { getResult } from '../../utils/requests';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../../assets/LogoBlue.png';

const TopNavContainer = styled.div`
display: flex;
width: 100%;
height: 200px;
align-items: center;
justify-content: space-around;
`

const ContentContainer = styled.div`
display: flex;
`

const ResultCardContainer = styled.div`
    display: flex;
    /* flex-direction: column; */
    height: 800px;
    width: 1000px;
    background: hsla(0,0%,100%,.95);
    margin-top: 30px;
    margin-bottom: 200px;
    border-radius: 10px;
    border: solid #89c5d1;
`

const ContentContainerRight = styled.div`
    display: flex;
    flex-flow: column wrap;
    margin: auto;
    height: 100%;
    margin-right: 10px;
`

const ContentContainerLeft = styled.div`
    /* background-color: white; */
    height: 600px;
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    margin-right: 50px;
    text-align: center;
`
const ParamContext = styled.span`
    color: #4D7393;
`

const TextContext = styled.p`
    color: #89c5d1;
    line-height: 2;
    margin-left: 5px;
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



const AssessmentResultPage = () => {
    const { id } = useParams();
    const { Content } = Layout
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [preparing, setPreparing] = useState(true);
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const themeColor_light = '#89c5d1';


    useEffect(() => {
        getResult(id).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    setData(data);
                })
            }
        })
    }, []);

    useEffect(() => {
        if (value < 100) {
            addToOneHundred();
        }
    }, [value])

    useEffect(() => {
        if (value >= 100) {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
            setTimeout(() => {
                setPreparing(false);
            }, 600);
        }

    }, [value])

    const addToOneHundred = () => {
        returnArbitraryTime().then(
            res => {
                setValue(prev => prev + res);
            }
        )
    }


    const returnArbitraryTime = () => {
        return new Promise(resolve => setTimeout(() =>
            resolve(Math.floor(Math.random() * (20 - 1)) + 1)
            , Math.random() * (600 - 1) + 1));
    }


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


    const bulletPoints = () => {
        const suggestion = data['suggestion'];
        // return(
        //     Object.keys(data['suggestion']).map((key, index) =>
        //     {   
        //         <div key={index}>dafadsfdk</div>
        //     }
        //     )
        // )
        return (
            Object.keys(data['suggestion']).map((key, index) => {
                return (
                    <div>
                        <div style={{ marginLeft: '20px', marginRight: '20px', color: '#4D7393', fontWeight: '700' }}>{key}</div>
                        <div>
                            {
                                suggestion[key].map((item, index) => {
                                    console.log(item);
                                    return (<div style={{ marginLeft: '20px', marginRight: '20px', color: '#89c5d1' }}>
                                        {item}
                                    </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            })
        )
    }

    const downloadPdf = () => {
        const element = document.getElementById('contentCard');
        const w = element.offsetWidth;
        const h = element.offsetHeight;
        const offsetTop = element.offsetTop;
        const offsetLeft = element.offsetLeft;
        const canvas = document.createElement("canvas");
        let abs = 0;
        const win_i = document.body.clientWidth;
        const win_o = window.innerWidth;
        if (win_o > win_i) {
            abs = (win_o - win_i) / 2;
        }
        canvas.width = w * 2;
        canvas.height = h * 2;

        const context = canvas.getContext('2d');
        context.scale(2, 2);
        context.translate(-offsetLeft - abs, -offsetTop);
        html2canvas(element, {
            allowTaint: true,
            scale: 2
        }).then(canvas => {
            const contentWidth = canvas.width;
            const contentHeight = canvas.height;

            const pageDate = canvas.toDataURL('image/jpeg', 1.0);

            const pdf = new jsPDF('l', 'pt', 'letter');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const widthRatio = pageWidth / canvas.width;
            const heightRatio = pageHeight / canvas.height;
            const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

            const canvasWidth = canvas.width * ratio;
            const canvasHeight = canvas.height * ratio;

            const marginX = (pageWidth - canvasWidth) / 2;
            const marginY = (pageHeight - canvasHeight) / 2;

            pdf.addImage(pageDate, 'JPEG', marginX, marginY, canvasWidth, canvasHeight);

            pdf.save(`G'Tracker_${data['_id']}.pdf`);
        })

    }



    const tempData = {
        "score": "99",
        "co2": "1500",
        "natural_habitat": "500",
        "roughly_size": "20",
        "suggestion": {
            "Location Location Location": [
                "One or more of your offices only have limited access to the public transport system",
                "One or more of your offices are located in a state which has a high percentage of electircity generation from fossil fuels"],
            "Reduce, reuse, recycle": [
                "You may need to consider go forward with LED lighting in your offices",
                "Your data centre may need a passive cooling system in order to reduce the energy consumption"
            ],
            "Go cloud, go greens": [
                "A physical data centre is not the best place to store your data and servers, considering a cloud solution",
                "You may consider to increase the percentage of renewable sources in your electricity bill"
            ],
            "Get certified, get ahead": [
                "You may consider to get certified for your offices with Green Star Rating",
                "You may consider to get certified for your data centre with NABERS"
            ]
        }
    }

    return (
        <>
            <Parallax className='image' blur={0} bgImage={require('../../assets/banner1.jpg')} strength={800} bgImageStyle={{ minHeight: "100vh" }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Navbar>
                    <div className='logo-title'>
                        <Logoimg src={logo} alt="logo" />
                        <div className='title'>G'Tracker </div>
                    </div>
                    <Span>
                        <Atag onClick={() => (navigate('/'))}>Home</Atag>
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
                <ResultCardContainer style={{ justifyContent: loading ? 'center' : '' }}>
                    <div id="contentCard" style={{ justifyContent: 'center', display: 'flex' }}>
                        {(loading) ? (<div style={{ width: '150px', height: '150px', alignSelf: 'center' }}><CircularProgressbar text={value < 100 ? `${value}%` : preparing ? `100%` : `Ready`} value={value} /></div>) :
                            (<ContentContainer>
                                <ContentContainerLeft>
                                    <div style={{ marginLeft: '25px', height: '400px', width: '100%', backgroundColor: `${themeColor_light}` }}>
                                        <Image style={{ height: '400px', width:'100%'}} src={require('../../assets/resultBack_2.jpeg')}></Image>
                                    </div>
                                    <TextContext style={{ marginLeft: '25px', display: 'block', whiteSpace: 'normal', overflowWrap: 'break-word', color: '#89c5d1', fontWeight: '600' }}>
                                        Your organisation's annual carbon footprint is <ParamContext style={{ color: '#4D7393' }}>{data.co2}</ParamContext> Kg of Carbon Dioxide equivalent (tCO<sub>2</sub>e).
                                        To compensate for your emissions, around <ParamContext>{data.natural_habitat}</ParamContext>m<sup>2</sup> of natural habitat must be restored. That is roughly the size of <ParamContext>{data.roughly_size}</ParamContext>  tennis courts.
                                    </TextContext>
                                </ContentContainerLeft>
                                <ContentContainerRight>
                                    <div style={{ height: '100px', width: '100%', display: 'flex', justifyContent: 'end' }}>
                                        <Button style={{ borderRadius: '5px', width: '150px', alignSelf: 'end', marginRight: '10px', marginBottom: '50px', color: '#4D7393', borderColor: '#89c5d1' }} onClick={downloadPdf} data-html2canvas-ignore="true">Save as PDF</Button>
                                    </div>
                                    <h3 style={{ display: 'block', whiteSpace: 'normal', overflowWrap: 'break-word', color: '#4D7393', fontWeight: '600', marginLeft: '20px', fontSize: '32px' }} >Result</h3>
                                    <h1 style={{ marginLeft: '20px', color: '#4D7393' }}>Your Organisation's Scored <ParamContext style={{ fontSize: '30px', color: '#89c5d1' }}>99</ParamContext> in our assessment</h1>
                                    <div>{bulletPoints()}</div>
                                    <div style={{ display: 'flex', height: '100%', width: 'auto', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                        <div style={{ position: 'relative', left: '-80px', alignSelf: 'flex-end', whiteSpace: 'nowrap', color: '#4D7393', fontWeight: '600', marginRight: '5px' }}>By G'Tracker</div>
                                    </div>
                                </ContentContainerRight>
                            </ContentContainer>)}
                    </div>
                    {/* { !!!loading && <div style={{ alignSelf:'flex-end', whiteSpace:'nowrap', color:'#4D7393',fontWeight:'600', marginRight:'5px' }}>By G'Tracker</div>} */}
                </ResultCardContainer>
            </Parallax>
        </>
    )
}

export default AssessmentResultPage