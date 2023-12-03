import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { FiTrash, FiPlus } from "react-icons/fi";
import {
  fetchNationalities,
  createStudent,
  updateStudent,
  createFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
  updateStudentNationality,
  updateFamilyMemberNationality,
} from "../api";
import PropTypes from "prop-types";

const StudentModal = ({ student, role, onClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(student.dateOfBirth));
  const [nationality, setNationality] = useState(student.nationality);
  const [family, setFamily] = useState(student.family);
  const [nationalities, setNationalities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the nationalities data from the API
    fetchNationalities().then((data) => setNationalities(data));
  }, []);
  useEffect(() => {
    if (student) {
      setModalIsOpen(true);
    }
  }, [student]);
  const closeModal = () => {
    setModalIsOpen(false);
    onClose(); // Call the onClose callback to handle modal close
  };
  const handleFirstNameChange = (e) => {
    // Update the first name state with the input value
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    // Update the last name state with the input value
    setLastName(e.target.value);
  };

  const handleDateOfBirthChange = (date) => {
    // Update the date of birth state with the selected date
    setDateOfBirth(date);
  };

  const handleNationalityChange = (e) => {
    // Update the nationality state with the selected option
    setNationality(
      nationalities.find((n) => n.id === parseInt(e.target.value, 10))
    );
  };

  const handleFamilyNameChange = (index, e) => {
    // Update the family name state with the input value
    setFamily((prevFamily) =>
      prevFamily.map((f, i) =>
        i === index ? { ...f, name: e.target.value } : f
      )
    );
  };

  const handleFamilyRelationshipChange = (index, e) => {
    // Update the family relationship state with the selected option
    setFamily((prevFamily) =>
      prevFamily.map((f, i) =>
        i === index ? { ...f, relationship: e.target.value } : f
      )
    );
  };

  const handleFamilyNationalityChange = (index, e) => {
    // Update the family nationality state with the selected option
    setFamily((prevFamily) =>
      prevFamily.map((f, i) =>
        i === index
          ? {
              ...f,
              nationality: nationalities.find(
                (n) => n.id === parseInt(e.target.value, 10)
              ),
            }
          : f
      )
    );
  };

  const handleAddFamilyMember = () => {
    // Create a new family member object with empty fields
    const newFamilyMember = {
      id: null,
      name: "",
      relationship: "",
      nationality: "",
    };
    // Append the new family member to the family state
    setFamily((prevFamily) => [...prevFamily, newFamilyMember]);
  };

  const handleDeleteFamilyMember = (index) => {
    const familyMemberIdToDelete = family[index].id;
    deleteFamilyMember(familyMemberIdToDelete)
      .then(() => {
        // Update the family state by removing the deleted member
        setFamily((prevFamily) => prevFamily.filter((_, i) => i !== index));
      })
      .catch((error) => {
        // Handle error, display a message, etc.
        console.error("Error deleting family member:", error);
      });
  };

  const handleSubmit = () => {
    // Validate the input fields
    if (!firstName || !lastName || !dateOfBirth || !nationality) {
      // Set the error state with a message
      setError("Please fill in all the fields.");
      return;
    }
    if (family.some((f) => !f.name || !f.relationship || !f.nationality)) {
      // Set the error state with a message
      setError("Please fill in all the family members' fields.");
      return;
    }
    // Clear the error state
    setError(null);
    // Set the loading state to true
    setLoading(true);
    // Check if the student is new or existing
    if (student.id) {
      // Update the existing student
      updateStudent(student.id, {
        firstName,
        lastName,
        dateOfBirth: dateOfBirth.toISOString(),
      })
        .then(() => {
          // Update the student's nationality
          return updateStudentNationality(student.id, nationality.id);
        })
        .then(() => {
          // Update the student's family members
          return Promise.all(
            family.map((f) => {
              if (f.id) {
                // Update the existing family member
                return updateFamilyMember(f.id, {
                  name: f.name,
                  relationship: f.relationship,
                  dateOfBirth: f.dateOfBirth,
                }).then(() => {
                  // Update the family member's nationality
                  return updateFamilyMemberNationality(f.id, f.nationality.id);
                });
              } else {
                // Create a new family member
                return createFamilyMember(student.id, {
                  name: f.name,
                  relationship: f.relationship,
                  dateOfBirth: f.dateOfBirth,
                  nationality: f.nationality.id,
                });
              }
            })
          );
        })
        .then(() => {
          // Set the loading state to false
          setLoading(false);
          // Close the modal
          onClose();
        })
        .catch((err) => {
          // Set the loading state to false
          setLoading(false);
          // Set the error state with the message
          setError(err.message);
        });
    } else {
      // Create a new student
      createStudent({
        firstName,
        lastName,
        dateOfBirth: dateOfBirth.toISOString(),
        nationality: nationality.id,
      })
        .then((data) => {
          // Create the student's family members
          return Promise.all(
            family.map((f) =>
              createFamilyMember(data.id, {
                name: f.name,
                relationship: f.relationship,
                dateOfBirth: f.dateOfBirth,
                nationality: f.nationality.id,
              })
            )
          );
        })
        .then(() => {
          // Set the loading state to false
          setLoading(false);
          // Close the modal
          onClose();
        })
        .catch((err) => {
          // Set the loading state to false
          setLoading(false);
          // Set the error state with the message
          setError(err.message);
        });
    }
  };

  const handleCancel = () => {
    // Close the modal
    onClose();
  };

  return (
    <Modal
    isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-2xl font-bold mb-4">
        {student.id ? "Edit Student" : "Create Student"}
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex flex-col gap-4 mb-4">
        <h3 className="text-xl font-semibold">Basic Information</h3>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            className="border rounded px-2 py-1"
            value={firstName}
            onChange={handleFirstNameChange}
            disabled={role === "Admin" && student.approved}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            className="border rounded px-2 py-1"
            value={lastName}
            onChange={handleLastNameChange}
            disabled={role === "Admin" && student.approved}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <DatePicker
            id="dateOfBirth"
            selected={dateOfBirth}
            onChange={handleDateOfBirthChange}
            dateFormat="yyyy-MM-dd"
            className="border rounded px-2 py-1"
            disabled={role === "Admin" && student.approved}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="nationality">Nationality</label>
          <select
            id="nationality"
            className="border rounded px-2 py-1"
            value={nationality.id}
            onChange={handleNationalityChange}
            disabled={role === "Admin" && student.approved}
          >
            {nationalities.map((n) => (
              <option key={n.id} value={n.id}>
                {n.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-4 mb-4">
        <h3 className="text-xl font-semibold">Family Information</h3>
        {family.map((f, i) => (
          <div key={i} className="flex flex-col gap-2 border rounded p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">
                Family Member #{i + 1}
              </span>
              <button
                className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 flex items-center"
                onClick={() => handleDeleteFamilyMember(i)}
              >
                <FiTrash className="mr-1" />
                Delete Family Member
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={`familyName${i}`}>Name</label>
              <input
                id={`familyName${i}`}
                type="text"
                className="border rounded px-2 py-1"
                value={f.name}
                onChange={(e) => handleFamilyNameChange(i, e)}
                disabled={role === "Admin" && student.approved}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={`familyRelationship${i}`}>Relationship</label>
              <select
                id={`familyRelationship${i}`}
                className="border rounded px-2 py-1"
                value={f.relationship}
                onChange={(e) => handleFamilyRelationshipChange(i, e)}
                disabled={role === "Admin" && student.approved}
              >
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Spouse">Spouse</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={`familyNationality${i}`}>Nationality</label>
              <select
                id={`familyNationality${i}`}
                className="border rounded px-2 py-1"
                value={f.nationality.id}
                onChange={(e) => handleFamilyNationalityChange(i, e)}
                disabled={role === "Admin" && student.approved}
              >
                {nationalities.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 flex items-center"
          onClick={handleAddFamilyMember}
        >
          <FiPlus className="mr-2" />
          Add Family Member
        </button>
      </div>
      <div className="flex justify-end gap-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          Submit
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white rounded px-4 py-2"
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};
StudentModal.propTypes = {
  student: PropTypes.shape({
     id: PropTypes.number,
     firstName: PropTypes.string,
     lastName: PropTypes.string,
     dateOfBirth: PropTypes.string,
     nationality: PropTypes.shape({
       id: PropTypes.number,
       title: PropTypes.string,
     }),
     family: PropTypes.arrayOf(
       PropTypes.shape({
         id: PropTypes.number,
         name: PropTypes.string,
         relationship: PropTypes.string,
         dateOfBirth: PropTypes.string,
         nationality: PropTypes.shape({
           id: PropTypes.number,
           title: PropTypes.string,
         }),
       })
     ),
  }),
  role: PropTypes.string,
  onClose: PropTypes.func,
 };
 
 StudentModal.defaultProps = {
  student: {
     id: null,
     firstName: "",
     lastName: "",
     dateOfBirth: "",
     nationality: { id: null, title: "" },
     family: [],
  },
  role: "",
  onClose: () => {},
 };
 
 export default StudentModal;