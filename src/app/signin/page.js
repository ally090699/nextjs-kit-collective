"use client";

import { useState } from 'react';
import RootLayout from "../layout";
import { signIn } from "next-auth/react";


export default function Signin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [statusMessages, setStatusMessages] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      username: formData.username,
      password: formData.password,
      callbackUrl: "/profile",
    });

    if (result?.error) {
      console.error("Sign-in error:", result.error);
      setStatusMessages("Sign-in error:", result.error);
    } else {
      console.log("Signed in successfully!");
      setStatusMessages("Signed in successfully!");
    }
  };  

  return (
    <RootLayout>
      <div className="container bg-gray-100 mx-auto max-w-full px-6 py-8 flex justify-center">
        <section id="contactsect" className="container bg-gray-150 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
          <h4 id="contact-title" className="text-3xl text-gray-800 text-center font-bold mb-6">Sign In</h4>
          <form onSubmit={handleSubmit}>
            <div id="contactform" className="space-y-6 flex flex-col items-center">
              {statusMessages && <p className="text-red-500">{statusMessages}</p>}

              <div className='w-2/3'>
                <label htmlFor="username" className="block text-gray-700">Username</label>
                <input
                  type="text"
                  id="inputusername"
                  name="username"
                  placeholder="JaneDoe123"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full p-3 border-2 text-gray-500 rounded-md`}
                />
              </div>

              <div className='w-2/3'>
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                  type="password"
                  id="inputpassword"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-3 border-2 text-gray-500 rounded-md`}
                />
              </div>

              <div className="mt-6 flex justify-center items-center flex-col">
                <button
                  type="submit"
                  className="px-6 my-3 py-3 bg-blue-400 text-white rounded-md hover:bg-blue-500 focus:outline-none"
                >
                  Sign In
                </button>
                <button onClick={() => signIn("google")} className="px-6 my-3 py-3 bg-blue-400 text-white rounded-md hover:bg-blue-500 focus:outline-none">Sign in with Google</button>
                <button onClick={() => signIn("github")} className="px-6 my-3 py-3 bg-blue-400 text-white rounded-md hover:bg-blue-500 focus:outline-none">Sign in with Github</button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </RootLayout>
  );
}
