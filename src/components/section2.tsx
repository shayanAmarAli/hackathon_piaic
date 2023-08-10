import Link from 'next/link'
import Image from 'next/image';

const Section2 = () => {
    return (
        <div>
            <div className='grid tablet:grid-cols-2  mobile:grid-cols-1 tablet:px-20 mobile:px-10 tablet:mt-60 mobile:mt-20 bg-[#fbfcff]'>
                <div className=' mt-32'>
                    <div className='font-[800] tablet:w-[40%] small:text-[5.87rem] mobile:text-[2.87rem] h-32 absolute text-[#212121] opacity-[0.07] z-10'>
                        <h1>Different from others</h1>
                    </div>
                    <div className='grid small:grid-cols-2  mobile:grid-cols-1 gap-y-10'>
                        <div className='tablet:w-40'>
                            <h1 className='font-semibold '>Using Good Quality Materials</h1>
                            <p className='text-gray-600'>Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                        </div>
                        <div className='tablet:w-40'>
                            <h1 className='font-semibold'>100% Handmade Products</h1>
                            <p className='text-gray-600'>Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                        </div>
                        <div className='tablet:w-40'>
                            <h1 className='font-semibold'>Modern Fashion Design</h1>
                            <p className='text-gray-600'>Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                        </div>
                        <div className='tablet:w-40'>
                            <h1 className='font-semibold'>Discount for Bulk Orders</h1>
                            <p className='text-gray-600'>Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                </div>
                <div className='small:mt-10 mobile:mt-32 '>
                    <h1 className=' tablet:mt-[3%] tablet:w-[40vw] tablet:ml-20 mobile:text-2xl mobile:mt-[-30%] small:mt-[10%] tablet:text-5xl font-bold text-[#212121]'>Unique and Authentic Vintage Designer Jewellery</h1>

                    <span className='small:flex tablet:mt-10 gap-10  small:mt-52'>

                        <Image  className="tablet:w-[300px] small:w-[200px] mobile:w-[200px] mobile:mx-auto mobile:my-5 tablet:my-0 mobile:h-[182px] small:h-[182px] tablet:h-[282px]"
                        alt='imge not found'
                        width={100}
                        height={100}
                        src='https://full-stack-ecommerce-clothing-web.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature.1118a2f3.png&w=384&q=75' />

                        <span>
                            <p className='tablet:text-md small:text-sm'>This piece is ethically crafted in our small family-owned workshop
                                in Peru with unmatched attention to detail and care.
                                The Natural color is the actua0
                                l natural color of the fiber, undyed and 100% traceable.</p>
                            <button className='bg-gray-950 text-white text-sm font-semibold tablet:justify-evenly justify-center flex  py-1 mt-5 w-60 mobile:mx-auto tablet:mx-0 tablet:w-32 px-2'>
                                <Link href="/allproducts">See All <br/>product</Link>
                            </button>
                        </span>
                    </span>

                </div>
            </div>
        </div>
    )
}

export default Section2;