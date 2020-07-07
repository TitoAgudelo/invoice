import React from 'react';
import styled from 'styled-components'
import { Link, withRouter } from "react-router-dom";

import Invoice from '../../components/Invoice/Invoice';

import { useStateInvoices } from '../../providers/InvoicesProvider/InvoicesProvider';

const Invoices = () => {
  const { invoices } = useStateInvoices();

  return (
    <Container>
      <Header>
        <Title>Recent invoices.</Title>
        <Link to="/new">
          <ButtonAdd>New Invoice</ButtonAdd>
        </Link>
      </Header>
      <ListInvoices>
        {invoices.map((invoice, index) => {
          return (<Invoice key={index} invoice={invoice} />)
        })}
      </ListInvoices>
    </Container>
  );
}

export default withRouter(Invoices);

const Container = styled.div`
  align-items: flex-start;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1200px;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  width: 100%;
`;

const Title = styled.h1`
  color: #F5F7FA;
  margin-bottom: 1rem;
`;

const ButtonAdd = styled.button`
  background-color: #3ee085;
  border: none;
  color: #F5F7FA;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  height: 50px;
  padding: 5px 10px;
  text-transform: uppercase;

  a {
    color: white;

  }
`;

const ListInvoices = styled.ul`
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-gap: 50px;
  list-style: none;
  padding: 0;
`;