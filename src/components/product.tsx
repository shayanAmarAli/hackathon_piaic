import React from 'react'
import Image from 'next/image'

const Product = ({products}:any) => {
    return (
        <div>
            <div className="card w-72 bg-base-100 shadow-xl">
                <Image src={products.image} width={300} height={400} alt={"Product Image"}></Image>
                <div className="card-body">
                    <h2 className="card-title">{products.title}</h2>
                    <p>{products.sub_category}</p>
                    <p>{products.price}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
