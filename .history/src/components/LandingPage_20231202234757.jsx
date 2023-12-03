import React, { useState } from "react";
import StudentModal from "./StudentModal"; // import StudentModal component

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
      {/* ... */}
      {showModal && (
        <StudentModal
          student={modalStudent}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
 );
};

export default LandingPage;