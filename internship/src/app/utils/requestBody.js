const requestBody = {
  project: (value) => {
    return {
      data: {
        code: value,
        fullName: value,
        _domainContext: {},
      },
      fields: ["id", "fullName", "code"],
    };
  },

  priority: (value) => {
    return {
      data: {
        name: value,
        _domain: "self.id IN (1,2,3,4)",
        _domainContext: {
          _model: "com.axelor.apps.project.db.ProjectTask",
          _typeSelect: "task",
        },
      },
      fields: ["id", "name"],
    };
  },

  assignedTo: () => {
    return {
      data: {
        _domain: "self.id IN(1)",
        _domainContext: {
          _typeSelect: "task",
          _model: "com.axelor.apps.project.db.ProjectTask",
        },
        operator: "and",
        criteria: [],
      },
      fields: ["name"],
    };
  },
  parentTaskAction: ({ projectId, taskId }) => {
    return {
      model: "com.axelor.apps.project.db.ProjectTask",
      action: "action-project-task-attrs-project-parent-task-configurations",
      data: {
        criteria: [],
        context: {
          _model: "com.axelor.apps.project.db.ProjectTask",
          _typeSelect: "task",

          project: {
            id: projectId,
          },
          id: taskId,

          _source: "parentTask",
        },
      },
    };
  },

  parentTask: ({ value, projectId, domain }) => {
    return {
      data: {
        fullName: value,
        name: value,
        _domain: domain,
        _domainContext: {
          _typeSelect: "task",
          project: {
            id: projectId,
          },
          typeSelect: "task",
          _model: "com.axelor.apps.project.db.ProjectTask",
        },
      },
    };
  },

  customer: (value) => {
    return {
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
    };
  },
  customerCurrency: (value) => {
    return {
      model: "com.axelor.apps.project.db.Project",
      action: "action-project-method-get-partner-data",
      data: {
        criteria: [],
        context: {
          _model: "com.axelor.apps.project.db.Project",
          clientPartner: value,
        },
      },
    };
  },
  currency: (value) => {
    return {
      data: {
        criteria: [{ fieldName: "name", operator: "like", value: value }],
        operator: "and",
        _domainContext: {
          _model: "com.axelor.apps.base.db.Currency",
        },
      },
      fields: ["code", "name", "id"],
      limit: 10,
    };
  },
  contactAction: (value) => {
    return {
      action: "action-attrs-domain-on-contact-partner",
      data: {
        context: {
          _model: "com.axelor.apps.project.db.Project",
          _source: "contactPartner",
          clientPartner: value,
        },
      },
    };
  },

  address: ({ value, client }) => {
    return {
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
    };
  },
};

export default requestBody;
