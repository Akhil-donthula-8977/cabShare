import React from 'react';
import { MdOutlineLocalTaxi } from 'react-icons/md';
import { IoChatboxOutline } from "react-icons/io5";

interface MyObject {
  href: string;
  icon?: React.ReactNode; // Use React.ReactNode for JSX elements
  key: string;
  text: string;
}

export const NavLinks: MyObject[] = [
  {
    href: '/addShare',
    key: 'share A cab',
    text: 'share a cab',
    icon: <MdOutlineLocalTaxi className='text-2xl sm:text-3xl' />,
  },
  {
    href: '/',
    key: 'chat',
    text: 'chat',
    icon:<IoChatboxOutline />
  },
];
