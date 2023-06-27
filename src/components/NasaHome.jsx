import React from 'react';
import PropTypes from 'prop-types';
import { loadLanguagePack, updateLocale } from '@americanexpress/one-app-ducks';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import Grid from '@mui/material/Grid';
import { CardComponent } from './CardComponent';

export const NasaHome = ({ languageData, localeName }) => {
  if (languageData) {
    return (
      <IntlProvider locale={localeName} messages={languageData}>
        <Grid
          xs={12}
          container={true}
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {[...new Array(6)].map((x) => (
            <Grid
              item={true}
              xs="auto"
              sm="auto"
              md="auto"
              key={x}
            >
              <CardComponent />
            </Grid>
          ))}
        </Grid>
      </IntlProvider>
    );
  }
  return null;
};

NasaHome.propTypes = {
  languageData: PropTypes.shape({
    greeting: PropTypes.string.isRequired,
  }).isRequired,
  localeName: PropTypes.string.isRequired,
};

export const mapDispatchToProps = (dispatch) => ({
  switchLanguage: async ({ target }) => {
    await dispatch(updateLocale(target.value));
    await dispatch(loadLanguagePack('nasa-home', { fallbackLocale: 'en-US' }));
  },
});

export const mapStateToProps = (state) => {
  const localeName = state.getIn(['intl', 'activeLocale']);
  const languagePack = state.getIn(
    ['intl', 'languagePacks', localeName, 'nasa-home'],
    fromJS({})
  ).toJS();

  return {
    languageData: languagePack && languagePack.data ? languagePack.data : {},
    localeName,
  };
};

export const loadModuleData = ({ store: { dispatch } }) => dispatch(loadLanguagePack('nasa-home', { fallbackLocale: 'en-US' }));

NasaHome.holocron = {
  name: 'nasa-home',
  loadModuleData,
};

export default connect(mapStateToProps, mapDispatchToProps)(NasaHome);
