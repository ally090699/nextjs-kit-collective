import Link from 'next/link';

export default function Footer(){
    return(
        <div className="bg-gray-900 text-white py-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
                
                {/* Left - Navigation Links */}
                <div className="text-center md:text-left">
                <ul className="space-y-2">
                    <li><Link href="/" className="hover:text-green-400 transition">Home</Link></li>
                    <li><Link href="/about" className="hover:text-green-400 transition">About</Link></li>
                    <li><Link href="/products" className="hover:text-green-400 transition">Products</Link></li>
                    <li><Link href="/contact" className="hover:text-green-400 transition">Contact</Link></li>
                </ul>
                </div>

                {/* Right - Contact Info */}
                <div className="text-center md:text-right mt-6 md:mt-0">
                <p className="font-semibold text-lg">Kit Collective</p>
                <p>Ontario, Canada</p>
                <p>kitcollective@hotmail.com</p>

                {/* LinkedIn Icon */}
                <a href="https://www.linkedin.com/in/allxnso/" target="_blank" rel="noopener noreferrer" className="inline-block mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-linkedin text-white hover:text-green-400 transition" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                    </svg>
                </a>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm text-gray-400 mt-6">
                &copy; 2024 Kit Collective. All rights reserved.
            </div>
        </div>
    );
}