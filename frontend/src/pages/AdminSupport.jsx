import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {Layout, message} from 'antd';
import themeColor from "../config/theme";
import { Card } from 'antd';
import { getSupportQuestions } from '../utils/requests';
import SupportCards from "../components/SupportCards/SupportCards";

const { Content } = Layout;

const SupportContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: 'Poppins';
    font-style: normal;
`

const AdminSupport = () => {

  return (
    <>
      <Content style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
        <SupportContainer>
          <SupportCards />
        </SupportContainer>
      </Content>
    </>
  );
}

export default AdminSupport;