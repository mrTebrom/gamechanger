import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.resolve(process.cwd(), 'app.db'));
db.pragma('journal_mode = WAL');

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id                INTEGER PRIMARY KEY AUTOINCREMENT,
      email             TEXT NOT NULL UNIQUE,
      name              TEXT NOT NULL,
      password_hash     TEXT NOT NULL,
      bitrix_contact_id INTEGER,
      created_at        TEXT DEFAULT (datetime('now'))
    );
    CREATE UNIQUE INDEX IF NOT EXISTS users_email_uq ON users(email);
  `);

export default db;
