import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { FormikProps } from 'formik';
import React, { Dispatch, FC, RefObject, useRef } from 'react';
import Swal from 'sweetalert2';
import { urlAfiliate } from '../end-points';
import { IAfiliate } from '../interface/Afiliate';
import { useAppSelector } from '../redux/hooks';
import { convertAfiliateToFormData } from '../utils/formData';
import Copyright from './Copyright';
import JobInformationForm from './JobInformationForm';
import PersonalInformationForm from './PersonalInformationForm';
import Review from './Review';

const steps = ['Datos personales', 'Datos de trabajo', 'Revisión'];

function getStepContent(
  step: number,
  formRef: RefObject<FormikProps<IAfiliate>>,
  image: Dispatch<React.SetStateAction<File | undefined>>
) {
  switch (step) {
    case 0:
      return <PersonalInformationForm formRef={formRef} image={image} />;
    case 1:
      return <JobInformationForm formRef={formRef} />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const StepperCase: FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [image, setImage] = React.useState<File>();
  const [disabledButton, setDisabledButton] = React.useState<boolean>(false);

  const formRef = useRef<FormikProps<IAfiliate>>(null);
  const form = useAppSelector((state) => state.afiliate);

  const handleNext = () => {
    // Validacion de imagen
    if (!form.preview) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe subir una fotografía',
        timer: 5000,
        customClass: {
          container: 'my-swal2-container',
        },
      });
    }

    if (activeStep === 0 || activeStep === 1) {
      handleSubmit();
      return formRef.current?.isValid ? setActiveStep(activeStep + 1) : null;
    }

    if (activeStep === 2) {
      console.log('Actualizado');
      handleCreate(form);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const handleCreate = async (afiliate: IAfiliate) => {
    setDisabledButton(true);
    const afiliateMap = convertAfiliateToFormData({
      ...afiliate,
      imageUrl: image,
    });

    await axios
      .post(`${urlAfiliate}/create`, afiliateMap)
      .then(() => {
        setActiveStep(activeStep + 1);
        setDisabledButton(false);
      })
      .catch((error) => {
        setDisabledButton(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
          timer: 4000,
        });
      });
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Actualización de Datos
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Confirmado
            </Typography>
            <Typography variant="subtitle1">
              Sus datos han sido enviados correctamente.
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep, formRef, setImage)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Atras
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
                disabled={disabledButton}
              >
                {activeStep === steps.length - 1 ? 'Confirmar' : 'Siguiente'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
      <Copyright />
    </Container>
  );
};

export default StepperCase;
