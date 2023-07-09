import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useApod } from '../hooks/useApod';

export const APOD = () => {
  const {
    apodResponse,
    isLoading,
    error,
  } = useApod();

  if (isLoading || error || !apodResponse) return null;

  return (
    <Container sx={{ my: 2 }}>
      <Card>
        <CardHeader
          title="Astronomy Picture of the Day"
          subheader={apodResponse?.date}
        />
        <CardMedia
          component="img"
          height="150"
          src={apodResponse?.url}
          alt={apodResponse?.title}
        />
        <CardContent>
          <Typography gutterBottom={true} variant="h5" component="div">
            {apodResponse?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {apodResponse?.explanation}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => window.open(apodResponse?.url)}>Enlarged View</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default APOD;
