"use client"
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

export default function CartData() {
    const cartData = useSelector((state: RootState) => state.cart.data);
    const loading = useSelector((state: RootState) => state.cart.loading);
    const error = useSelector((state: RootState) => state.cart.error);
    if (cartData) {
        console.log("response you got in navbar is ", cartData);
    }
    return (
        <div>
            {loading ? (
                <span className="loading loading-dots loading-sm"/>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <ul>
                        {cartData}
                    </ul>
                </>
            )}
        </div>
    );
}
