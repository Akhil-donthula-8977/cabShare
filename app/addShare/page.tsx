"use client"
import React, { useRef, useState,useCallback ,MouseEventHandler, LegacyRef,ChangeEvent, FormEvent, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { raleway } from '@/lib/fonts';
import {Autocomplete, useJsApiLoader} from '@react-google-maps/api';
import { Toast } from '@/components/Custom/Toast';
import { Modal } from '@/components/Custom/Modal';
import { Coordinates, FormErrors, FormData } from '@/lib/types';
import useModal from '../(hooks)/useModal';
import { geocodeAddress } from '@/utils/locationUtils';
const libraries = ['places',"geocoding"];
const Page = () => {
  const [modalOpen, handleModalOpen, handleModalClose] = useModal(false);
  const originref=useRef<HTMLInputElement>(null);
  const destRef=useRef<HTMLInputElement>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API || '',
    libraries: ['places', 'geocoding'], // Specify libraries as strings
  });

  const handleClick = () => {
    const toastContainer = document.createElement('div'); // Create a container div for the toast
    document.body.prepend(toastContainer);
    if (ReactDOM && ReactDOM.render) {
      ReactDOM.render(<Toast />, toastContainer);
    } else {
      console.error('ReactDOM is not available or not properly imported.');
    }
  };
  const [formData, setFormData] = useState<FormData>({
    name: '',
    numberOfPeople: 1,
    anyone: false,
    split: false,
    startLocation: [0, 0],
    endLocation: [0, 0],
    date: new Date().toISOString().slice(0, 10),
  });
  const [selected, setSelected] = useState<Date>();
  const [errors, setErrors] = useState<FormErrors>({});
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!originref.current || !destRef.current)return;
    const origin=await geocodeAddress(originref.current?.value)
    const dest=await geocodeAddress(destRef.current?.value);
   console.log("origin",origin,"dest",dest)
    const submissionData = {
      ...formData,
      numberOfPeople: Number(formData.numberOfPeople),
      startLocation:origin,
      endLocation:dest,
      date: new Date(formData.date) 
    };
    console.log(submissionData)
  // api logic
  },[formData])

  if (!isLoaded) {
    return
    <main className={`mt-2 ${raleway.className} font-semibold`}>
      <p>Loading...</p>
    </main>
  }
  return (
    <div className={`${raleway.className}`}>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4" onClick={handleModalOpen}>Open Modal</button>
      <Modal isOpen={modalOpen} onClose={handleModalClose} />
      <Button onClick={handleClick}>Click me</Button>
      <div className={`h-auto flex flex-col items-center justify-start  py-12 px-4 sm:px-6 lg:px-8 ${raleway.className}`}>
        <div className="max-w-md w-full space-y-8">
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Share Transport Request</h1>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
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
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="numberOfPeople" className='mt-3'>Number of People</label>
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
                {errors.numberOfPeople && <p className="mt-2 text-sm text-red-600">{errors.numberOfPeople.message}</p>}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="anyone"
                name="anyone"
                type="checkbox"
                checked={formData.anyone}
                onChange={(e) => setFormData({ ...formData, anyone: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="anyone" className="ml-2 block text-sm text-gray-900">
                Anyone
              </label>
              {errors.anyone && <p className="mt-2 text-sm text-red-600">{errors.anyone.message}</p>}
            </div>

            <div className="flex items-center">
              <input
                id="split"
                name="split"
                type="checkbox"
                checked={formData.split}
                onChange={(e) => setFormData({ ...formData, split: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="split" className="ml-2 block text-sm text-gray-900">
                Split
              </label>
              {errors.split && <p className="mt-2 text-sm text-red-600">{errors.split.message}</p>}
            </div>

            <div>
              <label htmlFor="startLocation" className="block text-sm font-medium text-gray-700">
                Start Location
              </label>
              <Autocomplete>
                <input
                  id="startLocation"
                  name="startLocation"
                  type="text"
                  autoComplete="startLocation"
                  required
                  ref={originref}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Metaplly , telangana"
                />
              </Autocomplete>
            </div>
            <div>
              <label htmlFor="endLocation" className="block text-sm font-medium text-gray-700">
                End Location
              </label>
              <Autocomplete>
                <input
                  id="endLocation"
                  name="endLocation"
                  type="text"
                  autoComplete="endLocation"
                  required
                  ref={destRef}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="siddipet , telangana"
                />
              </Autocomplete>
            </div>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border rounded p-2"
            />
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
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
