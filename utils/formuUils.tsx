import ReactDOM  from "react";
import { Toast } from "@/components/Custom/Toast";
export const UpperToastClick = () => {
    const toastContainer = document.createElement('div'); // Create a container div for the toast
    document.body.prepend(toastContainer);
      //@ts-ignore
    if (ReactDOM && ReactDOM.render) {
        //@ts-ignore
      ReactDOM.render(<Toast/>), toastContainer;
    } else {
      console.error('ReactDOM is not available or not properly imported.');
    }
  };

