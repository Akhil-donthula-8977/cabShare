"use client"
import React, { useContext, useEffect, useState } from 'react';
import { NavLinks } from '@/constants';
import { raleway } from '@/lib/fonts';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import image from '@/public/th.jpeg';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';
import WebSocketContext from '../context/WebsocketContext';
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { usersConnected } from '@/actions/chats.action';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useRouter } from 'next/navigation';
const SideMenuBar = () => {
  const socketInstance = useContext(WebSocketContext);
  const pathname = usePathname();
  const { toast } = useToast();
  const params = useSearchParams();
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const handleClick = (id) => {
    const newQuery = { id: id };
    const baseUrl = window.location.origin; // Get the base URL of the current page
    const currentUrl = new URL("/chat", baseUrl); // Construct the URL with the base URL and pathname
    currentUrl.searchParams.set('id', id);
    router.push(currentUrl.href);
  }

  useEffect(() => {
    async function fetchData() {
      if (session?.user?._id && pathname.includes("/chat")) {
        const data = await usersConnected(session?.user?._id);
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data && data.connectedUsers && Array.isArray(data.connectedUsers)) {
          setUsers(data.connectedUsers);
        } else {
          console.error("Unexpected data format", data);
        }
      }
    }
    fetchData();
  }, [session?.user?._id, pathname]);

  return (
    <>
      {((pathname !== '/auth/signup') && (pathname !== '/auth/signin')) && (
        <section className={`flex flex-col items-center shadow-xl  h-full   ${pathname === '/chat' ? 'sm:w-[300px]' : ''}`}>
          <Link href="/">
            <Image src={image} height="100" width="100" alt="logo" />
          </Link>
          <div className={`${raleway.className} flex flex-col mt-10 h-lvh mr-4`}>
            {!pathname.includes('/chat') && (
              <ul className="flex flex-col justify-evenly w-64 p-4 bg-white rounded-lg ">
                {NavLinks.map((e, index) => (
                  <Link href={e.href} key={index}>
                    <li
                      className="flex items-center ml-1 mt-3 rounded-2xl p-2 gap-3 transition-shadow cursor-pointer hover:shadow-md"
                      style={{
                        boxShadow: `0 2px 4px ${e.color}40`, // Adding alpha (opacity) to the color directly
                      }}
                    >
                      <p className="text-2xl" style={{ color: e.color }}>
                        {e.icon}
                      </p>
                      <p className="text-md text-gray-700">{e.text}</p>
                    </li>
                  </Link>
                ))}
                <Button className="mt-5 p-2 bg-blue-500 text-white rounded-lg shadow hover:shadow-md transition" onClick={signOut}>
                  Sign Out
                </Button>
              </ul>

            )}
            {pathname.includes('chat') && (
              <div>
                <ScrollArea className="h-108 w-72 rounded-md border sm:ml-6 bg-white shadow-md">
                  <div className="p-4">
                    <h4 className="mb-4 text-sm font-medium leading-none text-center text-gray-700">Users</h4>
                    {users?.map((user, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-2 border-b cursor-pointer transition-colors duration-200 ${params.get("id") == user?._id ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                          }`}
                        onClick={() => handleClick(user?._id)}
                      >
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                          {user?.userName?.charAt(0)}
                        </div>
                        <div className="ml-3 text-sm">
                          {user?.userName}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SideMenuBar;
