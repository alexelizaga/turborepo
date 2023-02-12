import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, useTheme } from "@mui/material";

import { ColorModeContext } from "../../../theme";


export const BcModalSetup = () => {
  const [open, setOpen] = useState(false);
  const { selectColorMode  } = useContext(ColorModeContext);
  const { t, i18n } = useTranslation(['shared']);
  const [language, setLanguage] = useState('es');
  const [themeColor, setThemeColor] = useState('dark')

  const handleLanguageChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
    const selectedlanguage = e.target.value;
    i18n.changeLanguage(selectedlanguage); //change the language
  };

  const handleThemeChange = (e: SelectChangeEvent) => {
    setThemeColor(e.target.value);
    selectColorMode(e.target.value === 'light' ? 'light': 'dark');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClickOpen}>
        <SettingsTwoToneIcon />
      </IconButton>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>{t('Settings')}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
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
                <MenuItem value={"dark"}>{t('Dark')}</MenuItem>
                <MenuItem value={"light"}>{t('Light')}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('Cancel')}</Button>
          <Button onClick={handleClose}>{t('Ok')}</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
