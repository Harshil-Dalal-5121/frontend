import rest from "../../services/rest";
import { LIMIT, TICKET_TABLE_FIELDS } from "../../utils/constants";

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
        _domain:
          "self.project.projectStatus.isCompleted = false AND self.typeSelect = :_typeSelect AND (self.project.id IN :_projectIds OR :_project is null) AND :__user__ MEMBER OF self.project.membersUserSet",
        _domainContext: { _typeSelect: "ticket" },
      },
      fields: TICKET_TABLE_FIELDS,
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
        fields: TICKET_TABLE_FIELDS,
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
