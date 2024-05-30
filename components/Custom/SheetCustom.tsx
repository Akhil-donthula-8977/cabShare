"use client"
import React, { useState } from 'react';
import { LuMenuSquare } from "react-icons/lu";

import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
interface CompProps {
    children: React.ReactNode;
  }
  
 export const Comp = ({ children }: CompProps) => {
    return (
      <div>
        {children}
      </div>
    );
  };
const SheetCustom = () => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean|undefined>(true);

  return (
    <Sheet >
      <SheetTrigger asChild>
        <LuMenuSquare className='text-3xl text-black-700'/>
        </SheetTrigger>
      <SheetContent side={"left"} className="w-[200px] sm:w-[240px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
           
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SheetCustom;
