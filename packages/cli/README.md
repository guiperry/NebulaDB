# @nebula-db/cli

CLI tools for NebulaDB

Part of the [NebulaDB](https://github.com/Nom-nom-hub/NebulaDB) project - a high-performance, reactive, TypeScript-first, schema-optional, embeddable NoSQL database.

## Installation

```bash
npm install -g @nebula-db/cli
```

## Commands

### `nebula init`

Initialize a new NebulaDB project in the current directory.

```bash
nebula init
```

Options:
- `-d, --directory <directory>`: Directory to initialize the project in (default: '.')

### `nebula generate:adapter <name>`

Generate a new adapter template.

```bash
nebula generate:adapter my-adapter
```

Options:
- `-d, --directory <directory>`: Directory to create the adapter in (default: './adapters')

### `nebula generate:plugin <name>`

Generate a new plugin template.

```bash
nebula generate:plugin my-plugin
```

Options:
- `-d, --directory <directory>`: Directory to create the plugin in (default: './plugins')

### `nebula devtools`

Launch NebulaDB devtools server.

```bash
nebula devtools
```

Options:
- `-p, --port <port>`: Port to run the devtools on (default: '3000')

### `nebula migrate`

Run database migrations.

```bash
nebula migrate
```

Options:
- `-d, --directory <directory>`: Directory containing migration files (default: './migrations')
- `-c, --config <config>`: Path to configuration file (default: './nebula.config.js')

## Usage Examples

```bash
# Initialize a new project
nebula init

# Generate an adapter
nebula generate:adapter sqlite-adapter

# Generate a plugin
nebula generate:plugin validation-plugin

# Launch devtools
nebula devtools --port 3333

# Run migrations
nebula migrate --config ./config/nebula.js
```

## Documentation

For full documentation, visit the [NebulaDB GitHub repository](https://github.com/Nom-nom-hub/NebulaDB).

## License

MIT
