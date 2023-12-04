import React, { useState, useEffect } from "react";
import { FiUserPlus, FiEdit, FiCheck } from "react-icons/fi";
import StudentModal from "./StudentModal";
import { fetchStudents, updateStudent, fetchStudentNationality } from "../api";

const LandingPage = () => {
  const [students, setStudents] = useState([]);
  const [nationalities, setNationalities] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [role, setRole] = useState("Admin");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents()
      .then((data) => setStudents(data))
      .catch((error) => setError(error.message));
  }, []);

  useEffect(() => {
    const fetchNationalitiesForStudents = async () => {
      const fetchedNationalities = {};
      try {
        for (const student of students) {
          console.log('lllll',);
          const nationality = await fetchStudentNationality(student.id);
          fetchedNationalities[student.id] = nationality;
        }
        setNationalities(fetchedNationalities);
      } catch (error) {
        console.error("Error fetching nationalities:", error);
      }
    };

    fetchNationalitiesForStudents();
  }, [students]);
  const handleRoleChange = (e) => {
    // Change the role of the user
    setRole(e.target.value);
  };

  const handleAddStudent = () => {
    // Create a new student object with empty fields
    const newStudent = {
      id: students.length + 1,
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nationality: "",
      family: [],
      approved: false,
    };
    // Set the selected student to the new student
    setSelectedStudent(newStudent);
    // Show the modal
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    // Set the selected student to the student to be edited
    setSelectedStudent(student);
    // Show the modal
    setShowModal(true);
  };

  const handleApproveStudent = (student) => {
    // Update the student's approved status to true
    student.approved = true;
    // Update the student data in the API
    updateStudent(student.id, student).then(() => {
      // Update the students state with the new data
      setStudents((prevStudents) =>
        prevStudents.map((s) => (s.id === student.id ? student : s))
      );
    });
  };

  const handleModalClose = () => {
    // Hide the modal
    setShowModal(false);
    // Reset the selected student to null
    setSelectedStudent(null);
  };
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Student Registration System</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="mr-2">Role:</span>

          <select
            className="border rounded px-2 py-1"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="Admin">Admin</option>
            <option value="Registrar">Registrar</option>
          </select>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 flex items-center"
          onClick={handleAddStudent}
        >
          <FiUserPlus className="mr-2" />
          Add New Student
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Date of Birth</th>
            <th className="border px-4 py-2">Nationality</th>
            <th className="border px-4 py-2">Family Members</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border px-4 py-2 text-center">{student.Id}</td>

              <td className="border px-4 py-2">
                {student.firstName} {student.lastName}
              </td>

              <td className="border px-4 py-2 text-center">
                {student.dateOfBirth}
              </td>

              <td className="border px-4 py-2 text-center">
                {nationalities[student.id]
                  ? nationalities[student.id].Title // assuming 'title' is the property for the nationality name
                  : "Loading..." // or any other indication that the data is being fetched
                }
              </td>

              <td className="border px-4 py-2 text-center">
                {student.family && student.family.length ? (
                  <span key={student.family.length}>
                    {student.family.length}
                  </span>
                ) : (
                  <span>0</span>
                )}
              </td>

              <td className="border px-4 py-2 text-center">
                {student.approved ? (
                  <span className="text-green-500">Approved</span>
                ) : (
                  <span className="text-red-500">Pending</span>
                )}
              </td>

              <td className="border px-4 py-2 flex justify-center">
                {role === "Admin" && !student.approved && (
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded px-2 py-1 mr-2 flex items-center"
                    onClick={() => handleEditStudent(student)}
                  >
                    <FiEdit className="mr-1" />
                    Edit
                  </button>
                )}

                {role === "Registrar" && !student.approved && (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white rounded px-2 py-1 flex items-center"
                    onClick={() => handleApproveStudent(student)}
                  >
                    <FiCheck className="mr-1" />
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <StudentModal
          student={selectedStudent}
          role={role}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default LandingPage;
