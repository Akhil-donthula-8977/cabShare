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
      <div ref={res} className='w-full h-[10px] text-center bg-gray-300'>
        hello
        <Button onClick={handleRemove}>remove</Button>
      </div>
    );
  };