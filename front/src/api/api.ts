import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  timeout: 5000,
  timeoutErrorMessage: "Timeout error",
});

type Token = {
  access_token: string;
};

type Project = {
  id: number;
  name: string;
};

type Status = {
  id: number;
  name: string;
};

type Card = {
  id: number;
  title: string;
  description: string;
  status: Status | null;
};

const login = async (email: string, password: string) => {
  try {
    const response = await API.post<Token>("/auth/login", {
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
    const response = await API.post<Token>("/auth/signup", {
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
    const response = await API.get<Project[]>("/projects", {
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
    const response = await API.post<Project>("/projects", newProject, config);
    return response.data;
  } catch (e) {
    return {
      error: "Error",
    };
  }
};

const getAllStatuses = async (token: string, projectId: number) => {
  try {
    const response = await API.get<Status[]>(`/projects/${projectId}/status`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (e) {
    return {
      error: "Error",
    };
  }
};

const addStatus = async (token: string, projectId: number, name: string) => {
  try {
    const newName = {
      name: name,
    };
    const response = await API.post<Status>(
      `/projects/${projectId}/status`,
      newName,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (e) {
    return {
      error: "Error",
    };
  }
};

const getCards = async (token: string, projectId: number) => {
  try {
    const response = await API.get<Card[]>(`/projects/${projectId}/cards`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (e) {
    return {
      error: "Error",
    };
  }
};

const addCard = async (
  token: string,
  projectId: number,
  title: string,
  description: string,
  statusId: number | undefined
) => {
  try {
    const newCard = {
      title: title,
      description: description,
      ...(statusId && { statusId: statusId }),
    };
    const response = await API.post<Card>(
      `/projects/${projectId}/cards`,
      newCard,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (e) {
    return {
      error: "Error",
    };
  }
};

const deleteCard = async (token: string, projectId: number, cardId: number) => {
  try {
    const response = await API.delete(`/projects/${projectId}/cards`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { cardId: cardId },
    });
    return response.data;
  } catch (e) {
    return {
      error: "Error",
    };
  }
};

const editCard = async (
  token: string,
  projectId: number,
  cardId: number,
  title: string,
  description: string,
  statusId?: number
) => {
  try {
    const newCard = {
      title: title,
      description: description,
      cardId: cardId,
      ...(statusId ? { statusId: statusId } : { statusId: null }),
    };

    const response = await API.patch<Card>(
      `/projects/${projectId}/cards`,
      newCard,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (e) {
    return {
      error: "Error",
    };
  }
};

export {
  login,
  signUp,
  getProjects,
  addProject,
  getAllStatuses,
  addStatus,
  getCards,
  addCard,
  deleteCard,
  editCard,
};

export type { Project, Card, Status };
