import { useRef } from "react";
import { Button } from "../ui/button";
export const Toast = () => {
    const res = useRef<HTMLDivElement>(null);
    const handleRemove = () => {
      if (res.current) {
        res.current.remove();
      }
    };
    return (
      <div ref={res} className='w-full h-[50px] flex flex-row items-center justify-center text-center bg-green-600 text-white'>
        hello
        <Button className="h-[25px] text-center ml-2" onClick={handleRemove}>remove</Button>
      </div>
    );
  };