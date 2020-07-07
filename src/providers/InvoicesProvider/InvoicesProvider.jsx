import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { types, broadcastsReducer, initialState } from './state';
import useInvoices from '../../hooks/useInvoices';

export const InvoicesStateContext = createContext();
export const InvoicesSetContext = createContext();

export const useStateInvoices = () => useContext(InvoicesStateContext);
export const useSetInvoices = () => useContext(InvoicesSetContext);

const InvoicesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(broadcastsReducer, initialState);
  const { invoices } = useInvoices();

  const handleSearch = filterText => {
    dispatch({ type: types.FILTER_BY_SEARCH, payload: filterText });
  };

  const setCurrentInvoice = currentInvoice => {
    dispatch({ type: types.SET_CURRENT_INVOICE, payload: currentInvoice })
  };

  const resetCurrentInvoice = () => {
    dispatch({ type: types.RESET_CURRENT_INVOICE })
  };

  const newInvoice = newInvoice => {
    dispatch({ type: types.CREATE_NEW_INVOICE, payload: newInvoice })
  };

  useEffect(() => {
    if (invoices) {
      dispatch({ type: types.SET_INVOICES, payload: invoices });
    }
  }, [invoices]);

  return (
    <InvoicesStateContext.Provider value={state}>
      <InvoicesSetContext.Provider
        value={{
          handleSearch,
          setCurrentInvoice,
          resetCurrentInvoice,
          newInvoice
        }}>
        {children}
      </InvoicesSetContext.Provider>
    </InvoicesStateContext.Provider>
  );
};

export default InvoicesProvider;
