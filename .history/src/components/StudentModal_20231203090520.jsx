import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

const StudentModal = ({ student, closeModal }) => {
    const { register, handleSubmit, errors } = useForm();

 const [values, setValues] = useState({
    firstName: student ? student.firstName : "",
    lastName: student ? student.lastName : "",
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg p-8 m-4 min-w-[800px] max-w-[800px]">
          <h2 className="text-xl font-bold mb-4">
            {student ? "Update" : "Add New"} Student
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={values.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={values.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nationality"
            >
              Nationality
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nationality"
              name="nationality"
              value={values.nationality}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="american">American</option>
              <option value="english">English</option>
              {/* Add more options here */}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dob"
            >
              Date of Birth
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dob"
              name="dob"
              type="date"
              value={values.dob}
              onChange={handleChange}
            />
          </div>

     

          <h3 className="text-lg font-bold mb-4 mt-8">Family Members</h3>
          {values.familyMembers.map((member, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center">
                <label
                 className="block text-gray-700 text-sm font-bold mb-2"
                 htmlFor={`name${index}`}
                >
                 Name
                </label>
                <button
                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                 type="button"
                 onClick={() => handleDeleteFamilyMember(index)}
                >
                 Delete
                </button>
              </div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={`name${index}`}
                type="text"
                placeholder="Name"
                value={member.name}
                onChange={handleChange}
              />
              {/* Add other family member fields here */}
            </div>
          ))}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleAddFamilyMember}
          >
            <FiPlus className="text-lg mr-2" />
            Add Family Member
          </button>
          <div className="flex items-center justify-between mt-8">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              {student ? "Update" : "Add"}
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
 );
};

export default StudentModal;