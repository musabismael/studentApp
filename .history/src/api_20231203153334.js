import axios from "axios";

// Set the base URL to the endpoint
axios.defaults.baseURL = "http://localhost:8088/api";

// Define the function for fetching all students
export const fetchStudents = () => {
  // Return a promise that resolves with the data
  return axios.get("/students").then((response) => response.data);
};

// Define the function for fetching a single student by ID
export const fetchStudent = (id) => {
  // Return a promise that resolves with the data
  return axios.get(`/students/${id}`).then((response) => response.data);
};

// Define the function for creating a new student
export const createStudent = (student) => {
  // Return a promise that resolves with the data
  return axios.post("/students", student).then((response) => response.data);
};

// Define the function for updating an existing student by ID
export const updateStudent = (id, student) => {
  // Return a promise that resolves with the data
  return axios
    .put(`/students/${id}`, student)
    .then((response) => response.data);
};

// Define the function for deleting an existing student by ID
export const deleteStudent = (id) => {
  // Return a promise that resolves with the data
  return axios.delete(`/students/${id}`).then((response) => response.data);
};

// Define the function for fetching the student's nationality by ID
export const fetchStudentNationality = (id) => {
  // Return a promise that resolves with the data
  return axios
    .get(`/students/${id}/nationality`)
    .then((response) => response.data);
};

// Define the function for updating the student's nationality by ID
export const updateStudentNationality = (id, nationalityId) => {
  // Return a promise that resolves with the data
  return axios
    .put(`/students/${id}/nationality/${nationalityId}`)
    .then((response) => response.data);
};

// Define the function for fetching all nationalities
export const fetchNationalities = () => {
  // Return a promise that resolves with the data
  return axios.get("/nationalities").then((response) => response.data);
};

// Define the function for fetching the student's family members by ID
export const fetchFamilyMembers = (id) => {
  // Return a promise that resolves with the data
  return axios
    .get(`/students/${id}/familyMembers`)
    .then((response) => response.data);
};

// Define the function for creating a new family member for a student by ID
export const createFamilyMember = (id, familyMember) => {
  // Return a promise that resolves with the data
  return axios
    .post(`/students/${id}/familyMembers`, familyMember)
    .then((response) => response.data);
};

// Define the function for updating an existing family member by ID
export const updateFamilyMember = (id, familyMember) => {
  // Return a promise that resolves with the data
  return axios
    .put(`/familyMembers/${id}`, familyMember)
    .then((response) => response.data);
};

// Define the function for deleting an existing family member by ID
export const deleteFamilyMember = (id) => {
  // Return a promise that resolves with the data
  return axios.delete(`/familyMembers/${id}`).then((response) => response.data);
};

// Define the function for fetching the family member's nationality by ID
export const fetchFamilyMemberNationality = (id) => {
  // Return a promise that resolves with the data
  return axios
    .get(`/familyMembers/${id}/nationality`)
    .then((response) => response.data);
};

// Define the function for updating the family member's nationality by ID
export const updateFamilyMemberNationality = (id, nationalityId) => {
  // Return a promise that resolves with the data
  return axios
    .put(`/familyMembers/${id}/nationality/${nationalityId}`)
    .then((response) => response.data);
};
