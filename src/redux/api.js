import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "content-type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/user/signin", formData);

export const signUp = (formData) => API.post("/user/signup", formData);

export const googleSignUp = (result) => API.post("/user/googleSignIn", result);

export const createTour = (tourData) => API.post("/tour/create-tour", tourData);

export const getTour = (tourData) => API.post("/tour",tourData);

export const getSingleTour = (id) => API.get(`/tour/${id}`);

export const getTourByUser = () => API.post("/tour/user-tours");

export const deleteTour = (id) => API.delete(`/tour/delete-tour/${id}`);

export const updateTour = (updatedTourData, id) =>
  API.patch(`/tour/update-tour/${id}`, updatedTourData);

export const getToursBySearch = (searchQuery) =>
  API.get(`/tour/search?searchQuery=${searchQuery}`);

export const showTourByTag = (tagName) => API.get(`/tour/tour-tag/${tagName}`);

export const showRelatedTour = (tags) => API.post('/tour/relatedTour',tags);

export const likeTour = (id) => API.post(`/tour/like/${id}`);

