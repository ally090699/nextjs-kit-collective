import RootLayout from "./layout";
import Carousel from "./components/carousel";
import img1 from "../../public/images/carousel-1.jpg";
import img2 from "../../public/images/carousel-2.jpg";
import img3 from "../../public/images/carousel-3.jpg";

export default function Home(){
  return (
    <RootLayout> 
      <div className="w-full">
        {/* Hero Section */}
        <section className="py-12 px-6 bg-gray-100 text-center w-full">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800">Welcome to Kit Collective!</h2>
            <p className="text-lg text-gray-700 mt-4">Your go-to destination for all things crochet.</p>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="py-12 bg-white flex justify-center items-center">
          <div className="w-full">
            <Carousel 
              img1={img1} alt1="Soft Beige Wool Yarn Balls"
              img2={img2} alt2="Octopus Amigurumi Final Product"
              img3={img3} alt3="Family Crochet Night"
            />
          </div>
        </section>
      </div>
    </RootLayout>
  );
}