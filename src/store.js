// src/store.js

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

// Define the initial state of the students slice
const studentsInitialState = {
  loading: false,
  error: null,
  data: [],
};

// Define the reducer function for the students slice
const studentsReducer = (state = studentsInitialState, action) => {
  switch (action.type) {
    case "FETCH_STUDENTS_REQUEST":
      // Set the loading state to true and clear any previous error
      return { ...state, loading: true, error: null };
    case "FETCH_STUDENTS_SUCCESS":
      // Set the loading state to false and update the data with the payload
      return { ...state, loading: false, data: action.payload };
    case "FETCH_STUDENTS_FAILURE":
      // Set the loading state to false and set the error with the payload
      return { ...state, loading: false, error: action.payload };
    case "CREATE_STUDENT_REQUEST":
      // Set the loading state to true and clear any previous error
      return { ...state, loading: true, error: null };
    case "CREATE_STUDENT_SUCCESS":
      // Set the loading state to false and append the new student to the data
      return { ...state, loading: false, data: [...state.data, action.payload] };
    case "CREATE_STUDENT_FAILURE":
      // Set the loading state to false and set the error with the payload
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_STUDENT_REQUEST":
      // Set the loading state to true and clear any previous error
      return { ...state, loading: true, error: null };
    case "UPDATE_STUDENT_SUCCESS":
      // Set the loading state to false and update the student in the data
      return {
        ...state,
        loading: false,
        data: state.data.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
    case "UPDATE_STUDENT_FAILURE":
      // Set the loading state to false and set the error with the payload
      return { ...state, loading: false, error: action.payload };
    case "DELETE_STUDENT_REQUEST":
      // Set the loading state to true and clear any previous error
      return { ...state, loading: true, error: null };
    case "DELETE_STUDENT_SUCCESS":
      // Set the loading state to false and remove the student from the data
      return {
        ...state,
        loading: false,
        data: state.data.filter((s) => s.id !== action.payload),
      };
    case "DELETE_STUDENT_FAILURE":
      // Set the loading state to false and set the error with the payload
      return { ...state, loading: false, error: action.payload };
    default:
      // Return the current state for any unknown action type
      return state;
  }
};

// Define the initial state of the nationalities slice
const nationalitiesInitialState = {
  loading: false,
  error: null,
  data: [],
};

// Define the reducer function for the nationalities slice
const nationalitiesReducer = (state = nationalitiesInitialState, action) => {
  switch (action.type) {
    case "FETCH_NATIONALITIES_REQUEST":
      // Set the loading state to true and clear any previous error
      return { ...state, loading: true, error: null };
    case "FETCH_NATIONALITIES_SUCCESS":
      // Set the loading state to false and update the data with the payload
      return { ...state, loading: false, data: action.payload };
    case "FETCH_NATIONALITIES_FAILURE":
      // Set the loading state to false and set the error with the payload
      return { ...state, loading: false, error: action.payload };
    default:
      // Return the current state for any unknown action type
      return state;
  }
};

// Combine the students and nationalities reducers into a root reducer
const rootReducer = combineReducers({
  students: studentsReducer,
  nationalities: nationalitiesReducer,
});

// Create the redux store with the root reducer and the thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

// Export the store
export default store;
