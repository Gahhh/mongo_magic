import React from 'react';
import {useNavigate} from "react-router-dom";
import logo from "../../assets/LogoBlue.png";
import { Logoimg, Navbar, Atag, Span, Title, Contents, HelpContainer, SubTitle, HelpUL } from "./Helpcss";

const Help = () => {
  const navigate = useNavigate();

  const turnToLogin = () => {
    navigate('/login');
  }

  const turnToRegister = () => {
    navigate('/signup');
  }

  const turnToDashboard = () => {
    if (localStorage.getItem('userType') === "1") {
      navigate('/users/dashboard');
    } else if (localStorage.getItem('userType') === "0") {
      navigate('/admin/dashboard');
    }
  }

  const logout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  }

  const turnToAbout = () => {
    navigate('/about')
  }

  const turnToHome = () => {
    navigate('/')
  }
  const turnToRanking = () => {
    navigate('/publicranking')
  }

  return(
    <HelpContainer>
      <Navbar>
        <div className='logo-title'>
          <Logoimg src={logo} alt="logo" />
          <div className='title'>G'Tracker </div>
        </div>
        <Span>
          <Atag onClick={turnToHome}>Home</Atag>
          <Atag onClick={turnToRanking}>Ranking</Atag>
          <Atag>Help</Atag>
          <Atag onClick={turnToAbout}>About</Atag>
          {
            localStorage.getItem('userToken') ?
              <div style={{margin:'1rem', lineHeight:'0'}}>
                <Atag onClick={turnToDashboard}>Dashboard</Atag>
                <Atag onClick={logout}>Logout</Atag>
              </div>
              :
              <div style={{margin:'1rem', lineHeight:'0'}}>
                <Atag onClick={turnToLogin}>Login</Atag>
                <Atag onClick={turnToRegister}>Sign up</Atag>
              </div>
          }
        </Span>
      </Navbar>
      <Title>How we work</Title>
      <Contents>
        <SubTitle>Overall Weights</SubTitle>
        <p>
          Generally, sustainability has three main components: social, environmental and economic. As per the requirements, this model covers all three components in terms of questions. The weights of each question set are as follows:
        </p>
        <HelpUL>
          <li>Location (10%)</li>
          <li>Public Transport (20%)</li>
          <li>Energy (40%)</li>
          <li>Other measures (30%)</li>
        </HelpUL>
        <p>
          Other measures will cover the certification and cloud services. Therefore, the user will be in disadvantage if their office/data centre has not been rated by the NABERS or Green Building Council. Also, if the users do not have any data/calculation services on cloud, they will not been given a high score. For the final result, we will provide the user with a raw score and its position in our database. The maximum raw score is 100, which is made up of the sum of the weights of all the questions.
        </p>
        <SubTitle>Question - Postcode:</SubTitle>
        <p>
          Based on the postcode, we can determine the location of the office/data centre. We used the energy mix data from the federal government to determine the renewable energy mix in the user's area. The baseline we set is the national average of the percentage of gas + renawerable energy mix. Based on the calculation, the score of each state is calculated and listed below: National average: 5, NSW: 5, ACT: 5, VIC: 2, QLD: 5, SA: 8, WA: 6, NT: 7, TAS: 10 which higher is better.
        </p>
        <SubTitle>Question - Public Transport:</SubTitle>
        <p>
          We will give 1 point for each public transport option in the user's area. Based on the article below(Kennedy et al., 2002), the CO2 emission of an private car (7L/100km) is between 47g/person-km. But for metro train, the emission is between 7.5-11g/person-km. Based on this, with no public transport option, the user will get a score of 0, and with public transport option, the user will get a maximum score of 20.
        </p>
        <SubTitle>Question - Green star rating:</SubTitle>
        <p>Today, 44 per cent of Australia's CBD office space and 40 per cent of retail space is Green Star certified.(source: Green Star 2019/20).</p>
        <p>
          Therefore, we will heavily reward the user if the user's office building is Green Star certified.
        </p>
        <p>
          As there are only 12 buildings in Australia received 6 stars, we will give 5 bonus points for the user if the user's office building is 6 stars on top of the full marks. For these haven't got certified, we will ask two questions about their HVAC system, for each question we will give 1 point, if the answer is true.
        </p>
        <SubTitle>Question - Electricity Usage:</SubTitle>
        <p>
          We will collect the electricity consumption data with the floor area and number of employees in a office. Also, two questions will be asked about the lighting system. Users will be given extra points if they have a sustainable lighting system.
        </p>
        <SubTitle>Question - Data Centre:</SubTitle>
        <p>
          We also collect the information about the data centre. The questions will base on the electricity consumption and any sustainability measures. Also, we will ask if the data centre has a NABERS Rating. NABERS is a performance-based national rating system that measures the environmental performance of existing buildings, tenancies and homes. We encourage the user to get a NABERS rating for their data centre, therefore, we will give more weightage on the NABERS rating. If the user doesn't have a NABERS rating, our evluation will be based on the electricity consumption and the sustainability measures.
        </p>

        <SubTitle>Question - Cloud Service:</SubTitle>
        <p>
          We will ask if the user's organisation has cloud services. The leading cloud service providers AWS, Google Cloud and Microsoft Azure have planned to turn to 100% renewable energy by 2025, which is a significant milestone for the future of the cloud. Therefore, organisations who are planning to move further in sustainability
          should consider migrating all their servers, data centres to cloud. Due to that reason, we will heavliy reward in the assessment if the user has cloud services.
        </p>
        <SubTitle>References:</SubTitle>
        <p>
          Wagner, B. and Svensson, G. (2014), "A framework to navigate sustainability in business networks: The transformative business sustainability (TBS) model", European Business Review, Vol. 26 No. 4, pp. 340-367. https://doi.org/10.1108/EBR-12-2013-0146
        </p>
        <p>
          Muhammad Asif, Cory Searcy, Rickard Garvare & Niaz Ahmad (2011) Including sustainability in business excellence models, Total Quality Management & Business Excellence, 22:7, 773-786, DOI: 10.1080/14783363.2011.585784
        </p>
        <p>
          https://www.energy.gov.au/data/states-and-territories
        </p>
        <p>
          Miller, P., de Barros, A.G., Kattan, L. et al. Public transportation and sustainability: A review. KSCE J Civ Eng 20, 1076–1083 (2016). https://doi.org/10.1007/s12205-016-0705-0
        </p>
        <p>
          Kennedy, C.A. A comparison of the sustainability of public and private transportation systems: Study of the Greater Toronto Area. Transportation 29, 459–493 (2002). https://doi.org/10.1023/A:1016302913909
        </p>

      </Contents>
    </HelpContainer>
  )
}

export default Help;
