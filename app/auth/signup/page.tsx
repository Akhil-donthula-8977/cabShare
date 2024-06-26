"use client"
import { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { ValidationError } from '@/lib/types';
import Image from 'next/image';
import image from "@/public/th.jpeg"
import { raleway } from '@/lib/fonts';
import { AddUser } from '@/actions/user.actions';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    gender: '',
    userName: '',
    rememberMe: false,
  });
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
   
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // set loading status

    const data = await AddUser(formData);
    //@ts-ignore
    if (data?.length > 0) {
      setValidationErrors(data);
      return;
    }
  
    if(data?.message=="user Saved successfully"){
      router.replace("/auth/signin")
    }
    

  };

  return (
    <div className={`font-sans ${raleway.className} text-gray-900 antialiased`}>
      <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
        <div>
          <h2 className="font-bold text-3xl flex items-center justify-evenly gap-5"><Image width={100} height={100} alt="cab" src={image} className='mix-blend-multiply'></Image> <span className="bg-[#f84525] text-white px-2 rounded-md">CAB SHARE</span></h2>
        </div>

        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <form >
            <div className="py-8">
              <center>
                <span className="text-2xl font-semibold">Sign Up</span>
              </center>
            </div>
            {validationErrors.length > 0 && (
              <div>
                <ul>
                  {validationErrors.map((error, index) => (
                    <div className='text-[9px] text-red-600' key={index}>{`${error.field}: ${error.message}`}</div>
                  ))}
                </ul>
              </div>
            )
            }
            <div>
              <label htmlFor="username" className="block font-medium text-sm text-gray-700">Username</label>
              <input
                id="username"
                name="userName"
                type="text"
                autoComplete="username"
                required
                className="input-field"
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="email" className="block font-medium text-sm text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="password" className="block font-medium text-sm text-gray-700">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  autoComplete="new-password"
                  className="input-field"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="phoneNumber" className="block font-medium text-sm text-gray-700">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                required
                className="input-field"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="gender" className="block font-medium text-sm text-gray-700">Gender</label>
              <select
                id="gender"
                name="gender"
                className="input-field"
                value={formData.gender}
                onChange={handleSelectChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="block mt-4">
              <label htmlFor="remember_me" className="flex items-center">
                <input
                  type="checkbox"
                  id="remember_me"
                  name="rememberMe"
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span className="ms-2 text-sm text-gray-600">Remember Me</span>
              </label>
            </div>

            <div className="flex items-center justify-end mt-4">
              <button
                onClick={handleSubmit}
                className="ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
