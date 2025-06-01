import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express, { Request, Response } from "express";
import { z } from "zod";

// Author: Mateus Santos
// Create an MCP server
const server = new McpServer({
  name: "mateus-data",
  description: "A simple server for hello world examples",
  version: "1.0.0"
});

// Add an addition tool
server.tool("add-number", "Add two numbers together",
  {
    a: z.number().describe("O primerio nome a ser somado"),
    b: z.number().describe("O segundo nome a ser somado")
  },
  
  async ({ a, b }) => ({
    content: [{ type: "text", text: `Hellow => Result is: ${a + b}` }]
  })
);

server.tool(
  "greet", "Greet a person",
  { name: z.string().describe("The name of the person to greet") },
  async ({ name }: { name: string }) => {
    return {
      content: [{ type: "text", text: `Hello, ${name}!` }],
    }
  }
);

server.tool("grocery-shopping", "Monthly grocery shopping for the family",
  { items: z.array(z.string()).describe("List of grocery items to buy") },
  async ({ items }) => {
    const list = items.join(", ");
    // Calculate the total cost of the shopping
    const prices = items.map(() => Math.floor(Math.random() * 10) + 1);
    const priceItems = items.map((item, idx) => {
      return `${item}: $${prices[idx]}`;
    }).join(", ");
    const total = prices.reduce((sum, val) => sum + val, 0);
    
    return {
      content: [
        { type: "text", text: `Shopping list: ${list}` },
        { type: "text", text: `Item prices: ${priceItems}` },
        { type: "text", text: `Total cost: $${total}` }
      ]
    };
  }
)

// Add a dynamic greeting resource
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `Hello, ${name}!`
    }]
  })
);

// Start receiving messages on stdin and sending messages on stdout


async function startServer(transportType: "stdio" | "sse") {
  if (transportType === "stdio") {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("MCP Server running with stdio transport");
  } else if (transportType === "sse") {
    const app = express();
    let transport: SSEServerTransport | null = null;

    app.get("/sse", async (req: Request, res: Response) => {
      transport = new SSEServerTransport("/messages", res);
      await server.connect(transport);
    });

    app.post("/messages", async (req: Request, res: Response) => {
      if (transport) {
        await transport.handlePostMessage(req, res);
      }
    });

    app.listen(8765, () => {
      console.log("MCP Server running with SSE on http://localhost:8765/sse");
    });
  }
}

// Start the server (choose "stdio" or "sse" based on your preference)
const transportType = process.argv[2] === "sse" ? "sse" : "stdio";
startServer(transportType);

