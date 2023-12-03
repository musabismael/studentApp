import React from "react";

const FormPage = () => {
  const [student, setStudent] = React.useState({
    name: "",
    nationality: "",
    dateOfBirth: "",
    parents: [],
    siblings: [],
  });

  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          name="name"
          value={student.name}
          onChange={handleChange}
          disabled={submitted}
        />
      </label>

      <label>
        Nationality:
        <input
          name="nationality"
          value={student.nationality}
          onChange={handleChange}
          disabled={submitted}
        />
      </label>

      <label>
        Date of Birth:
        <input
          name="dateOfBirth"
          value={student.dateOfBirth}
          onChange={handleChange}
          disabled={submitted}
        />
      </label>

      <button type="submit">{submitted ? "Submitted" : "Submit"}</button>
    </form>
  );
};

export default FormPage;
