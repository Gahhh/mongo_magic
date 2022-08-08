import React, { useState, useEffect } from "react"

import { styles } from "../styles"

import { LoadingOutlined } from '@ant-design/icons'

import Avatar from '../Avatar'

import sendMail from "../../../utils/sendMail"

import { Button, message, Input } from 'antd'

import { sendSupportQuestion } from "../../../utils/requests"

const EmailForm = props => {    
    const [email, setEmail] = useState(props.prof?.email)
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    useEffect(() => {
        setEmail(props.prof?.email)
    } , [props.prof])

    return (
        <div 
            style={{
                ...styles.emailFormWindow,
                ...{ 
                    height: props.visible ? '100%' : '0px',
                    opacity: props.visible ? '1' : '0',
                }
            }}
        >
            <div style={{ height: '0px' }}>
                <div style={styles.stripe} />
            </div>

            <div 
                className='transition-5'
                style={{
                    ...styles.loadingDiv,
                    ...{ 
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '0.33' : '0',
                    }
                }}
            />
            <LoadingOutlined
                className='transition-5'
                style={{
                    ...styles.loadingIcon,
                    ...{ 
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '1' : '0',
                        fontSize: '82px',
                        top: 'calc(50% - 41px)', 
                        left: 'calc(50% - 41px)',  
                    }
                }}
            />

            <div style={{ position: 'absolute', height: '100%', width: '100%', textAlign: 'center' }}>
                <Avatar 
                    style={{ 
                        position: 'relative',
                        left: 'calc(50% - 44px)',
                        top: '10%',
                    }}
                />

                <div style={styles.topText}>
                    Welcome to the <br /> support team 👋
                </div>

                <form 
                    // onSubmit={e => handleSubmit(e)}
                    style={{ position: 'relative', width: '100%', top: '19.75%' }}
                >
                    <input 
                        placeholder='Your Email'
                        defaultValue={props.prof?.email}
                        onChange={e => setEmail(e.target.value)}
                        style={styles.emailInput}
                    />
                    <Input.TextArea 
                        rows={3}
                        placeholder='Your Message'
                        onChange={e => setContent(e.target.value)}
                        style={{...styles.emailInput, marginTop:'30px', height:'100px'}}
                    />
                    <br/>
                    <div style={{ display:'flex', flexDirection:'column', paddingTop:'5px' }}>
                    <small>If you didn't receive our response, check your spam & trash folder</small>
                    </div>
                    <Button onClick={() => {
                        props.setVisible(false);
                        if (content.length < 0){
                            {
                            message.error('Please enter a message')
                        }
                            return;
                        }
                        sendSupportQuestion({'email':{email}, 'question':{content}}).then(
                            res => {
                                if (res.ok){
                                    message.success('Message sent! Will get back to you soon')
                                    setSent(true)
                                }   else {
                                    message.error('Oops! Something went wrong')
                                }
                            }
                        )
                        sendMail(email, content).then(res => {
                    })}} style={{ marginTop:'5px', borderColor:'#4D7393', borderRadius:'12px'}}>
                        Send
                    </Button>
                    <br></br>
                </form>
                
                
            </div>
        </div>
    )
}

export default EmailForm;