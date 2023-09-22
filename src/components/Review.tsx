import { Avatar, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useAppSelector } from '../redux/hooks';

const Review: FC = () => {
  const form = useAppSelector((state) => state.afiliate);

  return (
    <>
      <Avatar
        alt="Foto"
        src={form.preview}
        sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary">
            Nombre Completo:
          </Typography>
          <Typography variant="body1">
            {`${form.name} ${form.lastName}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary">
            Grado de Formación:
          </Typography>
          <Typography variant="body1">{form.grade}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">
            Dirección:
          </Typography>
          <Typography variant="body1">{form.address}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary">
            Correo Electrónico:
          </Typography>
          <Typography variant="body1">{form.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary">
            Número de Teléfono:
          </Typography>
          <Typography variant="body1">{form.numberPhone}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">
            Lugar de Trabajo:
          </Typography>
          <Typography variant="body1">{form.jobAddress}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary">
            Cargo:
          </Typography>
          <Typography variant="body1">{form.position}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary">
            Antigüedad:
          </Typography>
          <Typography variant="body1">{form.antiquity} años</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Review;
