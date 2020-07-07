import React, { useState } from 'react';
import styled from 'styled-components'
import { withRouter } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';
import { useHistory } from "react-router-dom";

import useNewInvoice from '../../hooks/useNewInvoice';


const NewInvoice = () => {
  const history = useHistory();

  const [submit, setSubmit] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [client, setClient] = useState('');
  const [company, setCompany] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [schedule, setSchedule] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [step, setStep] = useState('first');
  const [invoiceId, setInvoiceId] = useState('');

  const [items, setItems] = useState([]);
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState();
  const [rate, setRate] = useState();
  const [subTotal, setSubTotal] = useState();

  const { newInvoice, newInvoiceUpdate } = useNewInvoice();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);
    if (name && message && client && company && invoiceNumber && schedule && dueDate) {
      const invoiceModel = {
        name,
        message,
        client,
        company,
        invoiceNumber,
        schedule,
        dueDate
      };

      const responseNewInvoice = await newInvoice(invoiceModel);
      if (responseNewInvoice.id) {
        setInvoiceId(responseNewInvoice.id);
        setSubmit(false);
        setStep('second');
      }
    }
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    await setSubTotal(rate * hours);

    if (description && hours && rate && subTotal) {
      const item = {
        description,
        hours,
        rate,
        subTotal
      };
  
      const itemsModel = [ ...items, item ];
      setItems(itemsModel);
    }
  };

  const handleFinish = async () => {
    if (items && items.length) {
      let total = 0;
      items.map(item => {
        total += item.subTotal
      })
      const responseNewInvoice = await newInvoiceUpdate(invoiceId, items, total);
      if (responseNewInvoice) {
        history.push('/invoices');
      }
    }
  };

  return (
    <Container>
      <Header>
        <Title>New Invoice.</Title>
      </Header>
      <SubTitle>Basic information step {step === 'first' ? 1 : 2} of 2</SubTitle>
      <FormWrapper>
        {step === 'first' && (
          <Form onSubmit={handleSubmit}>
            <FormHalf>
              <FormGroup>
                <Label>Invoice Name
                  {submit && !name && (
                    <Required>*</Required>
                  )}
                </Label>
                <InputField
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter invoice name" />
              </FormGroup>
              <FormGroup>
                <Label>Concept of
                  {submit && !message && (
                    <Required>*</Required>
                  )}
                </Label>
                <InputField
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Enter concept" />
              </FormGroup>
            </FormHalf>
            <FormHalf>
              <FormGroup>
                <Label>Client Name
                  {submit && !client && (
                    <Required>*</Required>
                  )}
                </Label>
                <InputField
                  type="text"
                  value={client}
                  onChange={e => setClient(e.target.value)}
                  placeholder="Enter client name" />
              </FormGroup>
              <FormGroup>
                <Label>Company
                  {submit && !company && (
                    <Required>*</Required>
                  )}
                </Label>
                <InputField
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="Enter company" />
              </FormGroup>
            </FormHalf>
            <FormHalf>
              <FormGroup>
                <Label>Invoice Number
                  {submit && !invoiceNumber && (
                    <Required>*</Required>
                  )}
                </Label>
                <InputField
                  type="text"
                  value={invoiceNumber}
                  onChange={e => setInvoiceNumber(e.target.value)}
                  placeholder="Enter invoice number" />
              </FormGroup>
            </FormHalf>
            <FormHalf>
              <FormGroup>
                <Label>Schedule Date
                  {submit && !schedule && (
                    <Required>*</Required>
                  )}
                </Label>
                <DateTimePicker
                  onChange={setSchedule}
                  value={schedule}
                />
              </FormGroup>
              <FormGroup>
                <Label>Due Date
                  {submit && !dueDate && (
                    <Required>*</Required>
                  )}
                </Label>
                <DateTimePicker
                  onChange={setDueDate}
                  value={dueDate}
                />
              </FormGroup>
            </FormHalf>
            <FormGroup>
              <SubmitButton type="submit">Next</SubmitButton>
            </FormGroup>
          </Form>
        )}
        {step === 'second' && (
          <Form onSubmit={handleAdd}>
            <FormContinue>
              <FormGroup>
                <Label>Description
                  {submit && !description && (
                    <Required>*</Required>
                  )}
                </Label>
                <InputField
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Enter description" />
              </FormGroup>
              <FormGroup>
                <Label>Hours
                  {submit && !hours && (
                    <Required>*</Required>
                  )}
                </Label>
                <InputField
                  type="number"
                  value={hours}
                  onChange={e => setHours(e.target.value)}
                  placeholder="Enter hours" />
              </FormGroup>
              <FormGroup>
                <Label>Rate
                  {submit && !rate && (
                    <Required>*</Required>
                  )}
                </Label>
                <InputField
                  type="number"
                  value={rate}
                  onChange={e => setRate(e.target.value)}
                  placeholder="Enter rate" />
              </FormGroup>
              <FormGroup>
                <Label>Subtotal</Label>
                <Copy>${rate * hours}</Copy>
              </FormGroup>
            </FormContinue>
            <FormGroup>
              <SubmitButton type="submit">Add</SubmitButton>
            </FormGroup>
          </Form>
        )}
        {items.map((item, index) => {
          return (
            <FormContinue key={`items-${index}`}>
              <FormGroup>
                <Label>Description</Label>
                <Copy>{item.description}</Copy>
              </FormGroup>
              <FormGroup>
                <Label>Hours</Label>
                <Copy>{item.hours}</Copy>
              </FormGroup>
              <FormGroup>
                <Label>Rate</Label>
                <Copy>{item.rate}</Copy>
              </FormGroup>
              <FormGroup>
                <Label>Sub Total</Label>
                <Copy>${item.subTotal}</Copy>
              </FormGroup>
            </FormContinue>
          )
        })}
        {step === 'second' && (
          <FormGroup>
            <SubmitButton onClick={handleFinish}>Save</SubmitButton>
          </FormGroup>
        )}
      </FormWrapper>
    </Container>
  );
}

export default withRouter(NewInvoice);

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

const SubTitle = styled.h4`
  color: #878C94;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormWrapper =  styled.div`
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  text-align: left;
`;

const FormHalf = styled.div`
  align-items: center;
  display: flex;
`;

const FormContinue = styled.div`
  align-items: center;
  display: flex;
`;

const Label = styled.label`
  align-items: center;
  color: #878C94;
  display: flex;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Copy = styled.p`
  color: #F5F7FA;
`;

const InputField = styled.input`
  border: none;
  border-radius: 5px;
  font-size: 18px;
  min-height: 40px;
  padding: 5px 10px;
  width: 200px;
`;

const Required = styled.span`
  color: #A43A3D;
  margin: 0 5px;
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
  max-width: 200px;
`;