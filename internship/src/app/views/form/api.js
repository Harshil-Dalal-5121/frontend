import requestBody from "./requestBody";
import rest from "app/services/rest";
import { model } from "../projects/api";
import { fetchAction } from "app/services/services";

const formApi = {
  projects: async (value) => {
    try {
      const response = await rest.post(
        `${model}/search`,
        requestBody.project(value)
      );
      if (response && response.data.status !== -1) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },

  priority: async (value) => {
    try {
      const response = await rest.post(
        `${model}Priority/search`,
        requestBody.priority(value)
      );
      if (response && response.data.status !== -1) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },

  assignedTo: async () => {
    try {
      const response = await rest.post(
        `com.axelor.auth.db.User/search`,
        requestBody.assignedTo()
      );
      if (response && response.data.status !== -1) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },

  parentTask: async (projectId, taskId, value) => {
    try {
      const domain = await fetchAction(projectId, taskId);
      const response = await rest.post(
        `${model}Task/search`,
        requestBody.parentTask(value, projectId, domain)
      );
      if (response && response.data.status !== -1) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },

  saveProject: (formData) => {
    try {
      rest.post(`${model}`, formData);
    } catch (error) {
      console.log(error);
    }
  },

  saveTask: (formData) => {
    try {
      console.log(`Task`);
      rest.post(`${model}`, formData);
    } catch (error) {
      console.log(error);
    }
  },

  saveTicket: ({ formData }) => {
    try {
      rest.post(`${model}`, formData);
    } catch (error) {
      console.log(error);
    }
  },
};

export default formApi;
