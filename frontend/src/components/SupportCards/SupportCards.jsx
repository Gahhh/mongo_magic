import React, { useState, useEffect } from 'react';
import {Layout, message} from 'antd';
import { Avatar, Card } from 'antd';
import { getSupportQuestions, solveSupportQuestion } from '../../utils/requests';
import { CardsContainer, CardContainer } from './SupportCardsCSS';
import { Input } from 'antd';
import sendSolveEMail from '../../utils/sendSolveEmail';

const { TextArea } = Input;
const { Meta } = Card;

const SupportCards = () => {
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState('');

  const get_support = async () => {
    await getSupportQuestions().then(
      res => {
        // console.log(res);
        if (res.ok) {
          res.json().then(body => {
            setQuestions(body.question_list)
          })
        } else {
          message.error('Oops! Something went wrong')
        }
      }
    )
  }
  useEffect(() => {
    get_support();
  },[questions])
  // console.log(typeof questions)
  const solveQuestion = async (body, email) => {
    await solveSupportQuestion(body).then(
      res => {
        if (res.ok) {
          // message.success('Success!')
          sendSolveEMail(email, answer).then(
            res => {
              message.success('Success!')
              console.log(res)
            }
          )
        } else {
          message.error('Oops! Something went wrong')
        }
      }
    )
  }

  const cancelQuestion = async (body) => {
    await solveSupportQuestion(body).then(
      res => {
        if (res.ok) {
          message.success('Success!')
        } else {
          message.error('Oops! Something went wrong')
        }
      }
    )
  }

  return(
    <CardsContainer>
      {
        questions?.map((question) => {
          // console.log(question)
          const email = question.email.email;
          const body = {
            question_id: question._id
          }
          // console.log(answer)
          return(
            <CardContainer>
              <Card
                style={{
                  width: '100%',
                  height: '100%'
                }}
                actions={[
                  <div onClick={() => solveQuestion(body, email)}>Solve</div>,
                  <div onClick={() => cancelQuestion(body)}>Cancel</div>
                ]}
              >
                <Meta
                  style={{display: "flex", justifyContent: 'space-around'}}
                  // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={question.question.content}
                  description={ <TextArea style={{width: 400, height: 300}} placeholder="Answer the question"  onChange={e => {setAnswer(e.target.value)}}/>}
                />
              </Card>
            </CardContainer>
          )
        })
      }
    </CardsContainer>
  )
}

export default SupportCards;