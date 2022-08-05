import React, { useState, useEffect } from "react";
import {Layout, message} from 'antd';
import { Avatar, Card } from 'antd';
import { getSupportQuestions } from '../../utils/requests';
import { CardsContainer, CardContainer } from './SupportCardsCSS';


const { Meta } = Card;

const SupportCards = () => {
  const [questions, setQuestions] = useState([])

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
          return(
            <CardContainer>
              <Card
                style={{
                  width: 300,
                }}
                actions={[
                  <div>Solve</div>,
                  <div>Cancel</div>
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title='{}'
                  description="This is the description"
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