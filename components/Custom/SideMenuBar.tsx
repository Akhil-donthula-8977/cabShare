"use client"
import React from 'react'
import { NavLinks } from '@/constants'
import { raleway } from '@/lib/fonts';
import Link from 'next/link';
interface MyObject {
    href: string;
    icon?: React.ReactNode; // Use React.ReactNode for JSX elements
    key: string;
    text: string;
}

const SideMenuBar = () => {
    return (
        <div className={`${raleway.className}flex flex-col mt-10 h-lvh  mr-4  `}>
            <ul className='flex flex-col justify-evenly '>
                {
                    NavLinks.map((e: MyObject) => {

                        return (
                            <Link href={e.href}> 
                            <li className='flex items-center ml-1  border mt-5 rounded-[48px]  border-3 p-1 gap-[10px] '>    
                                <p className='text-[16px] sm:ml-3'>{e.icon}</p>
                                <p className='text-[12px]'>{e.text}</p>
                            </li>
                            </Link>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default SideMenuBar