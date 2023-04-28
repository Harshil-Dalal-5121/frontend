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
      fields: [
        "tradingName",
        "blocked",
        "name",
        "activateOn",
        "fullName",
        "expiresOn",
        "activeCompany",
        "group",
      ],
    };
  },

  parentTask: (value, projectId, domain) => {
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
};

export default requestBody;
