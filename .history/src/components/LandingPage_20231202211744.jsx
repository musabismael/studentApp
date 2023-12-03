import { useState } from 'react';
import Modal from './Modal';

function LandingPage() {
 const [userRole, setUserRole] = useState('admin');
 const [showModal, setShowModal] = useState(false);
 const [modalData, setModalData] = useState({});

 const handleRoleChange = (e) => {
    setUserRole(e.target.value);
 };

 const handleNewStudent = () => {
    setModalData({});
    setShowModal(true);
 };

 const handleEditStudent = (student) => {
    setModalData(student);
    setShowModal(true);
 };

 const handleCloseModal = () => {
    setShowModal(false);
 };

 const handleSubmit = (student) => {
    // Save student data to database
    setShowModal(false);
 };

 return (
    <div>
      <select onChange={handleRoleChange}>
        <option value="admin">Admin</option>
        <option value="registrar">Registrar</option>
      </select>

      <button onClick={handleNewStudent}>Add New Student</button>

      {/* List all students here */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Render each student here */}
          <tr>
            <td>John Doe</td>
            <td>
              <button onClick={() => handleEditStudent({ name: 'John Doe' })}>
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {showModal && (
        <Modal
          userRole={userRole}
          data={modalData}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
 );
}

export default LandingPage;