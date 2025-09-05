import React, { createContext, useContext, useState } from "react";
import CreateJobModal from "../components/CreateJobModal ";

const JobModalContext = createContext();

export const JobModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <JobModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {/* Modal always mounted at root, controlled by context */}
      <CreateJobModal isOpen={isModalOpen} onClose={closeModal} />
    </JobModalContext.Provider>
  );
};

// Custom hook
/* eslint-disable react-refresh/only-export-components */

export const useJobModal = () => useContext(JobModalContext);
