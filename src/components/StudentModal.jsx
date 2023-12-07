import React, { useState, useEffect, useMemo } from "react";
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
  fetchFamilyMembers,
  fetchStudentNationality,
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
  // console.log('student:',student);
  const initialDateOfBirth = student.dateOfBirth
    ? new Date(student.dateOfBirth)
    : new Date();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(initialDateOfBirth);
  const [nationality, setNationality] = useState(student.nationality || []);
  const [family, setFamily] = useState(student.familyMembers || []);
  const [nationalities, setNationalities] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNationalities()
      .then((data) => {
        setNationalities(data);
        // console.log(nationality)
        if (!nationality?.ID) {
          setNationality(data[0]);
        //   console.log("setting nationality")
        }
      })
      .catch((error) => {
        console.error("Fetch Nationalities Error:", error.message);
      });
    if (student) {
      setModalIsOpen(true);
    }
    if (student) {
      fetchFamilyMembers(student.ID)
        .then((familyData) => {
          setFamily(familyData);
          console.log(familyData)
        })
        .catch((error) => {
          console.error("Fetch Family Members Error:", error.message);
        });
    }
  }, [student]);

  useEffect(() => {
    fetchStudentNationality(student.ID).then((response) => {
      setNationality(response.nationality);
    });
  }, []);

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
    const selectedNationalityId = parseInt(e.target.value, 10);
    const selectedNationality = nationalities.find(
      (n) => n.ID === selectedNationalityId
    );
    setNationality(selectedNationality || { ID: null, Title: "" });
  };

  const handleFamilyFristNameChange = (index, e) => {
    setFamily((prevFamily) =>
      prevFamily.map((f, i) =>
        i === index ? { ...f, firstName: e.target.value } : f
      )
    );
  };
  const handleFamilyLastNameChange = (index, e) => {
    setFamily((prevFamily) =>
      prevFamily.map((f, i) =>
        i === index ? { ...f, lastName: e.target.value } : f
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
                (n) => n.ID === parseInt(e.target.value, 10)
              ) || { ID: null, Title: "" }, // Replace null with an empty object
            }
          : f
      )
    );
  };

  const handleAddFamilyMember = () => {
    const newFamilyMember = {
      id: null,
      firstName: "",
      lastName: "",
      relationship: "",
      nationality: { ID: null, Title: "" },
    };

    setFamily((prevFamily) => [...prevFamily, newFamilyMember]);
  };

  const handleDeleteFamilyMember = (index) => {
    const familyMemberIdToDelete = family[index].ID;
    if (familyMemberIdToDelete) {
      deleteFamilyMember(familyMemberIdToDelete)
        .then(() => {
          setFamily((prevFamily) => prevFamily.filter((_, i) => i !== index));
        })
        .catch((error) => {
          console.error("Error deleting family member:", error.message);
        });
    } else {
      setFamily((prevFamily) => prevFamily.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    // console.log(student)
    if (!firstName || !lastName || !dateOfBirth || !nationality) {
      setError(
        "Please fill in all the fields: First Name, Last Name, Date of Birth, and Nationality."
      );
      return;
    }
    // console.log(family);
    // console.log(firstName, lastName, dateOfBirth, nationality)
    if (
      family && family.some(
        (f) => !f.firstName || !f.lastName || !f.relationship || !f.nationality
      )
    ) {
      setError("Please fill in all the family members' fields.");
      return;
    }

    setError(null);

    setLoading(true);

    if (student.ID) {
      updateStudent(student.ID, {
        firstName,
        lastName,
        dateOfBirth: dateOfBirth.toISOString(),
        nationality: nationality?.ID ?? 1,
      })
        .then(() => {
          return updateStudentNationality(student.ID, nationality.ID);
        })
        .then(() => {
          return Promise.all(
            family && family.map((f) => {
              if (f.id) {
                return updateFamilyMember(f.id, {
                  firstName: f.firstName,
                  lastName: f.lastName,
                  relationship: f.relationship,
                  dateOfBirth: f.dateOfBirth,
                  nationality: f.nationality,
                }).then(() => {
                  // return updateFamilyMemberNationality(f.id, f.nationality.ID);
                });
              } else {
                return createFamilyMember(student.ID, {
                  firstName: f.firstName,
                  lastName: f.lastName,
                  relationship: f.relationship,
                  dateOfBirth: f.dateOfBirth,
                  nationality: f.nationality,
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
          console.error(err.message);
          setError(err.message);
        });
    } else {
      createStudent({
        firstName,
        lastName,
        dateOfBirth: dateOfBirth.toISOString(),
        nationality: nationality,
      })
        .then((data) => {
          // Delete all family members of student
          return Promise.all(
            family.map((f) =>
              createFamilyMember(data.ID, {
                firstName: f.firstName,
                lastName: f.lastName,
                relationship: f.relationship,
                dateOfBirth: f.dateOfBirth,
                nationality: f.nationality?.ID ?? 0,
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
          console.error(err.message);
          setError(err.message);
        });
    }
  };

  const handleCancel = () => {
    onClose();
  };

  // const memoizedNationalities = useMemo(() => {
  //   return nationalities.map((n) => (
  //     <option key={n.ID} value={n.ID} data-value={n}>
  //       {n.Title}
  //     </option>
  //   ));
  // }, [nationalities]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      overlayClassName="modal-overlay"
      style={customStyles}
      contentLabel="Student Information"
    >
      <h2 className="text-2xl font-bold mb-4">
        {student.ID ? "Edit Student" : "Create Student"}
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
              value={nationality ? nationality.ID : 0}
              onChange={handleNationalityChange}
              disabled={role === "Admin" && student.approved}
            >
              {nationalities.map((n) => (
                <option selected={n.Title === nationality?.Title} key={n.ID} value={n.ID} data-value={n}>
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
        {family && family.length > 0 ? (
          family.map((f, i) => (
            <div
              key={f.id || i}
              className="flex flex-col gap-2 border rounded p-4"
            >
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
                  value={f.firstName}
                  onChange={(e) => handleFamilyFristNameChange(i, e)}
                  disabled={role === "Admin" && student.approved}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`familyName${i}`}>Last Name</label>
                <input
                  id={`familyName${i}`}
                  type="text"
                  className="border rounded px-2 py-1"
                  value={f.lastName}
                  onChange={(e) => handleFamilyLastNameChange(i, e)}
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
                  
                  <option selected={f.relationship === "Parent"} value="Parent">Parent</option>
                  <option selected={f.relationship === "Sibling"} value="Sibling">Sibling</option>
                  <option selected={f.relationship === "Spouse"} value="Spouse">Spouse</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`familyNationality${i}`}>Nationality</label>
                <select
                  id={`familyNationality${i}`}
                  className="border rounded px-2 py-1"
                  value={f.nationality ? f.nationality.ID : 0} // Ensure a valid value is provided
                  onChange={(e) => handleFamilyNationalityChange(i, e)}
                  disabled={role === "Admin" && student.approved}
                >
                  {nationalities.map((n) => (
                    <option selected={n.Title === f.nationality?.Title} key={n.ID} value={n.ID} data-value={n}>
                      {n.Title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))
        ) : (
          <p>No family members found</p>
        )}

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
    ID: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    dateOfBirth: PropTypes.string,
    nationality: PropTypes.shape({
      ID: PropTypes.number,
      Title: PropTypes.string,
    }),
    familyMembers: PropTypes.arrayOf(
      PropTypes.shape({
        ID: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        relationship: PropTypes.string,
        dateOfBirth: PropTypes.string,
        nationality: PropTypes.shape({
          ID: PropTypes.number,
          Title: PropTypes.string,
        }),
      })
    ),
  }),
  role: PropTypes.string,
  onClose: PropTypes.func,
};

StudentModal.defaultProps = {
  student: {
    ID: null,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: { ID: null, Title: "" },
    familyMembers: [],
  },
  role: "",
  onClose: () => {},
};

export default StudentModal;
