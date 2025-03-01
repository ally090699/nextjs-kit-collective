"use client";

import Link from 'next/link';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import img from "../../../public/images/banner.jpg";
import { useSession, signOut } from "next-auth/react";

export default function Nav() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const buttonStyle = "px-4 py-2 rounded-md transition duration-300";

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
                    
                    {session ? (
                        <div className="flex space-x-2">
                            <Link href="/profile" className={`${buttonStyle}  hover:text-blue-300 hover:underline text-white`}>Profile</Link>
                            <button onClick={() => signOut()} className={`${buttonStyle}  hover:text-red-400 hover:underline text-white`}>Sign Out</button>
                        </div>
                    ) : (
                        <div className="flex space-x-2">
                            <Link href="/signin" className={`${buttonStyle} hover:text-blue-300 hover:underline text-white`}>Sign In</Link>
                            <Link href="/register" className={`${buttonStyle}  hover:text-blue-300 hover:underline text-white`}>Register</Link>
                        </div>
                    )}
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
                className={`md:hidden ${isOpen ? "block" : "hidden"} bg-gray-900 text-gray-200 py-2 mt-2 px-6`}
            >
                <Link href="/" className="block text-center text-white hover:text-blue-300 hover:underline py-2">Home</Link>
                <Link href="/about" className="block text-center text-white hover:text-blue-300 hover:underline py-2">About</Link>
                <Link href="/products" className="block text-center text-white hover:text-blue-300 hover:underline py-2">Products</Link>
                <Link href="/contact" className="block text-center text-white hover:text-blue-300 hover:underline py-2">Contact</Link>
                {session ? (
                    <div className="flex flex-col items-center space-y-2 mt-2">
                        <Link href="/profile" className={`${buttonStyle} hover:text-blue-300 hover:underline text-white w-full text-center`}>Profile</Link>
                        <button onClick={() => signOut()} className={`${buttonStyle} hover:text-red-400 hover:underline text-white w-full text-center`}>Sign Out</button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-2 mt-2">
                        <Link href="/signin" className={`${buttonStyle} hover:text-blue-300 hover:underline text-white w-full text-center`}>Sign In</Link>
                        <Link href="/register" className={`${buttonStyle} hover:text-blue-300 hover:underline text-white w-full text-center`}>Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}