import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <table className="border-collapse border border-slate-400">
        <tr>
          <th>Name</th>
          <th>Nationality</th>
          <th>Date of Birth</th>
        </tr>
        {/* Table rows that can be clicked to open student modal */}
      </table>

      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Add New Student
      </button>

      <select className="border border-gray-300 rounded p-2 mt-4">
        {/* Dropdown to switch roles */}
      </select>
    </div>
  );
};

export default LandingPage;
