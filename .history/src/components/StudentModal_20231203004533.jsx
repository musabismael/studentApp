import React, { useState } from "react";
import { FiMail, FiPhone, FiHome, FiPlus } from "react-icons/fi";

const StudentModal = ({ student, closeModal }) => {
 const [values, setValues] = useState({
    name: student ? student.name : "",
    nationality: student ? student.nationality : "",
    dob: student ? student.dob : "",
    email: student ? student.email : "",
    phone: student ? student.phone : "",
    address: student ? student.address : "",
    familyMembers: student ? student.familyMembers : [],
 });

 const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
 };

 const handleAddFamilyMember = () => {
    setValues({ ...values, familyMembers: [...values.familyMembers, {}] });
 };

 const handleDeleteFamilyMember = (index) => {
    const newFamilyMembers = values.familyMembers.filter((_, i) => i !== index);
    setValues({ ...values, familyMembers: newFamilyMembers });
 };

 const handleSubmit = () => {
    // Perform add/update operation
    closeModal();
 };

 return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg p-8 m-4 max-w-xl">
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
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Email" value={values.email} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" name="phone" type="text" placeholder="Phone" value={values.phone} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" name="address" type="text" placeholder="Address" value={values.address} onChange={handleChange} />
          </div>
          <h3 className="text-lg font-bold mb-4 mt-8">Family Members</h3>
          {values.familyMembers.map((member, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`name${index}`}>
                 Name
                </label>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => handleDeleteFamilyMember(index)}>
                 Delete
                </button>
              </div>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={`name${index}`} name={`familyMembers[${index}].name`} type="text" placeholder="Name" value={member.name} onChange={handleChange} />
              {/* Add other family member fields here */}
            </div>
          ))}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleAddFamilyMember}>
            <FiPlus className="text-lg mr-2" />
            Add Family Member
          </button>
          <div className="flex items-center justify-between mt-8">
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