export const types = {
  FILTER_BY_SEARCH: 'FILTER_BY_SEARCH',
  SET_INVOICES: 'SET_INVOICES',
  SET_CURRENT_INVOICE: 'SET_CURRENT_INVOICE',
  RESET_CURRENT_INVOICE: 'RESET_CURRENT_INVOICE'
};

export const initialState = {
  invoices: [],
  originalInvoices: [],
  currentInvoice: {},
  newInvoice: {
    name: '',
    message: '',
    scheduleAt: '',
    publishedBy: '',
    createdAt: '',
    total: 0,
    company: '',
    invoiceNumber: 0,
    clientName: '',
    dueDate: '',
    items: []
  }
};

export const broadcastsReducer = (state, action) => {
  return action.type === types.SET_INVOICES
    ? { ...state, invoices: action.payload, originalInvoices: action.payload }
    : action.type === types.FILTER_BY_SEARCH
    ? { 
      ...state,
      invoices: state.originalInvoices.filter((broad) => broad.name.toLowerCase().includes(action.payload.toLowerCase()))
    }
    : action.type === types.SET_CURRENT_INVOICE
    ? { ...state, currentInvoice: Object.assign({}, action.payload) }
    : action.type === types.RESET_CURRENT_INVOICE
    ? { ...state, currentInvoice: {} }
    : state;
};
