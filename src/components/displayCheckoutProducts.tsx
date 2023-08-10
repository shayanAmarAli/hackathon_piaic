"use client"
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import {useState} from "react";
import data from "@/app/counter/checkoutSlice"

export default function CartData() {
    const {data} = useSelector((state: RootState) => state.checkout);

    if (data) {
        console.log("response you got in checkout products are", data);

    }
    return (
        <div>
        <h2>Cart Data</h2>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    );
}
