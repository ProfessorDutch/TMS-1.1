import { useEffect } from 'react';
import { loadGoogleMapsScript } from '../config/google-maps';

let scriptLoaded = false;

export default function GoogleMapsLoader() {
  useEffect(() => {
    if (scriptLoaded) {
      return;
    }

    const loadMaps = async () => {
      try {
        if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
          console.warn('Google Maps API key is not configured');
          return;
        }
        await loadGoogleMapsScript();
        scriptLoaded = true;
      } catch (error) {
        console.error('Failed to load Google Maps:', error);
      }
    };

    loadMaps();

    return () => {
      // Don't remove the script on unmount since we want to keep it loaded
    };
  }, []);

  return null;
}