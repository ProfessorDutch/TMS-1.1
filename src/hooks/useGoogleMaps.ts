import { useState, useEffect } from 'react';
import { useGoogleMapsLoader } from '../config/google-maps';

interface PlaceDetails {
  formatted_address?: string;
  place_id?: string;
}

export function useGoogleMaps() {
  const { isLoaded, error } = useGoogleMapsLoader();
  const [loading, setLoading] = useState(false);
  const [placeError, setPlaceError] = useState<string | null>(null);

  const getPlaceDetails = async (placeId: string): Promise<PlaceDetails | null> => {
    if (!isLoaded) {
      setPlaceError('Google Maps API not loaded');
      return null;
    }

    try {
      setLoading(true);
      setPlaceError(null);
      
      const service = new window.google.maps.places.PlacesService(
        document.createElement('div')
      );

      return new Promise((resolve, reject) => {
        service.getDetails(
          { 
            placeId, 
            fields: ['formatted_address', 'place_id']
          },
          (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
              resolve({
                formatted_address: place.formatted_address,
                place_id: place.place_id
              });
            } else {
              reject(new Error(`Failed to fetch place details: ${status}`));
            }
          }
        );
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch place details';
      setPlaceError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    getPlaceDetails,
    loading,
    error: error?.message || placeError,
    isLoaded
  };
}