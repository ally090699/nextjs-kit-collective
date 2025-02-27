"use client";

import RootLayout from "../layout";
import Card from "../components/card";
import products from "../data/products";
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function Products(){
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState({
    min: 0,
    max: Infinity
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.title.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const priceMatch = product.price >= price.min && product.price <= price.max;
    return searchMatch && categoryMatch && priceMatch;
  });

  const handleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleMin = (e) => {
    setPrice({
      ...price,
      min: parseInt(e.target.value) || 0,
    });
  }

  const handleMax = (e) => {
    setPrice({
      ...price,
      max: parseInt(e.target.value) || Infinity,
    });
  }

  function clearFilters(){
    setSelectedCategories([]);
    setPrice({
      min: 0,
      max: Infinity
    })
  }

  return (
    <RootLayout> {/* everything inside of layout is part of props.children*/}
        <div className="w-full bg-gray-100 flex py-12">
          {/* Products Section */}
          <div className="max-w-6xl justify-center mx-auto px-6">
            <div>
              <h4 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-8">
                <span role="img" aria-label="Yarn emoji">🧶</span> Products
              </h4>
            </div>
            <hr className="pt-2"/>

            {/* Search Bar */}
            <div className="flex justify-end items-center p-4">
              <input type="search" placeholder="Search..." className="p-2 text-gray-500" onChange={handleSearch}/>
            </div>

            <div className="flex">
              {/* Filter sidebar */}
              <div className="w-64 bg-white p-4 border-r mr-4">
                <h3 className="text-lg text-gray-700 font-semibold mb-4">Filters</h3>

                {/* Category Filter */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
                  <label className="flex items-center text-gray-500 ">
                    <input 
                    type="checkbox" 
                    value="Tops"
                    className="mr-2 text-gray-500" 
                    checked={selectedCategories.includes('Tops')}
                    onChange={() => handleCategory('Tops')}
                    />
                    <span>Tops</span>
                  </label>
                  <label className="flex items-center text-gray-500 ">
                  <input 
                    type="checkbox" 
                    value="Amigurumi"
                    className="mr-2 text-gray-500" 
                    checked={selectedCategories.includes('Amigurumi')}
                    onChange={() => handleCategory('Amigurumi')}
                    />
                    <span>Amigurumi</span>
                  </label>
                  <label className="flex items-center text-gray-500">
                  <input 
                    type="checkbox" 
                    value="Bags"
                    className="mr-2 text-gray-500" 
                    checked={selectedCategories.includes('Bags')}
                    onChange={() => handleCategory('Bags')}
                    />
                    <span>Bags</span>
                  </label>
                </div>

                {/* Price Range Filter */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2 text-gray-700 ">Price</h4>
                  <div className="flex items-center">
                    <input type="number" 
                    value={price.min === 0 ? '' : price.min}
                    placeholder="Min" 
                    className="border p-1 text-gray-300 w-20 mr-2"
                    onChange={handleMin}
                    />
                    <span>-</span>
                    <input type="number" 
                    value={price.max === Infinity ? '' : price.max}
                    placeholder="Max" 
                    className="border p-1 text-gray-300 w-20 ml-2" 
                    onChange={handleMax}
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2 text-gray-700">Rating</h4>
                  <label className="flex items-center text-gray-500 ">
                    <input type="radio" name="rating" className="mr-2" />
                    <span>★★★★☆ & Up</span>
                  </label>
                  <label className="flex items-center text-gray-500 ">
                    <input type="radio" name="rating" className="mr-2" />
                    <span>★★★☆☆ & Up</span>
                  </label>
                  <label className="flex items-center text-gray-500 ">
                    <input type="radio" name="rating" className="mr-2" />
                    <span>★★☆☆☆ & Up</span>
                  </label>
                  <label className="flex items-center text-gray-500 ">
                    <input type="radio" name="rating" className="mr-2" />
                    <span>★☆☆☆☆ & Up</span>
                  </label>
                </div>

                {/* Clear Filters Button */}
                <button 
                className="bg-gray-400 text-white hover:bg-gray-600 px-4 py-2 rounded"
                onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>


              {/* Product Grid */}
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 grid-rows-auto">
                {filteredProducts.map((product) => (
                  <Card 
                    key={product.key}
                    id={product.key}
                    img={product.img}
                    title={product.title}
                    category={product.category}
                    price={product.price}
                    pcode={product.pcode}
                    desc={product.desc}
                  />
                ))}
              </div>
            </div>


          </div>
        </div>
    </RootLayout>
  );
}