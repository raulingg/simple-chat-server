
import net from 'node:net'
import readline from 'node:readline/promises'
import process from 'node:process'

let username = ''
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const socket = net.createConnection({ host: '127.0.0.1', port: 3099 })
  .on('connect', async () => {
    await authUsername()

    // Listen for 'line' event (when user presses Enter)
    rl.on('line', (line) => {
      const message = line.trim();
      if (message.toLowerCase() === 'exit') {
        rl.close();
      } else if (message) {
        console.log(`[${username}]: ${message}`); // Simulate sending message
        socket.write(`_message_${message}`, 'utf-8')
      }
      promptForMessage(); // Prompt for next message
    });
  })
  .on('data', async (data) => {
    const decodedData = data.toString('utf-8')

    if (decodedData.includes('_auth_') && decodedData.includes('is already connected')) {
      console.log(decodedData.replace('_auth_', ''))
      await authUsername()
      return
    }

    if (decodedData.includes('_auth_') && decodedData.includes('Welcome')) {
      console.log(decodedData.replace('_auth_', ''))
      promptForMessage()
      return;
    }

    console.log(decodedData)
    promptForMessage()
  })
  .on('connectionAttemptFailed', () => {
    console.log('connection attempt to server failed');
  })
  .on('error', console.error)
  .on('close', () => {
    console.log('connection to server was closed');
    rl.close()
  })

rl.on('close', () => {
  console.log('Chat session ended. Goodbye!')
  process.exit(0)
});

// Function to prompt for username
async function askUsername() {
  username = (await rl.question('Enter your username: ')).trim()

  if (!username) {
    askUsername();
  }
}

async function authUsername() {
  await askUsername()

  socket.write(`_username_${username}`, 'utf-8')

  return username
}

// Function to prompt for messages
function promptForMessage() {
  rl.setPrompt(`${username} > `);
  rl.prompt();
}
