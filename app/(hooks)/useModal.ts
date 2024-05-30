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
