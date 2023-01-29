import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC } from 'react';

type Props = {
  language?: string;
  themeColor?: string;
  handleLanguageChange?: (e: SelectChangeEvent) => void;
  handleThemeChange?: (e: SelectChangeEvent) => void;
}

export const SetupModal: FC<Props> = ({
  language,
  themeColor,
  handleLanguageChange,
  handleThemeChange
}) => {
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel variant="standard" id="language-select-small">{"Language"}</InputLabel>
        <Select
          variant="standard"
          labelId="language-select-small"
          id="language-select-small"
          value={language}
          label={"Language"}
          onChange={handleLanguageChange}
        >
          <MenuItem value={"en"}>English</MenuItem>
          <MenuItem value={"es"}>Español</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel variant="standard" id="theme-select-small">{"Theme"}</InputLabel>
        <Select
          variant="standard"
          labelId="theme-select-small"
          id="theme-select-small"
          value={themeColor}
          label={"Theme"}
          onChange={handleThemeChange}
        >
          <MenuItem value={"dark"}>{'Dark'}</MenuItem>
          <MenuItem value={"light"}>{'Light'}</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}
