import rest from "../../services/rest";
import { TASK_TABLE_FIELDS } from "../../utils/constants";

export const LIMIT = 6;
export const model = "com.axelor.apps.project.db.ProjectTask";

const api = {
  find: async ({ search = "", offset }) => {
    const response = await rest.post(`${model}/search`, {
      data: {
        criteria: [
          {
            fieldName: "name",
            operator: "like",
            value: search,
          },
        ],
        operator: "or",
        _domain: "self.typeSelect = :_typeSelect",
        _domainContext: {
          _typeSelect: "task",
        },
      },
      fields: TASK_TABLE_FIELDS,
      offset,
      limit: LIMIT,
      sortBy: ["id"],
    });
    if (response) {
      return response?.data;
    }
  },

  fetch: async ({ id }) => {
    try {
      const response = await rest.post(`${model}/${id}/fetch`, {
        fields: TASK_TABLE_FIELDS,
      });

      if (response && response.data.status !== -1) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },

  fetchTasks: async ({ id, offset, limit }) => {
    try {
      const response = await rest.post(`${model}/search`, {
        data: {
          _domain:
            "(self.project.id = :_id AND self.parentTask = null) AND (self.project.id = :_id)",
          _domainAction: "action-view-show-project-task-tree",
          _domainContext: {
            id: id,
            _model: "com.axelor.apps.project.db.Project",
            _countOn: "parentTask",
          },
        },
        fields: ["name", "taskDate", "assignedTo", "progressSelect"],
        offset: offset,
        limit: limit,
        sortBy: ["taskDate"],
      });

      if (response && response.data.status !== -1) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },
  delete: async ({ id, version, name }) => {
    try {
      const response = await rest.post(`${model}/removeAll`, {
        records: [{ id: id, version: version, name: name }],
      });
      if (response && response.data.status !== -1) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },

  save: async (data) => {
    try {
      const response = await rest.post(
        `${model}`,
        { data },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response && response?.data?.status === 0) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default api;
