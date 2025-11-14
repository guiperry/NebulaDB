# @nebula-db/vite-plugin

Vite plugin for NebulaDB - Simplify NebulaDB integration in Vite projects with virtual modules.

Part of the [NebulaDB](https://github.com/Nom-nom-hub/NebulaDB) project - a high-performance, reactive, TypeScript-first, schema-optional, embeddable NoSQL database.

## Installation

```bash
npm install @nebula-db/vite-plugin @nebula-db/core vite
```

## Usage

### Basic Setup

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import nebulaDBPlugin from '@nebula-db/vite-plugin';

export default defineConfig({
  plugins: [
    nebulaDBPlugin({
      adapter: 'memory',
      collections: ['users', 'posts']
    })
  ]
});
```

```typescript
// main.ts
import db from 'virtual:nebula-db';

// Use the database
const users = db.collection('users');
await users.insert({ name: 'Alice', age: 30 });
```

### Advanced Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import nebulaDBPlugin from '@nebula-db/vite-plugin';

export default defineConfig({
  plugins: [
    nebulaDBPlugin({
      virtualModuleName: 'virtual:nebula-db', // Default
      adapter: 'sqlite',
      adapterOptions: {
        path: './data/app.db'
      },
      plugins: [
        { name: 'validation' },
        { name: 'cache', options: { maxSize: 100 } }
      ],
      devtools: true,
      devtoolsOptions: {
        port: 3333,
        autoOpen: true
      },
      collections: ['users', 'posts', 'comments']
    })
  ]
});
```

## Configuration Options

### `NebulaDBPluginOptions`

```typescript
interface NebulaDBPluginOptions {
  virtualModuleName?: string;  // Virtual module name (default: 'virtual:nebula-db')
  adapter?: 'memory' | 'localstorage' | 'indexeddb' | 'filesystem' | 'sqlite' | 'redis';
  adapterOptions?: Record<string, any>;  // Adapter-specific options
  plugins?: Array<{
    name: string;
    options?: Record<string, any>;
  }>;
  devtools?: boolean;  // Enable DevTools (default: false)
  devtoolsOptions?: {
    port?: number;
    autoOpen?: boolean;
  };
  collections?: string[];  // Collections to pre-create
}
```

## Supported Adapters

- `memory`: In-memory storage (default)
- `localstorage`: Browser localStorage
- `indexeddb`: Browser IndexedDB
- `filesystem`: Node.js file system
- `sqlite`: SQLite database
- `redis`: Redis (via adapter-memorydb)

## Virtual Module

The plugin creates a virtual module that you can import in your code:

```typescript
import db from 'virtual:nebula-db';
```

This provides a pre-configured NebulaDB instance with your specified adapter, plugins, and collections.

## DevTools Integration

When `devtools: true`, the plugin serves the NebulaDB DevTools UI at `/__nebula-devtools` and provides a `nebulaDevtools` export.

## Documentation

For full documentation, visit the [NebulaDB GitHub repository](https://github.com/Nom-nom-hub/NebulaDB).

## License

MIT
