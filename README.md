# MCP MateusData Server

A TypeScript server implementing a simple example of the **Model Context Protocol (MCP)** — ideal as a "Hello World" to understand how an MCP server works.

## Prerequisites

- Node.js (v20 or higher)
- npm (comes with Node.js)
- Cursor IDE (recommended)

## Installation

1. Clone the repository:
  ```bash
  git clone git@github.com:mateusdata/mcp-mateusdata-server.git
  cd mcp-mateusdata-server
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

## Running the Project

### Development mode:
```bash
npm run dev
```

### For build and production run:
```bash
npm run build
npm start
```

## Adding the MCP Server in Cursor

In the Cursor configuration file, add:
```json
{
  "mcpServers": {    
  "mateusdata-mcp-server": {
   "command": "node",      
   "args": ["path/to/mcp-mateusdata-server/build/index.js"]
  }
  }
}
```

## Project Structure

```bash
mcp-mateusdata-server/
├── src/           # Source code
│   └── client.js  # Simple MCP client example
├── build/         # Compiled JavaScript files
├── node_modules/  # Project dependencies
├── package.json   # Project configuration and dependencies
└── tsconfig.json  # TypeScript configuration
```

## About

This repository demonstrates a minimal implementation of the Model Context Protocol (MCP). The `src/client.js` file provides an example of how a client can interact with the server, useful for testing and initial learning.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
