import React, { useRef } from "react";
import logo from '../../assets/LogoBlue.png';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { regisRequest } from "../../utils/requests";
import { asyncLocalStorage } from '../../utils/functions';
import { message } from 'antd';
import { Newinput, Newform, Flexbox, Labelbox, Label, Head, Head2, Logoimg, Navbar, Atag, Bluetag, Span } from "./Logincss";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { Modal } from 'antd';
import Terms from "../../components/TermsAndConditions/Terms";

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
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  React.useEffect(() => {
    if (localStorage.getItem('userToken') && localStorage.getItem('userType') === "1") {
      navigate('/users/dashboard');
    } else if (localStorage.getItem('userToken') && localStorage.getItem('userType') === "0") {
      navigate('/admin/dashboard');
    }
  }, [])

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
  const turnToRanking = () => {
    navigate('/publicranking')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const check = userCheck.current.value;
    const msg = {
      email: userEmail.current.value,
      password: userPwd.current.value,
      fullname: userName.current.value,
      org: userOrg.current.value,
      user_type: "1",
    };
    if (msg.password === check) {
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
              asyncLocalStorage.setItem('userType', "1").then(() =>
              navigate(`/users/dashboard`)
            )
            )
          })
        }
      })}
    else if (msg.password !== check) {
      message.error({
        content: 'Please check your password',
        duration: 1.2,
        style: {
          marginTop: '20vh',
        }
      });
    }
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
          <Labelbox style={{display: 'flex', flexDirection:'row'}}>
            <FormControlLabel style={{width: '20px', marginBottom: '10px'}}
              control={<Checkbox value="remember" color="primary" required/>}
            />
            <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginTop:'10px'}} style={{display:'flex'}}>
              I agree to the&nbsp;<a onClick={showModal}>Terms & Conditions</a>
            </Typography>
            <Modal title="Terms & Conditions" style={{width: '60%', height: '80%'}} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <Terms></Terms>
            </Modal>
          </Labelbox>
          <Button color='primary' variant="contained" type="submit" sx={{ width: '408px', height: '62px', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold', textTransform: 'none', }}>Register</Button>
        </Newform>
      </Flexbox>
      </div>
    </ThemeProvider>
  );
}