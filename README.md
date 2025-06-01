# MCP MateusData Server

A TypeScript server implementing a simple **Model Context Protocol (MCP)** — a true "Hello World" example to help you understand how an MCP server works. This project includes basic features such as:

- Handling JSON-RPC requests
- Example tools like `add-number` and `greet`
- Support for Server-Sent Events (SSE) for real-time communication
- Simple client and server code for easy testing and learning

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



## Using SSE (Server-Sent Events) with the MCP Server

You can interact with the MCP server using SSE for real-time communication. Start the server:

```bash
node build/index.js sse
```

You should see:

```
MCP Server running with SSE on http://localhost:8765/sse
```

### Connecting to the SSE endpoint

In a new terminal, connect using `curl`:

```bash
curl http://localhost:8765/sse
```

Example output:

```
event: endpoint
data: /messages?sessionId=d9bfe7df-937c-475e-8d80-904a99f9ef4d
```

### Sending a message to the server

Copy the `sessionId` from the previous output and use it to send a request:

```bash
curl -X POST http://localhost:8765/messages \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"greet","arguments":{"name":"Mateus"}}}'
```

The server will respond via the SSE connection with the result of your request.

This project is licensed under the MIT License.
