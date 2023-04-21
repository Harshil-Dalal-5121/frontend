import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { debounce } from "@mui/material/utils";
import { fetchOptions, getOptions, getPriority } from "app/services/services";
import React, { useState } from "react";

const AutoCompleteCompenent = ({
  data,
  handleChange,
  errors,
  title,
  getOptionLabel,
  noOptionsText,
  isOptionEqualToValue,
}) => {
  const [options, setOptions] = useState([]);

  const [opsLoading, setOpsLoading] = useState(false);

  const handleInputChange = async (event) => {
    const { value } = event.target;

    const projectReqBody = {
      data: {
        code: value,
        fullName: value,
        _domainContext: {},
      },
      fields: ["id", "fullName", "code"],
    };
    const priorityReqBody = {
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

    await debounce(async () => {
      setOpsLoading(true);
      if (title === "project") {
        await fetchOptions(getOptions, setOptions, projectReqBody);
      } else {
        await fetchOptions(getPriority, setOptions, priorityReqBody);
      }

      setOpsLoading(false);
    }, 1000)();
  };

  const Options = options?.map((a) =>
    title === "project"
      ? {
          id: a.id,
          fullName: a.fullName,
          name: a.name,
          code: a.code || null,
        }
      : { id: a.id, name: a.name }
  );

  return (
    <>
      <Autocomplete
        fullWidth
        id={`${title}`}
        name={`${title}`}
        value={data?.[title] || null}
        options={Options || []}
        onInputChange={handleInputChange}
        getOptionLabel={getOptionLabel}
        noOptionsText={noOptionsText}
        isOptionEqualToValue={isOptionEqualToValue}
        onChange={(e, newValue) => handleChange(e, newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`${title}`}
            error={errors?.[title] ? true : false}
            helperText={errors?.[title] ? `${errors[title]}` : ""}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {opsLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </>
  );
};

export default AutoCompleteCompenent;
