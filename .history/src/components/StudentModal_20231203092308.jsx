import React from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";

const StudentModal = ({ student, closeModal }) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
      firstName: student ? student.firstName : "",
      lastName: student ? student.lastName : "",
      nationality: student ? student.nationality : "",
      dob: student ? student.dob : "",
      email: student ? student.email : "",
      phone: student ? student.phone : "",
      address: student ? student.address : "",
      familyMembers: student ? student.familyMembers : [],
    },
 });

 const handleAddFamilyMember = () => {
    setValue("familyMembers", [...watch("familyMembers"), {}]);
 };

 const handleDeleteFamilyMember = (index) => {
    const newFamilyMembers = watch("familyMembers").filter((_, i) => i !== index);
    setValue("familyMembers", newFamilyMembers);
 };

 const onSubmit = (data) => {
    console.log(data);
    closeModal();
 };

 return (
    <div className="fixed z-10 inset-0 display-flex flex-col items-center justify-center overflow-y-auto">
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
              type="text"
              placeholder="First Name"
              {...register("firstName", { required: true })}
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
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
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
              value={watch("nationality")}
              onChange={(e) => setValue("nationality", e.target.value)}
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
              value={watch("dob")}
              onChange={(e) => setValue("dob", e.target.value)}
            />
          </div>

          {/* ...other input fields... */}

          <h3 className="text-lg font-bold mb-4 mt-8">Family Members</h3>
          {watch("familyMembers").map((member, index) => (
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
                {...register(`familyMembers.${index}.name`)}
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
              onClick={handleSubmit(onSubmit)}
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