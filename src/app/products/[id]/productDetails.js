"use client";

import RootLayout from '../../layout';
import { rating } from '@/app/utils/ratings';

export default function ProductDetailsPage({ product }) {
    console.log(product);
    return (
        <RootLayout>
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-center bg-white shadow-lg hover:shadow-xl transition w-full">
                <img
                    src={product.image_url}
                    alt={`Crochet ${product.name}`}
                    className="w-full sm:w-1/4 sm:float-left sm:mr-4 h-56 sm:h-50 object-cover rounded-lg mb-4 sm:mb-0"
                />
                <div className="text-left">
                    <div className="flex justify-between mb-2">
                        <h4 className="text-xl font-bold text-gray-800">{product.name}</h4>
                        <h5 className="text-md font-bold text-gray-600">{product.category}</h5>
                    </div>
                    <div className="flex justify-between mb-2">
                        <h6 className="text-md font-bold text-gray-600">${product.price.toString()}</h6>
                        <p className="text-md text-gray-500">#{product.pcode}</p>
                    </div>
                    <p className="text-md text-gray-600">{product.description}</p>
                    <button className="mt-4 text-md bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
            <hr className="px-4 text-gray-700 bg-white" />
            <div className="p-4 sm:p-6 flex justify-center flex-col bg-white">
                <h4 className="text-lg font-bold text-gray-800">Reviews</h4>
                <h6 className="text-md font-bold text-gray-600 mt-2 mb-2">Average Rating: {rating(product.averageRating)}</h6>
                <div>
                    {product.product_reviews.length > 0 ? (
                        product.product_reviews.map((review) => (
                            <div key={review.review_id} className="mb-2 mt-2 p-4 border rounded-md">
                                <div className="flex justify-between">
                                    <p className="font-semibold text-gray-500">Rating: {rating(review.rating)}</p>
                                    <p className="text-gray-400">User: {review.user_id}</p>
                                </div>
                                <p className="text-gray-600">{review.comment}</p>
                                <p className="text-sm text-gray-400">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No reviews yet.</p>
                    )}
                </div>
            </div>
        </RootLayout>
    );
}