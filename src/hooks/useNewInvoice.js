import { useState } from 'react';
import { db } from '../firebase/firebase';

const useNewInvoice = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const newInvoice = async invoice => {
    setIsLoading(true);

    try {
      const invoiceRef = db.collection('invoices').doc();
      const invoiceSnapshot = await invoiceRef.get();

      console.log('creating new invoice model');
      const invoiceModel = {
        id: invoiceSnapshot.id,
        name: invoice.name,
        message: invoice.message,
        clientName: invoice.client,
        company: invoice.company,
        createdAt: new Date(),
        dueDate: invoice.dueDate,
        invoiceNumber: invoice.invoiceNumber,
        publishedBy: 'Tito',
        scheduleAt: invoice.schedule,
        total: 0
      };

      await invoiceRef.set(invoiceModel);
      setIsLoading(false);
      return invoiceSnapshot;
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.error('Error creatting new invoice', error.message);
    }
  };

  const newInvoiceUpdate = async (id, items, total) => {
    setIsLoading(true);
    await items.map(async item => {
      try {
        const itemRef = db.collection('invoices')
          .doc(id)
          .collection('items')
          .doc();
        const itemSnapshot = await itemRef.get();

        console.log('creating new item model');

        await itemRef.set(item);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error);
        console.error('Error creatting new invoice', error.message);
      }
    });

    const invoiceRef = db.collection('invoices')
      .doc(id)
      .update({ total })
    return invoiceRef;
  };

  return { newInvoice, newInvoiceUpdate, isLoading, error };
};

export default useNewInvoice;
