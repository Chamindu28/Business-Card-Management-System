import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Business } from '../types';
import { BusinessForm } from '../components/BusinessForm';
import { createBusiness, getBusinesses, updateBusiness, deleteBusiness } from '../lib/businessService';
import { useAuthStore } from '../store/authStore';

export default function Businesses() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    loadBusinesses();
  }, []);

  async function loadBusinesses() {
    try {
      const data = await getBusinesses();
      setBusinesses(data);
    } catch (error) {
      console.error('Error loading businesses:', error);
    }
  }

  const handleAddBusiness = async (data: Omit<Business, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newBusiness = await createBusiness(data);
      setBusinesses([...businesses, newBusiness]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding business:', error);
    }
  };

  const handleUpdateBusiness = async (data: Omit<Business, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingBusiness) return;

    try {
      await updateBusiness(editingBusiness.id, data);
      const updatedBusinesses = businesses.map(b =>
        b.id === editingBusiness.id ? { ...b, ...data } : b
      );
      setBusinesses(updatedBusinesses);
      setEditingBusiness(null);
    } catch (error) {
      console.error('Error updating business:', error);
    }
  };

  const handleDeleteBusiness = async (id: string) => {
    if (!confirm('Are you sure you want to delete this business?')) return;

    try {
      await deleteBusiness(id);
      setBusinesses(businesses.filter(b => b.id !== id));
    } catch (error) {
      console.error('Error deleting business:', error);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
        <p className="mt-1 text-sm text-gray-500">
          Only administrators can manage businesses.
        </p>
      </div>
    );
  }

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
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {business.logo ? (
                  <img
                    src={business.logo}
                    alt={business.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-500">
                      {business.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{business.name}</h3>
                  <p className="text-sm text-gray-500">{business.industry}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingBusiness(business)}
                  className="p-2 text-gray-400 hover:text-blue-600"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteBusiness(business.id)}
                  className="p-2 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(isModalOpen || editingBusiness) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingBusiness ? 'Edit Business' : 'Add New Business'}
            </h2>
            <BusinessForm
              business={editingBusiness || undefined}
              onSubmit={editingBusiness ? handleUpdateBusiness : handleAddBusiness}
              onCancel={() => {
                setIsModalOpen(false);
                setEditingBusiness(null);
              }}
            />
          </div>
        </div>
      )}

      {businesses.length === 0 && !isModalOpen && (
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