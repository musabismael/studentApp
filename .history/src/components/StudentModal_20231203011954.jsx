import React, { useState } from "react";
import { MdDelete, MdDone } from "react-icons/md";

const StudentModalForm = ({
 student,
 closeModal,
 onSubmit,
 onDelete,
 role,
}) => {
 const [formData, setFormData] = useState(student || {
    name: "",
    nationality: "",
    dateOfBirth: "",
    status: "",
 });

 const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    closeModal();
 };

 const handleDelete = () => {
    onDelete(student.id);
    closeModal();
 };

 return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        {student ? "Edit Student" : "Add New Student"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            className="border border-gray-300 rounded p-2 w-full"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nationality</label>
          <input
            className="border border-gray-300 rounded p-2 w-full"
            value={formData.nationality}
            onChange={(e) =>
              setFormData({ ...formData, nationality: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth</label>
          <input
            className="border border-gray-300 rounded p-2 w-full"
            value={formData.dateOfBirth}
            onChange={(e) =>
              setFormData({ ...formData, dateOfBirth: e.target.value })
            }
            type="date"
            required
          />
        </div>
        {role === "Registrar" && (
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              className="border border-gray-300 rounded p-2 w-full"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              required
            >
              <option value="">Select</option>
              <option value="approved">Approved</option>
              <option value="not approved">Not Approved</option>
            </select>
          </div>
        )}
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
            type="submit"
          >
            {student ? "Update" : "Add"}
          </button>
          {role === "Registrar" && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDelete}
            >
              <MdDelete />
            </button>
          )}
        </div>
      </form>
    </div>
 );
};

export default StudentModalForm;