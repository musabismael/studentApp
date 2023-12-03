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

 return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Students</h1>

      <select className="border border-gray-300 rounded p-2 mt-4" onChange={toggleRole}>
        <option value="Admin">Admin</option>
        <option value="Registrar">Registrar</option>
      </select>

      <table className="border-collapse border border-slate-400">
        <tr>
          <th className="text-left p-2">Name</th>
          <th className="text-left p-2">Nationality</th>
          <th className="text-left p-2">Date of Birth</th>
        </tr>
        {/* Table rows that can be clicked to open student modal */}
      </table>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => {
          /* Open modal to add new student */
        }
      }
      >
        Add New Student
      </button>

      {/* Add the student modal component here */}
      {showModal && <StudentModal student={modalStudent} role={role} handleModal={handleModal} />}
    </div>
 );
};

export default LandingPage;