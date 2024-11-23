import React, { useEffect, useRef } from 'react';
import { Business } from '../../types/business';

interface BusinessMapProps {
  businesses: Business[];
}

export default function BusinessMap({ businesses }: BusinessMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map if not already initialized
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center: { lat: 33.7490, lng: -84.3880 }, // Atlanta as default center
        zoom: 10,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#f5f2e9" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#7a9bba" }]
          }
        ],
        gestureHandling: 'greedy', // Better touch handling
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
      });
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add markers for businesses
    businesses.forEach(business => {
      if (business.address.coordinates) {
        const marker = new google.maps.Marker({
          position: business.address.coordinates,
          map: mapInstanceRef.current,
          title: business.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#A94442',
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 8
          }
        });

        // Create info window content
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-4 max-w-[280px]">
              <h3 class="font-bold text-base sm:text-lg mb-1">${business.name}</h3>
              <p class="text-xs sm:text-sm text-gray-600 mb-1">${business.address.street}</p>
              <p class="text-xs sm:text-sm text-gray-600 mb-2">${business.address.city}, ${business.address.state} ${business.address.zip}</p>
              <a href="tel:${business.contact.phone}" class="text-xs sm:text-sm text-patriot-red hover:text-patriot-crimson">${business.contact.phone}</a>
            </div>
          `,
          maxWidth: 300
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker);
        });

        markersRef.current.push(marker);
      }
    });

    // Fit bounds to markers if there are any
    if (markersRef.current.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      markersRef.current.forEach(marker => {
        bounds.extend(marker.getPosition()!);
      });
      mapInstanceRef.current.fitBounds(bounds);
    }
  }, [businesses]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[400px] sm:h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-lg"
    />
  );
}