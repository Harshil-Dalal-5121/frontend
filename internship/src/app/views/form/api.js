import requestBody from "./requestBody";
import rest from "../../services/rest";
import { model } from "../projects/api";
import { fetchAction } from "app/services/services";
import axios from "axios";

const action = axios.create({
  headers: {
    Authorization: "Basic YWRtaW46YWRtaW4=",
  },
});

const formApi = {
  projects: async ({ value }) => {
    try {
      const response = await rest.post(
        `${model}/search`,
        requestBody.project(value)
      );

      if (response && response?.data?.status === 0) {
        return response?.data?.data || [];
      }
    } catch (error) {
      console.log(error);
    }
  },

  priority: async ({ value }) => {
    try {
      const response = await rest.post(
        `${model}Priority/search`,
        requestBody.priority(value)
      );

      if (response && response?.data?.status === 0) {
        return response?.data?.data || [];
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

      if (response && response?.data?.status === 0) {
        return response?.data?.data || [];
      }
    } catch (error) {}
  },

  fetchCustomer: async ({ value }) => {
    try {
      const response = await rest.post(
        `/com.axelor.apps.base.db.Partner/search`,
        {
          data: {
            criteria: [
              {
                fieldName: "fullName",
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
          fields: ["fullName"],
          limit: 10,
          offset: 0,
          sortBy: ["name"],
        }
      );

      if (response && response?.data?.status === 0) {
        return response?.data?.data || [];
      }
    } catch (error) {
      console.log(error);
    }
  },
  fetchCustomerCurrency: async ({ value }) => {
    try {
      const response = await action.post(`/ws/action`, {
        model: "com.axelor.apps.project.db.Project",
        action: "action-project-method-get-partner-data",
        data: {
          criteria: [],
          context: {
            _model: "com.axelor.apps.project.db.Project",
            clientPartner: value,
          },
        },
      });

      if (response && response?.data?.status === 0) {
        return response?.data?.data[0]?.values?.currency || [];
      }
    } catch (error) {
      console.log(error);
    }
  },
  fetchCurrency: async ({ value }) => {
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
          fields: ["code", "name", "id"],
          limit: 10,
        }
      );

      if (response && response?.data?.status === 0) {
        return response?.data?.data || [];
      }
    } catch (error) {
      console.log(error);
    }
  },

  fetchContactAction: async ({ value }) => {
    try {
      const domain = await action.post(`/ws/action`, {
        action: "action-attrs-domain-on-contact-partner",
        data: {
          context: {
            _model: "com.axelor.apps.project.db.Project",
            _source: "contactPartner",
            clientPartner: value,
          },
        },
      });
      if (domain && domain?.data?.status === 0) {
        return domain?.data?.data[0]?.attrs?.contactPartner?.domain || {};
      }
    } catch (error) {
      console.log(error);
    }
  },

  fetchCustomerContact: async ({ client, value }) => {
    const domain = await formApi.fetchContactAction({ value: client });

    const response = await rest.post(
      `/com.axelor.apps.base.db.Partner/search`,
      {
        data: {
          fullName: value,
          _domain: domain,
          _domainContext: {
            clientPartner: client,
            _model: "com.axelor.apps.project.db.Project",
          },
        },

        fields: ["id", "fullName"],
        limit: 10,
      }
    );

    if (response && response?.data?.status === 0) {
      return response?.data?.data || [];
    }
  },

  fetchAddress: async ({ client, value }) => {
    try {
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
              clientPartner: client,

              _model: "com.axelor.apps.project.db.Project",
            },
          },
          limit: 10,
          offset: 0,
          translate: true,
        }
      );

      if (response && response?.data?.status === 0) {
        console.log(response);
        return response?.data?.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default formApi;
