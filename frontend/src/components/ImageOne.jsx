import React from 'react';
import { Parallax } from 'react-parallax';
import styled from 'styled-components';
import logo from '../assets/LogoBlue.png';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#89c5d1',
    }
  },
});

const Logoimg = styled.img`
  width: 56px;
  height:56px;
`
const Navbar = styled.div`
  font-weight: 600;
  font-size: 30px;
  line-height: 40px;
  letter-spacing: 0.02em;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  margin: auto;
  justify-content: space-between;
  padding-top: 1.2rem;
`

const Atag = styled.a`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height */
  text-align: center;
  color: #ffffff;
  margin: 1rem;
`

const Span = styled.span`
  right: 10%;
  top: 1rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
`
const ImageOne = () => {
  const navigate = useNavigate();

  const turnToLogin = () => {
    navigate('/login');
  }

  const turnToRegister = () => {
    navigate('/signup');
  }

  const handleClick = () => {
    if (localStorage.getItem('userToken')) {
      navigate('/assessment');
    }
    else {
      turnToLogin();
    }
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

  const turnToHelp = () => {
    navigate('/help')
  }

  const turnToRanking = () => {
    navigate('/publicranking')
  }

  return <Parallax className='image' blur={0} bgImage={require('../assets/banner1.jpg')} strength={800} bgImageStyle={{minHeight:"100vh"}}>
  <Navbar>
      <div className='logo-title'>
        <Logoimg src={logo} alt="logo" />
        <div className='title'>G'Tracker </div>
      </div>
      <Span>
        <Atag>Home</Atag>
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
     <div className='content'>
        <span className="img-txt">Taking the leading position in sustainability</span>
        <ThemeProvider theme={theme}>
          <Button onClick={handleClick} style={{minWidth: '150px', borderRadius:'32px', minHeight: '70px', color:'#ffffff', fontSize:'x-large', fontWeight:'bolder'}} variant="contained" color="primary">Get Started</Button>
        </ThemeProvider>
      </div>
  </Parallax>
}

export default ImageOne;