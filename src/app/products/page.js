import { PrismaClient } from "@prisma/client";
import Client from './client';

const prisma = new PrismaClient();

async function getProducts() {
    return prisma.products.findMany({
        include: {
            product_reviews: true,
        },
    });
}

export default async function Products() {
    const products = await getProducts();
    
    const productsWithAverageRating = products.map(product => {
        let averageRating = 0; // Default to 0

        if (product.product_reviews.length > 0) {
            // Calculate average rating if reviews exist
            const ratings = product.product_reviews.map(review => review.rating);
            averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
        }

        return {
            ...product,
            price: product.price.toNumber(),
            averageRating: averageRating,
        };
    });
    
    console.log(productsWithAverageRating);
    

    return <Client products={productsWithAverageRating} />;
}