import React from 'react';
import {useNavigate} from "react-router-dom";
import logo from "../../assets/LogoBlue.png";
import { Logoimg, Navbar, Atag, Span } from "./Helpcss";
import './Help.css';

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
    <div className='HelpContainer'>
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
      <h1 className='title'>How we work</h1>
      <div className='contents'>
        <ol>
          <li>
            <p>
              We have an assessment that takes about 5 minutes to collect the data needed for us to rate your sustainability performance.
            </p>
          </li>
          <li>
            <p>
              We will produce a comprehensive report with our recommendations after you finish the quiz.
            </p>
          </li>
          <li>
            <p>
              We provide users with a current ranking based on their score。
            </p>
          </li>
        </ol>
      </div>
      <div className='contents'>
        <p>It may seem like we are just simply adding points up to give our score, but what made us special is that even for the same question and the same answer you may score differently. Take electricity as an example, in Queensland over 80 percent of the electricity is produced by burning fossil fuels, however, in Tasmania, 98 percent of the electricity is from renewable sources thanks to their utilization of hydro. Therefore, you may score higher with the same electricity usage because based on your location, the source of your electricity is more sustainable. </p>
      </div>
    </div>
  )
}

export default Help;
