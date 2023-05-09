import React, { useCallback } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useDebounce } from "app/services/custom-hooks/useDebounce";

const LoadOnOpenSelection = ({
  label,
  fetchApi,
  value,
  getOptionLabel,
  handleChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const fetchOps = useCallback(async () => {
    try {
      const response = await fetchApi({ value: "" });

      return response;
    } catch (err) {
      console.error(err);
    }
  }, [fetchApi]);

  React.useEffect(() => {
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
  }, [fetchOps, loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleInputChange = async (e, value) => {
    const options = await fetchApi({ value: value });
    setOptions(options || []);
  };

  const delayedSearch = useDebounce(handleInputChange);

  return (
    <Autocomplete
      fullWidth
      id="asynchronous-demo"
      open={open}
      value={value || null}
      filterOptions={(x) => x}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(e, value) => handleChange(e, value)}
      onInputChange={delayedSearch}
      isOptionEqualToValue={(option, value) =>
        option.value === value.value || value === ""
      }
      getOptionLabel={getOptionLabel}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={`${label}`}
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
  );
};

export default LoadOnOpenSelection;
