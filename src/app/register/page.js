"use client";

import { useState } from 'react';
import { useRouter } from 'next/compat/router';
import RootLayout from "../layout";
import bcrypt from 'bcryptjs';
import { isValidPhoneNumber } from 'libphonenumber-js';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    username: false,
    email: false,
    password: false,
    phone: false,
  });

  const [statusMessages, setStatusMessages] = useState({
    general: '',
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const checkFirstname = (firstname) => {
    const isValid = firstname.length >= 2 && /^[A-Za-z]+(\s[A-Za-z]+)*$/.test(firstname);
    setErrors((prev) => ({
      ...prev,
      firstname: !isValid,
    }));

    setStatusMessages((prev) => ({
      ...prev,
      firstname: !isValid ? "First name must be at least 4 characters long and contain only letters and spaces." : "",
    }));
  };

  const checkLastname = (lastname) => {
    const isValid = lastname.length >= 2 && /^[A-Za-z]+(\s[A-Za-z]+)*$/.test(lastname);
    setErrors((prev) => ({
      ...prev,
      lastname: !isValid,
    }));

    setStatusMessages((prev) => ({
      ...prev,
      lastname: !isValid ? "Last name must be at least 4 characters long and contain only letters and spaces." : "",
    }));
  };

  const checkUsername = (username) => {
    const isValid = username.length >= 4 && /^[A-Za-z0-9\s\-_*]+$/.test(username);
    setErrors((prev) => ({
      ...prev,
      username: !isValid,
    }));

    setStatusMessages((prev) => ({
      ...prev,
      username: !isValid ? "User name must be at least 4 characters long and contain only letters, numbers, spaces, and the following characters -_*." : "",
    }));
  };

  const checkEmail = (email) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setErrors((prev) => ({
      ...prev,
      email: !isValid,
    }));

    setStatusMessages((prev) => ({
      ...prev,
      email: !isValid ? "Please enter a valid email address." : "",
    }));
  };

  const checkPassword = (password) => {
    const isValid = password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/.test(password);
    setErrors((prev) => ({
      ...prev,
      password: !isValid,
    }));

    setStatusMessages((prev) => ({
      ...prev,
      password: !isValid ? "Password must be at least 8 characters long and contain one lowercase letter, one uppercase letter, one number and one symbol." : "",
    }));
  };

  const checkPhone = (phone) => {
    const isValid = isValidPhoneNumber(phone, 'CA');
    setErrors((prev) => ({
      ...prev,
      phone: !isValid,
    }));

    setStatusMessages((prev) => ({
      ...prev,
      phone: !isValid ? "Please enter a valid CA phone number." : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'firstname') checkFirstname(value);
    if (name === 'lastname') checkLastname(value);
    if (name === 'username') checkUsername(value);
    if (name === 'email') checkEmail(value);
    if (name === 'password') checkPassword(value);
    if (name === 'phone') checkPhone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validData = {
      firstname: formData.firstname.trim() || "",
      lastname: formData.lastname.trim() || "",
      username: formData.username.trim(),
      email: formData.email,
      password: formData.password,
      phone: formData.phone.trim() || ""
    };
  
    if (!validData.username || !validData.email || !validData.password) {
      setStatusMessages((prev) => ({
        ...prev,
        general: "Please fix the required fields.",
      }));
      return;
    }
  
    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const url = "https://nextjs-kit-collective.onrender.com";
      const response = await fetch(`${url}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: validData.firstname,
          lastname: validData.lastname,
          username: validData.username,
          email: validData.email,
          password: hashedPassword,
          phone: validData.phone
         }),
      });
  
      if (!response.ok) {
        setStatusMessages((prev) => ({
          ...prev,
          general: "Error: "+response,
        }));
        return
      }
  
      const data = await response.json();
      console.log("Success:", data.message);
  
      setFormData({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        phone: '',
      });
  
      setStatusMessages((prev) => ({
        ...prev,
        general: "Registered user successfully!",
      }));
  
      {/*router.push("/thankyou");*/}
    } catch (error) {
      console.error("Error:", error);
      setStatusMessages((prev) => ({
        ...prev,
        general: "There was an issue with the registration. Please try again.",
      }));
    }
  };  

  return (
    <RootLayout>
      <div className="container bg-gray-100 mx-auto max-w-full px-6 py-8 flex justify-center">
        <section id="contactsect" className="container bg-gray-150 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
          <h4 id="contact-title" className="text-3xl text-gray-800 font-bold mb-6">Register</h4>
          <form onSubmit={handleSubmit} method="POST">
            <div id="contactform" className="space-y-6">
              {statusMessages.general && <p className="text-red-500">{statusMessages.general}</p>}

              <div>
                <label htmlFor="firstname" className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  id="inputfirstname"
                  name="firstname"
                  placeholder="Jane"
                  value={formData.firstname}
                  onChange={handleChange}
                  onBlur={() => checkFirstname(formData.firstname)}
                  className={`w-full p-3 border-2 text-gray-500 rounded-md ${errors.firstname ? 'border-red-500' : 'border-gray-300'}`}
                />
                {statusMessages.firstname && <p className="text-sm text-red-500">{statusMessages.firstname}</p>}
              </div>

              <div>
                <label htmlFor="lastname" className="block text-gray-700">Last Name </label>
                <input
                  type="text"
                  id="inputlastname"
                  name="lastname"
                  placeholder="Doe"
                  value={formData.lastname}
                  onChange={handleChange}
                  onBlur={() => checkLastname(formData.lastname)}
                  className={`w-full p-3 border-2 text-gray-500 rounded-md ${errors.lastname ? 'border-red-500' : 'border-gray-300'}`}
                />
                {statusMessages.lastname && <p className="text-sm text-red-500">{statusMessages.lastname}</p>}
              </div>

              <div>
                <label htmlFor="username" className="block text-gray-700">Username <span className={errors.username ? "text-red-500" : ""}>*</span></label>
                <input
                  type="text"
                  id="inputusername"
                  name="username"
                  placeholder="janedoe123"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={() => checkUsername(formData.username)}
                  className={`w-full p-3 border-2 text-gray-500 rounded-md ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {statusMessages.username && <p className="text-sm text-red-500">{statusMessages.username}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700">Email <span className={errors.email ? "text-red-500" : ""}>*</span></label>
                <input
                  type="email"
                  id="inputemail"
                  name="email"
                  placeholder="janedoe123@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => checkEmail(formData.email)}
                  className={`w-full p-3 border-2 text-gray-500 rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {statusMessages.email && <p className="text-sm text-red-500">{statusMessages.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700">Password <span className={errors.password ? "text-red-500" : ""}>*</span></label>
                <input
                  type="password"
                  id="inputpassword"
                  name="password"
                  placeholder="Enter a password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => checkPassword(formData.password)}
                  className={`w-full p-3 border-2 text-gray-500 rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {statusMessages.password && <p className="text-sm text-red-500">{statusMessages.password}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  id="inputphone"
                  name="phone"
                  placeholder="1234567899"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={() => checkPhone(formData.phone)}
                  className={`w-full p-3 border-2 text-gray-500 rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {statusMessages.phone && <p className="text-sm text-red-500">{statusMessages.phone}</p>}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-400 text-white rounded-md hover:bg-blue-500 focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </RootLayout>
  );
}
