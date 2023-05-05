import rest from "../../services/rest";
import { TABLE_FIELDS } from "../../utils/constants";

export const LIMIT = 6;
export const model = "com.axelor.apps.project.db.Project";

const formFields = [
  "name",
  "fromDate",
  "parentProject",
  "clientPartner",
  "contactPartner",
  "toDate",
  "imputable",
  "projectStatus",
  "isBusinessProject",
  "assignedTo",
  "code",
  "customerAddress",
  "currency",
];

const api = {
  find: async ({ search = "", offset }) => {
    try {
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
        },
        fields: [...TABLE_FIELDS, "fullName"],
        offset,
        limit: LIMIT,
        sortBy: ["id"],
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

  fetch: async ({ id }) => {
    try {
      const response = await rest.post(`${model}/${id}/fetch`, {
        fields: formFields,
      });

      if (response && response.data.status !== -1) {
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
