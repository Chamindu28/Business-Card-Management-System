import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Business } from '../types';

const businessSchema = z.object({
  name: z.string().min(1, 'Business name is required'),
  industry: z.string().min(1, 'Industry is required'),
  logo: z.string().url('Must be a valid URL').optional(),
});

type BusinessFormData = z.infer<typeof businessSchema>;

interface Props {
  business?: Business;
  onSubmit: (data: BusinessFormData) => void;
  onCancel: () => void;
}

export function BusinessForm({ business, onSubmit, onCancel }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: business,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Business Name
        </label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Industry
        </label>
        <input
          type="text"
          {...register('industry')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.industry && (
          <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Logo URL
        </label>
        <input
          type="url"
          {...register('logo')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.logo && (
          <p className="mt-1 text-sm text-red-600">{errors.logo.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isSubmitting ? 'Saving...' : business ? 'Update Business' : 'Create Business'}
        </button>
      </div>
    </form>
  );
}