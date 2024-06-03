"use client"
import React from 'react';
import { NavLinks } from '@/constants';
import { raleway } from '@/lib/fonts';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import image from '@/public/th.jpeg';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

const SideMenuBar = () => {
  const pathname = usePathname();
  console.log(pathname)
  return (
    <>
      {((pathname !== '/auth/signup') && (pathname !== '/auth/signin')) && (
        <section className={`flex flex-col items-center sm:w-[200px] ${pathname === '/chat' ? 'sm:w-[300px]' : ''}`}>
          <Link href="/">
            <Image src={image} height="100" width="100" alt="logo" />
          </Link>
          <div className={`${raleway.className} flex flex-col mt-10 h-lvh mr-4`}>
            <ul className={`flex flex-col justify-evenly ${pathname === '/chat' ? 'hidden' : ''}`}>
              {NavLinks.map((e, index) => (
                <Link href={e.href} key={index}>
                  <li className="flex items-center ml-1 mt-3 rounded-[48px] p-1 gap-[10px]">
                    <p className="text-[16px] sm:ml-3" style={{ color: e.color }}>
                      {e.icon}
                    </p>
                    <p className="text-[14px]">{e.text}</p>
                  </li>
                </Link>
              ))}
              <Button className='mt-5' onClick={() => {
                signOut()
              }}>Signout</Button>
            </ul>

          </div>
        </section>
      )}
    </>
  );
};

export default SideMenuBar;
