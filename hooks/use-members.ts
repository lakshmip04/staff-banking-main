import { useState, useEffect } from 'react';

type Member = {
  _id: string;
  memberID: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        setLoading(true);
        const response = await fetch('/api/members');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setMembers(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Failed to load members. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchMembers();
  }, []);

  const createMember = async (memberData: Omit<Member, '_id' | 'memberID' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      const response = await fetch('/api/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const newMember = await response.json();
      setMembers((prev: Member[]) => [...prev, newMember]);
      return newMember;
    } catch (err) {
      console.error('Error creating member:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { members, loading, error, createMember };
} 