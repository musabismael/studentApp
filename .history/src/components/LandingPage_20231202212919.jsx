import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <table className="border-collapse border border-slate-400">
        <tr>
          <th className="border border-slate-300">Name</th>
          <th className="border border-slate-300">Nationality</th>
          <th className="border border-slate-300">Date of Birth</th>
        </tr>
        <tr>
          <td className="border border-slate-300">John Doe</td>
          <td className="border border-slate-300">American</td>
          <td className="border border-slate-300">01/01/1990</td>
        </tr>
        <tr>
          <td className="border border-slate-300">Jane Doe</td>
          <td className="border border-slate-300">British</td>
          <td className="border border-slate-300">03/04/1992</td>
        </tr>
        <tr>
          <th className="border border-slate-300">Parents</th>
          <th className="border border-slate-300">Siblings</th>
        </tr>
        <tr>
          <td className="border border-slate-300">John and Jane Doe</td>
          <td className="border border-slate-300">Brother, Sister</td>
        </tr>
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
