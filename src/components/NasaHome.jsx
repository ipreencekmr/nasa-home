import React from 'react';
import PropTypes from 'prop-types';
import { loadLanguagePack, updateLocale } from '@americanexpress/one-app-ducks';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { APOD } from './APOD';
import { ItemContainer } from './ItemContainer';
import { MODULE_NAME } from '../constants/module';
import { getLanguageDataSelector, getLocaleSelector } from '../selectors/marketSelector';

export const NasaHome = ({ languageData, localeName }) => {
  if (languageData) {
    return (
      <IntlProvider locale={localeName} messages={languageData}>
        <APOD />
        <ItemContainer />
      </IntlProvider>
    );
  }
  return null;
};

NasaHome.propTypes = {
  languageData: PropTypes.shape({}).isRequired,
  localeName: PropTypes.string.isRequired,
};

export const mapDispatchToProps = (dispatch) => ({
  switchLanguage: async ({ target }) => {
    await dispatch(updateLocale(target.value));
    await dispatch(loadLanguagePack(MODULE_NAME, { fallbackLocale: 'en-US' }));
  },
});

export const mapStateToProps = (state, ownProps) => ({
  languageData: getLanguageDataSelector(state, ownProps.locale, MODULE_NAME),
  localeName: getLocaleSelector(state),
});

export const loadModuleData = ({ store: { dispatch } }) => dispatch(loadLanguagePack(MODULE_NAME, { fallbackLocale: 'en-US' }));

NasaHome.holocron = {
  name: MODULE_NAME,
  loadModuleData,
};

export default connect(mapStateToProps, mapDispatchToProps)(NasaHome);
