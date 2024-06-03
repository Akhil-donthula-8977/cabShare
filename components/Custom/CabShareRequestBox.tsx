"use client";
import React, { useContext } from 'react';
import { FaMale } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaFemale } from "react-icons/fa";
import { FormData } from '@/lib/types';
import { Button } from '@chatscope/chat-ui-kit-react';
const CabShareRequestBox = ({ data }: { data: FormData }) => {
    const handleRequest = () => {

    }
    return (
        <div className='w-full border border-slate-300 p-4 rounded-md bg-gray-50 shadow-md'>
            <div className='flex flex-col gap-4 text-sm sm:text-base text-gray-700'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-start'>
                    <div className='flex-1 mb-2 sm:mb-0'>
                        <span className='font-bold text-gray-800'>Start:</span>
                        <span className='ml-1 text-gray-600 text-sm'>{data.startLocation}</span>
                    </div>
                    <div className='flex-1'>
                        <span className='font-bold text-gray-800'>Destination:</span>
                        <span className='ml-1 text-gray-600 text-sm'>{data.endLocation}</span>
                    </div>
                </div>
                <div>
                    <span className='font-bold text-gray-800'>Name:</span>
                    <span className='ml-1 text-gray-600 text-sm'>{data.name}</span>
                </div>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
                    <div className='flex-1 mb-2 sm:mb-0'>
                        <span className='font-bold text-gray-800'>People required:</span>
                        <span className='ml-1 text-gray-600 text-sm'>{data.numberOfPeople}</span>
                    </div>
                    <div className='flex-1'>
                        <div className='font-bold text-gray-800 flex items-center'>Required:
                            {data.male && <div className='ml-1 text-gray-600 text-sm flex items-end gap-1'>Only male  <FaMale className='text-blue-500 shadow-blue-500 shadow-sm ' /></div>}
                            {data.female && <div className='ml-1 text-gray-600 text-sm flex items-center gap-1'>Only female <FaFemale className='text-pink-500 shadow-pink-500 shadow-sm ' /></div>}
                            {data.anyone && <div className='ml-1 text-gray-600 text-sm flex items-center gap-1'>Anyone  <FaPeopleGroup className='text-black-500 shadow-slate-500 shadow-sm ' /></div>}
                        </div>
                    </div>
                    <div className='flex-1 mb-2 sm:mb-0'>
                        <span className='font-bold text-gray-800'>Date:</span>
                        <span className='ml-1 text-gray-600 text-sm'>{data.date}</span>
                    </div>
                </div>
                {data.split && (
                    <div>
                        <span className='font-bold text-gray-800'>Split per person:</span>
                        <span className='ml-1 text-gray-600 text-sm'>{data.splitMoney} rs</span>
                        <Button onClick={handleRequest}>send Request</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CabShareRequestBox;
