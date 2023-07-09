import React from 'react';
import { Grid } from '@mui/material';
import { CardItem } from './CardItem';
import items from '../resources/items.json';

export const ItemContainer = () => (
  <Grid
    container={true}
    spacing={2}
    direction="row"
    justifyContent="center"
    alignItems="center"
    sx={{
      mt: 2,
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
