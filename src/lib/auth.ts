import { initDb } from './db';
import bcrypt from 'bcryptjs';
import { User } from '../types';

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const db = await initDb();
  const result = db.exec(`
    SELECT id, email, password, role, businessId
    FROM users
    WHERE email = ?
  `, [email]);

  if (!result.length || !result[0].values.length) {
    return null;
  }

  const user = result[0].values[0];
  const isValidPassword = await bcrypt.compare(password, user[2]);

  if (!isValidPassword) {
    return null;
  }

  return {
    id: user[0],
    email: user[1],
    role: user[3],
    businessId: user[4] || undefined
  };
}

export async function createBusinessUser(email: string, password: string, businessId: string): Promise<User | null> {
  const db = await initDb();
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    db.run(`
      INSERT INTO users (id, email, password, role, businessId)
      VALUES (?, ?, ?, 'business', ?)
    `, [crypto.randomUUID(), email, hashedPassword, businessId]);

    return {
      id: crypto.randomUUID(),
      email,
      role: 'business',
      businessId
    };
  } catch (error) {
    console.error('Error creating business user:', error);
    return null;
  }
}