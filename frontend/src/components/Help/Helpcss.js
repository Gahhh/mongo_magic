import styled from "styled-components";

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
  width: 100%;
  height: 100%;
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
  color: #183B56;
  margin: 1rem;
`

const Span = styled.span`
  right: 10%;
  top: 1rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
`
const HelpContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  color: #4D7393;
  font-weight: 700;
  font-style: normal;
  font-size: 58px;
  letter-spacing: 0em;
  line-height: 1.1em;
  text-transform: none;
`

const Contents = styled.div`
  display: block;
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  letter-spacing: 0em;
  line-height: 1.8em;
  text-transform: none;
  color: #878787;
  min-width: 40px;
  max-width: 800px;
  margin: 50px;
  text-align: justify;
`

const SubTitle = styled.h3`
  color: #4D7393;
  font-weight: 700;
`

const HelpUL = styled.ul`
  list-style-position: outside;
`

export { Logoimg, Navbar, Atag, Span, Contents, HelpUL, SubTitle, Title, HelpContainer};