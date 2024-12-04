import { initDb } from '../src/lib/db.js';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

async function setupDatabase() {
  const db = await initDb();
  const adminPassword = await bcrypt.hash('admin123', 10);
  const adminId = randomUUID();

  try {
    db.run(`
      INSERT INTO users (id, email, password, role)
      VALUES (?, ?, ?, ?)
    `, [adminId, 'admin@example.com', adminPassword, 'admin']);
    
    console.log('Database initialized with admin user:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
  } catch (error) {
    if (!error.message.includes('UNIQUE constraint failed')) {
      console.error('Error setting up database:', error);
    } else {
      console.log('Admin user already exists');
    }
  }
}

setupDatabase().catch(console.error);