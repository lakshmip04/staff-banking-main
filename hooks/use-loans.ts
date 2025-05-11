import { useState, useEffect } from 'react';

type Loan = {
  _id: string;
  loanID: string;
  memberID: string;
  amount: number;
  purpose: string;
  interestRate: number;
  term: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export function useLoans() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLoans() {
      try {
        setLoading(true);
        const response = await fetch('/api/loans');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setLoans(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching loans:', err);
        setError('Failed to load loans. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchLoans();
  }, []);

  const createLoan = async (loanData: Omit<Loan, '_id' | 'loanID' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      const response = await fetch('/api/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loanData),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const newLoan = await response.json();
      setLoans((prev: Loan[]) => [...prev, newLoan]);
      return newLoan;
    } catch (err) {
      console.error('Error creating loan:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getLoansByMember = async (memberID: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/loans?memberID=${memberID}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(`Error fetching loans for member ${memberID}:`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loans, loading, error, createLoan, getLoansByMember };
} 