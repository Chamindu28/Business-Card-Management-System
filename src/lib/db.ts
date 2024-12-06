import initSqlJs from 'sql.js';

let SQL: any;
let db: any;
let isInitialized = false;

export async function initDb() {
  if (!SQL) {
    SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`
    });
  }
  
  if (!db) {
    db = new SQL.Database();
    
    if (!isInitialized) {
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

      isInitialized = true;
    }
  }
  
  return db;
}

export async function query(sql: string, params: any[] = []) {
  const db = await initDb();
  return db.exec(sql, params);
}

export async function run(sql: string, params: any[] = []) {
  const db = await initDb();
  return db.run(sql, params);
}