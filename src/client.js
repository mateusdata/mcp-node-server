import { spawn } from "child_process";
import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  // Roda seu servidor MCP
  const child = spawn("node", ["../build/index.js"], {
    stdio: ["pipe", "pipe", "inherit"],
    cwd: __dirname,
  });

  // Cria readline para ler a saída linha a linha
  const rl = readline.createInterface({
    input: child.stdout,
    crlfDelay: Infinity,
  });

  // JSON-RPC request para chamar tool greet com name: "Mateus"
  const request = {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: {
      name: "greet",
      arguments: {
        name: "Mateus",
      },
    },
  };

  // Envia o JSON para o servidor MCP
  child.stdin.write(JSON.stringify(request) + "\n");

  // Escuta a resposta (assumindo que vem em uma linha JSON completa)
  for await (const line of rl) {
    try {
      const response = JSON.parse(line);
      console.log("Resposta do servidor MCP:", JSON.stringify(response, null, 2));
      break; // sai do loop após receber resposta
    } catch {
      // Linha não é JSON válido, ignora
    }
  }

  child.kill();
}

run().catch(console.error);
