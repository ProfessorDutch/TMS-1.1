import { useEffect, useState } from 'react';

const SCRIPT_ID = 'google-maps-script';
const CALLBACK_NAME = 'initGoogleMaps';

export const GOOGLE_MAPS_CONFIG = {
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  libraries: ['places'],
  region: 'US',
  language: 'en'
};

let isLoading = false;
let isLoaded = false;
let loadError: Error | null = null;
let loadPromise: Promise<void> | null = null;

export function loadGoogleMapsScript(): Promise<void> {
  if (isLoaded) return Promise.resolve();
  if (loadError) return Promise.reject(loadError);
  if (loadPromise) return loadPromise;
  if (!GOOGLE_MAPS_CONFIG.apiKey) {
    return Promise.reject(new Error('Google Maps API key is required'));
  }

  // Check if script already exists
  const existingScript = document.getElementById(SCRIPT_ID);
  if (existingScript) {
    return Promise.resolve();
  }

  isLoading = true;
  loadPromise = new Promise((resolve, reject) => {
    // Create callback function
    (window as any)[CALLBACK_NAME] = () => {
      isLoaded = true;
      isLoading = false;
      delete (window as any)[CALLBACK_NAME];
      resolve();
    };

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.apiKey}&libraries=${GOOGLE_MAPS_CONFIG.libraries.join(',')}&region=${GOOGLE_MAPS_CONFIG.region}&language=${GOOGLE_MAPS_CONFIG.language}&callback=${CALLBACK_NAME}`;
    script.async = true;
    script.defer = true;

    script.onerror = () => {
      const error = new Error('Failed to load Google Maps script');
      loadError = error;
      isLoading = false;
      reject(error);
    };

    document.head.appendChild(script);
  });

  return loadPromise;
}

export function useGoogleMapsLoader() {
  const [status, setStatus] = useState({
    isLoaded: isLoaded,
    isLoading: isLoading,
    error: loadError
  });

  useEffect(() => {
    if (!isLoaded && !isLoading && !loadError) {
      loadGoogleMapsScript()
        .then(() => {
          setStatus({ isLoaded: true, isLoading: false, error: null });
        })
        .catch((error) => {
          setStatus({ isLoaded: false, isLoading: false, error });
        });
    }
  }, []);

  return status;
}