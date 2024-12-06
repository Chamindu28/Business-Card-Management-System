import { query } from './db';
import { BusinessCard } from '../types';
import { randomUUID } from 'crypto';

export async function createCard(card: Omit<BusinessCard, 'id' | 'createdAt' | 'updatedAt'>) {
  const id = randomUUID();
  const now = new Date().toISOString();

  try {
    await query(
      `INSERT INTO business_cards (
        id, businessId, name, title, email, phone, website,
        address, socialLinks, profileImage, customFields,
        createdAt, updatedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        card.businessId,
        card.name,
        card.title,
        card.email,
        card.phone,
        card.website || null,
        card.address || null,
        JSON.stringify(card.socialLinks),
        card.profileImage || null,
        JSON.stringify(card.customFields),
        now,
        now
      ]
    );

    return {
      id,
      ...card,
      createdAt: new Date(now),
      updatedAt: new Date(now)
    };
  } catch (error) {
    console.error('Error creating card:', error);
    throw error;
  }
}

export async function getCards(businessId?: string) {
  const sql = businessId
    ? 'SELECT * FROM business_cards WHERE businessId = ?'
    : 'SELECT * FROM business_cards';
  const params = businessId ? [businessId] : [];

  const result = await query(sql, params);

  if (!result.length) return [];

  return result[0].values.map(([
    id, businessId, name, title, email, phone, website,
    address, socialLinks, profileImage, customFields, createdAt, updatedAt
  ]) => ({
    id,
    businessId,
    name,
    title,
    email,
    phone,
    website,
    address,
    socialLinks: JSON.parse(socialLinks),
    profileImage,
    customFields: JSON.parse(customFields),
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt)
  }));
}

export async function updateCard(id: string, card: Partial<BusinessCard>) {
  const now = new Date().toISOString();
  const updates = [];
  const values = [];

  Object.entries(card).forEach(([key, value]) => {
    if (value !== undefined) {
      updates.push(`${key} = ?`);
      values.push(
        key === 'socialLinks' || key === 'customFields'
          ? JSON.stringify(value)
          : value
      );
    }
  });

  updates.push('updatedAt = ?');
  values.push(now);
  values.push(id);

  try {
    await query(
      `UPDATE business_cards
       SET ${updates.join(', ')}
       WHERE id = ?`,
      values
    );
    return true;
  } catch (error) {
    console.error('Error updating card:', error);
    throw error;
  }
}

export async function deleteCard(id: string) {
  try {
    await query('DELETE FROM business_cards WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting card:', error);
    throw error;
  }
}