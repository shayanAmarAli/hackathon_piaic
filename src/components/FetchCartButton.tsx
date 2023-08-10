"use client"

import { useDispatch } from 'react-redux';
import { fetchCartData } from '@/app/counter/counterSlice';
import { AppDispatch } from '@/app/store';

export default function FetchCartButton() {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(fetchCartData());
  };

  return <button onClick={handleClick}>Fetch Cart Data</button>;
}
