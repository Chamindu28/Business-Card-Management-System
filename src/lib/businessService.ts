import { query } from './db';
import { Business } from '../types';
import { randomUUID } from 'crypto';

export async function createBusiness(business: Omit<Business, 'id' | 'createdAt' | 'updatedAt'>) {
  const id = randomUUID();
  const now = new Date().toISOString();

  try {
    await query(
      `INSERT INTO businesses (id, name, logo, industry, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, business.name, business.logo, business.industry, now, now]
    );

    return {
      id,
      ...business,
      createdAt: new Date(now),
      updatedAt: new Date(now)
    };
  } catch (error) {
    console.error('Error creating business:', error);
    throw error;
  }
}

export async function getBusinesses() {
  const result = await query(
    `SELECT id, name, logo, industry, createdAt, updatedAt
     FROM businesses`
  );

  if (!result.length) return [];

  return result[0].values.map(([id, name, logo, industry, createdAt, updatedAt]) => ({
    id,
    name,
    logo,
    industry,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt)
  }));
}

export async function updateBusiness(id: string, business: Partial<Business>) {
  const now = new Date().toISOString();
  const updates = [];
  const values = [];

  if (business.name) {
    updates.push('name = ?');
    values.push(business.name);
  }
  if (business.logo) {
    updates.push('logo = ?');
    values.push(business.logo);
  }
  if (business.industry) {
    updates.push('industry = ?');
    values.push(business.industry);
  }

  updates.push('updatedAt = ?');
  values.push(now);
  values.push(id);

  try {
    await query(
      `UPDATE businesses
       SET ${updates.join(', ')}
       WHERE id = ?`,
      values
    );
    return true;
  } catch (error) {
    console.error('Error updating business:', error);
    throw error;
  }
}

export async function deleteBusiness(id: string) {
  try {
    await query('DELETE FROM businesses WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting business:', error);
    throw error;
  }
}