import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputLabel,
  TextField,
} from '@mui/material';
import { Form, Formik, FormikProps } from 'formik';
import { ChangeEvent, Dispatch, FC, RefObject, useState } from 'react';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { IAfiliate } from '../interface/Afiliate';
import { updateField } from '../redux/afiliate/afiliateSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const validationSchema = yup.object({
  name: yup.string().required('El campo nombre es requerido'),
  lastName: yup.string().required('El campo apellido es requerido'),
  grade: yup.string().required('El campo grado de formación es requerido'),
  email: yup.string().email('El correo electrónico es invalido'),
  numberPhone: yup
    .string()
    .min(8, 'El campo número de teléfono requiere 8 caracteres'),
  address: yup.string(),
});

interface PersonalInformationFormProps {
  image: Dispatch<React.SetStateAction<File | undefined>>;
  formRef: RefObject<FormikProps<IAfiliate>>;
}

const PersonalInformationForm: FC<PersonalInformationFormProps> = ({
  formRef,
  image,
}) => {
  const form = useAppSelector((state) => state.afiliate);
  const dispath = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState<string>();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];

      if (file) {
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
          const reader = new FileReader();
          reader.onload = () => {
            setSelectedImage(reader.result as string);
            dispath(updateField({ field: 'preview', value: reader.result }));
            image(file);
          };
          reader.readAsDataURL(file);
        } else {
          event.target.value = '';
          Swal.fire({
            icon: 'error',
            title: 'Formato Inválido',
            text: 'Debe subir una imagen en formato .jpg o .png',
            timer: 5000,
            customClass: {
              container: 'my-swal2-container',
            },
          });
        }
      }
    }
  };

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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <InputLabel htmlFor="image" sx={{ width: 120, height: 120 }}>
                  <Avatar
                    alt="Preview"
                    src={selectedImage || form.preview}
                    sx={{ width: 120, height: 120 }}
                  >
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <CameraAltIcon fontSize="large" color="action" />
                    </IconButton>
                  </Avatar>
                </InputLabel>
              </Box>

              <input
                accept=".jpg,.jpeg,.png"
                style={{ display: 'none' }}
                name="image"
                id="image"
                type="file"
                onChange={handleImageChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Nombre"
                value={values.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  dispath(
                    updateField({ field: 'name', value: e.target.value })
                  );
                }}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Apellidos"
                value={values.lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  dispath(
                    updateField({ field: 'lastName', value: e.target.value })
                  );
                }}
                onBlur={handleBlur}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="grade"
                name="grade"
                label="Grado de Formación"
                value={values.grade}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  dispath(
                    updateField({ field: 'grade', value: e.target.value })
                  );
                }}
                onBlur={handleBlur}
                error={touched.grade && Boolean(errors.grade)}
                helperText={touched.grade && errors.grade}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Correo Electrónico"
                value={values.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  dispath(
                    updateField({ field: 'email', value: e.target.value })
                  );
                }}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="numberPhone"
                name="numberPhone"
                label="Número de Teléfono"
                value={values.numberPhone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  dispath(
                    updateField({ field: 'numberPhone', value: e.target.value })
                  );
                }}
                onBlur={handleBlur}
                error={touched.numberPhone && Boolean(errors.numberPhone)}
                helperText={touched.numberPhone && errors.numberPhone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Dirección"
                value={values.address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  dispath(
                    updateField({ field: 'address', value: e.target.value })
                  );
                }}
                onBlur={handleBlur}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default PersonalInformationForm;
