import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const DropdownListComponent = ({ options, label, handleChange, value }) => {

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        onChange={handleChange}
        inputValue={value}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </div>
  );
}

export default DropdownListComponent;