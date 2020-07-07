import React from 'react';
import styled from 'styled-components'
import { withRouter } from "react-router-dom";

import rocket from './../../assets/startup.svg';
import SignIn from './../../components/SignIn/SignIn';

const Home = () => {
  return (
    <Container>
      <Title>Welcome to invoice app.</Title>
      <Subtitle>Demo app use email tito@invoice.com and password 123456</Subtitle>
      <Wrapper>
        <Image src={rocket} alt="logo" />
        <SignIn />
      </Wrapper>
    </Container>
  );
}

export default withRouter(Home);

const Container = styled.div`
  align-items: center;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  max-width: 200px;
  position: relative;
`;

const Image = styled.img`
  height: 50px;
  left: -50px;
  position: absolute;
  top: -20px;
  width: 50px;
`;

const Title = styled.h1`
  color: #F5F7FA;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #F5F7FA;
  font-size: 12px;
  margin-bottom: 4rem;
`;