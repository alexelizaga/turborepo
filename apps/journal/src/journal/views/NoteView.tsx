import { useMemo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from '../../hooks';
import { ImageGallery } from '../components';
import { useJournalStore } from '../../store';


export const NoteView = () => {
	const { t, i18n } = useTranslation(['journal']);
	const { active: note, messageSaved, isSaving, startDeletingNote, startSavingNote, startUploadingFiles, setActiveNote } = useJournalStore();

  const { body, title, date, onChange, formState } = useForm( note ?? {} );

  const dateString = useMemo(() => {
    const newDate = new Date( date );
    return newDate.toUTCString();
  }, [date]);

	const fileInputRef = useRef<any>();

  useEffect(() => {
    setActiveNote(formState);
  }, [formState])

	useEffect(() => {
		if ( messageSaved.length > 0) {
			Swal.fire('Updated note', messageSaved, 'success');
		}
	}, [messageSaved])
  
	const onSaveNote = () => {
		startSavingNote();
	}

	const onFileInputChange = ({ target }: any) => {
		if (target.files === 0) return;

		startUploadingFiles( target.files );
		fileInputRef.current.value = "";
	}

	const onDelete = () => {
		startDeletingNote();
	}

  return (
    <Grid
        container
        className="animate__animated animate__fadeIn animate__faster"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
    >
        <Grid item>
					<Typography
						fontSize={ 39 }
						fontWeight="light"
					>{ dateString }</Typography>
        </Grid>
        <Grid item>

					<input
						type="file"
						accept="image/png, image/gif, image/jpeg, image/jpg"
						multiple
						ref={ fileInputRef }
						style={{ display: 'none' }}
						onChange={onFileInputChange}
					/>

					<IconButton
						color="primary"
						disabled={ isSaving }
						onClick={ () => fileInputRef.current.click() }
					>
						<UploadOutlined />
					</IconButton>

					<Button
						disabled={isSaving}
						onClick={onSaveNote}
						color="primary"
						sx={{ padding: 2 }}
					>
							<SaveOutlined sx={{ fontsize: 30, mr: 1 }}/>
							{t("Save")}
					</Button>
        </Grid>

        <Grid container>
            <TextField
							type="text"
							variant="filled"
							fullWidth
							label={t("Title")}
							sx={{ border: 'none', mb: 1 }}
							name="title"
							value={ title }
							onChange={ ({ target }) => onChange(target.value, 'title') }
            />
            <TextField
							type="text"
							variant="filled"
							fullWidth
							multiline
							label={t("What happend today")}
							minRows={ 5 }
							name="body"
							value={ body }
							onChange={ ({ target }) => onChange(target.value, 'body') }
            />
        </Grid>

				<Grid container justifyContent="end">
					<Button
						onClick={onDelete}
						sx={{ mt: 2 }}
						color="error"
					>
						<DeleteOutline sx={{ fontsize: 30, mr: 1 }} />
						{t("Delete")}
					</Button>
				</Grid>

        <ImageGallery images={ note?.imageUrls } />

    </Grid>
  )
}
