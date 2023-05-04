import React, { useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useDebounce } from "app/services/custom-hooks/useDebounce";

// function Xselection({ title, value, options: _options, ...rest }) {
//   return <Autocomplete {...rest} value={value || null} />;
// }

const Selection = ({
  fetchApi,
  value,
  getOptionLabel,
  handleChange,
  label,
  options: _options,
}) => {
  const [options, setOptions] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleInputChange = async (e, value) => {
    setLoader(true);
    const options = await fetchApi({ value: value });
    setOptions(options || []);
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

// const AutoCompleteComponent = ({
//   data,
//   handleChange,
//   errors,
//   title,
//   label,
//   disabled,
//   getOptionLabel,
//   noOptionsText,
//   isOptionEqualToValue,
//   handleInputChange,
//   options,
//   opsLoading,
// }) => {
//   return (
//     <>
//       <Autocomplete
//         fullWidth
//         filterOptions={(x) => x}
//         value={data?.[title] || null}
//         options={options || []}
//         onInputChange={handleInputChange}
//         getOptionLabel={getOptionLabel}
//         noOptionsText={noOptionsText}
//         isOptionEqualToValue={isOptionEqualToValue}
//         onChange={(e, newValue) => handleChange(e, newValue)}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label={`${label}`}
//             error={errors?.[title] ? true : false}
//             helperText={errors?.[title] ? `${errors[title]}` : ""}
//             InputProps={{
//               ...params.InputProps,
//               endAdornment: (
//                 <>
//                   {opsLoading ? (
//                     <CircularProgress color="inherit" size={20} />
//                   ) : null}
//                   {params.InputProps.endAdornment}
//                 </>
//               ),
//             }}
//           />
//         )}
//       />
//     </>
//   );
// };

export default Selection;
