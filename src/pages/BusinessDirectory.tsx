import React, { useState } from 'react';
import { Building2, MapPin } from 'lucide-react';
import BusinessCard from "../components/directory/BusinessCard";
import BusinessFilters from "../components/directory/BusinessFilters";
import BusinessMap from "../components/directory/BusinessMap";
import { useBusinessDirectory } from "../hooks/useBusinessDirectory";

export default function BusinessDirectory() {
  const { businesses, loading, error } = useBusinessDirectory();
  const [showMap, setShowMap] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-patriot-red border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-patriot-red">
        {error}
      </div>
    );
  }

  return (
    <main className="flex-1">
      <section className="py-6 bg-gradient-to-br from-patriot-cream to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Building2 className="w-12 h-12 text-patriot-red" />
            <div>
              <h1 className="text-4xl font-bold text-patriot-navy">Business Directory</h1>
              <p className="text-xl text-patriot-blue">Connect with our faith-driven business partners</p>
            </div>
          </div>
          <BusinessFilters />
        </div>
      </section>

      <section className="py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-patriot-blue">
              Showing {businesses.length} business partners
            </p>
            <button
              onClick={() => setShowMap(!showMap)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-patriot-cream text-patriot-navy hover:bg-patriot-navy hover:text-white transition-colors"
            >
              <MapPin className="w-5 h-5" />
              {showMap ? 'Show List' : 'Show Map'}
            </button>
          </div>

          {showMap ? (
            <BusinessMap businesses={businesses} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {businesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}