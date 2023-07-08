import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const API_URL = 'https://api.nasa.gov/planetary/apod?api_key=Vv0TXGbYxieYxAIb0NfziTHJssra0FHhF8cn6DD9';

export const APOD = () => {
  const [apodResponse, setApodResponse] = React.useState(null);

  React.useEffect(() => {
    fetch(API_URL).then((response) => response.json()).then((response) => {
      setApodResponse(response);
    }).catch((error) => {
      console.log(`error: ${error}`);
    });
  }, []);

  if (!apodResponse) return null;

  return (
    <Container sx={{
      marginTop: '20px',
      marginBottom: '20px',
      padding: '20px',
    }}
    >
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
