import React, { useState } from "react";
import { FiMail, FiPhone, FiHome } from "react-icons/fi";

const StudentModal = ({ student, closeModal }) => {
 const [values, setValues] = useState({
    name: student ? student.name : "",
    nationality: student ? student.nationality : "",
    dob: student ? student.dob : "",
    email: student ? student.email : "",
    phone: student ? student.phone : "",
    address: student ? student.address : "",
 });

 const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
 };

 const handleSubmit = () => {
    // Perform add/update operation
    closeModal();
 };

 return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg p-8 m-4 max-w-lg">
          <h2 className="text-xl font-bold mb-4">{student ? "Update" : "Add New"} Student</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" placeholder="Name" value={values.name} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nationality">
              Nationality
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nationality" name="nationality" type="text" placeholder="Nationality" value={values.nationality} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
              Date of Birth
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="dob" name="dob" type="date" value={values.dob} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <div className="flex items-center">
              <FiMail className="text-gray-400" />
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Email" value={values.email} onChange={handleChange} />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <div className="flex items-center">
              <FiPhone className="text-gray-400" />
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" name="phone" type="text" placeholder="Phone" value={values.phone} onChange={handleChange} />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <div className="flex items-center">
              <FiHome className="text-gray-400" />
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" name="address" type="text" placeholder="Address" value={values.address} onChange={handleChange} />
            </div>
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