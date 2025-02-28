import Link from 'next/link';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import img from "../../../public/images/banner.jpg";

export default function Nav() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-gray-900 shadow-md py-4 px-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                {/* Brand */}
                <Link href="/" className="flex items-center space-x-3">
                <img 
                    src={img.src}
                    alt="Kit Collective Logo" 
                    className="w-10 h-10 object-cover rounded-xl" 
                />
                <span className="text-xl font-bold text-white hover:text-blue-300">
                    Kit Collective
                </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex md:items-center space-x-6">
                    <Link href="/" className="text-white hover:text-blue-300 hover:underline transition">Home</Link>
                    <Link href="/about" className="text-white hover:text-blue-300 hover:underline transition">About</Link>
                    <Link href="/products" className="text-white hover:text-blue-300 hover:underline transition">Products</Link>
                    <Link href="/contact" className="text-white hover:text-blue-300 hover:underline transition">Contact</Link>
                    <Link href="/signin" className="block text-center text-gray-200 hover:text-blue-300 hover:underline py-2">Sign In</Link>
                    <Link href="/register" className="block text-center text-gray-200 hover:text-blue-300 hover:underline py-2">Register</Link>
                </div>

                {/* Mobile Menu Toggle Button */}
                <button
                className="md:hidden text-gray-300"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                >
                <span className="material-icons">{isOpen ? <CloseIcon className="hover:text-blue-300"/> : <MenuIcon className="hover:text-blue-300"/>}</span>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                className={`md:hidden ${isOpen ? "block" : "hidden"} bg-gray-900 text-gray-200 py-2 mt-2`}
            >
                <Link href="/" className="block text-center text-gray-200 hover:text-blue-300 hover:underline py-2">Home</Link>
                <Link href="/about" className="block text-center text-gray-200 hover:text-blue-300 hover:underline py-2">About</Link>
                <Link href="/products" className="block text-center text-gray-200 hover:text-blue-300 hover:underline py-2">Products</Link>
                <Link href="/contact" className="block text-center text-gray-200 hover:text-blue-300 hover:underline py-2">Contact</Link>
                <Link href="/signin" className="block text-center text-gray-200 hover:text-blue-300 hover:underline py-2">Sign In</Link>
                <Link href="/register" className="block text-center text-gray-200 hover:text-blue-300 hover:underline py-2">Register</Link>
            </div>
        </nav>
    );
}
