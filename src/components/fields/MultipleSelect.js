import * as React from 'react';

import {
  Box,
  Chip,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
} from "@material-ui/core";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect(props) {

  const [items, setItems] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    props.setSelected(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  React.useEffect(() => {
    setItems(props.items);
  }, [])

  return (
    <div>
      <FormControl style={{ minWidth: '100%', maxWidth: '100%' }}>
        <InputLabel id="demo-multiple-checkbox-label">{props.label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          defaultValue={props.item}
          multiple
          disabled={props.disabled}
          value={props.selected}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {items.map((value) => {
                const exist = selected.includes(value._id)
                if (exist) {
                  return <Chip key={value._id} label={value.name} />
                }
              })}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {items.map((item) => (
            <MenuItem 
              key={item._id} 
              value={item._id} 
            >
              <Checkbox checked={props.selected.indexOf(item._id) > -1} />
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
