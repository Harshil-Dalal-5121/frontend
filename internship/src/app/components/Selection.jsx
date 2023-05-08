import React, { useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useDebounce } from "app/services/custom-hooks/useDebounce";

const Selection = ({
  fetchApi,
  value,
  getOptionLabel,
  handleChange,
  label,
  options: _options,
  error,
  helperText,
}) => {
  const [options, setOptions] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleInputChange = async (e, value) => {
    setLoader(true);
    const options = await fetchApi({ value: value });
    setOptions(options);
    setLoader(false);
  };

  const delayedSearch = useDebounce(handleInputChange);

  return (
    <>
      <Autocomplete
        fullWidth
        filterOptions={(x) => x}
        value={value || null}
        options={_options ? _options : options}
        onInputChange={delayedSearch}
        getOptionLabel={getOptionLabel}
        noOptionsText="No Records"
        isOptionEqualToValue={(option, value) =>
          option?.value === value?.value || value === ""
        }
        onChange={(e, value) => handleChange(e, value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`${label}`}
            error={error}
            helperText={helperText}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loader ? (
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

export default Selection;
