import * as React from 'react';
import {
    FormControl,
    Select,
    MenuItem,
    InputLabel
} from "@material-ui/core";

export default function SimpleSelect({ label, items, item, setItem }) {

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  return (
    <FormControl style={{ minWidth: '100%', maxWidth: '100%' }}>
      <InputLabel id="demo-select-small">{label}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        variant="outlined"
        value={item}
        label={label}
        onChange={handleChange}
      >
        {items.map((item) => (
            <MenuItem value={item.key}>{item.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}