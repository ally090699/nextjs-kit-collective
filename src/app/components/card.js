import AddBoxIcon from '@mui/icons-material/AddBox';
import Link from 'next/link';

export default function Card({ id, img, title, category, price, pcode, desc }) {
  return (
    <Link href={`/products/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition p-6 sm:w-[300px] md:w-[250px] flex flex-col min-h-[400px]">
        <img
          src={img}
          alt={`Crochet ${title}`}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />
        <div className="text-center flex-grow">
          <h5 className="text-lg font-bold text-gray-800">{title}</h5>
          <h6 className="text-md font-bold text-gray-600">{price}</h6>
        </div>
        <div className="flex justify-center">
          <button className="mt-auto bg-blue-400 text-white p-2 rounded-md hover:bg-blue-600 transition">
            Add to Cart <AddBoxIcon />
          </button>
        </div>
      </div>
    </Link>
  );
}