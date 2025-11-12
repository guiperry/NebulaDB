# @nebula-db/adapter-localstorage

A local storage adapter for NebulaDB that provides persistent file-based storage in Node.js environments. This adapter stores data as JSON files in the operating system's application data directory.

## Installation

Install the adapter along with the core NebulaDB package:

```bash
npm install @nebula-db/core @nebula-db/adapter-localstorage
```

## Prerequisites

This adapter is designed for Node.js environments and requires file system access. It automatically determines the appropriate application data directory for your operating system.

## Usage

```typescript
import { createDb } from '@nebula-db/core';
import { LocalstorageAdapter } from '@nebula-db/adapter-localstorage';

// Create database with local storage adapter
const db = createDb({
  adapter: new LocalstorageAdapter()
});

// Work with collections as usual
const users = db.collection('users');

// Insert documents
await users.insert({ name: 'Alice', age: 30, email: 'alice@example.com' });
await users.insert({ name: 'Bob', age: 25, email: 'bob@example.com' });

// Query documents
const allUsers = await users.find();
console.log(allUsers);
// Output: [
//   { id: '1', name: 'Alice', age: 30, email: 'alice@example.com' },
//   { id: '2', name: 'Bob', age: 25, email: 'bob@example.com' }
// ]

// Find specific documents
const adults = await users.find({ age: { $gte: 18 } });
```

## API Reference

### Constructor

```typescript
new LocalstorageAdapter()
```

Creates a new local storage adapter instance. The storage location is automatically determined based on the operating system.

### Methods

#### `load(): Promise<Record<string, Document[]>>`

Loads all data from the local storage file.

**Returns:** A record where keys are collection names and values are arrays of documents.

#### `save(data: Record<string, Document[]>): Promise<void>`

Saves NebulaDB data to the local storage file.

**Parameters:**
- `data`: A record where keys are collection names and values are arrays of documents to save.

#### `close(): Promise<void>`

Closes the adapter. For local storage, this is a no-op as file operations are synchronous.

## Data Model

- **Storage Location:** OS-specific application data directory
  - Windows: `%APPDATA%\NebulaDB\localstorage.json`
  - macOS: `~/Library/Application Support/NebulaDB/localstorage.json`
  - Linux: `~/.local/share/NebulaDB/localstorage.json`
  - Other: `~/.nebuladb/localstorage.json`
- **Format:** Pretty-printed JSON for readability
- **Persistence:** Data persists across application restarts
- **Atomicity:** Save operations replace the entire file contents

## Error Handling

The adapter includes error handling for:
- File system access issues
- Directory creation failures
- JSON parsing errors (returns empty object on load failure)
- Permission problems

## Testing

Run tests with:

```bash
npm test
```

Tests verify load and save functionality with temporary file operations.

## License

MIT