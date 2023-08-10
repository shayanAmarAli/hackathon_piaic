"use client"

import { useDispatch } from 'react-redux';
import { fetchCheckoutData } from '@/app/counter/checkoutSlice';
import { AppDispatch } from '@/app/store';

export default function FetchCartButton() {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(fetchCheckoutData());
  };

  return <button onClick={handleClick}>Fetch Cart Data</button>;
}
