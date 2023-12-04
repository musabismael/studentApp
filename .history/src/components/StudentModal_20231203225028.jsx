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
import "react-datepicker/dist/react-datepicker.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    maxWidth: "90%",
    
  },
};

const StudentModal = ({ student, role, onClose }) => {
  const initialDateOfBirth = student.dateOfBirth
    ? new Date(student.dateOfBirth)
    : new Date();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(initialDateOfBirth);
  const [nationality, setNationality] = useState(student.nationality);
  const [family, setFamily] = useState(student.family);
  const [nationalities, setNationalities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNationalities()
      .then((data) => {
        setNationalities(data);
        // Check if student's nationality is available and set it initially
        console.log(data);

        if (student.nationality) {
          const studentNationality = data.find(
            (n) => n.id === student.nationality.id
          );
          setNationality(studentNationality);
        }
      })
      .catch((error) => {
        console.error("Fetch Nationalities Error:", error);
        // Handle the error, such as setting an error state or logging
      });
  }, [student]);

  useEffect(() => {
    if (student) {
      setModalIsOpen(true);
    }
  }, [student]);
  const closeModal = () => {
    setModalIsOpen(false);
    onClose();
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleDateOfBirthChange = (date) => {
    setDateOfBirth(date);
  };

  const handleNationalityChange = (e) => {
    setNationality(
      nationalities.find((n) => n.ID === parseInt(e.target.value, 10))
    );
  };

  const handleFamilyNameChange = (index, e) => {
    setFamily((prevFamily) =>
      prevFamily.map((f, i) =>
        i === index ? { ...f, name: e.target.value } : f
      )
    );
  };

  const handleFamilyRelationshipChange = (index, e) => {
    setFamily((prevFamily) =>
      prevFamily.map((f, i) =>
        i === index ? { ...f, relationship: e.target.value } : f
      )
    );
  };

  const handleFamilyNationalityChange = (index, e) => {
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
    const newFamilyMember = {
      id: null,
      name: "",
      relationship: "",
      nationality: { ID: null, Title: "" },
    };

    setFamily((prevFamily) => [...prevFamily, newFamilyMember]);
  };

  const handleDeleteFamilyMember = (index) => {
    const familyMemberIdToDelete = family[index].id;
    deleteFamilyMember(familyMemberIdToDelete)
      .then(() => {
        setFamily((prevFamily) => prevFamily.filter((_, i) => i !== index));
      })
      .catch((error) => {
        console.error("Error deleting family member:", error);
      });
  };

  const handleSubmit = () => {
    if (!firstName || !lastName || !dateOfBirth || !nationality) {
      console.log(firstName);
      console.log(lastName);
      console.log(dateOfBirth);
      console.log(nationality);

      setError("Please fill in all the fields: First Name, Last Name, Date of Birth, and Nationality.");
      return;
    }
    if (family.some((f) => !f.name || !f.relationship || !f.nationality)) {
      setError("Please fill in all the family members' fields.");
      return;
    }

    setError(null);

    setLoading(true);

    if (student.id) {
      updateStudent(student.id, {
        firstName,
        lastName,
        dateOfBirth: dateOfBirth.toISOString(),
      })
        .then(() => {
          return updateStudentNationality(student.id, nationality.id);
        })
        .then(() => {
          return Promise.all(
            family.map((f) => {
              if (f.id) {
                return updateFamilyMember(f.id, {
                  name: f.name,
                  relationship: f.relationship,
                  dateOfBirth: f.dateOfBirth,
                }).then(() => {
                  return updateFamilyMemberNationality(f.id, f.nationality.id);
                });
              } else {
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
          setLoading(false);

          onClose();
        })
        .catch((err) => {
          setLoading(false);
          console.log("====================================");
          console.log(err.message);
          console.log("====================================");
          setError(err.message);
        });
    } else {
      createStudent({
        firstName,
        lastName,
        dateOfBirth: dateOfBirth.toISOString(),
        nationality: nationality.id,
      })
        .then((data) => {
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
          setLoading(false);

          onClose();
        })
        .catch((err) => {
          setLoading(false);

          setError(err.message);
        });
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      overlayClassName="modal-overlay"
      style={customStyles}
      contentLabel="Student Information"
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
            className="border rounded px-2 py-1 bg-gray-100"
            disabled={role === "Admin" && student.approved}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="nationality">Nationality</label>
          {nationalities.length > 0 ? (
            <select
              id="nationality"
              className="border rounded px-2 py-1"
              value={nationality ? nationality.id : ""}
              onChange={handleNationalityChange}
              disabled={role === "Admin" && student.approved}
            >
              {nationalities.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.Title}
                </option>
              ))}
            </select>
          ) : (
            <p>Loading nationalities...</p>
          )}
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
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor={`familyName${i}`}>Frist Name</label>
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
                value={f.nationality ? f.nationality.d : ""}
                onChange={(e) => handleFamilyNationalityChange(i, e)}
                disabled={role === "Admin" && student.approved}
              >
                {nationalities.map((n) => (
                  <option  key={n.id} value={n.id}>
                    {n.Title}
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
