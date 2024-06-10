"use client"
import { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import image from "@/public/th.jpeg";
import { raleway } from '@/lib/fonts';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  try {
    const data = {
      redirect: false,
      ...formData
  }
    const res = await signIn("credentials", data);
    
    if (!res?.ok) {
      setError("Invalid credentials");
    } else {
      setError("");
      router.push("/"); // Redirect to desired URL on successful login
    }
    console.log(res);
  } catch (error) {
    console.error("Error during form submission:", error);
    // Handle error gracefully, such as displaying an error message to the user
  }
};
//  if (status === "unauthenticated"){
//     router.replace("/auth/signin")
//   } 
  if(status=="authenticated"){
    router.replace("/")
  }

  return (
    <div className={`font-sans ${raleway.className} text-gray-900 antialiased`}>
      <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
        <div>
          <h2 className="font-bold text-3xl flex items-center justify-evenly gap-5"><Image width={100} height={100} alt="cab" src={image} className='mix-blend-multiply' /><span className="bg-[#f84525] text-white px-2 rounded-md">CAB SHARE</span></h2>
        </div>

        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          <form onSubmit={handleSubmit}  method="post"> {/* Add onSubmit handler to the form */}
            <div className="py-8">
              <center>
                <span className="text-2xl font-semibold">Log In</span>
              </center>
            </div>
            {error === "Invalid credentials" && <p className='text-red'>Invalid credentials</p>}
            <div>
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
                  autoComplete="current-password"
                  className="input-field"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <button
                    type="button" // Change type to "submit"
                    id="togglePassword"
                    className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600"
                  >
                    Toggle Password
                  </button>
                </div>
              </div>
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
              <a href="#" className="hover:underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Forgot your password?
              </a>
              <button
                type="submit" // Change type to "submit"
                className="ms-4 inline-flex items-center px-4 py-2 bg-[#f84525] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-800 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Sign In
              </button>
            </div>
            <h3 className='text-center'>Want to <span><Link href="/auth/signup" className='text-blue-900 underline-offset-2'>Sign up?</Link></span></h3>
          </form>

        </div>

      </div>
    </div>
  );
};

export default Login;
