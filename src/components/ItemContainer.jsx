import React from 'react';
import { Grid } from '@mui/material';
import { CardItem } from './CardItem';

const items = [{
  title: 'Near Earth Objects',
  desc: 'List of Asteroids based on their closest approach date to Earth',
  link: '/neo',
},
{
  title: 'Mars Rover Photos',
  desc: 'Image data gathered by NASA\'s Curiosity, Opportunity, and Spirit rovers on Mars',
  link: '/mro',
}];

export const ItemContainer = () => (
  <Grid
    container={true}
    spacing={2}
    direction="row"
    justifyContent="center"
    alignItems="center"
    sx={{
      paddingBottom: '20px;',
    }}
  >
    {
        items.map((item) => (
          <Grid key={item.title} item={true}>
            <CardItem item={item} />
          </Grid>
        ))
    }
  </Grid>
);
