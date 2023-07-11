import { createSelector } from 'reselect';

export const configSelector = createSelector(
  (state) => state.getIn(['config']),
  (config) => config
);
