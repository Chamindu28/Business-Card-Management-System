import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { BusinessCard as BusinessCardType } from '../types';
import { BusinessCard } from '../components/BusinessCard';
import { useNavigate } from 'react-router-dom';

export default function Cards() {
  const [cards, setCards] = useState<BusinessCardType[]>([]);
  const navigate = useNavigate();

  const handleEditCard = (cardId: string) => {
    navigate(`/cards/${cardId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Business Cards</h1>
        <button
          onClick={() => navigate('/cards/new')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Card
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <BusinessCard
            key={card.id}
            card={card}
            onEdit={() => handleEditCard(card.id)}
          />
        ))}
      </div>

      {cards.length === 0 && (
        <div className="text-center py-12">
          <h3 className="mt-2 text-sm font-medium text-gray-900">No business cards</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new business card.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/cards/new')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
}