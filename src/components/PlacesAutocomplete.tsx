import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { useGoogleMaps } from '../hooks/useGoogleMaps';

interface PlacesAutocompleteProps {
  onSelect: (address: string, placeId: string) => void;
}

export default function PlacesAutocomplete({ onSelect }: PlacesAutocompleteProps) {
  const { isLoaded, error } = useGoogleMaps();
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [service, setService] = useState<google.maps.places.AutocompleteService | null>(null);

  useEffect(() => {
    if (isLoaded && !service) {
      setService(new window.google.maps.places.AutocompleteService());
    }
  }, [isLoaded, service]);

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (!service || !inputValue.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await service.getPlacePredictions({
        input: inputValue,
        componentRestrictions: { country: 'us' },
        types: ['address']
      });
      setSuggestions(response.predictions);
    } catch (err) {
      console.error('Failed to fetch suggestions:', err);
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion: google.maps.places.AutocompletePrediction) => {
    setValue(suggestion.description);
    setSuggestions([]);
    onSelect(suggestion.description, suggestion.place_id);
  };

  if (error) {
    return (
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Address lookup unavailable"
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
          disabled
        />
        <p className="mt-2 text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={handleInput}
          disabled={!isLoaded}
          placeholder="Enter your business address"
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-patriot-red focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
              className="px-4 py-2 hover:bg-patriot-cream cursor-pointer truncate"
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}