import React from "react";
import styled from "styled-components";
import { Layout } from 'antd';
import SupportCards from "../components/SupportCards/SupportCards";

const { Content } = Layout;

const SupportContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-style: normal;
`

const AdminSupport = () => {

  return (
    <>
      <Content style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
        <SupportContainer>
          <SupportCards/>
        </SupportContainer>
      </Content>
    </>
  );
}

export default AdminSupport;