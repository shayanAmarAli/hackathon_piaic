"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { UserButton } from "@clerk/clerk-react";
import { BsCartCheck } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import CartData from '@/components/displayData';
import { fetchCartData } from '@/app/counter/counterSlice';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from "@clerk/nextjs";
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import Image from 'next/image';
import { FaBars } from "react-icons/fa"

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
    const [Open, setOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleClick = () => {
        setIsOpen(!isOpen);
    };
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuth();
  console.log("user id is all the way come from navbar ", userId);
  if (!userId) {
    deleteCookie('useriid', { path: '/' });
  }
  setCookie('useriid', `${userId}`, { maxAge: 60 * 60 * 24 });

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <div  className={`tablet:w-full bg-white grid tablet:grid-cols-4 mobile:grid-cols-3 tablet:gap-3 mobile:gap-5 place-items-center tablet:mx-8 mobile:mx-2 items-center tablet:mt-0 small:mt-0 mobile:mt-0 justify-center   py-5 top-0 left-0 right-0  fixed   mx-auto   ${scrolled ? 'bg-white' : 'bg-white'}`}>

      <div>
        <Link href={"/"}>
          <Image
            width={150}
            height={150}
            alt='navImages' className="tablet:w-[120px] laptop:w-[200px] laptop:h-[40px] small:w-[120px] small:h-[20px] tablet:h-[20px]"
             src='https://full-stack-ecommerce-clothing-web.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo.3267fed8.png&w=256&q=75' />
        </Link>
      </div>
      <div className='link laptop:space-x-8 tablet:space-x-3tablet:block hidden small:space-x-4 text-[1.2vw] tablet:block '>
        <Link href="https://hackathon-piaic.vercel.app/female">Female</Link>
        <Link href="https://hackathon-piaic.vercel.app/male">Male</Link>
        <Link href="https://hackathon-piaic.vercel.app/kids">Kids</Link>
        <Link href="https://hackathon-piaic.vercel.app/allproducts">All Products</Link>
      </div>
      <div className='laptop:ml-44 tablet:block hidden border small:ml-20 tablet:ml-20  border-gray-400 rounded-md laptop:w-80 tablet:w-60 laptop:flex p-1'><CiSearch />  <input type='text' className='pl-1 text-xs' placeholder='What you looking for?' /></div>
    
      <div className='flex tablet:text-3xl ml-10 mobile:text-lg '>
        <div className='tablet:px-1 laptop:px-5 mobile:px-0 text-gray-500 mt-3'>
          {
            !userId ? (<Link href={"https://ecommerce-store-hakathon01.vercel.app/sign-in"}><FaUserCircle /></Link>) : (<UserButton />)
          }
        </div>
        <Link href="https://ecommerce-store-hakathon01.vercel.app/checkoutProduct">
          <div className='tablet:text-xl mobile:text-xs flex  py-3  rounded-full'>
            <BsCartCheck className='tablet:text-3xl mobile:text-lg ml-3  ' />
            <CartData />
          </div>
        </Link>
      </div>
      <div className={`i ${isOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'}`} onClick={toggleDropdown} >
        <FaBars className='tablet:hidden mobile:block ' />
      </div>
      {isOpen && (
        <div className='absolute w-[100vw]  list-none open tablet:hidden mobile:block  bg-white   mt-72 space-y-4 py-10 text-[#292F36] content-center	 text-center  tablet:space-x-5 laptop:space-x-10  font-semibold'>
          <li className='hover:text-yellow-800 cursor-pointer' onClick={handleClick}><a href="https://ecommerce-store-hakathon01.vercel.app/female">Female</a></li>
          <li className='hover:text-yellow-800 cursor-pointer' onClick={handleClick}><a href="https://ecommerce-store-hakathon01.vercel.app/male">Male</a></li>
          <li className='hover:text-yellow-800 cursor-pointer' onClick={handleClick}><Link href='https://ecommerce-store-hakathon01.vercel.app/kids'>Kids</Link></li>
          <li className='hover:text-yellow-800 cursor-pointer' onClick={handleClick}><Link href='https://ecommerce-store-hakathon01.vercel.app/allproducts'>All Product</Link></li>
         
        </div>)}
    </div>
  )
}

export default Navbar;
