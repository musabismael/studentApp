import { useState, useEffect, useCallback } from "react";
import { FiUserPlus, FiEdit, FiCheck } from "react-icons/fi";
import StudentModal from "./StudentModal";
import {
  fetchStudents,
  updateStudent,
  fetchFamilyMembers,
  fetchStudentNationality,
} from "../api";

const LandingPage = () => {
  const [students, setStudents] = useState([]);
  const [nationality, setNationality] = useState("");
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [role, setRole] = useState("Admin");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await fetchStudents();
        setStudents(studentData);
        const familyMembersData = await Promise.all(
          studentData.map((student) => fetchFamilyMembers(student.ID))
        );
        
        setFamilyMembers(familyMembersData.map((data) => data.length));

        const nationalityData = await Promise.all(
          studentData.map((student) => fetchStudentNationality(student.ID))
        );
        setNationality(nationalityData[0].nationality.Title);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleAddStudent = () => {
    const newStudent = {
      // id: students.length + 1,
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nationality: { ID: null, Title: "" },
      familyMembers: [],
      approved: false,
    };

    setSelectedStudent(newStudent);
    setShowModal(true);
  };


  const handleEditStudent = (student) => {
    // console.log(student);
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleApproveStudent = (student) => {
    student.approved = true;

    updateStudent(student.ID, student).then(() => {
      setStudents((prevStudents) =>
        prevStudents.map((s) => (s.id === student.ID ? student : s))
      );
    });
  };

  const handleModalClose = useCallback(() => {
    setShowModal(false);
    setSelectedStudent(null);
  }, []);

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
          {console.log(fetchFamilyMembers(students[0]?.ID))}
          {students.map((student, index) => (
            <tr key={student.ID}>
              <td className="border px-4 py-2 text-center">{student.ID}</td>
              <td className="border px-4 py-2">
                {student.firstName} {student.lastName}
              </td>
              <td className="border px-4 py-2 text-center">
                {student.dateOfBirth}
              </td>
              <td className="border px-4 py-2 text-center">{student.nationality && student.nationality.Title}</td>
              <td className="border px-4 py-2 text-center">
                <span>{familyMembers[index]}</span>
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
