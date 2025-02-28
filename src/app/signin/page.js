"use client";

import { useState } from 'react';
import { useRouter } from 'next/compat/router';
import RootLayout from "../layout";
import bcrypt from 'bcryptjs';

export default function Signin() {
  const router = useRouter();
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
    console.log("signin submit button pushed");

    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      // http://localhost:3000
      // https://nextjs-kit-collective.onrender.com
      const url = "http://localhost:3000";
      const response = await fetch(`${url}/api/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username: formData.username, password: hashedPassword}),
      });
  
      if (!response.ok) {
        setStatusMessages("Error: "+response);
      }
  
      const data = await response.json();
      console.log("Success:", data.message);
  
      setFormData({
        username: "",
        password: "",
      });
  
      setStatusMessages("Signed in successfully!");
  
      {/*router.push("/profile");*/}
    } catch (error) {
      console.error("Error:", error);
      setStatusMessages("There was an issue signing you in. Please try again.");
    }
  };  

  return (
    <RootLayout>
      <div className="container bg-gray-100 mx-auto max-w-full px-6 py-8 flex justify-center">
        <section id="contactsect" className="container bg-gray-150 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
          <h4 id="contact-title" className="text-3xl text-gray-800 font-bold mb-6">Sign In</h4>
          <form onSubmit={handleSubmit}>
            <div id="contactform" className="space-y-6">
              {statusMessages && <p className="text-red-500">{statusMessages}</p>}

              <div>
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

              <div>
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

              <div className="mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-400 text-white rounded-md hover:bg-blue-500 focus:outline-none"
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </RootLayout>
  );
}
