import { spawn } from 'child_process';
import readline from 'readline';

async function main() {
  const serverProcess = spawn('node', ['build/index.js'], {
    stdio: ['pipe', 'pipe', 'inherit'],
  });

  const rl = readline.createInterface({
    input: serverProcess.stdout,
    crlfDelay: Infinity,
  });

  // Função para enviar um request e esperar a resposta JSON
  function sendRequest(request) {
    return new Promise((resolve) => {
      const onLine = (line) => {
        try {
          const response = JSON.parse(line);
          rl.off('line', onLine);
          resolve(response);
        } catch {
          // linha não JSON, ignora
        }
      };
      rl.on('line', onLine);
      serverProcess.stdin.write(JSON.stringify(request) + '\n');
    });
  }

  const request = {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: {
      name: "greet",
      arguments: { name: "Mateus" }
    }
  };

  console.log('Enviando request para greet...');
  const response = await sendRequest(request);
  console.log('Resposta recebida:', response);

  serverProcess.kill();
}

main().catch(console.error);
