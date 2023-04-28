import rest from "./rest";
import { tableFields } from "./services";

export const LIMIT = 6;

const api = {
  find: async ({ model, search = "", offset }) => {
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
      fields: tableFields,
      offset,
      limit: LIMIT,
    });
    if (response) {
      console.log(search);
      return response;
    }
  },
};

export default api;
