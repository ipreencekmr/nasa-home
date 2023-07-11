import { useSelector } from 'react-redux';
import { configSelector } from './configSelector';

export const useApiKey = () => useSelector((state) => configSelector(state)?.toJS().apiKey);
