import { ChangeEvent, FC, useMemo, useState, useContext } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material";
import SaveIcon from '@mui/icons-material/SaveOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { dateFunctions } from '@/utils';
import { Layout } from "@/components";
import { Entry, EntryStatus } from '@/interfaces';
import { dbEntries } from '@/database';
import { EntryInterface } from '@/models';
import { EntriesContext } from '@/context';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

type Props = {
  entry: EntryInterface;
}

const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry, deleteEntry } = useContext(EntriesContext);
  const router = useRouter();

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => !inputValue.length && touched, [inputValue, touched]);
  const isDisabled = useMemo(
    () => (entry.status === status && entry.description === inputValue)
  , [inputValue, status]);

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  }

  const onSave = () => {
    if (!inputValue.trim().length) return;

    const updatedEntry: Entry = {
      ...entry,
      description: inputValue,
      status
    }
    
    updateEntry(updatedEntry, true);
    router.push('/');
  }

  const onDelete = () => {
    deleteEntry(entry._id);
    router.push('/');
  }

  return (
    <Layout title={inputValue.substring(0,17) + '...'}>
      <Grid
        container
        justifyContent="center"
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
          <Card>
            <CardHeader
              title={`Entrada:`}
              subheader={`Created ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
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
                disabled={isDisabled}
              >
                Save
              </Button>
            </CardActions>

          </Card>
        </Grid>
      </Grid>

      <IconButton
        onClick={onDelete}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark'
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage;