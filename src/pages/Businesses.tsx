import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Business } from '../types';

export default function Businesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBusiness = (business: Business) => {
    setBusinesses([...businesses, business]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Businesses</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Business
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {businesses.map((business) => (
          <div key={business.id} className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <img
                src={business.logo}
                alt={business.name}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{business.name}</h3>
                <p className="text-sm text-gray-500">{business.industry}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {businesses.length === 0 && (
        <div className="text-center py-12">
          <h3 className="mt-2 text-sm font-medium text-gray-900">No businesses</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new business.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Business
            </button>
          </div>
        </div>
      )}
    </div>
  );
}