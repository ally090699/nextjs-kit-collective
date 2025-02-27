import RootLayout from "../layout"
import Card from "../components/card"
import products from "../data/products"

export default function Products(){
  return (
    <RootLayout> {/* everything inside of layout is part of props.children*/}
        <div className="w-full bg-gray-100 py-12">
          {/* Products Section */}
          <div className="max-w-6xl mx-auto px-6">
            <h4 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2 mb-8">
              <span role="img" aria-label="Yarn emoji">🧶</span> Products
            </h4>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.key} className="flex justify-center">
                  <Card 
                    key={product.key}
                    img={product.img}
                    title={product.title}
                    pcode={product.pcode}
                    desc={product.desc}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
    </RootLayout>
  );
}