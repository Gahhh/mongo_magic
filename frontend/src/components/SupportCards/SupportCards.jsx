import React, { useState, useEffect } from "react";
import {Layout, message} from 'antd';
import { Avatar, Card } from 'antd';
import { getSupportQuestions } from '../../utils/requests';
import { CardsContainer, CardContainer } from './SupportCardsCSS';
import { Input } from 'antd';

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
  },[questions.length])
  // console.log(typeof questions)

  return(
    <CardsContainer>
      {
        questions?.map((question) => {
          // console.log(question)
          const email = question.email.email;
          console.log(answer)
          return(
            <CardContainer>
              <Card
                style={{
                  width: '100%',
                  height: '100%'
                }}
                actions={[
                  <div>Solve</div>,
                  <div>Cancel</div>
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
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