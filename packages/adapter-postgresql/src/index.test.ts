import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Adapter, Document } from '@nebula-db/core';
import { PostgresqlAdapter } from './index';

describe('PostgresqlAdapter', () => {
  let adapter: PostgresqlAdapter;

  beforeEach(() => {
    // Use environment variables for test database connection
    const connectionString = process.env.POSTGRES_TEST_CONNECTION_STRING;
    if (!connectionString) {
      throw new Error('POSTGRES_TEST_CONNECTION_STRING environment variable is required for tests');
    }
    adapter = new PostgresqlAdapter({
      connectionString,
      tableName: 'test_documents'
    });
  });

  afterEach(async () => {
    await adapter.close();
  });

  it('should load and save data', async () => {
    // Test implementation
    const testData = {
      users: [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' }
      ]
    };

    await adapter.save(testData);
    const loadedData = await adapter.load();

    expect(loadedData).toEqual(testData);
  });
});