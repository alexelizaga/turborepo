import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { addHours, differenceInSeconds } from "date-fns";
import es from 'date-fns/locale/es';

import { Event } from '../interfaces';
import { useCalendarStore } from '../../store';
import { BcModal, BcBox, BcButton, BcGrid, BcSxProps, BcTextField, BcTheme, BcTypography } from '../../shared';


const customStyles: BcSxProps<BcTheme> = {
  position: 'absolute' as 'absolute',
  top: { xs: 0, md: '50%' },
  left: { xs: 0, md: '50%' },
  bottom: { xs: 0 },
  transform: { md: 'translate(-50%, -50%)' },
  minHeight: { xs: '510'},
  maxWidth: { xs: '500' },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const initialValues = {
  title: "",
  notes: "",
  start: new Date(),
  end: addHours(new Date(), 1)
}

const validate = (values: Record<string, string | any>) => {
  const errors = {} as typeof values;
  const difference = differenceInSeconds(values.end, values.start);
  if (values.title.length <= 3) {
    errors.title = "Title must has at least 3 characters";
  }
  if (values.notes.length <= 3) {
    errors.notes = "Notes must has at least 3 characters";
  }
  if (isNaN(difference) || difference <= 0) {
    errors.start = "Wrong dates";
    errors.end = "Wrong dates";
  }
  return errors;
}

export const CalendarModal = () => {
  const { t, i18n } = useTranslation(['calendar']);
  const { isDateModalOpen, closeDateModal, activeEvent, startSavingEvent } = useCalendarStore();

  const onSubmit = async (
    values: Record<string,any>,
    { setSubmitting }: any
    ) => {
      await startSavingEvent(values as Event);
      closeDateModal();
      setSubmitting(false);
  }

  const formik = useFormik({
    initialValues: initialValues,
    validate: validate,
    onSubmit: onSubmit
  });

  useEffect(() => {
    if (activeEvent) {
      formik.setValues({ ...activeEvent })
    }
  
  }, [activeEvent])
  

  const handleClose = () => {
    closeDateModal();
  }

  return (
    <BcModal
      open={isDateModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <BcBox sx={customStyles}>
        <form
          onSubmit={formik.handleSubmit}
          className="animate__animated animate__fadeIn animate__faster"
        >
          <BcGrid container spacing={2}>
            <BcGrid item xs={12}>
              <BcTypography id="modal-modal-title" variant="h4" component="h4">
                {t("New event")}
              </BcTypography>
            </BcGrid>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
            >
              <BcGrid item xs={12} sm={6} gap={1}>
                <MobileDateTimePicker
                  renderInput={(props) => (
                    <BcTextField
                      {...props}
                      error={!!formik.errors.start}
                      helperText={`${formik.errors.start || ""}`}
                      sx={{ width: '100%' }}
                    />
                  )}
                  label={t("Start date and time")}
                  value={formik.values.start}
                  onChange={(date) => {
                    formik.setFieldValue("start", date);
                    date && formik.setFieldValue("end", addHours(date, 1));
                  }}
                  disablePast
                />
              </BcGrid>
              <BcGrid item xs={12} sm={6}>
                <MobileDateTimePicker
                  minDateTime={formik.values.start}
                  renderInput={(props) => (
                    <BcTextField
                      {...props}
                      error={!!formik.errors.end}
                      helperText={`${formik.errors.end || ""}`}
                      sx={{ width: '100%' }}
                    />
                  )}
                  label={t("End date and time")}
                  value={formik.values.end}
                  onChange={(date) => formik.setFieldValue("endDate", date)}
                  disablePast
                />
              </BcGrid>
            </LocalizationProvider>
            <BcGrid item xs={12}>
              <BcTextField
                label={t("Title")}
                type="text"
                fullWidth
                margin="none"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.errors.title && formik.touched.title}
                helperText={formik.errors.title}
              />
            </BcGrid>
            <BcGrid item xs={12}>
              <BcTextField
                label={t("Notes")}
                type="text"
                fullWidth
                margin="none"
                multiline
                rows={4}
                name="notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.errors.notes && formik.touched.notes}
                helperText={formik.errors.notes}
              />
            </BcGrid>
            <BcGrid item xs={12} sx={{ mt: 2 }}>
              <BcButton
                disabled={formik.isSubmitting}
                type="submit"
                variant="contained"
                fullWidth
              >
                {t("Save")}
              </BcButton>
            </BcGrid>
          </BcGrid>
        </form>
      </BcBox>
    </BcModal>
  );
}
