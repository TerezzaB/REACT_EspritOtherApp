import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

export default function AutocompleteComponent({ options, onChange }) {
  return (
    <Autocomplete
      options={options}
      onChange={onChange} // Handle selection change
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Serial Number"
          variant="outlined"
        />
      )}
      sx={{
        width: 300,
        margin: '0 auto',
      }}
    />
  );
}