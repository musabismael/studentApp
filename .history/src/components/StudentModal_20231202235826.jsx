import React, { useState } from "react";

const StudentTable = ({ students, setStudents }) => {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedStudent, setSelectedStudent] = useState(null);

 const addStudent = () => {
    setSelectedStudent(null);
    setIsModalOpen(true);
 };

 const editStudent = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
 };

 const saveStudent = (student) => {
    if (selectedStudent) {
      const index = students.findIndex((stu) => stu.id === selectedStudent.id);
      students[index] = student;
    } else {
      students.push(student);
    }
    setStudents([...students]);
    setIsModalOpen(false);
 };

 const deleteStudent = (student) => {
    const index = students.findIndex((stu) => stu.id === student.id);
    students.splice(index, 1);
    setStudents([...students]);
 };

 return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nationality
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date of Birth
            </th>
            <th scope="col" className="relative px-6 py-3">
              <button onClick={addStudent} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Student
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id}>
              <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.nationality}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.dob}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onClick={() => editStudent(student)} className="text-blue-600 hover:text-blue-900">
                 Edit
                </button>
                <button onClick={() => deleteStudent(student)} className="text-red-600 hover:text-red-900 ml-4">
                 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <StudentModal
          student={selectedStudent}
          closeModal={() => setIsModalOpen(false)}
          saveStudent={saveStudent}
        />
      )}
    </div>
 );
};

export default StudentTable;