import initSqlJs from 'sql.js';
import { useEffect, useState } from 'react';

let SQL: any;
let db: any;

export async function initDb() {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`
    });
  }
  
  if (!db) {
    db = new SQL.Database();
    
    // Initialize database schema
    db.run(`
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
  }
  
  return db;
}

export function useDatabase() {
  const [database, setDatabase] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    initDb()
      .then(db => setDatabase(db))
      .catch(err => setError(err));
  }, []);

  return { db: database, error };
}

// Helper functions for database operations
export async function query(sql: string, params: any[] = []) {
  const database = await initDb();
  return database.exec(sql, params);
}

export async function run(sql: string, params: any[] = []) {
  const database = await initDb();
  return database.run(sql, params);
}