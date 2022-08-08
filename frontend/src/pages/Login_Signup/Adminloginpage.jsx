import React, { useRef } from "react";
import logo from '../../assets/LogoBlue.png';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../utils/requests";
import { asyncLocalStorage } from '../../utils/functions';
import { message } from 'antd';
import { Newinput, Newform, Flexbox, Labelbox, Label, Head, Head2, Logoimg, Navbar, Atag, Bluetag, Span } from "./Logincss";
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
  let useremail = useRef('');
  let userpwd = useRef('');

  React.useEffect(() => {
    if (localStorage.getItem('userToken') && localStorage.getItem('userType') === "1") {
      navigate('/users/dashboard');
    } else if (localStorage.getItem('userToken') && localStorage.getItem('userType') === "0") {
      navigate('/admin/dashboard');
    }
  }, [])

  const transRegis = (event) => {
    navigate(`/signup`);
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
  const turnToRanking = () => {
    navigate('/publicranking')
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = {
      email: useremail.current.value,
      password: userpwd.current.value,
      user_type: "0",
    };
    await loginRequest(msg).then(res => {
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
              asyncLocalStorage.setItem('userType', "0").then(() =>
              navigate(`/admin/dashboard`)
            )
            )
          })
        }
      })
  };
  return (
    <ThemeProvider theme={theme}>
      <div style={{display:"block"}}>
      <Navbar>
      <div className='logo-title'>
        <Logoimg src={logo} alt="logo" />
        <div className='title'>G'Tracker </div>
      </div>
      <Span>
        <Atag onClick={transHome}>Home</Atag>
        <Atag onClick={turnToRanking}>Ranking</Atag>
        <Atag onClick={transHelp}>Help</Atag>
        <Atag onClick={transAbout}>About</Atag>
      </Span> 
    </Navbar>
      <Flexbox>
        <Head>
          Admin Login
        </Head>
        <Head2>Don’t have an account? <Bluetag onClick={transRegis}>Register</Bluetag></Head2>
        <Head2><Bluetag onClick={transLogin}>Switch to User Login</Bluetag></Head2>
        <Newform onSubmit={handleSubmit}>
          <Labelbox className="form-group">
            <Label htmlFor="email" required="required">
              Email address
            </Label>
            <Newinput
              type="email"
              ref={useremail}
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
            />
          </Labelbox>
          <Labelbox className="form-group">
            <Label htmlFor="password">Password</Label>
            <Newinput
              type="password"
              className="form-control"
              id="password"
              ref={userpwd}
              placeholder="Enter your password"
              required="required"
              name="password"
            />
          </Labelbox>
          <Labelbox>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={
                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
                  Remember me
                </Typography>
              } sx={{ marginBottom: '10px' }}
            />
          </Labelbox>
          <Button color='primary' variant="contained" type="submit" sx={{ width: '408px', height: '62px', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold', textTransform: 'none', }}>Login</Button>
        </Newform>
      </Flexbox>
      </div>
    </ThemeProvider>
  );
}