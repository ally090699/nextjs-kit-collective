import RootLayout from "../layout"
import Image from "next/image";
import teammembers from "../data/teammembers";
import img1 from "../../../public/images/about-1.jpg";
import img2 from "../../../public/images/about-2.jpg";

export default function About(){  
  return (
    <RootLayout> {/* everything inside of layout is part of props.children*/}
        <div className="w-full overflow-auto">
          {/* About Section */}
          <section id="aboutsect" className="py-12 px-6 bg-gray-100">
            <div className="max-w-5xl mx-auto">
              <h4 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span role="img" aria-label="Girl emoji">👩🏻</span> About Us
              </h4>
              <div className="flex flex-col md:flex-row items-center gap-8 mt-6">
                <Image src={img1} width={400} height={300} alt="Sample Summer Top Crochet Kit Contents" className="rounded-lg shadow-lg"/>
                <div className="flex-1 text-gray-700 space-y-4">
                  <p>Welcome to Kit Collective, your go-to destination for all things crochet!</p>
                  <p>We’re dedicated to inspiring every crafter with our thoughtfully curated crochet kits designed for all skill levels. From cozy hats and scarves to fun amigurumi keychains and trendy summer tops, our kits include everything you need, including high-quality materials and step-by-step instructions to help you create pieces you’ll love.</p>
                  <p>At Kit Collective, we encourage you to share your journey! Submit photos of your crochet kit creations to be featured on our website and social media!</p>
                </div>
                <Image src={img2} width={400} height={300} alt="Sample Scrunchie Crochet Kit Complete" className="rounded-lg shadow-lg"/>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section id="aboutteam" className="py-12 bg-white">
            <div className="max-w-5xl mx-auto">
              <h4 className="text-2xl font-bold text-gray-800 text-center">Our Team</h4>
              <div id="memberlist" className="mt-8 flex flex-wrap justify-center gap-6">
                {teammembers.map((member) => (
                  <div key={member.key} className="bg-gray-50 rounded-lg shadow-md p-6 max-w-sm text-center">
                    <Image src={member.img} width={150} height={150} className="rounded-full mx-auto mb-4" alt={member.name}/>
                    <h5 className="text-lg font-semibold text-gray-900">{member.name}</h5>
                    <p className="text-sm text-gray-600">{member.position}</p>
                    <p className="mt-2 text-gray-700">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
    </RootLayout>
  );
}