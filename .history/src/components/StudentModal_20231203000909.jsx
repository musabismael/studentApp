import React, { useState } from "react";
import { Transition } from "@headlessui/react";

const StudentModal = ({ student, closeModal, handleSubmit }) => {
 const [isSubmitted, setIsSubmitted] = useState(false);

 const handleClose = () => {
    closeModal();
    setIsSubmitted(false);
 };

 const handleSubmitClick = () => {
    handleSubmit();
    setIsSubmitted(true);
 };

 const handleCancelClick = () => {
    handleClose();
    setIsSubmitted(false);
 };

 return (
    <Transition
      show={student !== null}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            X
          </button>
          <h2 className="text-xl font-bold mb-4">Student Information</h2>
          {/* Basic Information Table Rows */}
          <div className="grid grid-cols-3 gap-4">
            <div className="font-medium text-gray-500">Name</div>
            <div>{student ? student.name : "N/A"}</div>

            <div className="font-medium text-gray-500">Nationality</div>
            <div>{student ? student.nationality : "N/A"}</div>

            <div className="font-medium text-gray-500">Date of Birth</div>
            <div>{student ? student.dob : "N/A"}</div>
          </div>

          {/* Family Information Table Rows */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-4">Family Information</h3>
            {/* Add Family Members Section Here */}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-4"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handleSubmitClick}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Transition>
 );
};

export default StudentModal;