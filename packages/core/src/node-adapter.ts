import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import type { NebulaDatabase, Collection, CollectionOptions } from './types';

export async function createNodeDatabase(config: any): Promise<NebulaDatabase> {
  const dbPath = config.path || path.join(process.cwd(), 'nebuladb.sqlite');

  // Ensure directory exists
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const sqlite = new Database(dbPath);

  // Enable foreign keys and other pragmas
  sqlite.pragma('foreign_keys = ON');
  sqlite.pragma('journal_mode = WAL');

  return {
    collection: (name: string, options?: CollectionOptions) => createNodeCollection(sqlite, name, options),
    close: () => { sqlite.close(); },
  };
}

function createNodeCollection(sqlite: any, name: string, options?: CollectionOptions): Collection<any> {
  // Create table if it doesn't exist
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS ${name} (
      _id TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  sqlite.exec(createTableSQL);

  const find = async (query?: any) => {
    let sql = `SELECT * FROM ${name}`;
    let params: any[] = [];

    if (query) {
      const conditions: string[] = [];
      for (const [key, value] of Object.entries(query)) {
        conditions.push(`json_extract(data, '$.${key}') = ?`);
        params.push(value);
      }
      if (conditions.length > 0) {
        sql += ` WHERE ${conditions.join(' AND ')}`;
      }
    }

    const stmt = sqlite.prepare(sql);
    const rows = stmt.all(...params);

    return rows.map((row: any) => JSON.parse(row.data));
  };

  return {
    insert: async (doc: any) => {
      const stmt = sqlite.prepare(`INSERT INTO ${name} (_id, data) VALUES (?, ?)`);
      stmt.run(doc._id, JSON.stringify(doc));
      return doc;
    },

    find,

    findOne: async (query: any) => {
      const results = await find(query);
      return results[0] || null;
    },

    update: async (query: any, update: any) => {
      // Find the document first
      const docs = await find(query);
      if (docs.length === 0) return null;

      const doc = docs[0];
      const updated = { ...doc, ...update };

      const stmt = sqlite.prepare(`UPDATE ${name} SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE _id = ?`);
      stmt.run(JSON.stringify(updated), doc._id);

      return updated;
    },

    delete: async (query: any) => {
      const docs = await find(query);
      if (docs.length === 0) return false;

      const stmt = sqlite.prepare(`DELETE FROM ${name} WHERE _id = ?`);
      stmt.run(docs[0]._id);

      return true;
    },
  };
}