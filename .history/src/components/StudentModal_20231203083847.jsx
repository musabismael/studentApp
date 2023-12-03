import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

const StudentModal = ({ student, closeModal }) => {
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
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");

    if (!firstNameInput.validity.valid || !lastNameInput.validity.valid) {
      alert("Please enter valid first name and last name");
      return;
    }

    // Perform add/update operation
    closeModal();
 };

 return (
    <div className="fixed z-10 inset-0 display-flex flex-col items-center justify-center overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg p-8 m-4 max-w-xl">
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
              pattern="^[a-zA-Z\s-]*$" // Only allow letters, spaces, and hyphens
              placeholder="First Name"
              value={values.firstName}
              onChange={handleChange}
              required // Make this field required
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
              pattern="^[a-zA-Z\s-]*$" // Only allow letters, spaces, and hyphens
              placeholder="Last Name"
              value={values.lastName}
              onChange={handleChange}
              required // Make this field required
            />
          </div>
          {/* Other Fields */}
          {/* Family Members Section */}
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
    </div>
 );
};

export default StudentModal;