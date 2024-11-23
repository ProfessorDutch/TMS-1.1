import { useState, useEffect } from 'react';
import { Business } from '../types/business';

// Mock data for development
const MOCK_BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Tech Solutions Inc',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    type: ['Technology', 'Professional Services'],
    description: 'Leading provider of innovative tech solutions for businesses.',
    address: {
      street: '123 Tech Lane',
      city: 'Atlanta',
      state: 'GA',
      zip: '30303',
      coordinates: {
        lat: 33.7490,
        lng: -84.3880
      }
    },
    contact: {
      phone: '(404) 555-0123',
      email: 'contact@techsolutions.com',
      website: 'https://techsolutions.com'
    },
    hours: [
      { day: 'Monday', open: '09:00', close: '17:00' },
      { day: 'Tuesday', open: '09:00', close: '17:00' },
      { day: 'Wednesday', open: '09:00', close: '17:00' },
      { day: 'Thursday', open: '09:00', close: '17:00' },
      { day: 'Friday', open: '09:00', close: '17:00' },
      { day: 'Saturday', closed: true },
      { day: 'Sunday', closed: true }
    ],
    badges: ['legacy', 'educator'],
    contributionTier: 'legacy',
    joinedDate: '2023-01-15',
    featured: true,
    verified: true,
    socialMedia: {
      linkedin: 'https://linkedin.com/company/techsolutions',
      twitter: 'https://twitter.com/techsolutions'
    }
  },
  {
    id: '2',
    name: 'Faithful Construction',
    logo: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    type: ['Construction'],
    description: 'Building communities with faith and excellence.',
    address: {
      street: '456 Builder Ave',
      city: 'Marietta',
      state: 'GA',
      zip: '30060',
      coordinates: {
        lat: 33.9526,
        lng: -84.5499
      }
    },
    contact: {
      phone: '(770) 555-0456',
      email: 'info@faithfulconstruction.com',
      website: 'https://faithfulconstruction.com'
    },
    hours: [
      { day: 'Monday', open: '07:00', close: '18:00' },
      { day: 'Tuesday', open: '07:00', close: '18:00' },
      { day: 'Wednesday', open: '07:00', close: '18:00' },
      { day: 'Thursday', open: '07:00', close: '18:00' },
      { day: 'Friday', open: '07:00', close: '16:00' },
      { day: 'Saturday', closed: true },
      { day: 'Sunday', closed: true }
    ],
    badges: ['harvest', 'mentor'],
    contributionTier: 'harvest',
    joinedDate: '2023-02-20',
    verified: true
  }
];

export function useBusinessDirectory() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use mock data for development
        setBusinesses(MOCK_BUSINESSES);
        
      } catch (err) {
        setError('Failed to load business directory');
        console.error('Error fetching businesses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  return { businesses, loading, error };
}