import {
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  Container,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import useFetchRecord from "app/services/custom-hooks/useFetchRecord";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../projects/api";
import formApi from "../projects/api";
import { Add } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import styles from "./Forms.module.css";
import ProjectTaskTable from "./sideTable/ProjectTaskTable";
import Selection from "app/components/Selection";
import StatusSelect from "app/components/StatusSelect";
import DialogBox from "app/components/Dialog";
import handleValidation from "app/utils/handleValidation";
import onChange from "../../utils/onChange";
import LoadOnOpenSelection from "app/components/LoadOnOpenSelection";

const initialValues = {
  name: "",
  fromDate: "",
  parentProject: "",
  clientPartner: "",
  contactPartner: "",
  toDate: "",
  imputable: false,
  projectStatus: "",
  isBusinessProject: true,
  assignedTo: "",
  code: "",
  customerAddress: "",
  currency: "",
};

const errorMessages = {
  name: `Project Name is required`,
  code: `Code is required`,
};

const PrjForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const [customerContactOptions, setCustomerContactOptions] = useState([]);
  const [addressOptions, setAddressOptions] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const { loading } = useFetchRecord(id, api.fetch, setFormData);

  const {
    clientPartner,
    assignedTo,
    parentProject,
    contactPartner,
    toDate,
    fromDate,
    imputable,
    projectStatus,
    isBusinessProject,
    code,
    name,
    company,
    customerAddress,
    currency,
  } = formData;

  const handleCustomerChange = async (e, value) => {
    const currency = await formApi.fetchCustomerCurrency({ value: value });
    const currencyData = currency || "";

    setFormData({
      ...formData,
      clientPartner: {
        id: value?.id || "",
        fullName: value?.fullName || "",
      },
      currency: {
        id: currencyData?.id || "",
        name: currencyData?.name || "",
        code: currencyData?.code || "",
      },
    });

    const fetchCustomerContact = await formApi?.fetchCustomerContact({
      client: value,
    });

    const fetchAddress = await formApi?.fetchAddress({
      client: value,
    });

    setAddressOptions(fetchAddress);
    setCustomerContactOptions(fetchCustomerContact);
  };

  const fetchContactsApi = async ({ value }) => {
    const res = await formApi.fetchCustomerContact({
      value: { id: value.id, fullName: value.fullName },
      client: clientPartner,
    });
    setCustomerContactOptions(res || []);
  };

  const fetchAddressApi = async ({ value }) => {
    const res = await formApi.fetchAddress({
      value: value,
      client: clientPartner,
      company: company,
    });
    setAddressOptions(res);
  };

  const fetchCustomerApi = ({ value }) => {
    return formApi.fetchCustomer({
      value: value,
      company: company,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = handleValidation(
      formData,

      errorMessages
    );
    setErrors(errors);

    if (Object.keys(errors)?.length === 0) {
      setOpen(true);
    }
  };

  const handleSave = () => {
    api.save(formData);
    navigate("/projects");
    setOpen(false);
  };
  return <></>;
};

export default PrjForm;
