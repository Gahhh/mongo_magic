import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import logo from '../../assets/LogoBlue.png';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { regisRequest } from "../../utils/requests";
import { asyncLocalStorage } from '../../utils/functions';
import { message } from 'antd';
import { Newinput, Newform, Flexbox, Labelbox, Label, Head, Head2, Logoimg, Navbar, Atag, Bluetag, Span } from "./Quizcss";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4D7393',
    }
  },
});

export default function AdminLogin() {
  const navigate = useNavigate();
  let userEmail = useRef('');
  let userName = useRef('');
  let userOrg = useRef('');
  let userPwd = useRef('');
  let userCheck = useRef('');

  const transRegis = (event) => {
    navigate(`/adminsignup`);
  }
  const transLogin = (event) => {
    navigate(`/login`);
  }
  const transHome = (event) => {
    navigate(`/`);
  }
  const transAbout = (event) => {
    navigate('/about');
  }
  const transHelp = (event) => {
    navigate(`/help`);
  }

  const recaptchaRef = React.useRef();


  const handleSubmit = async (e) => {
    console.log("clicked");
    e.preventDefault();
    const token = await recaptchaRef.current.executeAsync();
    console.log(token);
    recaptchaRef.current.reset();
    const msg = {
      email: userEmail.current.value,
      password: userPwd.current.value,
      fullname: userName.current.value,
      org: userOrg.current.value,
      user_type: "0",
      reCaptcha_Token: token,
      userCheck: userCheck.current.value,
    };
    console.log(msg);
    if (msg.password === msg.userCheck && msg.code === 'wdfvz') {
    await regisRequest(msg).then(res => {
        if (!res.ok) {
          res.json().then(body => {
            message.error({
              content: body.message,
              duration: 1.2,
              style: {
                marginTop: '20vh',
              }
            });
          })
        } else {
          res.json().then(body => {
            asyncLocalStorage.setItem('userToken', body.token).then(() =>
              navigate(`/users/dashboard`)
            )
          })
        }
      })}
    else if (msg.password !== msg.userCheck) {
      message.error({
        content: 'Please check your password',
        duration: 1.2,
        style: {
          marginTop: '20vh',
        }
      });
    }
    else if (msg.code !== 'wdfvz') {
      message.error({
        content: 'Wrong invitation code. Please check your code',
        duration: 1.2,
        style: {
          marginTop: '20vh',
        }
      });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Navbar><Logoimg src={logo} alt="logo" />G'Tracker <Span>
        <Atag onClick={transHome}>Home</Atag>
        <Atag>Rankings</Atag>
        <Atag onClick={transHelp}>Help</Atag>
        <Atag onClick={transAbout}>About</Atag>
      </Span>
      </Navbar>
      <Flexbox>
        <Head>
         User Register
        </Head>
        <Head2>Already have an account? <Bluetag onClick={transLogin}>Login</Bluetag></Head2>
        <Head2><Bluetag onClick={transRegis}>Switch to Admin Register</Bluetag></Head2>
        <Newform onSubmit={handleSubmit}>
        <Labelbox className="form-group">
            <Label htmlFor="name" required="required">
            Full Name
            </Label>
            <Newinput
              type="text"
              ref={userName}
              className="form-control"
              id="name"
              placeholder="Full name"
              name="name"
            />
          </Labelbox>
          <Labelbox className="form-group">
            <Label htmlFor="org" required="required">
            Organization
            </Label>
            <Newinput
              type="text"
              ref={userOrg}
              className="form-control"
              id="org"
              placeholder="Organization"
              name="org"
            />
          </Labelbox>
          <Labelbox className="form-group">
            <Label htmlFor="email" required="required">
              Email address
            </Label>
            <Newinput
              type="email"
              ref={userEmail}
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
            />
          </Labelbox>
          <Labelbox className="form-group">
            <Label htmlFor="password" required="required">
              Password
            </Label>
            <Newinput
              type="password"
              ref={userPwd}
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
            />
          </Labelbox>
          <Labelbox className="form-group">
            <Label htmlFor="check">
            Password Confirmation
              </Label>
            <Newinput
              type="password"
              className="form-control"
              id="check"
              ref={userCheck}
              placeholder="Enter your password again"
              required="required"
              name="check"
            />
          </Labelbox>
          <Labelbox>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" required/>}
              label={
                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
                  I agree to the Terms & Conditions
                </Typography>
              } sx={{ marginBottom: '10px' } }
            />
          </Labelbox>
          <Labelbox>
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey="6LebkCshAAAAAHk4a207_vIbTrP2xEPrAeINxV6z"
            />
          </Labelbox>
          <Button color='primary' variant="contained" type="submit" sx={{ width: '408px', height: '62px', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold', textTransform: 'none', }}>Register</Button>
        </Newform>
      </Flexbox>
    </ThemeProvider>
  );
}