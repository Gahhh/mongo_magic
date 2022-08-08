import React from 'react';
import { Input, Spin } from 'antd';
import { isAustralianPostCode } from '../../utils/functions';
import { LoadingOutlined } from '@ant-design/icons';
import { australianPostCode } from '../../utils/requests';
import { QuestionContext } from '../QuestionForm/QuestionForm';
import './QuestionStyle.css';

const PostCodeInput = (props) => {
    const [isValid, setIsValid] = React.useState(false);
    const [value, setValue] = React.useState('');
    const [location, setLocation] = React.useState(null);
    const [connectionError, setConnectionError] = React.useState(false);
    const ans = React.useContext(QuestionContext);
    const inputRef = React.useRef();


    const inputOnchange = (e) => {
        setIsValid(isAustralianPostCode(e));
        setValue(e);
        if (isAustralianPostCode(e)) {
            australianPostCode(e).then(res => {
                if (res?.ok) {
                    res.json().then(
                        data => {
                            if (data?.postalCodes[0]?.adminName1) {
                                setLocation({
                                    state: data.postalCodes[0].adminName1
                                })
                                ans.setAnswer(prev => ({ ...prev, [props.qId]: e }));
                            } else {
                                setLocation(void 0);
                                setIsValid(false);
                            }
                        }
                    )
                } else {
                    setIsValid(false);
                    setConnectionError(true);
                    setTimeout(() => {
                        setConnectionError(false);
                    },2000);
                }
            });
        } else {
            setLocation(null);
            const deleteAnswer = { ...ans.answer };
            delete deleteAnswer[props.qId];
            ans.setAnswer(deleteAnswer);
        }
    }

    const inputStatus = () => {
        if (!isValid && value.toString().length === 4) {
            return 'error';
        }
        return '';
    }

    return (
            <div style={{ width: '100%', order: '0', display:'flex', flexDirection: 'column'}}>
                <div style={{display:'flex'}}>{props.content}</div>
                <div style={{ display: 'inline-flex', flexDirection: 'row', marginTop:'10px' }}>
                    <Input ref={inputRef} id='postCodeInput' maxLength={4} defaultValue={props.value?.length > 0 ? props.value : null} status={inputStatus()} onChange={(e) => inputOnchange(e.target.value)} style={{ display:'inline-flex', width: '100px', height: '25px', marginRight: '10px'}}></Input>
                    <div>{(!location) && isValid && (!connectionError) && <Spin style={{ display:'flex' }} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
                    {(location) && `${location.state}`}
                    {(location === void 0) && <>Location not found, Check your PostCode </>}
                    {(connectionError) && <> Connection Error, try again </>}</div>
                </div>
            </div>
    )
}

export default PostCodeInput;
