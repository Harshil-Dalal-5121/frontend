const onChange = {
  change: (e, data, setData) => {
    const { name, value } = e.target || {};
    setData({
      ...data,
      [name]: value,
    });
  },

  switch: (e, data, setData) => {
    const { name, checked } = e.target || {};
    setData({
      ...data,
      [name]: checked,
    });
  },

  assignedTo: (e, value, data, setData) => {
    setData({
      ...data,
      assignedTo: value
        ? {
            id: value?.id || "",
            fullName: value?.fullName || "",
            version: value?.version || "",
            code: value?.code || "",
          }
        : "",
      membersUserSet: value
        ? [
            {
              code: "admin",
              fullName: "Admin",
              id: 1,
              version: 6,
            },
            {
              id: value?.id || "",
              fullName: value?.fullName || "",
              version: value?.version || "",
              code: value?.code || "",
            },
          ]
        : "",
    });
  },

  project: (e, value, data, setData) => {
    setData({
      ...data,
      parentProject: value
        ? {
            id: value?.id || "",
            fullName: value?.fullName || "",
            code: value?.code || "",
            $version: value?.version,
          }
        : "",
    });
  },

  company: (e, value, data, setData) => {
    setData({
      ...data,
      company: value
        ? {
            id: value?.id || "",
            code: value?.code || "",
            name: value?.name || "",
          }
        : "",
    });
  },

  currency: (e, value, data, setData) => {
    setData({
      ...data,
      currency: value
        ? {
            code: value?.code || "",
            id: value?.id || "",
            name: value?.name || "",
          }
        : "",
    });
  },

  customerContact: (e, value, data, setData) => {
    setData({
      ...data,
      contactPartner: value
        ? {
            fullName: value?.fullName || "",
            id: value?.id || "",
            $version: value?.$version || "",
          }
        : "",
    });
  },

  address: (e, value, data, setData) => {
    setData({
      ...data,
      customerAddress: value
        ? {
            fullName: value?.fullName || "",
            id: value?.id || "",
          }
        : "",
    });
  },

  priority: (e, value, data, setData) => {
    setData({
      ...data,
      priority: value
        ? {
            id: value?.id,
            name: value?.name,
            $version: 0,
          }
        : "",
    });
  },

  parentTask: (e, value, data, setData) => {
    setData({
      ...data,
      parentTask: value
        ? {
            id: value?.id,
            name: value?.name,
            fullName: value?.fullName,
            version: value?.version,
          }
        : "",
    });
  },
};

export default onChange;
