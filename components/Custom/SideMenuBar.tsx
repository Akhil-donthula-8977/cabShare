
"use client";
import React, { useContext, useEffect, useState } from "react";
import { NavLinks } from "@/constants";
import { raleway } from "@/lib/fonts";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import image from "@/public/th.jpeg";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import WebSocketContext from "../context/WebsocketContext";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { usersConnected } from "@/actions/chats.action";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useRouter } from "next/navigation";
import { MdOutlineMenuOpen } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import MenuLoader from "./MenuLoader";
const SideMenuBar = () => {
  const socketInstance = useContext(WebSocketContext);
  const pathname = usePathname();
  const { toast } = useToast();
  const params = useSearchParams();
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleClick = (id) => {
    const newQuery = { id: id };
    const baseUrl = window.location.origin;
    const currentUrl = new URL("/chat", baseUrl);
    currentUrl.searchParams.set('id', id);
    router.push(currentUrl.href);
  };

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

  if (status === "loading") {
    return <MenuLoader />;
  }

  const menuContent = (
    <div className={`flex flex-col items-center bg-orange-100 shadow-xl h-full ${pathname === '/chat' ? 'sm:w-[300px]' : ''}`}>
      <Link href="/">
        <Image src={image} height="100" width="100" alt="logo" className="mix-blend-multiply" priority />
      </Link>
      <div className={`${raleway.className} flex flex-col mt-10 h-lvh mr-4`}>
        {!pathname.includes('/chat') && (
          <ul className="flex flex-col justify-evenly w-64 p-4 rounded-lg ">
            {NavLinks.map((e, index) => (
              <Link href={e.href} key={index}>
                <li
                  className="flex items-center ml-1 mt-3 rounded-2xl p-2 gap-3 transition-shadow cursor-pointer  bg-orange-200 border-orange-500 hover:shadow-md hover:mx-1"
                  style={{
                    boxShadow: `0 2px 4px ${e.color}40`,
                  }}
                >
                  <p className="text-2xl" style={{ color: e.color }}>
                    {e.icon}
                  </p>
                  <p className="text-md text-gray-700">{e.text}</p>
                </li>
              </Link>
            ))}
            <Button className="mt-5 p-2 bg-orange-600 text-white rounded-lg shadow hover:shadow-md transition" onClick={() => { signOut({ callbackUrl: "https://cabshare-1.onrender.com/auth/signin" }) }}>
              Sign Out
            </Button>
          </ul>
        )}
        {pathname.includes('chat') && (
          <div className="flex flex-col w-60 sm:w-70 ml-2">
            <ScrollArea className="h-96 w-full rounded-md border bg-white shadow-md m">
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none text-center text-gray-700">Users</h4>
                {users?.map((user, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-2 border-b cursor-pointer transition-colors duration-200 ${params.get("id") == user?._id ? "bg-orange-100 text-orange-800" : "hover:bg-gray-100"
                      }`}
                    onClick={() => handleClick(user?._id)}
                  >
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
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
    </div>
  );

  return (
    <>
      {((pathname !== '/auth/signup') && (pathname !== '/auth/signin')) && (
        <>
          <div className="hidden sm:flex">
            {menuContent}
          </div>
          <div className="sm:hidden">
            <button
              className="m-4 p-2 bg-orange-500 text-white rounded-lg shadow hover:shadow-md transition"
              onClick={() => setDrawerOpen(true)}
            >
              <MdOutlineMenuOpen />
            </button>
            {drawerOpen && (
              <div className="fixed inset-0 z-50 flex">
                <div className="relative w-64 bg-white h-full shadow-xl z-50">
                  <button
                    className="absolute top-4 right-4 p-2 bg-orange-500 text-white rounded-full shadow hover:shadow-md transition"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <IoMdClose />
                  </button>
                  {menuContent}
                </div>
                <div
                  className="fixed inset-0 bg-black opacity-50 z-40"
                  onClick={() => setDrawerOpen(false)}
                ></div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SideMenuBar;
