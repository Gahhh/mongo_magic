import React from 'react';
import PostCodeInput from './PostCodeInput';
import { Input, Radio, Checkbox, Col, Row, Slider } from 'antd';
import { QuestionContext } from '../QuestionForm/QuestionForm';
import { CheckOutlined } from '@ant-design/icons';

const Question = (props) => {
    const qType = props.question.question_type;
    const mutiable = props.question.mutiable;
    const qContent = props.question.content;
    const qDepend = props.question.depend;
    const qUnit = props.question.unit;
    const ans = React.useContext(QuestionContext);
    const [questionIsShown, setQuestionIsShown] = React.useState(false);

    React.useEffect(() => {
        // if question is dependent, and prerequisite question is not answered, hide question
        if (ans.answer['62ecdea5ad4a6abefd4f5b69'] === '100' && props.type === 'datacentre' && props.index > 2) {
            setQuestionIsShown(false);
            delete ans.answer[props.question._id];
            ans.setQuestionUnfinished(prev => prev.filter(item => item !== props.question._id));
        }   else {
            if (JSON.stringify(qDepend) !== '{}' && (ans.answer[qDepend.q_id] !== qDepend.q_option)) {
                delete ans.answer[props.question._id];
                ans.setQuestionUnfinished(prev => prev.filter(item => item !== props.question._id));
                setQuestionIsShown(false);
            } else {
                setQuestionIsShown(true);
                if (ans.answer[props.question._id] === undefined || ans.answer[props.question._id]?.length === 0) {
                    if (ans.questionUnfinished.indexOf(props.question._id) === -1 || ans.answer[props.question._id]?.length === 0) {
                        ans.setQuestionUnfinished(prev => [...prev, props.question._id]);
                    }
                } else {
                    ans.setQuestionUnfinished(prev => prev.filter(item => item !== props.question._id));
                }
            }
        }
    }, [ans]);

    const unitContext = (props) => {
        switch (qUnit) {
            case 'm2':
                return (<>m<sup>2</sup></>);
            default:
                return (<>{props.question.unit}</>);
        }
    }

    const FinishSign = () => {
        return (
            <div style={{ width: '20px', height: '20px', marginTop: '5px' }}>
                {(ans?.answer[props.question._id]?.length > 0) ? (<CheckOutlined key={props.q_id} style={{ color: 'green', display: 'flex' }}></CheckOutlined>) : (<></>)}
            </div>
        )
    }

    const renderSwitch = () => {
        switch (qType) {
            case '0':
                // yes or no
                return (
                    <div key={props.question._id} className='questionContainer'>
                        {FinishSign()}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {qContent}
                            <Radio.Group style={{ marginTop: '10px' }} onChange={(e) => ans.setAnswer({ ...ans.answer, [props.question._id]: e.target.value })} value={ans.answer[props.question._id]}>
                                <Radio value={'T'} style={{ marginRight: '10px' }}>Yes</Radio>
                                <Radio value={'F'} style={{ marginRight: '10px' }}>No</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                );
            case '1':
                switch (mutiable) {
                    // multi choice
                    case 'true':
                        return (
                            <div key={props.question._id} className='questionContainer'>
                                {FinishSign()}
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {qContent}
                                    <Checkbox.Group defaultValue={ans.answer[props.question._id]} style={{ width: '100% ' }} onChange={onMultiChange}>
                                        <Row>
                                            {multiOption()}
                                        </Row>
                                    </Checkbox.Group>
                                </div>
                            </div>
                        );
                    default:
                        // single choice
                        return (
                            <div key={props.question._id} className='questionContainer' style={{}}>
                                {FinishSign()}
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {qContent}
                                    <Radio.Group style={{ marginTop: '10px' }} onChange={(e) => ans.setAnswer({ ...ans.answer, [props.question._id]: e.target.value })} value={ans.answer[props.question._id]}>
                                        {singleOption()}
                                    </Radio.Group>
                                </div>
                            </div>
                        );
                }
            // regular input
            case '2':
                switch (qUnit) {
                    default:
                        if (props.question._id === '62d7eb8720b23a61a4656ec2' || props.question._id === '62dff13edd0aaca7f9e83a87') {
                            return(
                            <div key={props.question._id} className='questionContainer'>
                                {FinishSign()}
                                <PostCodeInput style={{ order: '0' }} content={qContent} value={ans.answer[props.question._id]} answer={props.answer} setAnswer={props.setAnswer} qId={props.question._id}></PostCodeInput>
                            </div>
                            )
                        }
                        return (
                            <div key={props.question._id} className='questionContainer'>
                                {FinishSign()}
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {qContent}
                                    <div style={{ width: '100% ', order: '1', flexDirection: 'row', marginTop: '10px' }}>
                                        <Input value={ans.answer[props.question._id]} onChange={onInputChange} style={{ width: '100px', height: '25px', marginRight: '10px' }}></Input>
                                        {unitContext(props)}
                                    </div>
                                </div>
                            </div>
                        )
                    case '%':
                        return (
                            <div key={props.question._id} className='questionContainer' >
                                {FinishSign()}
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {qContent}
                                    <div style={{ width: '100% ', order: '1', flexDirection: 'row', marginTop: '10px' }}>
                                        <Slider style={{ marginLeft: '8px' }} defaultValue={ans.answer[props.question._id]} marks={percentSliderMarks} onAfterChange={onSliderAfterChange}></Slider>
                                        <div style={{ textAlign: 'center', height: '20px' }}>
                                            {(ans.answer[props.question._id]) ? (<>{ans.answer[props.question._id]}%</>) : (<>0%</>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    case 'people':
                        return (
                            <div key={props.question._id} className='questionContainer'>
                                {FinishSign()}
                                <div style={{ display: 'flex', flexDirection: 'column' }}>{qContent}
                                    <div style={{ width: '100% ', order: '1', flexDirection: 'row', marginTop: '10px' }}>
                                        <Input value={ans.answer[props.question._id]} onChange={onInputChange} style={{ width: '100px', height: '25px', marginRight: '10px' }}></Input>
                                        {unitContext(props)}
                                    </div>
                                </div>
                            </div>
                        )
                }
        }
    }

    const percentSliderMarks = {
        0: {
            style: {
                color: '#FF0000',
            },
            label: <strong>0%</strong>,
        },
        20: {
            style: {
                color: '#FF3300',
            },
            label: '20%'
        },
        40: {
            style: {
                color: '#ff6600 ',
            },
            label: '40%'
        },
        60: {
            style: {
                color: '#66ff00',
            },
            label: '60%'
        },
        80: {
            style: {
                color: '#33ff00',
            },
            label: '80%'
        },
        100: {
            style: {
                color: 'green',
            },
            label: <strong>100%</strong>,
        }
    }

    const onMultiChange = (e) => {
        ans.setAnswer({ ...ans.answer, [props.question._id]: e });
    }

    const onInputChange = (e) => {
        switch (qUnit) {
            default:
                if (!isNaN(e.target.value)) {
                    ans.setAnswer({ ...ans.answer, [props.question._id]: e.target.value });
                } else {
                    ans.setAnswer({ ...ans.answer, [props.question._id]: '' });
                }
                break;
            case 'people':
                if (!isNaN(e.target.value)) {
                    if (e.target.value !== '') {
                        ans.setAnswer({ ...ans.answer, [props.question._id]: `${parseInt(e.target.value)}` });
                    } else {
                        ans.setAnswer({ ...ans.answer, [props.question._id]: '' });
                    }
                }
        }
    }

    const onSliderAfterChange = (e) => {
        ans.setAnswer(prev => ({ ...prev, [props.question._id]: `${e}` }));
    }

    const multiOption = () => {
        return (
            props.question.option.map((option) =>
                <Col key={option} span={8}>
                    <Checkbox value={option} key={option}>{option}</Checkbox>
                </Col>
            )
        )
    }

    const singleOption = () => {
        return (
            props.question.option.map((option) =>
                <Radio key={option} value={option}>{option}</Radio>
            )
        )
    }
    return (
        <>
            {
                    (
                        questionIsShown && (JSON.stringify(qDepend) === '{}' || ans.answer[qDepend?.q_id] === qDepend?.q_option) && [renderSwitch()]
                    )
            }
        </>
    )
}

export default Question