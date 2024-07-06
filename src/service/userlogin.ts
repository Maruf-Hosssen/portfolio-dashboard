'use server';

import { FieldValues } from 'react-hook-form';

export const userLogin = async (data: FieldValues) => {
  const res = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    cache: 'no-store',
    next: { revalidate: 3600 },
  });
  const userInfo = await res.json();
  return userInfo;
};
