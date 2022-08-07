import styled from 'styled-components';


const Newinput = styled.input`
  border:0;
  background: #F6F6F6;
  border-radius: 12px;
  width: 408px;
  height: 62px;
  margin:20px;
  text-indent: 15px;
`


const Newform = styled.form`
  width: 504px;
  // min-height: 50vh;
  background: #FFFFFF;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  padding:30px;
  margin-top: 30px;
  margin-bottom: 30px;
`

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  // height:100vh;

  justify-content: center;
  align-items:center;
`
const Labelbox = styled.div`
  display: flex;
  flex-direction: column;
  // margin: 30px
`

const Label = styled.label`
  margin: 0 20px 0;
  font-weight:700;
  font-size:large;
  :after {
    content: '* ';
    color: red;
}
`

const Head = styled.h1`
  font-weight: 700;
  font-size: 40px;
  line-height: 150%;
`

const Head2 = styled.h2`
  font-weight: 400;
  font-size: 20px;
  color: #94959B;
  line-height: 150%;
`

const Logoimg = styled.img`
  width: 56px;
  height:56px;
`
const Navbar = styled.div`
  font-weight: 600;
  font-size: 30px;
  line-height: 40px;
  letter-spacing: 0.02em;
  // color: #ffffff;
  color: #4D7393;
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
  // color: #ffffff;
  color: #183B56;
  margin: 1rem;
`
const Bluetag = styled.a`
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  text-align: center;
  color: ##3865F3;
`

const Span = styled.span`
  right: 10%;
  top: 1rem;
  margin-left: 1rem;
  display: flex;
  flex-direction: row;
`

const TermTitle = styled.b`
  text-decoration-line: underline;
`

const UnderLine = styled.text`
  text-decoration-line: underline;
  text-decoration-style: dotted;
`

const UL = styled.ul`
  list-style-position: outside;
`

const PrivacyTittle = styled.b`
  font-size: 20px;
`

const PrivacyTime = styled.b`
  font-size: 15px;
`

const UnderlineLi = styled.li`
  text-decoration-line: underline;
`

const WhiteUL = styled.ul`
  list-style-type: circle;
`



export {Newinput, Newform, Flexbox, Labelbox, Label, Head, Head2, Logoimg, Navbar, Atag, Bluetag, Span, TermTitle, UnderLine, UL, WhiteUL, PrivacyTittle, UnderlineLi, PrivacyTime};