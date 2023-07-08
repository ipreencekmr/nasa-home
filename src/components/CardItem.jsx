import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import { Link } from '@mui/material';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

export const CardItem = ({ item }) => {
  const { locale } = useIntl();
  const { title, desc, link } = { ...item };

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader
        title={title}
        avatar={
          <RocketLaunchIcon />
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/${locale}/detail${link}`} variant="body2">
          Explore
        </Link>
      </CardActions>
    </Card>
  );
};

CardItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    desc: PropTypes.string,
    link: PropTypes.string,
  }),
};
