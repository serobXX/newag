import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TAppItem, useDashboard } from '~hooks/dashboard';
import { useNavigate } from 'react-router-dom';

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


export default function AppSelect({ select }: { select: TAppItem[] }) {
  const {
    selectedApp,
    setSelectedApp
  } = useDashboard()

  React.useEffect(() => {
    if (select[0] && !selectedApp) {
      setSelectedApp(select[0].wid)
    }
  }, [select, selectedApp])

  const handleChange = (event: SelectChangeEvent<typeof selectedApp>) => {
    const {
      target: { value }
    } = event;
    setSelectedApp(
      value
    )
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-simple-select-label">App</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedApp}
          label="Age"
          onChange={handleChange}
        >
          {select.map((app) => (
            <MenuItem
              key={app.index}
              value={app.wid}
            >
              {app.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
