import axios from "axios";

axios.defaults.baseURL = "http://localhost:8088/api";

export const fetchStudents = () => {
  return axios.get("/students").then((response) => response.data);
};

export const fetchStudent = (id) => {
  return axios.get(`/students/${id}`).then((response) => response.data);
};

export const createStudent = (student) => {
  return axios.post("/students", student).then((response) => response.data);
};

export const updateStudent = (id, student) => {
  return axios
    .put(`/students/${id}`, student)
    .then((response) => response.data);
};

export const deleteStudent = (id) => {
  return axios.delete(`/students/${id}`).then((response) => response.data);
};

export const fetchStudentNationality = (id) => {
  return axios
    .get(`/students/${id}/nationality`)
    .then((response) => response.data);
};

export const updateStudentNationality = (id, nationalityId) => {
  return axios
    .put(`/students/${id}/nationality/${nationalityId}`)
    .then((response) => response.data);
};

export const fetchNationalities = () => {
  return axios.get("/nationalities").then((response) => response.data);
};

export const fetchFamilyMembers = (id) => {
  return axios
    .get(`/students/${id}/familyMembers`)
    .then((response) => response.data);
};

export const createFamilyMember = (id, familyMember) => {
  const { firstName, lastName, dateOfBirth, relationship, nationality } =
    familyMember;
  const formattedFamilyMember = {
    firstName,
    lastName,
    dateOfBirth,
    relationship,
    nationalityId: nationality.ID,
  };
  console.log("formatted family member:", formattedFamilyMember)
  return axios
    .post(`/students/${id}/familyMembers`, formattedFamilyMember)
    .then((response) => response.data);
};

export const updateFamilyMember = (id, familyMember) => {
  const { firstName, lastName, dateOfBirth, relationship, nationality } =
    familyMember;
  const formattedFamilyMember = {
    firstName,
    lastName,
    dateOfBirth,
    relationship,
    nationalityId: nationality.ID,
  };

  return axios
    .put(`/familyMembers/${id}`, formattedFamilyMember)
    .then((response) => response.data);
};

export const deleteFamilyMember = (id) => {
  return axios.delete(`/familyMembers/${id}`).then((response) => response.data);
};

export const fetchFamilyMemberNationality = (id) => {
  return axios
    .get(`/familyMembers/${id}/nationality`)
    .then((response) => response.data);
};

export const updateFamilyMemberNationality = (id, nationalityId) => {
  return axios
    .put(`/familyMembers/${id}/nationality/${nationalityId}`)
    .then((response) => response.data);
};
