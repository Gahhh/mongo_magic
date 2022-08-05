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

export { Logoimg, Navbar, Atag, Span};