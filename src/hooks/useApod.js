import React from 'react';
import { useNasaDomain } from '../selectors/useNASADomainSelector';
import { useApodUri } from '../selectors/useApodURISelector';
import { useApiKey } from '../selectors/useAPIKeySelector';

export const useApod = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [apodResponse, setApodResponse] = React.useState(null);
  const [error, setError] = React.useState(null);

  const nasaDomain = useNasaDomain();
  const apodUri = useApodUri();
  const apiKey = useApiKey();

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
