import React, { useState } from 'react';
import styled from 'styled-components'
import { Redirect } from "react-router-dom";

import Loading from '../Loading/Loading';
import { useAuth } from '../../providers/AuthProvider/AuthProvider';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signin, isLoggedIn, isLoading } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email && password) {
      await signin(email, password);
    }
  }

  return (
    <div>
      {isLoggedIn ? (<Redirect to="/invoices" />) : ''}
      {isLoading ? (
        <Loading size="200" />
      ) : (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <InputField
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email" />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <InputField
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password" />
          </FormGroup>
          <FormGroup>
            <SubmitButton type="submit">Log In</SubmitButton>
          </FormGroup>
        </Form>
      )}
    </div>
  );
}

export default SignIn;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  text-align: left;
`;

const Label = styled.label`
  /* color: #282c34; */
  color: #878C94;
  font-size: 16px;
  margin-bottom: 10px;
`;

const InputField = styled.input`
  border: none;
  border-radius: 5px;
  font-size: 18px;
  min-height: 40px;
  padding: 5px 10px;
  width: 200px;
`;

const SubmitButton = styled.button`
  background-color: #3ee085;
  border: none;
  color: #F5F7FA;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  min-height: 50px;
  padding: 10px 15px;
  text-transform: uppercase;
`;