import React, { useState } from "react";

const StudentModal = ({ student, closeModal }) => {
 const [name, setName] = useState(student ? student.name : "");
 const [nationality, setNationality] = useState(student ? student.nationality : "");
 const [dob, setDob] = useState(student ? student.dob : "");

 const handleSubmit = () => {
    // Perform add/update operation
    closeModal();
 };

 return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen">
        <div className="bg-white rounded-lg p-8 m-4">
          <h2 className="text-xl font-bold mb-4">{student ? "Update" : "Add New"} Student</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nationality">
              Nationality
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nationality" type="text" placeholder="Nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
              Date of Birth
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
              {student ? "Update" : "Add"}
            </button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
 );
};

export default StudentModal;