import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LocalstorageAdapter } from './index';

describe('LocalstorageAdapter', () => {
  let adapter: LocalstorageAdapter;

  beforeEach(() => {
    adapter = new LocalstorageAdapter();
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