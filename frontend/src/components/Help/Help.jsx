import React from 'react';
import {useNavigate} from "react-router-dom";
import logo from "../../assets/LogoBlue.png";
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
    navigate('/users/dashboard');
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

  return(
    <div className='HelpContainer'>
      <div className='Navbar'>
        <div className='logo-title'>
          <img className='LogoImage' src={logo} alt="logo"/>
          <div className='title'>G'Tracker </div>
        </div>
        <span className='Link'>
          <a className='Atag' onClick={turnToHome}>Home</a>
          <a className='Atag'>Ranking</a>
          <a className='Atag'>Help</a>
          <a className='Atag' onClick={turnToAbout}>About</a>
          {
            localStorage.getItem('userToken') ?
              <div style={{margin:'1rem', lineHeight:'0'}}>
                <a className='Atag' onClick={turnToDashboard}>Dashboard</a>
                <a className='Atag' onClick={logout}>Logout</a>
              </div>
              :
              <div style={{margin:'1rem', lineHeight:'0'}}>
                <a className='Atag' onClick={turnToLogin}>Login</a>
                <a className='Atag' onClick={turnToRegister}>Sign up</a>
              </div>
          }
        </span>
      </div>
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
