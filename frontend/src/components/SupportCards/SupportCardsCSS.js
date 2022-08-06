import styled from 'styled-components';

const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 20px;
  flex-flow: wrap;
`

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  min-width: 400px;
  margin: 20px;
`



export { CardContainer, CardsContainer };