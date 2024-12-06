import { getDb, exec } from '../src/lib/db.js';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

async function setupDatabase() {
  console.log('Initializing database...');
  const db = getDb();

  try {
    // Create tables
    exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'business',
        businessId TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS businesses (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        logo TEXT,
        industry TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS business_cards (
        id TEXT PRIMARY KEY,
        businessId TEXT NOT NULL,
        name TEXT NOT NULL,
        title TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        website TEXT,
        address TEXT,
        socialLinks TEXT,
        profileImage TEXT,
        customFields TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (businessId) REFERENCES businesses(id)
      );
    `);

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminId = randomUUID();

    db.prepare(`
      INSERT OR IGNORE INTO users (id, email, password, role)
      VALUES (?, ?, ?, ?)
    `).run([adminId, 'admin@example.com', adminPassword, 'admin']);

    console.log('Database initialized successfully!');
    console.log('\nAdmin credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');

    // Create a sample business
    const businessId = randomUUID();
    db.prepare(`
      INSERT OR IGNORE INTO businesses (id, name, industry, logo)
      VALUES (?, ?, ?, ?)
    `).run([
      businessId,
      'Sample Business',
      'Technology',
      'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=128&h=128&fit=crop'
    ]);

    // Create a business user
    const businessUserPassword = await bcrypt.hash('business123', 10);
    db.prepare(`
      INSERT OR IGNORE INTO users (id, email, password, role, businessId)
      VALUES (?, ?, ?, ?, ?)
    `).run([randomUUID(), 'business@example.com', businessUserPassword, 'business', businessId]);

    console.log('\nBusiness user credentials:');
    console.log('Email: business@example.com');
    console.log('Password: business123');

  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase().catch(console.error);