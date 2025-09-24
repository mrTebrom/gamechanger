import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.resolve(process.cwd(), 'app.db'));
db.pragma('journal_mode = WAL');

export default db;
