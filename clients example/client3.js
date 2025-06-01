// simple-client.js - Cliente simples sem classes para testar o servidor MCP
import { spawn } from 'child_process';
import { createInterface } from 'readline';

console.log('🚀 Iniciando teste simples do servidor MCP');

// Inicia o servidor
const serverProcess = spawn('node', ['build/index.js'], {
  stdio: ['pipe', 'pipe', 'inherit']
});

// Configura readline para ler respostas
const readline = createInterface({
  input: serverProcess.stdout,
  crlfDelay: Infinity
});

let messageId = 1;

// Função para enviar requisição e aguardar resposta
function sendRequest(method, params = {}) {
  return new Promise((resolve) => {
    const request = {
      jsonrpc: "2.0",
      id: messageId++,
      method: method,
      params: params
    };

    console.log(`\n📤 Enviando: ${method}`);
    console.log(JSON.stringify(request, null, 2));

    // Envia a requisição
    serverProcess.stdin.write(JSON.stringify(request) + '\n');

    // Aguarda a resposta
    const handler = (line) => {
      try {
        const response = JSON.parse(line);
        readline.off('line', handler);
        
        console.log(`\n📥 Resposta:`);
        console.log(JSON.stringify(response, null, 2));
        
        resolve(response);
      } catch (error) {
        // Ignora linhas que não são JSON válido
      }
    };
    
    readline.on('line', handler);
  });
}

// Função principal de teste
async function runTest() {
  try {
    // Aguarda um pouco para o servidor inicializar
    //await new Promise(resolve => setTimeout(resolve, 0));

    // 1. Inicializa o servidor
    console.log('\n🔄 Inicializando servidor...');
    await sendRequest('initialize', {
      protocolVersion: "2024-11-05",
      capabilities: {
        tools: {}
      },
      clientInfo: {
        name: "simple-client",
        version: "1.0.0"
      }
    });

    // 2. Testa a tool greet com o nome "Mateus"
    console.log('\n👋 Testando tool greet com nome "Mateus"...');
    await sendRequest('tools/call', {
      name: 'greet',
      arguments: { 
        name: 'Mateus' 
      }
    });

    console.log('\n✅ Teste concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante o teste:', error);
  } finally {
    // Encerra o servidor
    console.log('\n🛑 Encerrando servidor...');
    serverProcess.kill();
    process.exit(0);
  }
}

// Executa o teste
runTest();