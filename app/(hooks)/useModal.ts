import { useState } from "react";
function useModal(initial:boolean){
    const [modalOpen, setModalOpen] = useState<boolean>(initial);
    const handleModalOpen = () => {
      setModalOpen(true);
    };
    const handleModalClose = () => {
      setModalOpen(false);
    };
    return [modalOpen,handleModalOpen,handleModalClose] as const;
}

export default useModal;

// we need to import thses to lines for modal to work

// <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4" onClick={handleModalOpen}>Open Modal</button>
// <Modal isOpen={modalOpen} onClose={handleModalClose} />
