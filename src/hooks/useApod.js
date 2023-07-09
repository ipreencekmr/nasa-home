import React from 'react';
import { useSelector } from 'react-redux';

export const useApod = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [apodResponse, setApodResponse] = React.useState(null);
  const [error, setError] = React.useState(null);

  const nasaDomain = useSelector((state) => state.getIn(['config', 'nasaDomain']));
  const apodUri = useSelector((state) => state.getIn(['config', 'apodUri']));
  const apiKey = useSelector((state) => state.getIn(['config', 'apiKey']));

  React.useEffect(() => {
    let isMounted = true;

    const fetchAPI = async () => {
      setIsLoading(true);

      try {
        const paramStr = new URLSearchParams({
          api_key: apiKey,
        });
        const BASE_URL = `${nasaDomain}${apodUri}`;
        const API_URL = `${BASE_URL}?${paramStr}`;
        const response = await fetch(API_URL);
        if (!isMounted) return;
        setApodResponse(await response.json());
        setError(null);
      } catch (apiErr) {
        if (!isMounted) return;
        setError(apiErr);
        setApodResponse(null);
      }

      setIsLoading(false);
    };

    fetchAPI();

    return () => { isMounted = false; };
  }, [nasaDomain, apodUri, apiKey]);

  return {
    apodResponse,
    isLoading,
    error,
  };
};
