import requestBody from "./requestBody";
import rest from "app/services/rest";
import { model } from "../projects/api";
import { fetchAction } from "app/services/services";
import axios from "axios";

const action = axios.create({
  headers: {
    Authorization: "Basic YWRtaW46YWRtaW4=",
  },
});

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

  fetchCustomer: async (value) => {
    try {
      const response = await rest.post(
        `/com.axelor.apps.base.db.Partner/search`,
        {
          data: {
            criteria: [
              {
                fieldName: "simpleFullName",
                operator: "like",
                value: value,
              },
            ],
            operator: "and",
            _domain:
              "self.isCustomer = true AND :company member of self.companySet",

            _domainContext: {
              company: {
                code: "AXE",
                name: "Axelor",
                id: 1,
              },

              _model: "com.axelor.apps.project.db.Project",
            },
          },
          fields: [
            "partnerCategory",
            "fiscalPosition.code",
            "simpleFullName",
            "partnerSeq",
            "emailAddress.address",
            "fixedPhone",
            "registrationCode",
            "mainAddress",
            "companyStr",
          ],
          limit: 10,
          offset: 0,
          sortBy: ["name"],
        }
      );

      if (response && response.data.status !== -1) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },

  fetchCustomerCurrency: async (data) => {
    try {
    } catch (error) {
      console.log(error);
    }

    const response = await action.post(`/ws/action`, {
      model: "com.axelor.apps.project.db.Project",
      action: "action-project-method-get-partner-data",
      data: {
        criteria: [],
        context: {
          _model: "com.axelor.apps.project.db.Project",
          clientPartner: data,
        },
      },
    });

    if (response && response.data.status !== -1) {
      return response?.data?.data;
    }
  },

  fetchCurrency: async (value) => {
    try {
      const response = await rest.post(
        `/com.axelor.apps.base.db.Currency/search`,
        {
          data: {
            criteria: [{ fieldName: "name", operator: "like", value: value }],
            operator: "and",
            _domainContext: {
              _model: "com.axelor.apps.base.db.Currency",
            },
          },
          fields: ["symbol", "code", "name", "codeISO", "id"],
          limit: 10,
        }
      );

      if (response && response?.data?.status !== -1) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },

  fetchContactAction: async (data) => {
    try {
      const response = await action.post(`/ws/action`, {
        action: "action-attrs-domain-on-contact-partner",
        data: {
          context: {
            _model: "com.axelor.apps.project.db.Project",
            _source: "contactPartner",
            clientPartner: data,
          },
        },
      });

      if (response && response?.data?.status !== -1) {
        return response?.data?.data[0]?.attrs;
      }
    } catch (error) {
      console.log(error);
    }
  },

  fetchCustomerContact: async (id, value) => {
    try {
      const domain = await formApi.fetchContactAction(id);

      const response = await rest.post(
        `/com.axelor.apps.base.db.Partner/search`,
        {
          data: {
            fullName: value,
            _domain: domain?.contactPartner?.domain,
            _domainContext: {
              clientPartner: id,
              _model: "com.axelor.apps.project.db.Project",
            },
          },

          fields: ["id", "fullName"],
          limit: 10,
        }
      );
      if (response && response?.data?.status !== -1) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  },

  fetchAddress: async (id, value) => {
    try {
      console.log(id, value);
      const response = await rest.post(
        `/com.axelor.apps.base.db.Address/search`,
        {
          fields: [
            "id",
            "fullName",
            "addressL2",
            "addressL3",
            "addressL4",
            "addressL5",
            "addressL6",
          ],

          data: {
            addressL2: value,
            addressL3: value,
            addressL4: value,
            addressL5: value,
            addressL6: value,
            fullName: value,

            _domain:
              "self IN (SELECT address FROM PartnerAddress where partner = :clientPartner)",
            _domainContext: {
              company: {
                code: "AXE",
                name: "Axelor",
                id: 1,
              },
              clientPartner: id,

              _model: "com.axelor.apps.project.db.Project",
            },
          },
          limit: 10,
          offset: 0,
          translate: true,
        }
      );
      if (response && response?.data?.status !== -1) {
        console.log(response);
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
