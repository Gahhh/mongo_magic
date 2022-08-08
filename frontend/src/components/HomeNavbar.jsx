import styled from 'styled-components';
import { Link, useNavigate} from 'react-router-dom';
import logo from '../assets/LogoBlue.png';
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 48px 72px 24px;
  gap: 166px;
  position: absolute;
  height: 131px;
  left: -1px;
  right: 0px;
  top: 0px;
`
const LogoContainer = styled.div`
  width: 232px;
  height: 56px;
  flex: none;
  order: 0;
  flex-grow: 0;
`
const Logo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 10px;
  position: absolute;
  width: 56px;
  height: 56px;
  left: 72px;
  top: 49.5px;
  background: #4D7393;
  border-radius: 142px;
`
const LogoImg = styled.img`
  width: 32px;
  height: 32px;
`
const Name = styled.div`
  position: absolute;
  width: 160px;
  height: 40px;
  left: 144px;
  top: 57.5px;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 40px;
  letter-spacing: 0.02em;
  color: #4D7393;
`
const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  gap: 56px;
  width: 428px;
  height: 40px;
`
const LinkBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
  width: 56px;
  height: 24px;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: #222222;
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 24px;
  width: 249px;
  height: 59px;
`
const LoginBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  gap: 10px;

  width: 99px;
  height: 59px;

  background: #4D7393;
  border-radius: 12px;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */

  letter-spacing: 0.02em;
  color: #FFFFFF;

`
const RegisterBtn = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  gap: 10px;
  width: 126px;
  height: 59px;
  border: 2px solid #4D7393;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */

  letter-spacing: 0.02em;

  color: #4D7393;
`
const HomeNavbar = () => {
  const navigate = useNavigate();
  const JumpLogin = () => {
    navigate('/login')
  }
  const JumpSignup = () => {
    navigate('/signup')
  }
  return (
    <Container>
      <LogoContainer>
        <Logo>
          <LogoImg src={ logo }></LogoImg>
        </Logo>
        <Name>G’ Tracker</Name>
      </LogoContainer>
      <NavbarContainer>
        <LinkBox><Link to='/'>Home</Link></LinkBox>
        <LinkBox><Link to='/users/ranking'>Rankings</Link></LinkBox>
        <LinkBox>Help</LinkBox>
        <LinkBox>About</LinkBox>
      </NavbarContainer>
      <ButtonContainer>
        <LoginBtn onClick={JumpLogin}>Login</LoginBtn>
        <RegisterBtn onClick={JumpSignup}>Register</RegisterBtn>
      </ButtonContainer>
    </Container>
  )
}

export default HomeNavbar;