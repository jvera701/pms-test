import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  timeout: 5000,
  timeoutErrorMessage: "Timeout error",
});

const login = async (email: string, password: string) => {
  try {
    const response = await API.post("/auth/login", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (e) {
    return {
      error: "Error",
    };
  }
};

const signUp = async (email: string, password: string) => {
  try {
    const response = await API.post("/auth/signup", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (e) {
    return {
      error: "Error",
    };
  }
};

const getProjects = async (token: string) => {
  try {
    const response = await API.get("/projects", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (e) {
    return {
      error: "Error",
    };
  }
};

const addProject = async (token: string, project: string) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const newProject = {
      name: project,
    };
    const response = await API.post("/projects", newProject, config);
    return response.data;
  } catch (e) {
    return {
      error: "Error",
    };
  }
};

export { login, signUp, getProjects, addProject };
