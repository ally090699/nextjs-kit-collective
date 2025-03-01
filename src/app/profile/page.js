"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isValidPhoneNumber } from 'libphonenumber-js';
import { rating } from "../utils/ratings";
import { API_BASE_URL } from "../utils/constants";
import RootLayout from "../layout";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: session?.user?.firstname || "",
    lastname: session?.user?.lastname || "",
    password: "",
    confirmPassword: "",
    phone: session?.user?.phone || "",
  });

  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    password: false,
    confirmPassword: false,
    phone: false,
  });

  const [statusMessages, setStatusMessages] = useState({
    general: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [touched, setTouched] = useState({
    firstname: false,
    lastname: false,
    password: false,
    confirmPassword: false,
    phone: false,
  });

  if (status === "loading") {
    return (
    <div className="container bg-gray-100 mx-auto max-w-full px-6 py-8 justify-center">
      <h1 className="text-3xl font-bold block text-center text-gray-800">Loading...</h1>
    </div>
    );
  }

  if (!session) {
    router.push("/signin");
    return null;
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setFormData({
        firstname: session?.user?.firstname || "",
        lastname: session?.user?.lastname || "",
        password: "",
        confirmPassword: "",
        phone: session?.user?.phone || "",
      });
      setTouched({
        firstname: false,
        lastname: false,
        password: false,
        confirmPassword: false,
        phone: false,
      });
    }
  };

  const checkFirstname = (firstname) => {
    if (!touched.firstname) return;
    const isValid = firstname !== session.user.firstname && firstname.length >= 2 && /^[A-Za-z]+(\s[A-Za-z]+)*$/.test(firstname);
    setErrors((prev) => ({
      ...prev,
      firstname: !isValid,
    }));

    setStatusMessages((prev) => ({
      ...prev,
      firstname: !isValid ? "First name must be at least 2 characters long and contain only letters and spaces." : "",
    }));
  };

  const checkLastname = (lastname) => {
    if (!touched.lastname) return;
    const isValid = lastname !== session.user.lastname && lastname.length >= 2 && /^[A-Za-z]+(\s[A-Za-z]+)*$/.test(lastname);
    setErrors((prev) => ({
      ...prev,
      lastname: !isValid,
    }));

    setStatusMessages((prev) => ({
      ...prev,
      lastname: !isValid ? "Last name must be at least 2 characters long and contain only letters and spaces." : "",
    }));
  };

  const checkPassword = (password) => {
    if (!touched.password) return;
    if (!password) {
      setErrors((prev) => ({ ...prev, password: false }));
      setStatusMessages((prev) => ({ ...prev, password: '' }));
      return;
    }
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

  const checkConfirmPassword = (confirmPassword) => {
    if (!touched.confirmPassword) return;
    if (!confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: false }));
      setStatusMessages((prev) => ({ ...prev, confirmPassword: '' }));
      return;
    }
    const isValid = confirmPassword === formData.password;
    setErrors((prev) => ({
      ...prev,
      confirmPassword: !isValid,
    }));

    setStatusMessages((prev) => ({
      ...prev,
      confirmPassword: !isValid ? "Passwords must match." : "",
    }));
  };

  const checkPhone = (phone) => {
    if (!touched.phone) return;
    if (!phone) {
      setErrors((prev) => ({ ...prev, phone: false }));
      setStatusMessages((prev) => ({ ...prev, phone: '' }));
      return;
    }
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
    setTouched((prev) => ({ ...prev, [name]: true }));

    console.log(`Field ${name} touched:`, touched[name]);

    if (name === 'firstname') checkFirstname(value);
    if (name === 'lastname') checkLastname(value);
    if (name === 'password') checkPassword(value);
    if (name === 'confirmPassword') checkConfirmPassword(value);
    if (name === 'phone') checkPhone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data to be submitted:", formData);

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful update (e.g., show success message)
        console.log('User updated successfully');
        setIsEditing(false);
        //refresh the session.
        const updatedSession = await signIn("credentials", {
            username: session.user.username,
            password: formData.password,
            redirect: false,
        })
        console.log(updatedSession);

        router.refresh();
      } else {
        const errorData = await response.json();
        setStatusMessages({ general: errorData.error || 'Failed to update user' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setStatusMessages({ general: 'Failed to update user' });
    }
  };


  return (
    <RootLayout>
      <div className="container bg-gray-100 mx-auto max-w-full px-6 py-8 justify-center">
        <h1 className="text-3xl font-bold block text-center text-gray-800 mb-6">Welcome, {session.user.first_name}!</h1>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-2xl text-gray-700 font-bold">Profile</p>
            <p className="py-2 block text-gray-700">Signed in as {session.user.username}</p>
            <p className="py-2 block text-gray-700">Email: {session.user.email}</p>
          </div>
          <div className="flex flex-col">
            <button onClick={toggleEdit} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>      
            <button onClick={() => signOut()} className="px-4 my-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none">Sign out</button>
          </div>
        </div>
        <hr className="pt-3 mt-2"/>

        {/* Edit Profile Section */}
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="py-2">
              <label htmlFor="firstname" className="text-gray-700">First Name</label>
              <input
                type="text"
                id="inputfirstname"
                name="firstname"
                value={formData.firstname}
                placeholder={session.user.first_name}
                onChange={handleChange}
                onBlur={() => checkFirstname(formData.firstname)}
                className={`w-full p-3 border-2 rounded-md ${errors.firstname ? 'border-red-500' : 'border-gray-300'}  ${touched.firstname ? 'text-blue-500' : 'text-gray-500'}`}
                disabled={!isEditing}
              />
              {statusMessages.firstname && <p className="text-sm text-red-500">{statusMessages.firstname}</p>}
            </div>

            <div className="py-2">
              <label htmlFor="lastname" className="text-gray-700">Last Name </label>
              <input
                type="text"
                id="inputlastname"
                name="lastname"
                value={formData.lastname}
                placeholder={session.user.last_name}
                onChange={handleChange}
                onBlur={() => checkLastname(formData.lastname)}
                disabled={!isEditing}
                className={`w-full p-3 border-2 rounded-md ${errors.lastname ? 'border-red-500' : 'border-gray-300'}  ${touched.lastname ? 'text-blue-500' : 'text-gray-500'}`}
              />
              {statusMessages.lastname && <p className="text-sm text-red-500">{statusMessages.lastname}</p>}
            </div>
            
            <div className="py-2">
              <label htmlFor="password" className="text-gray-700">Password</label>
              <input
                type="password"
                id="inputpassword"
                name="password"
                placeholder="Enter a new password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => checkPassword(formData.password)}
                disabled={!isEditing}
                className={`w-full p-3 border-2 rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}  ${touched.password ? 'text-blue-500' : 'text-gray-500'}`}
              />
              {statusMessages.password && <p className="text-sm text-red-500">{statusMessages.password}</p>}
            </div>
            {touched.password ? (
              <div className="py-2">
                <label htmlFor="password" className="text-gray-700">Confirm Password <span className={errors.confirmPassword ? "text-red-500" : ""}>*</span></label>
                <input
                  type="password"
                  id="inputconfirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={() => checkConfirmPassword(formData.confirmPassword)}
                  disabled={!isEditing}
                  className={`w-full p-3 border-2 rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} ${touched.confirmPassword ? 'text-blue-500' : 'text-gray-500'}`}
                  required
                />
                {statusMessages.confirmPassword && <p className="text-sm text-red-500">{statusMessages.confirmPassword}</p>}
              </div>
            ) : (<></>)}
            
            <div className="py-2">
              <label htmlFor="phone" className="text-gray-700">Phone Number</label>
              <input
                type="text"
                id="inputphone"
                name="phone"
                placeholder={session.user.phone_number}
                value={formData.phone}
                onChange={handleChange}
                onBlur={() => checkPhone(formData.phone)}
                disabled={!isEditing}
                className={`w-full p-3 border-2 rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}  ${touched.phone ? 'text-blue-500' : 'text-gray-500'}`}
              />
              {statusMessages.phone && <p className="text-sm text-red-500">{statusMessages.phone}</p>}
            </div>

            <div className="my-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-400 text-white rounded-md hover:bg-blue-500 focus:outline-none"
              >
                Submit Changes
              </button>
            </div>
          </form>
        ) : (<></>)}
        
        {/** User Product Reviews */}
        <div className="p-4 sm:p-6 flex justify-center flex-col bg-white">
          <h4 className="text-lg font-bold text-gray-800">Product Reviews</h4>
          <div>
          {session?.user?.product_reviews?.length > 0 ? (
              session.user.product_reviews.map((review) => (
                  <div key={review.review_id} className="mb-2 mt-2 p-4 border rounded-md">
                      <div className="flex justify-between">
                          <p className="font-semibold text-gray-500">Rating: {rating(review.rating)}</p>
                          <p className="text-gray-400">Product: {review.product?.name}</p>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                      <p className="text-sm text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                  </div>
              ))
          ) : (
              <p className="text-gray-600">No reviews yet.</p>
          )}
          </div>
        </div>
      </div>
    </RootLayout>
  );
}