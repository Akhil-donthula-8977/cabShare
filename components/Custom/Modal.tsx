import { MouseEventHandler } from "react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const Modal = ({ isOpen, onClose }:ModalProps) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8 rounded-md shadow-md">
          <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
          <p>This is the modal content.</p>
        </div>
      </div>
    );
  };
  