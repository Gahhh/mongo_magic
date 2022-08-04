import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet} from 'react-router-dom';
import { getProfile } from './utils/requests';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login_Signup/LoginPage';
import SignupPage from './pages/Login_Signup/signup';
import AdminSignupPage from './pages/Login_Signup/Adminsignup'
import AdminLogin from './pages/Login_Signup/Adminloginpage';
import Dashboard from './pages/Dashboard';
import Results from './pages/Results';
import Analytics from './pages/Analytics';
import Ranking from './pages/Ranking';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Newquiz from './pages/Login_Signup/Newquiz';
import { Layout } from 'antd';
import NavBar from './components/Navbar';
import HeaderBar from './components/HeaderBar';
import AssessmentPage from './pages/AssessmentPage/AssessmentPage';
import TestPage from './pages/TestPage';
import AboutPage from "./pages/AboutPage";
import HelpPage from "./pages/HelpPage";
import SupportEngine from  './components/SupportEngine';

export const ProfileContext = React.createContext();

function App() {
  const [profile, setProfile] = React.useState(null);
  const providerProfile = React.useMemo(() => ({ profile, setProfile }), [profile, setProfile]);

  React.useEffect(() => {
    getProfile().then(res => {
      if (res.ok) {
        res.json().then(
          data => {
            setProfile(data);
          }
        )
      }
      else {
        res.json().then(
          data => {
            if (data.msg === 'Token has expired'){
              localStorage.removeItem('userToken');
              setProfile(null);
            }
          }
        )
      }
    })
  }, []);

  return (
    <div style={{ height: '100%' }}>
      <Layout style={{ minHeight: '100vh', width:'100%', overflow:'auto' }}>
        <>
        <Router>
          <ProfileContext.Provider value={{ providerProfile }}>
            {/* { (useRegex(window.location.pathname))  ? (<NavBar page='Dashboard'></NavBar>) : (<></>)} */}
            <Routes >
              <Route path='/' element={<HomePage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/adminlogin" element={<AdminLogin />} />
              <Route path="/adminsignup" element={<AdminSignupPage />} />
              <Route path="/assessment" element={<AssessmentPage/>}/>
              <Route path="/test" element={<TestPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path='/users/' element={<><NavBar page='Dashboard'></NavBar><Outlet/></>}>
                <Route path="dashboard" element={<Layout><HeaderBar page='Dashboard'></HeaderBar><Dashboard /></Layout>} />
                <Route path="results"  element={<><Layout><HeaderBar page='Results'></HeaderBar><Results /></Layout></>} />
                <Route path="analytics" element={<><Layout><HeaderBar page='Analytics'></HeaderBar><Analytics /></Layout></>} />
                <Route path="ranking" element={<><Layout><HeaderBar page='Ranking'></HeaderBar><Ranking /></Layout></>} />
                <Route path="profile" element={<><Layout><HeaderBar page='Profile'></HeaderBar><Profile /></Layout></>} />
                <Route path="settings" element={<><Layout><HeaderBar page='Settings'></HeaderBar><Settings /></Layout></>} />
              </Route>
              <Route path="*" element={<NotFound />} />
              <Route path="/newquiz" element={<Newquiz />} />
            </Routes>
          </ProfileContext.Provider>
        </Router>
        </>
        <SupportEngine style={{ position:'fixed', bottom:'0', right:'0' }}></SupportEngine>
      </Layout>
    </div>
  );
}

export default App;
