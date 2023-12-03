import { useState } from 'react';
import Modal from './Modal';

function StudentModal({ userRole, data, onClose, onSubmit }) {
 const [student, setStudent] = useState(data);

 const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
 };

 const handleSubmit = () => {
    onSubmit(student);
 };

 const handleClose = () => {
    onClose();
 };

 return (
    <div>
      {/* Render the modal form here */}
      <input type="text" name="name" value={student.name} onChange={handleChange} />
      {/* ...other form fields */}
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleClose}>Cancel</button>
    </div>
 );
}

export default StudentModal;