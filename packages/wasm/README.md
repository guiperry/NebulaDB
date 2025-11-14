# @nebula-db/wasm

WebAssembly support for NebulaDB - High-performance WASM-optimized database operations.

Part of the [NebulaDB](https://github.com/Nom-nom-hub/NebulaDB) project - a high-performance, reactive, TypeScript-first, schema-optional, embeddable NoSQL database.

## Installation

```bash
npm install @nebula-db/wasm @nebula-db/core
```

## Prerequisites

Before using the WASM package, you need to build the WASM module:

```bash
cd packages/wasm
npm run build:wasm
```

This creates the WASM binaries in `packages/wasm/wasm/pkg/`.

## Usage

### Basic Setup

```typescript
import { initWasm, WasmAdapter, WasmDatabase } from '@nebula-db/wasm';

// Initialize WASM module
await initWasm();

// Create WASM database
const db = new WasmDatabase();

// Work with collections
const users = db.collection('users');
await users.insert({ name: 'Alice', age: 30 });
const result = await users.find({ age: { $gt: 20 } });
console.log(result);
```

### Using with Core NebulaDB

```typescript
import { createDb } from '@nebula-db/core';
import { initWasm, WasmAdapter } from '@nebula-db/wasm';

// Initialize WASM
await initWasm();

// Create database with WASM adapter
const db = createDb({
  adapter: new WasmAdapter()
});

// Use as normal
const users = db.collection('users');
await users.insert({ name: 'Alice', age: 30 });
```

## API Reference

### `initWasm()`

Initializes the WASM module. Must be called before creating WASM adapters or databases.

```typescript
await initWasm();
```

### `WasmAdapter`

A NebulaDB adapter that uses WASM for storage operations.

```typescript
const adapter = new WasmAdapter();
```

### `WasmDatabase`

A WASM-optimized database implementation.

```typescript
const db = new WasmDatabase();
```

### `WasmCollection`

A WASM-optimized collection with all standard NebulaDB operations.

```typescript
const collection = db.collection('users');

// CRUD operations
await collection.insert({ name: 'Alice' });
const docs = await collection.find({ name: 'Alice' });
await collection.update({ name: 'Alice' }, { $set: { age: 30 } });
await collection.delete({ name: 'Alice' });

// Indexing
await collection.createIndex({
  name: 'name_idx',
  fields: ['name'],
  type: 'single'
});
```

## Performance Benefits

The WASM implementation provides:

- **Faster queries**: Optimized algorithms in Rust/WebAssembly
- **Lower memory usage**: Efficient data structures
- **Better concurrency**: WASM's isolated execution model
- **Cross-platform**: Same performance in browsers and Node.js

## Building WASM Module

To build the WASM module from source:

```bash
cd packages/wasm/wasm
wasm-pack build --target web --out-dir pkg
wasm-pack build --target nodejs --out-dir pkg_node
```

## Browser vs Node.js

The package automatically detects the environment and loads the appropriate WASM module:

- **Browser**: Uses `nebula_wasm.js` (WebAssembly)
- **Node.js**: Uses `nebula_wasm_node.js` (native bindings)

## Limitations

- Requires WASM module to be built and available
- Some advanced features may not be fully implemented in WASM yet
- Subscription/reactivity is simplified in the current implementation

## Documentation

For full documentation, visit the [NebulaDB GitHub repository](https://github.com/Nom-nom-hub/NebulaDB).

## License

MIT
