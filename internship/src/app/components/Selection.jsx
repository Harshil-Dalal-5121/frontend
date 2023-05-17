import React, { useState } from "react";
import {
  Autocomplete,
  CircularProgress,
  InputLabel,
  TextField,
} from "@mui/material";
import { useDebounce } from "app/services/custom-hooks/useDebounce";

const Selection = ({
  fetchApi,
  value,
  getOptionLabel,
  handleChange,
  label,
  //
  options: _options,
  error,
  helperText,
  //
  load = true,
}) => {
  const [options, setOptions] = useState([]);
  const [open, setOpen] = React.useState(false);
  const loading = open && options.length === 0 && load;

  const handleInputChange = async (e, value) => {
    const options = await fetchApi({ value: value });
    setOptions(options || []);
  };

  const delayedSearch = useDebounce(handleInputChange);

  const fetchOps = React.useCallback(async () => {
    try {
      const response = await fetchApi({ value: "" });

      return response;
    } catch (err) {
      console.error(err);
    }
  }, [fetchApi]);

  React.useEffect(() => {
    if (open) {
      let active = true;

      if (!loading) {
        return undefined;
      }

      if (active) {
        (async () => {
          const response = await fetchOps();
          setOptions(response || []);
        })();
      }
      return () => {
        active = false;
      };
    }
  }, [fetchOps, loading, open]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      <InputLabel error={error}>{`${label}`}</InputLabel>
      <Autocomplete
        fullWidth
        filterOptions={(x) => x}
        value={value || null}
        options={_options ? _options || [] : options}
        onInputChange={delayedSearch}
        getOptionLabel={getOptionLabel}
        noOptionsText="No Records"
        isOptionEqualToValue={(option, value) =>
          option?.value === value?.value || value === ""
        }
        loading={loading}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(e, value) => handleChange(e, value)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            error={error}
            helperText={helperText}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
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
