export default function Card({img, title, pcode, desc}){
    return(
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-6 w-2/3 sm:w-[300px] md:w-[250px]">
            <img 
                src={img} 
                alt={`Crochet ${title}`} 
                className="w-full h-60 object-cover rounded-lg"
            />
            <div className="mt-4 text-center">
                <h5 className="text-lg font-bold text-gray-800">{title}</h5>
                <p className="text-sm text-gray-500">Product Code: {pcode}</p>
                <p className="mt-2 text-gray-600">{desc}</p>
                <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                Add to Cart
                </button>
            </div>
        </div>
    );
}