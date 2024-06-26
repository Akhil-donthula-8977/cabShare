import React from 'react';
import { MdOutlineLocalTaxi } from 'react-icons/md';
import { IoChatboxOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import { MdOutlineReportProblem } from "react-icons/md";
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
    color:"orange"
  },
  {
    href: '/chat',
    key: 'chat',
    text: 'chat',
    icon:<IoChatboxOutline />,
    color:"blue"
  },
  {
    href: '/requests',
    key: 'requests',
    text: 'requests',
    icon:<IoIosNotificationsOutline />,
    color:"brown"
  },
  {
    href: '/activeRides',
    key: 'activeRides',
    text: 'Active cabShares',
    icon:<MdNotificationsActive />,
    color:"brown"
  },
  {
    href: '/report',
    key: 'report issue',
    text: 'Report issue',
    icon:<MdOutlineReportProblem />,
    color:"red"
  }
];
