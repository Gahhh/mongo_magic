import React, { useEffect, useState, createContext, useMemo, useContext, useRef } from 'react';
import { Button, Divider, Row, Col, Checkbox, message } from 'antd';
import styled from 'styled-components';
import themeColor from '../../config/theme';
import { getQuestionList, saveQuestion, getSavedQuestion, postAnswers } from '../../utils/requests'
import AssessmentStepBar from '../../components/AssessmentStepBar/AssessmentStepBar';
import QuestionForm from '../../components/QuestionForm/QuestionForm';
import AssessmentModal from '../../components/AssessmentModal/AssessmentModal';
import { CaretRightOutlined, CaretLeftFilled } from '@ant-design/icons';
import LoadingIcon from '../../components/LoadingIcon';
import './AssessmentPage.css';
import { useNavigate } from 'react-router-dom';

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
    const [datacentreCollapseNumber, setdatacentreCollapseNumber] = useState(1);
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

    const shouldAskForSavedUnswer = useRef(true);

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
                setdatacentreCollapseNumber(Object.keys(savedAssessmentContent).filter(item => item.substring(0, 4) === 'data').length);
            }
            setOfficeNumber(officeTotal);
            setdatacentreNumber(datacentreTotal);
            // setCollapseNumber(Object.keys(savedAssessmentContent).filter(item => item.substring(0, 6) === 'office').length);
            // setdatacentreCollapseNumber(Object.keys(savedAssessmentContent).filter(item => item.substring(0, 4) === 'data').length);
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
                    // setHasSavedAssessment(false);
                    // setOfficeList(['1']);
                    // setdatacentreList(['1']);
                    // setLoading(false);
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
                setdatacentreCollapseNumber(datacentreCollapseNumber + 1);
                setdatacentreNumber(datacentreNumber + 1);
                break;
            default:
                setOfficeList(prev => ([...prev, `${officeNumber + 1}`]));
                setCollapseNumber(collapseNumber + 1);
                setOfficeNumber(officeNumber + 1);
                break;
        }
    }

    const removeLastUnit = () => {
        switch (pageStep) {
            case 1:
                setdatacentreNumber(datacentreNumber - 1);
                setdatacentreCollapseNumber(datacentreCollapseNumber - 1);
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
                setCollapseNumber(collapseNumber - 1);
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
        console.log(data);
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
        console.log(officeList, datacentreList);
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

    const savePage = () => {
        setSaving(true);
        console.log(assessmentAnswer);
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
                    console.log(res);
                }
            })
    }

    const onSubmit = () => {
        postAnswers(assessmentAnswer)
        .then(res => {
            if(res.status === 200){
                message.success('Assessment submitted successfully');
                res.json().then(data => {
                    console.log(data);
                    const id = data.result_id;
                    navigate(`/assessment/result/${id}`);
                })
            } else {
                message.error('Error: Server error');
            }
        })
    }

    const answerAllShits = () => {
        setPageStep(2);
        setOfficeList(['1','2']);
        setdatacentreList(['1']);
        setAssessmentAnswer({
            "office1": {
                "62d7eb8720b23a61a4656ec2": "3211",
                "62d7ecc120b23a61a4656ec3": "T",
                "62dbbf7fe82cdd10987ecd1e": [
                    "Lightrail"
                ],
                "62dbbba0e82cdd10987ecd15": "123",
                "62dbbb56e82cdd10987ecd14": "123",
                "62dbbc12e82cdd10987ecd16": "F",
                "62dbbd34e82cdd10987ecd19": "T",
                "62dbbd0ae82cdd10987ecd18": "T",
                "62dbbd6ee82cdd10987ecd1a": "123",
                "62dbbe4ee82cdd10987ecd1b": "14",
                "62dbbe8be82cdd10987ecd1c": "F",
                "62dbbe9ae82cdd10987ecd1d": "F"
            },
            "office2": {
                "62d7eb8720b23a61a4656ec2": "3111",
                "62d7ecc120b23a61a4656ec3": "F",
                "62dbbb56e82cdd10987ecd14": "123",
                "62dbbba0e82cdd10987ecd15": "123",
                "62dbbc12e82cdd10987ecd16": "T",
                "62dbbc98e82cdd10987ecd17": "4 Stars",
                "62dbbd6ee82cdd10987ecd1a": "321",
                "62dbbe4ee82cdd10987ecd1b": "18",
                "62dbbe8be82cdd10987ecd1c": "F",
                "62dbbe9ae82cdd10987ecd1d": "F"
            },
            "data": {
                "62dff0a2dd0aaca7f9e83a86": "F",
                "62e8f46032a02279ec5058d6": "F"
            }
        })
    }

    console.log(assessmentAnswer);

    return (
        <PageContainer>
            {(!loading) && ((pageStep === 0 && questionListOffice?.length > 0) || (pageStep === 1 && questionListDataCenter?.length > 0) || (pageStep === 2) || (pageStep === 3)) ? (
                <><NavContainer>
                    <Button onClick={saveAssessment}>Save Questions</Button>
                    <Button onClick={answerAllShits}>一键答题</Button>
                    <h1>Navbar</h1>
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
                                                <QuestionForm type={'office'} setRemover={setRemover} key={`office${office}`} collapseNumber={collapseNumber} officeList={officeList} number={parseInt(office)} assessmentSetter={setAssessmentAnswer} assessment={assessmentAnswer} qList={questionListOffice}></QuestionForm>
                                            )}</> :
                                            (pageStep === 1) ?
                                                <>
                                                    {datacentreList.map((datacentre) =>
                                                        <QuestionForm type={'datacentre'} key={`Data Centre`} collapseNumber={datacentreCollapseNumber} datacentreList={datacentreList} number={parseInt(datacentre)} assessmentSetter={setAssessmentAnswer} assessment={assessmentAnswer} qList={questionListDataCenter}></QuestionForm>
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
                                                                <Checkbox defaultChecked={termsAgreed} onChange={(e) => onTermsChange(e)}>I agree to the <a>Terms & Conditions</a> and the <a>Privacy Policy</a>.</Checkbox>
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
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                                Next<CaretRightOutlined></CaretRightOutlined>
                            </div>
                            {/* <Button onClick={() => savePage()}>save</Button> */}
                        </div>
                        {
                            pageStep === 0 ? (
                                <Divider plain>{officeFinished ? `All Answered, Add More or Go Ahead` : `Please Finish All Questions`}</Divider>
                            ) : (
                                pageStep === 1 ? (
                                    <Divider plain>{datacentreFinished ? `All Answered, Add More or Go Ahead` : `Please Finish All Questions`}</Divider>
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