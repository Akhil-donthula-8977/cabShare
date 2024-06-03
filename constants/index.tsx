import React from 'react';
import { MdOutlineLocalTaxi } from 'react-icons/md';
import { IoChatboxOutline } from "react-icons/io5";

export interface MyObject {
  href: string;
  icon?: React.ReactNode; // Use React.ReactNode for JSX elements
  key: string;
  text: string;
  color:string|"black";
}

export const NavLinks: MyObject[] = [
  {
    href: '/addShare',
    key: 'share A cab',
    text: 'share a cab',
    icon: <MdOutlineLocalTaxi className='text-2xl sm:text-3xl' />,
    color:"red"
  },
  {
    href: '/chat',
    key: 'chat',
    text: 'chat',
    icon:<IoChatboxOutline />,
    color:"blue"
  },
];
