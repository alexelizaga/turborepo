import { ChangeEvent, FC, useEffect, useState } from "react";
import { GetServerSideProps } from 'next';
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import cookies from 'js-cookie';

import { Layout } from "@/components";

const ThemeChangerPage: FC = (props) => {
  console.log({ props });

  const [currentTheme, setCurrentTheme] = useState("light");

  const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;

    setCurrentTheme(selectedTheme);

    localStorage.setItem("theme", selectedTheme);
    cookies.set('theme', selectedTheme);
  };

  const onClick = async() => {
    const { data } = await axios.get('/api/hello');

    console.log({ data });
  }

  useEffect(() => {
    console.log("LocalStorage: ", localStorage.getItem("theme"));
    console.log("Cookies: ", cookies.get("theme"));
  }, []);

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Theme</FormLabel>
            <RadioGroup value={currentTheme} onChange={onThemeChange}>
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="light"
              />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="Custom"
              />
            </RadioGroup>
          </FormControl>
          <Button
            onClick={ onClick }
          >
            Request
          </Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const { theme = 'light' } = req.cookies;

  return {
    props: {
      theme
    }
  }
}


export default ThemeChangerPage;
