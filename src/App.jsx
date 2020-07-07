import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './pages/Home/Home';
import Invoices from './pages/Invoices/Invoices';
import NewInvoice from './pages/NewInvoice/NewInvoice';
import InvoiceDetail from './pages/InvoiceDetail/InvoiceDetail';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/invoices">
            <Invoices />
          </Route>
          <Route path="/new">
            <NewInvoice />
          </Route>
          <Route path="/detail">
            <InvoiceDetail />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
