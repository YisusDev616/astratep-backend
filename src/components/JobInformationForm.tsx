import { Grid, TextField } from '@mui/material';
import { Form, Formik, FormikProps } from 'formik';
import { FC, RefObject } from 'react';
import * as yup from 'yup';
import { IAfiliate } from '../interface/Afiliate';
import { updateField } from '../redux/afiliate/afiliateSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const validationSchema = yup.object({
  jobAddress: yup.string().required('El campo lugar de trabajo es requerido'),
  position: yup.string().required('El campo cargo es requerido'),
  antiquity: yup
    .number()
    .required('El campo antigüedad es requerido')
    .typeError('El campo antigüedad solo acepta números'),
});

interface JobInformationFormProps {
  formRef: RefObject<FormikProps<IAfiliate>>;
}

const JobInformationForm: FC<JobInformationFormProps> = ({ formRef }) => {
  const form = useAppSelector((state) => state.afiliate);
  const dispath = useAppDispatch();

  return (
    <Formik
      innerRef={formRef}
      initialValues={form}
      validationSchema={validationSchema}
      onSubmit={async () => {}}
      validateOnMount={true}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="jobAddress"
                name="jobAddress"
                label="Lugar de Trabajo (Actual)"
                value={values.jobAddress}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  dispath(
                    updateField({ field: 'jobAddress', value: e.target.value })
                  );
                }}
                onBlur={handleBlur}
                error={touched.jobAddress && Boolean(errors.jobAddress)}
                helperText={touched.jobAddress && errors.jobAddress}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="position"
                name="position"
                label="Cargo (Actual)"
                value={values.position}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  dispath(
                    updateField({ field: 'position', value: e.target.value })
                  );
                }}
                onBlur={handleBlur}
                error={touched.position && Boolean(errors.position)}
                helperText={touched.position && errors.position}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="antiquity"
                name="antiquity"
                label="Antigüedad"
                placeholder="Años"
                value={values.antiquity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  dispath(
                    updateField({ field: 'antiquity', value: e.target.value })
                  );
                }}
                onBlur={handleBlur}
                error={touched.antiquity && Boolean(errors.antiquity)}
                helperText={touched.antiquity && errors.antiquity}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default JobInformationForm;
