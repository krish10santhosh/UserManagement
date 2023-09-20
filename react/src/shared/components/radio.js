import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Typography } from '@mui/material';

const RadioButtonComponent = ({ value, name, checked, disabled, description }) => {
  return (
    <FormControl>
      <div className={`${value == "facebooklive" ? "facebooklive" : "contents"}`}>
        <FormControlLabel value={value} control={<Radio />} label={name} checked={checked} disabled={disabled} />
        <Typography variant='subtitle2' color="gray" style={{
          position: 'relative',
          left: '30px'
        }}>{description}</Typography>
      </div>
    </FormControl>
  );
}
export default RadioButtonComponent;
