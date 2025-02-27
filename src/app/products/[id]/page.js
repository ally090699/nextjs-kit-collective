"use client";

import {useParams} from 'next/navigation';
import RootLayout from '../../layout';
import products from '@/app/data/products';

export default function ProductDetailsPage(){
    const params = useParams();
    console.log("Params: ", params);
    const productId = parseInt(params.id);
    const product = products.find((p)=> p.key === productId);

    if (!product){
        return<div>Product not found.</div>;
    }

    return(
        <RootLayout>
            <div className="pt-[10%] pb-[10%] flex bg-white shadow-lg hover:shadow-xl transition p-6 w-full max-h-[800px] ">
                
                <img src={product.img} 
                    alt={`Crochet ${product.title}`} 
                    className="w-1/4 float-left mr-4 h-50 object-cover rounded-lg"
                />
                <div className="text-left">
                    <div className="flex justify-between">
                        <h4 className="text-lg font-bold text-gray-800">{product.title}</h4>
                        <h5 className="text-md font-bold text-gray-600">{product.category}</h5>
                    </div>
                    <div className="flex justify-between">
                        <h6 className="text-md font-bold text-gray-600">{product.price}</h6>
                        <p className="text-sm text-gray-500">#{product.pcode}</p>
                    </div>
                    <p className="mt-2 text-gray-600">{product.desc}</p>
                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                    Add to Cart
                    </button>
                </div>
            </div>
        </RootLayout>
        
    );
}