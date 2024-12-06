import { initDb } from '../src/lib/db.js';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

async function setupDatabase() {
  console.log('Initializing database...');
  const db = await initDb();

  try {
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminId = randomUUID();

    db.run(`
      INSERT INTO users (id, email, password, role)
      VALUES (?, ?, ?, ?)
    `, [adminId, 'admin@example.com', adminPassword, 'admin']);
    
    console.log('Database initialized successfully!');
    console.log('\nAdmin credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');

    // Create a sample business
    const businessId = randomUUID();
    db.run(`
      INSERT INTO businesses (id, name, industry, logo)
      VALUES (?, ?, ?, ?)
    `, [
      businessId,
      'Sample Business',
      'Technology',
      'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=128&h=128&fit=crop'
    ]);

    // Create a business user
    const businessUserPassword = await bcrypt.hash('business123', 10);
    db.run(`
      INSERT INTO users (id, email, password, role, businessId)
      VALUES (?, ?, ?, ?, ?)
    `, [randomUUID(), 'business@example.com', businessUserPassword, 'business', businessId]);

    console.log('\nBusiness user credentials:');
    console.log('Email: business@example.com');
    console.log('Password: business123');

  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase().catch(console.error);