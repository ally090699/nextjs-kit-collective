import { PrismaClient } from "@prisma/client";
import ProductDetails from './productDetails';

const prisma = new PrismaClient();

async function getProduct(id) {
    return prisma.products.findUnique({
        where: {
            product_id: parseInt(id),
        },
        include: {
            product_reviews: true,
        },
    });
}

export default async function ProductIdPage({params}){
    const {id} = await params;
    const productId = parseInt(id);
    const product = await getProduct(productId);

    if (!product){
        return<div>Product not found.</div>;
    }

    let averageRating = 0; 
    if (product.product_reviews.length > 0) {
        const ratings = product.product_reviews.map(review => review.rating);
        averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    }

    const productWithAverageRating = {
        ...product,
        price: product.price.toNumber(),
        averageRating: averageRating,
    };
    
    console.log(productWithAverageRating);
    

    return <ProductDetails product={productWithAverageRating} />;
}