import { ChangeEvent, FC, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { isValidObjectId } from 'mongoose';
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material";
import SaveIcon from '@mui/icons-material/SaveOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { Layout } from "@/components";
import { EntryStatus } from "@/interfaces";


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

type Props = {

}

const EntryPage: FC<Props> = (props) => {

  console.log({ props });

  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<EntryStatus>("pending");
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => !inputValue.length && touched, [inputValue, touched])

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setStatus(event.target.value as EntryStatus);
  }

  const onSave = () => {

  }

  return (
    <Layout title="... ... ...">
      <Grid
        container
        justifyContent="center"
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader={`Created ${'30 min'} ago`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="New entry"
                autoFocus
                multiline
                label="New entry"
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={onInputValueChange}
                helperText={ isNotValid && "Enter a value" }
                error={ isNotValid && touched }
              />

              <FormControl>
                <FormLabel>Status:</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={onStatusChange}
                >
                  {
                    validStatus.map( option => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={ <Radio />}
                        label={capitalize(option)}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>

            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveIcon />}
                variant={"contained"}
                fullWidth
                onClick={ onSave }
                disabled={!inputValue.length}
              >
                Save
              </Button>
            </CardActions>

          </Card>
        </Grid>
      </Grid>

      <IconButton sx={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        backgroundColor: 'error.dark'
      }}>
        <DeleteIcon />
      </IconButton>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { id } = params as { id: string };

  if (!isValidObjectId(id)) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {
      id
    }
  }
}

export default EntryPage;