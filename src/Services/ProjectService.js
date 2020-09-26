import Axios from "axios";

// Fetch requests for backend end-points
export default {
  // api/project/... routes
  getProject: async (id, token) => {
    try {
      const { data } = await Axios({
        method: "get",
        url: `http://localhost:8080/api/project/${id}`,
        headers: { "x-auth-token": token },
      });
      return data;
    } catch (error) {
      console.log(`Error - ProjectService.js - getProject() - ${error}`);
    }
  },
  getAllProjects: async (token) => {
    try {
      const { data } = await Axios({
        method: "get",
        url: `http://localhost:8080/api/project`,
        headers: { "x-auth-token": token },
      });
      return data;
    } catch (error) {
      console.log(`Error - ProjectService.js - getAllProjects() - ${error}`);
    }
  },
  getProjectByUserId: async (id, token) => {
    try {
      const { data } = await Axios({
        method: "get",
        url: `http://localhost:8080/api/project/user/${id}`,
        headers: { "x-auth-token": token },
      });
      return data;
    } catch (error) {
      console.log(`Error - ProjectService.js - getAllProjects() - ${error}`);
    }
  },
  createProject: async (project, token) => {
    try {
      const { data } = await Axios({
        method: "post",
        url: `http://localhost:8080/api/project`,
        data: project,
        headers: { "x-auth-token": token },
      });
      return data;
    } catch (error) {
      console.log(`Error - ProjectService.js - createProject() - ${error}`);
    }
  },
  deleteProject: async (id, token) => {
    try {
      const { data } = await Axios({
        method: "delete",
        url: `http://localhost:8080/api/project/${id}`,
        headers: { "x-auth-token": token },
      });
      return data;
    } catch (error) {
      console.log(`Error - ProjectService.js - deleteProject() - ${error}`);
    }
  },

  // api/project/risk/... routes
  getRisk: async (id, token) => {
    try {
      const { data } = await Axios({
        method: "get",
        url: `http://localhost:8080/api/project/risk/${id}`,
        headers: { "x-auth-token": token },
      });
      return data;
    } catch (error) {
      console.log(`Error - ProjectService.js - getRisk() - ${error}`);
    }
  },

  // api/project/risk/... routes
  getRisksByProjectId: async (id, token) => {
    try {
      const { data } = await Axios({
        method: "get",
        url: `http://localhost:8080/api/project/risk/project/${id}`,
        headers: { "x-auth-token": token },
      });
      return data;
    } catch (error) {
      console.log(
        `Error - ProjectService.js - getRisksByProjectId() - ${error}`
      );
    }
  },
  getRisksByUserId: async (id, token) => {
    try {
      const { data } = await Axios({
        method: "get",
        url: `http://localhost:8080/api/project/risk/user/${id}`,
        headers: { "x-auth-token": token },
      });
      return data;
    } catch (error) {
      console.log(`Error - ProjectService.js - getRisksByUserId() - ${error}`);
    }
  },

  createRisk: async (newRisk, token) => {
    try {
      const { data } = await Axios({
        method: "post",
        url: `http://localhost:8080/api/project/risk/`,
        data: newRisk,
        headers: { "x-auth-token": token },
      });
      return data;
    } catch (error) {
      console.log(`Error - ProjectService.js - createRisk() - ${error}`);
    }
  },

  createComment: async (id, newComment, token) => {
    try {
      const { data } = await Axios({
        method: "put",
        url: `http://localhost:8080/api/project/risk/${id}/comment`,
        data: newComment,
        headers: { "x-auth-token": token },
      });
      return data;
    } catch (error) {
      console.log(`Error - ProjectService.js - createComment() - ${error}`);
    }
  },

  deleteRisk: async (id, token) => {
    try {
      const { data } = await Axios({
        method: "delete",
        url: `http://localhost:8080/api/project/risk/${id}`,
        headers: { "x-auth-token": token },
      });
      return data;
    } catch (error) {
      console.log(`Error - ProjectService.js - deleteRisk() - ${error}`);
    }
  },
};
