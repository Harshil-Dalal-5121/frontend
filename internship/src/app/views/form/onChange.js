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
      assignedTo: {
        id: value?.id || "",
        fullName: value?.fullName || "",
      },
    });
  },

  project: (e, value, data, setData) => {
    setData({
      ...data,
      parentProject: {
        id: value?.id || "",
        fullName: value?.fullName || "",
        code: value?.code || "",
        $version: value?.version,
      },
    });
  },

  currency: (e, value, data, setData) => {
    setData({
      ...data,
      currency: {
        code: value?.code || "",
        id: value?.id || "",
        name: value?.name || "",
      },
    });
  },

  customerContact: (e, value, data, setData) => {
    setData({
      ...data,
      contactPartner: {
        fullName: value?.fullName || "",
        id: value?.id || "",
        $version: value?.$version || "",
      },
    });
  },

  address: (e, value, data, setData) => {
    setData({
      ...data,
      customerAddress: {
        fullName: value?.fullName || "",
        id: value?.id || "",
      },
    });
  },

  priority: (e, value, data, setData) => {
    setData({
      ...data,
      priority: {
        id: value.id,
        name: value.name,
        $version: 0,
      },
    });
  },

  parentTask: (e, value, data, setData) => {
    setData({
      ...data,
      parentTask: {
        id: value?.id,
        name: value?.name,
        fullName: value?.fullName,
        version: value?.version,
      },
    });
  },
};

export default onChange;
