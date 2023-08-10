"use client"
import { stringify, v4 as uuidv4 } from 'uuid';
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { client } from "../../../../sanity/lib/client";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from '@/app/store'
import { fetchCartData } from '@/app/counter/counterSlice';
import Image from 'next/image';

const detail = async (param: any) => {
  const bac = `${param}`;
  const response = await client.fetch(`*[_type == "product" && _id == "${bac}"]
    {_id, title, Price, sub_category, "image": product_image.asset->url}`);
  return response;
}


const Page = ({ params }: { params: { slugs: string } }) => {
  const [item, setItem] = useState<any>();
  const [count, setCount] = useState(1);
  const { userId } = useAuth();
  console.log("product detail page user id is " , userId);
  console.log(typeof userId);
  const uuid = uuidv4().slice(20);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await detail(params.slugs);
      const responseData = response[0];
      setItem({
        id: responseData._id,
        name: responseData.title,
        subCategory: responseData.sub_category,
        image: responseData.image,
        price: responseData.Price,
      });
    };

    fetchData();
  }, [params.slugs]);

  function generateRandomNumber() {
    const min = 100; // Minimum 3-digit number
    const max = 999; // Maximum 3-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  
  const postContent = async (item: any) => {
    console.log(item);
    console.log("unique id", uuid);
    console.log("user id is ", userId);
    const UUID = generateRandomNumber();
    const request = await fetch("/api/cart", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: UUID,
        userid: userId,
        productid: item.id,
        title: item.name,
        price: item.price,
        image: item.image,
        quantity: count
      })
    });
    const jsonResponse = await request.json();
    console.log("response you got the server in case of POST data nto db", jsonResponse);
    dispatch(fetchCartData());
    return jsonResponse;
  };

  const xs = (size: any) => {
    alert(`${size} SIZE IS SELECTED`);
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1){
      setCount(count - 1);
    }else{
      setCount(1);
    }
  };

  if (!item) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      {item ? (
        <div>
          <div>
            <div className=' tablet:flex small:flex gap-5 tablet:justify-center mobile:ml-10 table:ml-0 py-20 '>
              <div>
                <Image width={100} height={100} alt='images' className='tablet:w-[100px] mobile:hidden small:hidden small:w-[50px]' src={item.image} />
              </div>
              <div>
                <Image width={100} height={100} alt='images' className='tablet:w-[500px] mobile:w-[200px]' src={item.image} />
              </div>
              <div>
                <h1 className='tablet:text-3xl small:text-2xl mobile:text-lg mobile:mt-0 tablet:mt-20'>{item.name}</h1>
                <p className='text-gray-400 text-xl'>{item.subCategory}</p>
                <h2 className='text-sm tablet:pt-5 font-bold'>SELECT SIZE</h2>
                <div className='flex justify-around w-56 tablet:py-4'>
                  <div className='font-bold text-gray-600 w-8 h-8 text-xs rounded-full text-center cursor-pointer pt-2 hover:scale-125 duration-1000 hover:shadow-lg bg-white ' onClick={() => { return xs("XS") }}>XS</div>
                  <div className='font-bold text-gray-600 w-7 h-7 text-xs rounded-full text-center cursor-pointer pt-2 hover:scale-125 duration-1000 hover:shadow-lg bg-white' onClick={() => { return xs("S") }}>S</div>
                  <div className='font-bold text-gray-600 w-7 h-7 text-xs rounded-full text-center cursor-pointer pt-2 hover:scale-125 duration-1000 hover:shadow-lg bg-white' onClick={() => { return xs("M") }}>M</div>
                  <div className='font-bold text-gray-600 w-7 h-7 text-xs rounded-full text-center cursor-pointer pt-2 hover:scale-125 duration-1000 hover:shadow-lg bg-white' onClick={() => { return xs("L") }}>L</div>
                  <div className='font-bold text-gray-600 w-7 h-7 text-xs rounded-full text-center cursor-pointer pt-2 hover:scale-125 duration-1000 hover:shadow-lg bg-white ' onClick={() => { return xs("XL") }}>XL</div>
                </div>
                <div className='flex'>
                  <h1 className='font-bold mt-4 '>Quantity:</h1>
                  <div className='flex space-x-4 ml-5 '>
                    <button onClick={decrement} className='text-2xl  rounded-full w-10 h-10 shadow-lg'>-</button>
                    <p className='text-xl mt-2'> {count}</p>
                    <button onClick={increment} className='text-2xl  rounded-full w-10 h-10 shadow-lg'>+</button>
                  </div>
                </div>
                <div className='flex tablet:mt-10 mobile:mt-3 '>
                  <button className='tablet:w-44 mobile:w-36  h-10 text-white bg-black rounded-lg text-center font-bold ' onClick={() => postContent(item)}>
                    {!userId ? (<Link href={"/sign-in"}>sign-in</Link>) : ("add to cart")}
                  </button>

                </div>
                <h1 className='font-bold tablet:text-2xl mobile:text-lg pl-5 px-3'>${item.price}</h1>
              </div>

            </div>
            <div className='relative mt-10 tablet:ml-40 mobile:ml-5 tablet:w-[1000px] mobile:w-[80vw] '>
              <p className='tablet:text-9xl small:text-8xl mobile:text-6xl text-[#f2f3f7] font-extrabold '>Overview</p>
              <p className='absolute tablet:text-2xl mobile:text-lg font-bold top-[45%] '>Product Information</p>
              <br />
              <hr />
            </div>
            <div className='tablet:w-[900px] mobile:w-[400px] tablet:mx-auto mobile:ml-10 small:mx-auto'>
              <div className='tablet:flex small:flex  justify-between mt-10'>
                <h1 className='text-xl text-gray-500 font-bold'>PRODUCT DETAILS</h1>
                <p className='tablet:w-[550px] small:w-[500px]  mobile:text-sm mobile:w-[80vw] tracking-wide small:text-sm tablet:text-lg text-gray-500'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
              <div className='tablet:flex small:flex mt-10'>
                <div>
                  <h1 className='text-xl text-gray-500 font-bold'>PRODUCT CARE</h1>
                </div>
                <div className='tracking-wide tablet:ml-56 mobile:ml-10'>
                  <ul className=' list-disc	'>
                    <li>Hand wash using cold water.</li>
                    <li>Do not using bleach.</li>
                    <li>Hang it to dry.</li>
                    <li>Iron on low temperature.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Products are in a loading state</h1>
      )}
    </>
  )
}

export default Page;


