import React from 'react';
import styled from 'styled-components'
import moment from 'moment';
import { useHistory } from "react-router-dom";

import { useSetInvoices } from '../../providers/InvoicesProvider/InvoicesProvider';

const Invoice = ({ invoice }) => {
  const { setCurrentInvoice } = useSetInvoices();
  const history = useHistory();
  const time = invoice.scheduleAt.seconds * 1000;

  const handleSelect = async (invoice) => {
    setCurrentInvoice(invoice);
    history.push('/detail');
  };

  return (
    <Wrapper onClick={() => handleSelect(invoice)}>
      <Name>{invoice.name} #{invoice.invoiceNumber}</Name>
      <Legend>Total</Legend>
      <Copy>${invoice.total}</Copy>
      <Legend>Schedule At</Legend>
      <Copy>{moment(time).format('MMM Do, YYYY')}</Copy>
    </Wrapper>
  );
}

export default Invoice;

const Wrapper = styled.li`
  background-color: #F5F7FA;
  border-radius: 5px;
  cursor: pointer;
  padding: 20px;
  min-width: 200px;
`;

const Name = styled.h4`
  color: #484659;
`;

const Legend = styled.p`
  color: #878C94;
  font-size: 12px;
  margin-bottom: 5px;
  text-transform: uppercase;
`;

const Copy = styled.p`
  color: #484659;
  font-size: 14px;
  margin-bottom: 5px;
`;