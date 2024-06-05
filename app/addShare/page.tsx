"use client"
import React, { useRef, useState, useCallback, MouseEventHandler, LegacyRef, ChangeEvent, FormEvent, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { raleway } from '@/lib/fonts';
import { Toast } from '@/components/Custom/Toast';
import { Modal } from '@/components/Custom/Modal';
import { Coordinates, FormErrors, FormData, ValidationError } from '@/lib/types';
import useModal from '../(hooks)/useModal';
import LocationSearchBox from '@/components/Custom/LocationSearchBox';
import { FaMale } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaFemale } from "react-icons/fa";
import { getShareRequest } from '@/actions/shareRequest.action';
import { useSession } from 'next-auth/react';
const Page = () => {
  const [splitBox, setSplitbox] = useState<boolean>(false);
  const { data: session, status } = useSession()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    numberOfPeople: 1,
    anyone: false,
    male: false,
    female: false,
    split: false,
    splitMoney: 0,
    startLocation: "",
    endLocation: "",
    date: new Date().toISOString().slice(0, 10),
    startLocationCoords: { type: "point", coordinates: [0, 0] },
    endLocationCoords: { type: "point", coordinates: [0, 0] },
  });
  const [selected, setSelected] = useState<Date>();
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const handleClick = () => {
    const toastContainer = document.createElement('div'); // Create a container div for the toast
    document.body.prepend(toastContainer);
    const root = createRoot(toastContainer);
    root.render(<Toast />);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name == "split") {
      // @ts-ignore
      if (e.target.checked) setSplitbox(true)
      else setSplitbox(false)
      setFormData({ ...formData, ["split"]: e.target.checked })
      return;
    }

    if (name == "male" || name == "female" || name == "anyone") {
      // @ts-ignore
      if (name == "male") {
        setFormData({ ...formData, [name]: e.target.checked, ["female"]: false, ["anyone"]: false })
      }
      // @ts-ignore
      else if (name == "female") {
        setFormData({ ...formData, [name]: e.target.checked, ["male"]: false, ["anyone"]: false })
      }
      // @ts-ignore
      else {
        setFormData({ ...formData, [name]: e.target.checked, ["male"]: false, ["female"]: false })

      }
      return;
    }
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finData = {
      ...formData,
      userOwner: session?.user?._id
    }
    const data = await getShareRequest(finData);
    //@ts-ignore
    if (data?.length > 0) {
      setValidationErrors(data);
      return;
    }
    handleClick();
    console.log(data)

  }, [{ ...formData }])

  return (
    <div className={`${raleway.className}`}>
      <div className={`h-auto flex flex-col items-center justify-start  py-12 px-4 sm:px-6 lg:px-8 ${raleway.className}`}>
        <div className="max-w-md w-full space-y-8">
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Share Transport Request</h1>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {validationErrors.length > 0 && (
              <div>
                <ul>
                  {validationErrors.map((error, index) => (
                    <div className='text-[9px] text-red-600' key={index}>{`${error.field}: ${error.message}`}</div>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="mb-1">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className=''>
                <label htmlFor="numberOfPeople" className=' mb-1'>Number of People</label>
                <input
                  id="numberOfPeople"
                  name="numberOfPeople"
                  type="number"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Number of People"
                  value={formData.numberOfPeople}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label> select gender priority:</label>
              <div className="flex gap-6 border w-fit p-3 rounded-sm">
                <div className='flex items-center'>
                  <input
                    id="anyone"
                    name="anyone"
                    type="checkbox"
                    checked={formData.anyone}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <div>
                    <label htmlFor="anyone" className="ml-2 flex flex-row  items-center gap-1 text-sm text-gray-900">
                      Anyone <FaPeopleGroup className='text-black-500 shadow-slate-500 shadow-sm ' />
                    </label>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="male"
                    name="male"
                    type="checkbox"
                    checked={formData.male}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />

                  <label htmlFor="anyone" className="ml-2 flex flex-row  items-center  gap-1 text-sm text-gray-900">
                    Only male <FaMale className='text-blue-500 shadow-blue-500 shadow-sm ' />
                  </label>
                </div>
                <div className="flex items-center ">
                  <input
                    id="female"
                    name="female"
                    type="checkbox"
                    checked={formData.female}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="anyone" className="ml-2 flex flex-row  items-center  gap-1 text-sm text-gray-900">
                    Only female <FaFemale className='text-pink-500 shadow-pink-500 shadow-sm ' />
                  </label>
                </div>
              </div>
            </div>
            <div className='flex'>
              <div className="flex flex-row">
                <input
                  id="split"
                  name="split"
                  type="checkbox"
                  checked={formData.split}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
              <label htmlFor="split" className="ml-2 block text-sm text-gray-900">
                Split Your money
              </label>
            </div>
            {splitBox && (
              <div>
                <label>Enter the money</label>
                <input
                  id="splitMoney"
                  name="splitMoney"
                  type="number"
                  value={formData.splitMoney}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            )}


            <div>
              <label htmlFor="startLocation" className="block text-sm font-medium text-gray-700">
                Start Location:
              </label>
              <LocationSearchBox value={formData.startLocation} formLocationsData={formData} name={"startLocation"} coords={"startLocationCoords"} setResult={setFormData} ></LocationSearchBox>
            </div>
            <div>
              <label htmlFor="endLocation" className="block text-sm font-medium text-gray-700">
                End Location
              </label>
              <LocationSearchBox value={formData.endLocation} formLocationsData={formData} name={"endLocation"} coords={"endLocationCoords"} setResult={setFormData} ></LocationSearchBox>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm mb-1 font-medium text-gray-700">
                Date You want to Tavel
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border rounded p-2"
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
