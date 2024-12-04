import React from 'react';
import { BusinessCard as BusinessCardType } from '../types';
import { Phone, Mail, Globe, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

interface Props {
  card: BusinessCardType;
  onEdit?: () => void;
}

export function BusinessCard({ card, onEdit }: Props) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105">
      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-indigo-600">
        {card.profileImage && (
          <img
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white"
            src={card.profileImage}
            alt={card.name}
          />
        )}
      </div>
      
      <div className="pt-16 pb-8 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">{card.name}</h2>
        <p className="text-gray-600">{card.title}</p>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Phone className="h-5 w-5" />
            <span>{card.phone}</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Mail className="h-5 w-5" />
            <a href={`mailto:${card.email}`} className="hover:text-blue-600">
              {card.email}
            </a>
          </div>
          
          {card.website && (
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Globe className="h-5 w-5" />
              <a href={card.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                {card.website}
              </a>
            </div>
          )}
          
          {card.address && (
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span>{card.address}</span>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-center space-x-4">
          {card.socialLinks.linkedin && (
            <a href={card.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
              <Linkedin className="h-6 w-6" />
            </a>
          )}
          {card.socialLinks.twitter && (
            <a href={card.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
              <Twitter className="h-6 w-6" />
            </a>
          )}
          {card.socialLinks.facebook && (
            <a href={card.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-800">
              <Facebook className="h-6 w-6" />
            </a>
          )}
        </div>
        
        {onEdit && (
          <button
            onClick={onEdit}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Edit Card
          </button>
        )}
      </div>
    </div>
  );
}