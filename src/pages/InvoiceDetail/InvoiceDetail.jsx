import React from 'react';
import styled from 'styled-components'
import moment from 'moment';
import { withRouter } from "react-router-dom";

import { useStateInvoices } from '../../providers/InvoicesProvider/InvoicesProvider';

const InvoiceDetail = () => {
  const { currentInvoice } = useStateInvoices();
  const time = currentInvoice && currentInvoice.scheduleAt ? currentInvoice.scheduleAt.seconds * 1000 : 0;
  const timeDue = currentInvoice && currentInvoice.dueDate ? currentInvoice.dueDate.seconds * 1000 : 0;
  debugger;

  return (
    <Container>
      <Header>
        <Title>Invoice Detail. </Title>
      </Header>
      <Wrapper>
        <Name>{currentInvoice.name} #{currentInvoice.invoiceNumber}</Name>
        <Legend>Total</Legend>
        <Copy>${currentInvoice.total}</Copy>
        <Legend>Schedule At</Legend>
        <Copy>{moment(time).format('MMM Do, YYYY')}</Copy>
        <Legend>Due Date At</Legend>
        <Copy>{moment(timeDue).format('MMM Do, YYYY')}</Copy>
        <Legend>Client Name</Legend>
        <Copy>{currentInvoice.clientName}</Copy>
        <Legend>Company</Legend>
        <Copy>{currentInvoice.company}</Copy>
        <Legend>Message</Legend>
        <Copy>{currentInvoice.message}</Copy>
      </Wrapper>
    </Container>
  );
}

export default withRouter(InvoiceDetail);

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Name = styled.h4`
  color: #F5F7FA;
  font-size: 18px;
`;

const Legend = styled.p`
  color: #878C94;
  font-size: 12px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Copy = styled.p`
  color: #F5F7FA;
  font-size: 18px;
  margin: 0;
  margin-bottom: 10px;
`;