import React, { useState, useEffect } from 'react';
import { message} from 'antd';
import { Card } from 'antd';
import { getSupportQuestions, solveSupportQuestion } from '../../utils/requests';
import { CardsContainer, CardContainer } from './SupportCardsCSS';
import { Input } from 'antd';
import sendSolveEMail from '../../utils/sendSolveEmail';
import LoaidngIcon from '../LoadingIcon'

const { TextArea } = Input;
const { Meta } = Card;

const SupportCards = (props) => {
  const [questions, setQuestions] = useState(null);
  const [answer, setAnswer] = useState('');

  const get_support = async () => {
    await getSupportQuestions().then(
      res => {
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
  },[])

  const solveQuestion = async (body, email) => {
    await solveSupportQuestion(body).then(
      res => {
        if (res.ok) {
          // message.success('Success!')
          sendSolveEMail(email, answer).then(
            res => {
              message.success('Success!')
              get_support();
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
          get_support();
        } else {
          message.error('Oops! Something went wrong')
        }
      }
    )
  }
  
  return(
    questions === null ? <LoaidngIcon/> :
    <CardsContainer>
      {
        questions?.map((question) => {
          const email = question.email.email;
          const body = {
            question_id: question._id
          }
          return(
            <CardContainer key={`container${question._id}}`}>
              <Card
                key={`card${question._id}`}
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
                  key={`meta${question._id}`}
                  style={{display: "flex", justifyContent: 'space-around'}}
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