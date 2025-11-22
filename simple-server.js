import net from 'node:net'

const PORT = 4000
const activeConnections = new Map()
let username = ''

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const decodedData = data.toString('utf-8')

    if (decodedData.includes('_username_')) {
      username = parseUsername(decodedData)

      if (activeConnections.has(username)) {
        socket.write(`_auth_username ${username} is already connected. Try using another username!`)
      } else {
        activeConnections.set(username, socket)

        for (let [, connection] of activeConnections) {
          if (connection === socket) {
            socket.write(`_auth_Welcome, ${username}! Type your messages below.`)
          } else {
            connection.write(`${username} has connected!`)
          }
        }
      }
    } else {
      const message = parseMessage(decodedData)

      for (let [, connection] of activeConnections) {
        if (connection !== socket) {
          connection.write(`[${username}]: ${message}`)
        }
      }
    }
  })

  socket.on('close', () => {
    for (let [, connection] of activeConnections) {
      if (connection === socket) {
        activeConnections.delete(username)
      } else {
        connection.write(`${username} has disconnected!`)
      }
    }
  })
})

function parseMessage(data) {
  return data.replace('_message_', '')
}

function parseUsername(data) {
  return data.replace('_username_', '')
}

server.listen(PORT, '127.0.0.1', () => {
  console.log('server listening on', server.address());
})
