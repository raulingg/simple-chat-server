# 📣 Simple Chat Server  

A lightweight, zero-dependency **TCP chat server** built with Node.js.  
Supports multiple simultaneous connections, message broadcasting, and a simple terminal-based client.

![badge-node](https://img.shields.io/badge/Node.js-20%2B-green)

---

## Table of Contents

- [Features](#-features)  
- [Project Structure](#-project-structure)  
- [Requirements](#️-requirements)  
- [Installation](#-installation)  
- [Usage](#-usage)  
  - [Running the Server](#running-the-server)  
  - [Connecting Clients](#connecting-clients)  
- [How It Works](#how-it-works)
- [Architecture Diagram](#-architecture-diagram)
- [Roadmap](#roadmap)  

---

## ✨ Features
- 🔌 **Pure TCP server** — no external dependencies  
- 👥 **Multiple-client support**  
- 📢 **Message broadcasting** 
- 🖥️ **Simple CLI interface** 
- 🪶 Lightweight, ~50 lines of core logic
- 💡 Perfect starter project for learning sockets or building custom chat protocols

---

## 📁 Project Structure

```
simple-chat-server/
│
├── simple-server.js # TCP chat server
└── simple-sender.js # Simple terminal client
```

---

## 🛠️ Requirements

- **Node.js 20+**  
- Terminal for client connections  
- TCP port open (default is 4000 unless modified)

---

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/raulingg/simple-chat-server.git
   cd simple-chat-server

No dependencies to install — uses only built-in Node modules.

--- 

## 🚀 Usage

### 🖥️ Running the Server

```sh
node simple-server.js
```

To change the port, edit the PORT constant in simple-server.js.

> Tip: If you plan to run the server on a remote machine, make sure the port is open on the firewall.

### 💬 Connecting Clients

Open a new terminal window/tab for each client, then run:

```sh
node simple-sender.js
```
Once connected, you can type messages in your terminal. They'll be sent to the server, which will broadcast them to all other connected clients.

---

## ⚙️ How It Works

### 🖥️ Server (`simple-server.js`)
- Creates a TCP server using **`net.createServer()`**
- Maintains an internal list of active client sockets
- When one client sends a message → **broadcasts it to all other connected clients**
- Cleans up the client list when a connection closes or errors occur

### 💻 Client (`simple-sender.js`)
- Connects to the server using **`net.Socket()`**
- Captures user input from the terminal using **`readline`**
- Sends entered messages to the server over a TCP connection
- Displays broadcast messages received from the server in real time
  
---

## 🧩 Architecture Diagram

        ┌─────────────────────────┐
        │      Chat Server        │
        │     (simple-server)     │
        └──────────┬──────────────┘
                   │ broadcasts
       ┌───────────┼──────────────┐
       │           │               │
┌───────────┐ ┌───────────┐ ┌───────────┐
│  Client 1 │ │ Client 2  │ │ Client 3  │
│ sender.js │ │ sender.js │ │ sender.js │
└───────────┘ └───────────┘ └───────────┘

---

## 🗺️ Roadmap

Potential improvements:

- 🔐 Username / nickname system
- 🔒 TLS encryption
- 📜 Message persistence
- 🗂️ Chat rooms / channels
- 🌐 Web client using WebSockets
- 🔁 Auto-reconnect logic
- 🐳 Dockerfile + Compose setup
