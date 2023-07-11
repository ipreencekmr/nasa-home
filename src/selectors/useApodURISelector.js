import { useSelector } from 'react-redux';

export const useApodUri = () => useSelector((state) => state.getIn(['config', 'apodUri']));
