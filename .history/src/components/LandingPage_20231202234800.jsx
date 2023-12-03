import React, { useState } from "react";

const LandingPage = () => {
  const [role, setRole] = useState("Admin");
  const [showModal, setShowModal] = useState(false);
  const [modalStudent, setModalStudent] = useState(null);

  const toggleRole = () => {
    setRole(role === "Admin" ? "Registrar" : "Admin");
  };

  const handleModal = (student) => {
    setModalStudent(student);
    setShowModal(!showModal);
  };

  const handleAddStudent = () => {
    setModalStudent(null);
    setShowModal(true);
  };

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Students</h1>

      <select
        className="border border-gray-300 rounded p-2 mt-4"
        onChange={toggleRole}
      >
        <option value="Admin">Admin</option>
        <option value="Registrar">Registrar</option>
      </select>

      <table className="border-collapse border border-gray-300 rounded-lg w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nationality
            </th>
            <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date of Birth
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Table rows */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              John Doe
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              American
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              01/01/1990
            </td>
          </tr>
        </tbody>
      </table>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleAddStudent}
      >
        Add New Student
      </button>

    </div>
  );
};

export default LandingPage;
