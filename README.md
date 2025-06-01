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
├── build/         # Compiled JavaScript files
├── src/           # Source code
    └── server.ts  # Simple MCP server example
│   └── client.js  # Simple MCP client example
├── node_modules/  # Project dependencies
├── package.json   # Project configuration and dependencies
└── tsconfig.json  # TypeScript configuration
```

## About

This repository demonstrates a minimal implementation of the Model Context Protocol (MCP). The `src/client.js` file provides an example of how a client can interact with the server, useful for testing and initial learning.

## Usage Examples

You can interact with the MCP server directly from your terminal using Bash, Zsh, or Fish. For example, to list available tools:

To call the tool `"add-number"` with values `a = 3` and `b = 5`:

```bash
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"add-number","arguments":{"a":3,"b":5}}}' | node build/index.js

```

To call the `"greet"` tool with the parameter `nome = "Mateus"`:

```bash
echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"greet","arguments":{"name":"Mateus"}}}' | node build/index.js
```


This project is licensed under the MIT License.
