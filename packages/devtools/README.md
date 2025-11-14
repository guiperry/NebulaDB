# @nebula-db/devtools

DevTools for NebulaDB - A web-based interface for debugging and managing NebulaDB instances.

Part of the [NebulaDB](https://github.com/Nom-nom-hub/NebulaDB) project - a high-performance, reactive, TypeScript-first, schema-optional, embeddable NoSQL database.

## Installation

```bash
npm install @nebula-db/devtools
```

## Usage

### Development

To run the devtools in development mode:

```bash
npm run dev
```

This will start a development server on `http://localhost:5173` (default Vite port).

### Build

To build the devtools for production:

```bash
npm run build
```

### Preview

To preview the built devtools:

```bash
npm run preview
```

## Features

- **Collection Viewer**: Browse and inspect database collections
- **Document Viewer**: View and edit individual documents
- **Query Builder**: Construct and execute queries
- **Plugin Monitor**: Monitor plugin activity and performance
- **Event Log**: View database events and operations

## Connecting to NebulaDB

The devtools can connect to NebulaDB instances via WebSocket or HTTP. Make sure your NebulaDB server has the sync plugin enabled for real-time updates.

## Documentation

For full documentation, visit the [NebulaDB GitHub repository](https://github.com/Nom-nom-hub/NebulaDB).

## License

MIT
