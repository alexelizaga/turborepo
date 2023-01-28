import { ChangeEvent, FC, useState } from 'react';
import { Box, Button, TextField } from '@mui/material'
import SaveIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';

type Props = {
  isAdding: boolean;
  setIsAdding: (value: boolean) => void;
  onSave: (description: string) => void
}

export const NewEntry: FC<Props> = ({ onSave, isAdding, setIsAdding }) => {
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement> ) => {
    setInputValue(event.target.value);
  }

  return (
    <Box sx={{ mb: 2, px: 1 }}>

      {
        isAdding ? (
          <>
            <TextField
              fullWidth
              sx={{ mt: 2, mb: 1 }}
              placeholder='New entry'
              autoFocus
              multiline
              label='New entry'
              helperText={ inputValue.length <= 0 && touched && 'Add a value' }
              error={inputValue.length <= 0 && touched}
              value={inputValue}
              onChange={onTextFieldChanged}
              onBlur={() => setTouched(true)}
            />

            <Box display='flex' justifyContent='space-between'>
              <Button
                variant='text'
                onClick={() => {
                  setIsAdding(false)
                  setTouched(false)
                  setInputValue('')
                }}
              >
                Cancel
              </Button>

              <Button
                variant='outlined'
                color='secondary'
                endIcon={<SaveIcon />}
                onClick={() => {
                  if( !inputValue ) return;
                  setIsAdding(false);
                  setTouched(false);
                  setInputValue('')
                  onSave(inputValue);
                }}
              >
                Save
              </Button>
            </Box>
          </>
        ): (
          <Button
            startIcon={<AddIcon />}
            fullWidth
            variant='outlined'
            onClick={() => setIsAdding(true)}
          >
            Add task
          </Button>
        )
      }
    </Box>
  )
}
