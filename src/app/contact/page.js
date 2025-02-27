"use client";

import { useState } from 'react';
import { useRouter } from 'next/compat/router';
import RootLayout from "../layout";

export default function Contact() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    status: '',
    productID: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    email: false,
    productID: false,
    message: false,
  });

  const [statusMessages, setStatusMessages] = useState({
    name: '',
    phone: '',
    email: '',
    productID: '',
    message: '',
  });

  const checkName = (name) => {
    const isValid = name.length >= 4 && /^[A-Za-z]+(\s[A-Za-z]+)*$/.test(name);
    setErrors((prev) => ({
      ...prev,
      name: !isValid,
    }));

    setStatusMessages((prev) => ({
      ...prev,
      name: !isValid ? "Name must be at least 4 characters long and contain only letters and spaces." : "",
    }));
  };

  const checkPhone = (phone) => {
    const isValid = /^\d{3} \d{3} \d{4}$/.test(phone);
    setErrors((prev) => ({
      ...prev,
      phone: !isValid,
    }));

    setStatusMessages((prev) => ({
      ...prev,
      phone: !isValid ? "Phone number must be in the format: 888 888 8888." : "",
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

  const checkProductID = (productID) => {
    const productCodes = ["SS101", "AA101", "SS102", "PS101"];
    const isValid = productCodes.includes(productID);
    setErrors((prev) => ({
      ...prev,
      productID: !isValid,
    }));

    setStatusMessages((prev) => ({
      ...prev,
      productID: !isValid ? "Invalid product ID. Please enter a valid product ID." : "",
    }));
  };

  const checkMessage = (message) => {
    const isValid = message.length >= 10 && message.length <= 300;
    setErrors((prev) => ({
      ...prev,
      message: !isValid,
    }));

    setStatusMessages((prev) => ({
      ...prev,
      message: !isValid ? "Message must be between 10 and 300 characters." : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'name') checkName(value);
    if (name === 'phone') checkPhone(value);
    if (name === 'email') checkEmail(value);
    if (name === 'productID') checkProductID(value);
    if (name === 'message') checkMessage(value);
  };

  const handleRadioChange = (e) => {
    e.persist();
    setFormData((prev) => ({ ...prev, status: e.target.id }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      status: formData.status || "General Inquiry",
      productID: formData.productID.trim() || null,
      message: formData.message.trim(),
    };
  
    if (!validData.name || !validData.email || !validData.message) {
      setStatusMessages((prev) => ({
        ...prev,
        general: "Please fill in all required fields.",
      }));
      return;
    }
  
    try {
      const url = "https://nextjs-kit-collective.onrender.com";
      const response = await fetch(`${url}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validData),
      });
  
      if (!response.ok) {
        throw new Error("Server Error");
      }
  
      const data = await response.json();
      console.log("Success:", data.message);
  
      setFormData({
        name: "",
        phone: "",
        email: "",
        status: "",
        productID: "",
        message: "",
      });
  
      setStatusMessages((prev) => ({
        ...prev,
        general: "Form submitted successfully!",
      }));
  
      {/*router.push("/thankyou");*/}
    } catch (error) {
      console.error("Error:", error);
      setStatusMessages((prev) => ({
        ...prev,
        general: "There was an issue submitting the form. Please try again.",
      }));
    }
  };  

  return (
    <RootLayout>
      <div className="container bg-gray-100 mx-auto max-w-full px-6 py-8 flex justify-center">
        <section id="contactsect" className="container bg-gray-150 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
          <h4 id="contact-title" className="text-3xl text-gray-800 font-bold mb-6">📞 Contact Us</h4>
          <form onSubmit={handleSubmit}>
            <div id="contactform" className="space-y-6">
              {statusMessages.general && <p className="text-red-500">{statusMessages.general}</p>}

              <div>
                <label htmlFor="name" className="block text-gray-700">Name <span className={errors.name ? "text-red-500" : ""}>*</span></label>
                <input
                  type="text"
                  id="inputname"
                  name="name"
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => checkName(formData.name)}
                  className={`w-full p-3 border-2 text-gray-500 rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {statusMessages.name && <p className="text-sm text-red-500">{statusMessages.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  id="inputphone"
                  name="phone"
                  placeholder="888 888 8888"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={() => checkPhone(formData.phone)}
                  className={`w-full p-3 border-2 text-gray-500 rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {statusMessages.phone && <p className="text-sm text-red-500">{statusMessages.phone}</p>}
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
                <h6 className="text-xl text-gray-800 font-semibold">Reason for Message</h6>
                {["General Inquiry", "Pricing", "Product Info", "Shipping", "Other"].map((label) => {
                  const id = label.toLowerCase().replace(/\s+/g, '');
                  return (
                    <div key={id} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="status"
                        id={id}
                        onChange={handleRadioChange}
                        checked={formData.status === id}
                        className="h-5 w-5 text-gray-700"
                      />
                      <label htmlFor={id} className="text-gray-500">{label}</label>
                    </div>
                  );
                })}
              </div>

              {formData.status === "productinfo" && (
                <div>
                  <label htmlFor="productnum" className="block text-gray-700">Product ID</label>
                  <input
                    type="text"
                    id="productnum"
                    name="productID"
                    value={formData.productID}
                    onChange={handleChange}
                    onBlur={() => checkProductID(formData.productID)}
                    className={`w-full p-3 border-2 text-gray-500 rounded-md ${errors.productID ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {statusMessages.productID && <p className="text-sm text-red-500">{statusMessages.productID}</p>}
                </div>
              )}

              <div>
                <label htmlFor="msg" className="block text-gray-700">Message <span className={errors.message ? "text-red-500" : ""}>*</span></label>
                <textarea
                  id="inputMessage"
                  name="message"
                  placeholder="Enter message here ..."
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => checkMessage(formData.message)}
                  className={`w-full p-3 border-2 text-gray-500 rounded-md ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {statusMessages.message && <p className="text-sm text-red-500">{statusMessages.message}</p>}
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
