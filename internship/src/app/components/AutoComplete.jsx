import React from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

const AutoCompleteComponent = ({
  data,
  handleChange,
  errors,
  title,
  label,
  disabled,
  getOptionLabel,
  noOptionsText,
  isOptionEqualToValue,
  handleInputChange,
  options,
  opsLoading,
}) => {
  return (
    <>
      <Autocomplete
        fullWidth
        filterOptions={(x) => x}
        value={data?.[title] || null}
        options={options || []}
        onInputChange={handleInputChange}
        getOptionLabel={getOptionLabel}
        noOptionsText={noOptionsText}
        isOptionEqualToValue={isOptionEqualToValue}
        onChange={(e, newValue) => handleChange(e, newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`${label}`}
            error={errors?.[title] ? true : false}
            disabled={disabled}
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

export default AutoCompleteComponent;
