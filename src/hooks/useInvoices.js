import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';

export default function useInvoices() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('invoices')
      .orderBy('createdAt')
      .onSnapshot(
        snapshot => {
          const invoices = [];
          snapshot.forEach(doc => invoices.push(doc.data()));
          setLoading(false);
          setInvoices(
            invoices.sort((a, b) => b.createdAt - a.createdAt),
          );
        },
        err => {
          setError(err);
        },
      );

    return () => unsubscribe();
  }, []);

  return { error, loading, invoices };
}
