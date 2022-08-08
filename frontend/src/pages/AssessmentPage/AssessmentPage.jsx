import React, { useEffect, useState, createContext, useMemo, useRef } from 'react';
import { Button, Divider, Row, Col, Checkbox, message } from 'antd';
import styled from 'styled-components';
import themeColor from '../../config/theme';
import { getQuestionList, saveQuestion, getSavedQuestion, postAnswers } from '../../utils/requests'
import AssessmentStepBar from '../../components/AssessmentStepBar/AssessmentStepBar';
import QuestionForm from '../../components/QuestionForm/QuestionForm';
import AssessmentModal from '../../components/AssessmentModal/AssessmentModal';
import { CaretRightOutlined, CaretLeftFilled, SaveFilled, ClearOutlined } from '@ant-design/icons';
import LoadingIcon from '../../components/LoadingIcon';
import './AssessmentPage.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/LogoBlue.png';
import { Modal } from 'antd';
import Terms from '../../components/TermsAndConditions/Terms';
import Privacy from '../../components/Privacy/Privacy';
export const SaveButton = createContext();

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    min-width: 100vw;
    min-width: 500px;
    min-height: 100vh;
    overflow: auto;
`
const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    width: 100%;
    height: 120px;
    `

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    width: 100%;
    height: 200px;
    /* background-color: ${themeColor}; */
    justify-content: center;
    align-items: center;
`

const Logoimg = styled.img`
    width: 56px;
    height:56px;
    `

const Span = styled.span`
right: 10%;
top: 1rem;
margin-left: 1rem;
display: flex;
flex-direction: row;
`

const QuestionContainer = styled.div`
    width: 50%;
    min-height: 60vh;
    /* overflow-y: auto; */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`
const StepContainer = styled.div`
    display: flex;
    width: 100%;
`

const Navbar = styled.div`
    font-weight: 600;
    font-size: 30px;
    line-height: 40px;
    letter-spacing: 0.02em;
    color: #4D7393;
    display: flex;
    flex-direction: row;
    width:60%;
    margin: auto;
    padding-top: 1.2rem;
    justify-content: space-between;
`

const Atag = styled.a`
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height */
    text-align: center;
    color: #4D7393;
    margin: 1rem;
`

const AssessmentPage = () => {
    // everything for office
    const [questionListOffice, setQuestionListOffice] = useState(undefined);
    const [questionListDataCenter, setQuestionListDataCenter] = useState(undefined);
    const [officeNumber, setOfficeNumber] = useState(1);
    const [officeList, setOfficeList] = useState([]);
    const [assessmentAnswer, setAssessmentAnswer] = useState({});
    const [collapseNumber, setCollapseNumber] = useState(1);

    const [pageStep, setPageStep] = useState(0);
    const [datacentreNumber, setdatacentreNumber] = useState(1);
    const [datacentreList, setdatacentreList] = useState([]);

    const [officeFinished, setOfficeFinished] = useState(false);
    const [datacentreFinished, setdatacentreFinished] = useState(false);

    const [remover, setRemover] = useState(false);

    const navigate = useNavigate();


    const [termsAgreed, setTermsAgreed] = useState(false);
    //hooks about saving assessment
    const [usingSavedAssessment, setUsingSavedAssessment] = useState(false);
    const [hasSavedAssessment, setHasSavedAssessment] = useState(false);
    const [savedAssessmentContent, setSavedAssessmentContent] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const saveButton = useMemo(() => ({ saving }), [saving]);
    const [removeAnsweredQuestions, setRemoveAnsweredQuestions] = useState(false);

    const shouldAskForSavedUnswer = useRef(true);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isModalVisible2, setIsModalVisible2] = React.useState(false);


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const show = () => {
        setIsModalVisible2(true);
    };

    const Ok = () => {
        setIsModalVisible2(false);
    };

    const Cancel = () => {
        setIsModalVisible2(false);
    };

    useEffect(() => {
        if (usingSavedAssessment) {
            setAssessmentAnswer(savedAssessmentContent);
            // get forms data
            const officeTotal = Object.keys(savedAssessmentContent).filter(item => item.substring(0, 6) === 'office').length > 0 ? Object.keys(savedAssessmentContent).filter(item => item.substring(0, 6) === 'office').length : 1;
            const datacentreTotal = Object.keys(savedAssessmentContent).filter(item => item.substring(0, 9) === 'datacentre').length > 0 ? Object.keys(savedAssessmentContent).filter(item => item.substring(0, 9) === 'datacentre').length : 1;
            const oList = Object.keys(savedAssessmentContent).filter(item => item.substring(0, 6) === 'office').map(item => item.substring(6, item.length));
            const dList = Object.keys(savedAssessmentContent).filter(item => item.substring(0, 4) === 'data').map(item => item.substring(4, item.length));
            if (oList.length > 0) {
                setOfficeList(oList)
                setCollapseNumber(Object.keys(savedAssessmentContent).filter(item => item.substring(0, 6) === 'office').length);
            }
            if (dList.length > 0) {
                setdatacentreList(dList)
            }
            setOfficeNumber(officeTotal);
            setdatacentreNumber(datacentreTotal);
            setLoading(false);
        } else {
            setHasSavedAssessment(false);
            setOfficeList(['1']);
            setdatacentreList(['1']);
            // send abort request here
        }
    }, [usingSavedAssessment]);

    // to test save function
    const [notSaved, setNotSaved] = useState(true);

    useEffect(() => {
        getQuestionList().then(res => {
            if (res.ok) {
                res.json().then(data => {
                    handleQuestionList(data.question_list);
                }
                )
            }
        })
    }, [])

    // This effect only runs once since backend does not save the data after sending once
    useEffect(() => {
        if (shouldAskForSavedUnswer.current) {
            shouldAskForSavedUnswer.current = false;
            setOfficeList(['1']);
            setdatacentreList(['1']);
            getSavedQuestion().then(savedQuestion => savedQuestion.json()
            ).then(savedQuestion => {
                if (savedQuestion.message === 'Does not find data') {
                    setHasSavedAssessment(false);
                    setLoading(false);
                } else {
                    setHasSavedAssessment(true);
                    setSavedAssessmentContent(savedQuestion[Object.keys(savedQuestion)[0]]);
                }
            }
            )
        }
    }, [])


    useEffect(() => {
        let officeUnfinishFlag = false;
        let dataCentreUnfinishFlag = false;
        const eleOffice = Object.keys(assessmentAnswer).filter(ele => ele.substring(0, 6) === 'office');
        const eleData = Object.keys(assessmentAnswer).filter(ele => ele.substring(0, 4) === 'data');
        if (!Object.keys(assessmentAnswer).includes('privacy')) {
            setAssessmentAnswer(prev => ({ ...prev, ['privacy']: false }))
        }
        for (const office of eleOffice) {
            for (const officeAns in assessmentAnswer[`${office}`]) {
                if (assessmentAnswer[`${office}`][officeAns]?.length === 0) {
                    officeUnfinishFlag = true;
                }
            }
        }
        for (const data of eleData) {
            for (const dataAns in assessmentAnswer[`${data}`]) {
                if (assessmentAnswer[`${data}`][dataAns]?.length === 0) {
                    dataCentreUnfinishFlag = true;
                }
            }
        }
        if (assessmentAnswer[`office${officeList.length}`] && officeUnfinishFlag === false) {
            setOfficeFinished(true);
        } else {
            setOfficeFinished(false);
        }
        if (assessmentAnswer[`data`] && dataCentreUnfinishFlag === false) {
            setdatacentreFinished(true);
        } else {
            setdatacentreFinished(false);
        }
    }, [assessmentAnswer, setAssessmentAnswer, datacentreList.length, officeList.length]);


    useEffect(() => {
        if (remover) {
            setRemover(false)
            removeLastUnit();
        }
    }, [remover])


    const unitAdder = () => {
        switch (pageStep) {
            case 1:
                setdatacentreList(prev => ([...prev, `${datacentreNumber + 1}`]));
                setdatacentreNumber(datacentreNumber + 1);
                break;
            default:
                if (officeList.length < 10) {
                    setOfficeList(prev => ([...prev, `${officeNumber + 1}`]));
                    setOfficeNumber(officeNumber + 1);
                    setCollapseNumber(collapseNumber + 1);
                } else {
                    message.error('You can only have 10 offices, contact us if you need more');
                }
                break;
        }
    }

    const removeLastUnit = () => {
        switch (pageStep) {
            case 1:
                setdatacentreNumber(datacentreNumber - 1);
                if (datacentreList.length > 1) {
                    setdatacentreList(prev => prev.slice(0, datacentreList.length - 1));
                    setdatacentreNumber(datacentreNumber - 1);
                    setAssessmentAnswer(prev => {
                        const newAnswer = { ...prev };
                        delete newAnswer[`dataCentre${datacentreList.length}`];
                        return newAnswer;
                    })
                }
                break;
            default:
                setOfficeNumber(officeNumber - 1);
                if (officeList.length > 1) {
                    setOfficeList(prev => prev.slice(0, officeList.length - 1));
                    setOfficeNumber(officeNumber - 1);
                    setAssessmentAnswer(prev => {
                        const newAnswer = { ...prev };
                        delete newAnswer[`office${officeList.length}`];
                        return newAnswer;
                    })
                }
                break;
        }
    }

    const handleQuestionList = (data) => {
        const officeList = [];
        const datacentreList = [];
        let thisDepend = [];
        for (const key in data) {
            if (JSON.stringify(data[key].depend) === '{}') {
                switch (data[key].title) {
                    case '2':
                        datacentreList.push(data[key]);
                        delete (data[key]);
                        break;
                    default:
                        officeList.push(data[key]);
                        delete (data[key]);
                        break;
                }
            }
        }
        while (Object.keys(data).length > 0) {
            for (const oIndex in officeList) {
                thisDepend = [];
                for (const dataIndex in data) {
                    if (data[dataIndex]?.depend.q_id === officeList[oIndex]?._id) {
                        thisDepend.push(data[dataIndex]);
                        delete (data[dataIndex]);
                    }
                }
                officeList.splice(parseInt(oIndex) + 1, 0, ...thisDepend);
            }
            for (const dcIndex in datacentreList) {
                thisDepend = [];
                for (const dataIndex in data) {
                    if (data[dataIndex]?.depend.q_id === datacentreList[dcIndex]?._id) {
                        thisDepend.push(data[dataIndex]);
                        delete (data[dataIndex]);
                    }
                }
                datacentreList.splice(parseInt(dcIndex) + 1, 0, ...thisDepend);
            }
        }
        setQuestionListOffice(officeList);
        setQuestionListDataCenter(datacentreList);
    }


    const timeOut = (ms) => {
        setTimeout(() => {
            return true;
        }, ms);
        return true;
    }

    const goNextPage = () => {
        setPageStep(prev => prev + 1);
    }

    const goPrevPage = () => {
        setPageStep(prev => prev - 1);
    }

    const onPrivacyChange = (e) => {
        if (e.target.checked) {
            setAssessmentAnswer(prev => ({
                ...prev, ['privacy']: true
            }))
        } else {
            setAssessmentAnswer(prev => ({
                ...prev, ['privacy']: false
            }))
        }
    }

    const onTermsChange = (e) => {
        if (e.target.checked) {
            setTermsAgreed(true);
        } else {
            setTermsAgreed(false);
        }
    }

    const saveAssessment = () => {
        if (Object.entries(assessmentAnswer).length === 0) {
            message.error('You have no finished form');
            return;
        }
        saveQuestion(assessmentAnswer)
            .then(res => {
                if (res.ok) {
                    message.success('Assessment saved successfully');
                } else {
                    message.error('Error: Server error');
                }
            })
    }

    const onSubmit = () => {
        postAnswers(assessmentAnswer)
            .then(res => {
                if (res.status === 200) {
                    message.success('Assessment submitted successfully');
                    res.json().then(data => {
                        const id = data.result_id;
                        navigate(`/assessment/result/${id}`);
                    })
                } else {
                    message.error('Error: Server error');
                }
            })
    }


    const clearCurrentPage = () => {
        setAssessmentAnswer({});
        setPageStep(0);
        setOfficeList([]);
        setdatacentreList(['1']);
        setRemoveAnsweredQuestions(true);
        setCollapseNumber(1);
        setTimeout(() => {
            setOfficeList(['1']);
            setRemoveAnsweredQuestions(false);
        }, 200);
    }

    const turnToDashboard = () => {
        if (localStorage.getItem('userType') === "1") {
            navigate('/users/dashboard');
        } else if (localStorage.getItem('userType') === "0") {
            navigate('/admin/dashboard');
        }
    }


    return (
        <PageContainer>
            {(!loading) && ((pageStep === 0 && questionListOffice?.length > 0) || (pageStep === 1 && questionListDataCenter?.length > 0) || (pageStep === 2) || (pageStep === 3)) ? (
                <>
                    <NavContainer>
                        <Navbar>
                            <div className='logo-title'>
                                <Logoimg src={logo} alt="logo" />
                                <div className='title'>G'Tracker </div>
                            </div>
                            <Atag onClick={() => (navigate('/'))}>Home</Atag>
                            <Atag onClick={() => turnToDashboard()}>Dashboard</Atag>
                            <Atag onClick={() => (navigate('/help'))}>Help</Atag>
                            <Atag onClick={() => (navigate('/about'))}>About</Atag>
                        </Navbar>
                    </NavContainer>
                    <HeaderContainer>
                        <h3 className='headerContent'>The Assessment of the sustainability score will be done based on the data provided.</h3>
                        <h3 className='headerContent'>G'Tracker will not store or share your data with anyone without your permission.</h3>
                    </HeaderContainer>
                    <StepContainer style={{ marginTop: '20px', width: '50%' }}>
                        <AssessmentStepBar step={pageStep} setStep={setPageStep} officeFinished={officeFinished} datacentreFinished={datacentreFinished} />
                    </StepContainer>
                    <SaveButton.Provider value={saving}>
                        {(pageStep === 0 && questionListOffice?.length > 0) || (pageStep === 1 && questionListDataCenter?.length > 0) || (pageStep === 2) || (pageStep === 3) ?
                            (
                                <QuestionContainer style={{ minHeight: pageStep === 1 ? '30vh' : '' }}>
                                    {
                                        (pageStep === 0) ?
                                            <>{officeList.map((office) =>
                                                <QuestionForm type={'office'} removeAnsweredQuestions={removeAnsweredQuestions} setRemoveAnsweredQuestions={setRemoveAnsweredQuestions} setRemover={setRemover} key={`office${office}`} collapseNumber={collapseNumber} officeList={officeList} number={parseInt(office)} assessmentSetter={setAssessmentAnswer} assessment={assessmentAnswer} qList={questionListOffice}></QuestionForm>
                                            )}</> :
                                            (pageStep === 1) ?
                                                <>
                                                    {datacentreList.map((datacentre) =>
                                                        <QuestionForm type={'datacentre'} key={`Data Centre`} removeAnsweredQuestions={removeAnsweredQuestions} setRemoveAnsweredQuestions={setRemoveAnsweredQuestions} collapseNumber={1} datacentreList={datacentreList} number={parseInt(datacentre)} assessmentSetter={setAssessmentAnswer} assessment={assessmentAnswer} qList={questionListDataCenter}></QuestionForm>
                                                    )}
                                                </> :
                                                (pageStep === 2) ?
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                                        <Row>
                                                            <Col span={32} style={{ marginTop: '30px' }}>
                                                                <Checkbox defaultChecked={assessmentAnswer['privacy']} onChange={(e) => onPrivacyChange(e)}>I agree to share the data of this assessment with other users.</Checkbox>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col span={50}>
                                                                <small style={{ color: 'grey', paddingLeft: '24px' }}>Notice: By selecting this option, your results might be visible to other users. </small>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ marginTop: '30px' }}>
                                                            <Col span={32}>
                                                                <Checkbox defaultChecked={termsAgreed} onChange={(e) => onTermsChange(e)} style={{paddingRight:'8px'}}></Checkbox>
                                                                    I agree to the <a onClick={showModal}>Terms & Conditions</a> and the <a onClick={show}>Privacy Policy</a>.
                                                                <Modal title="Terms & Conditions" style={{width: '60%', height: '80%'}} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                                                    <Terms></Terms>
                                                                </Modal>
                                                                <Modal title="Privacy at G’TRACKER" style={{width: '60%', height: '80%'}} visible={isModalVisible2} onOk={Ok} onCancel={Cancel}>
                                                                    <Privacy></Privacy>
                                                                </Modal>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ marginTop: '30px', alignSelf: 'center' }}>
                                                            <Col span={32}>
                                                                <Button disabled={!!!termsAgreed} onClick={onSubmit}>Submit</Button>
                                                            </Col>
                                                        </Row>
                                                    </div> : <>page4</>
                                    }

                                </QuestionContainer>) : <></>
                        }
                    </SaveButton.Provider>
                    <div style={{ marginBottom: '50px', display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'center' }}>
                        <div style={{ display: 'flex', color: themeColor, textAlign: 'center', width: '50%', justifyContent: 'space-evenly' }}>
                            <div>
                                <SaveFilled style={{ fontSize: '35px' }} onClick={saveAssessment}></SaveFilled>
                                <div>Save for later</div>
                            </div>
                            <div>
                                <ClearOutlined style={{ fontSize: '35px' }} onClick={clearCurrentPage} />
                                <div>Clear all answers</div>
                            </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '20px' }}>
                            {<div onClick={goPrevPage} style={{ visibility: `${pageStep > 0 ? '' : 'hidden'}`, cursor: 'pointer', display: 'flex', textAlign: 'center', alignItems: 'center', order: '0', fontSize: '16px' }}>
                                <CaretLeftFilled style={{ fontSize: '20px' }}></CaretLeftFilled> Prev
                            </div>}
                            <div style={{ display: 'flex', order: '1', width: '80%', justifyContent: 'center' }}>
                                {pageStep < 1 && <Button style={{ marginRight: '10px' }} onClick={unitAdder}>Add Another Office</Button>}
                                {/* {<Button disabled={pageStep===0 ? officeList.length=== 1 : datacentreList.length === 1} style={{ alignItems: 'flex-start', order:'2' }} onClick={removeLastUnit}>{pageStep === 0 ? <>Remove Last Office</> : <>Remove Last Data Center</>}</Button>} */}
                            </div>
                            <div onClick={pageStep === 0 ? officeFinished ? goNextPage : null : pageStep === 1 ? datacentreFinished ? goNextPage : null : null} style={{
                                opacity: `${pageStep === 0 ? officeFinished ? '1' : '0.2' : datacentreFinished ? '1' : '0.2'}`,
                                order: '2', fontSize: '16px', cursor: `${pageStep === 0 ? officeFinished ? 'pointer' : 'not-allowed' : pageStep === 1 ? datacentreFinished ? 'pointer' : 'not-allowed' : ''}`, zIndex: '500'
                            }}>
                                {pageStep < 2 && `Next`} {pageStep < 2 &&<CaretRightOutlined></CaretRightOutlined>}
                            </div>
                        </div>
                        {
                            pageStep === 0 ? (
                                <Divider plain>{officeFinished ? `All Answered, Add More or Go Ahead` : `Please Finish All Questions`}</Divider>
                            ) : (
                                pageStep === 1 ? (
                                    <Divider plain>{datacentreFinished ? `All Answered, Go Ahead` : `Please Finish All Questions`}</Divider>
                                ) : (
                                    <></>
                                )
                            )
                        }
                    </div>
                </>) : <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', flexDirection: 'column' }}>
                <LoadingIcon />
                {hasSavedAssessment ?
                    (<div style={{ minWidth: '300px' }}>
                        <AssessmentModal cancel setLoading={setLoading} assessmentSetter={setAssessmentAnswer} hasSavedAssessment={hasSavedAssessment} usingSavedSetter={setUsingSavedAssessment}>
                        </AssessmentModal>
                    </div>) : <></>
                }
            </div>}
        </PageContainer>
    )
}
export default AssessmentPage;