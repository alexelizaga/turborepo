import { FC } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';

type Props = {
  t?: any;
  language?: string;
  themeColor?: string;
  handleLanguageChange?: (e: SelectChangeEvent) => void;
  handleThemeChange?: (e: SelectChangeEvent) => void;
}

export const SetupModal: FC<Props> = ({
  t = (text: string) => text,
  language,
  themeColor,
  handleLanguageChange,
  handleThemeChange
}) => {
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel variant="standard" id="language-select-small">{t("Language")}</InputLabel>
        <Select
          variant="standard"
          labelId="language-select-small"
          id="language-select-small"
          value={language}
          label={t("Language")}
          onChange={handleLanguageChange}
        >
          <MenuItem value={"en"}>English</MenuItem>
          <MenuItem value={"es"}>Español</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel variant="standard" id="theme-select-small">{t("Theme")}</InputLabel>
        <Select
          variant="standard"
          labelId="theme-select-small"
          id="theme-select-small"
          value={themeColor}
          label={t("Theme")}
          onChange={handleThemeChange}
        >
          <MenuItem value={"light"}>{ t('Light') }</MenuItem>
          <MenuItem value={"dark"}>{ t('Dark') }</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}
