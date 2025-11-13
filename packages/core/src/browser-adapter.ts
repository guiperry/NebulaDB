import type { NebulaDatabase, Collection, CollectionOptions } from './types';

export async function createBrowserDatabase(config: any): Promise<NebulaDatabase> {
  // Use IndexedDB for browser storage
  const { openDB } = await import('idb');

  const db = await openDB(config.name || 'nebuladb', 1, {
    upgrade(db) {
      // Create object stores for collections
      config.collections?.forEach((collectionName: string) => {
        if (!db.objectStoreNames.contains(collectionName)) {
          db.createObjectStore(collectionName, { keyPath: '_id' });
        }
      });
    },
  });

  return {
    collection: (name: string, options?: CollectionOptions) => createBrowserCollection(db, name, options),
    close: () => db.close(),
  };
}

function createBrowserCollection(db: any, name: string, options?: CollectionOptions): Collection<any> {
  const find = async (query?: any) => {
    const tx = db.transaction(name, 'readonly');
    const store = tx.objectStore(name);
    const all = await store.getAll();

    if (!query) return all;

    // Simple query filtering (expand as needed)
    return all.filter((doc: any) => {
      for (const [key, value] of Object.entries(query)) {
        if (doc[key] !== value) return false;
      }
      return true;
    });
  };

  return {
    insert: async (doc: any) => {
      const tx = db.transaction(name, 'readwrite');
      const store = tx.objectStore(name);
      await store.add(doc);
      return doc;
    },

    find,

    findOne: async (query: any) => {
      const results = await find(query);
      return results[0] || null;
    },

    update: async (query: any, update: any) => {
      const tx = db.transaction(name, 'readwrite');
      const store = tx.objectStore(name);

      const docs = await store.getAll();
      const doc = docs.find((d: any) => {
        for (const [key, value] of Object.entries(query)) {
          if (d[key] !== value) return false;
        }
        return true;
      });

      if (doc) {
        const updated = { ...doc, ...update };
        await store.put(updated);
        return updated;
      }

      return null;
    },

    delete: async (query: any) => {
      const tx = db.transaction(name, 'readwrite');
      const store = tx.objectStore(name);

      const docs = await store.getAll();
      const doc = docs.find((d: any) => {
        for (const [key, value] of Object.entries(query)) {
          if (d[key] !== value) return false;
        }
        return true;
      });

      if (doc) {
        await store.delete(doc._id);
        return true;
      }

      return false;
    },
  };
}