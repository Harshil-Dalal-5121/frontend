import rest from "../../services/rest";
import { ticketTableFields } from "../../services/services";

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
        _domain:
          "self.project.projectStatus.isCompleted = false AND self.typeSelect = :_typeSelect AND (self.project.id IN :_projectIds OR :_project is null) AND :__user__ MEMBER OF self.project.membersUserSet",
        _domainContext: { _typeSelect: "ticket" },
      },
      fields: ticketTableFields,
      offset,
      limit: LIMIT,
      sortBy: ["id"],
    });
    if (response) {
      return response;
    }
  },

  fetch: async ({ id }) => {
    try {
      const response = await rest.post(`${model}/${id}/fetch`, {
        fields: ticketTableFields,
      });

      if (response && response.data.status !== -1) {
        console.log(`hello`);
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },

  save: (data) => {
    try {
      rest.post(
        `${model}`,
        { data },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};

export default api;
