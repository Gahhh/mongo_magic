import React from 'react';
import './About.css'
import logo from '../../assets/LogoBlue.png';
import {useNavigate} from "react-router-dom";
import photo from '../../assets/default.png';
import yjj from '../../assets/yjj.jpg';
import kw from '../../assets/kw.jpg';
import jjl from '../../assets/jll.jpg'
import wyf from '../../assets/wyf.jpg';
import lige from '../../assets/yyl.png';
import {Atag, Logoimg, Navbar, Span} from "../Help/Helpcss";

const About = () => {
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

  const turnToHelp = () => {
    navigate('/help')
  }

  const turnToRanking = () => {
    navigate('/publicranking')
  }
  return (
    <div className='aboutContainer'>
      <Navbar>
        <div className='logo-title'>
          <Logoimg src={logo} alt="logo" />
          <div className='title'>G'Tracker </div>
        </div>
        <Span>
          <Atag onClick={turnToHome}>Home</Atag>
          <Atag onClick={turnToRanking}>Ranking</Atag>
          <Atag onClick={turnToHelp}>Help</Atag>
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
      <h1 className='title'>Meet our team</h1>
      <p className='description'>We’re a passionate, action driven and unstoppable team on a mission to develop a cloud-based sustainability assessment platform for industry organisations.</p>
      <div className='memberLeft'>
        <img className='memberPhoto' src={photo}/>
        <div className='memberInfo'>
          <p className='memberName'>Jinyang Liu</p>
          <p className='memberDesc'>Front-end developer</p>
        </div>
      </div>
      <div className='memberRight'>
        <div className='memberInfo'>
          <p className='memberName'>Kai Wang</p>
          <p className='memberDesc'>Front-end developer</p>
        </div>
        <img className='memberPhoto' src={kw}/>
      </div>
      <div className='memberLeft'>
        <img className='memberPhoto' src={yjj}/>
        <div className='memberInfo'>
          <p className='memberName'>Junjing Yu</p>
          <p className='memberDesc'>Front-end developer</p>
        </div>
      </div>
      <div className='memberRight'>
        <div className='memberInfo'>
          <p className='memberName'>Yu Liang</p>
          <p className='memberDesc'>Backend developer</p>
        </div>
        <img className='memberPhoto' src={wyf}/>
      </div>
      <div className='memberLeft'>
        <img className='memberPhoto' src={lige}/>
        <div className='memberInfo'>
          <p className='memberName'>Yanlin Li</p>
          <p className='memberDesc'>Backend developer</p>
        </div>
      </div>
      <div className='memberRight'>
        <div className='memberInfo'>
          <p className='memberName'>Junlin Lu</p>
          <p className='memberDesc'>Backend developer</p>
        </div>
        <img className='memberPhoto' src={jjl}/>
      </div>
    </div>
  )
}

export default About;
