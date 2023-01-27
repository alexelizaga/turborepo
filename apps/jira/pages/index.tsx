import { Typography } from "@mui/material";
import { NextPage } from "next"
import { Layout } from "../layout";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Typography variant="h1" color="primary">Hello world</Typography>
    </Layout>
  )
}

export default HomePage;