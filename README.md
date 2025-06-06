﻿# mern-chat-app
 
A real-time chat application built with the MERN stack and Socket.IO, featuring secure authentication, persistent chat rooms, and online user presence.

## Key Features

- **User Authentication**  
  - Register & log in via RESTful endpoints  
  - JWT-based auth with protected routes  

- **Chat Rooms**  
  - Create or join named rooms  
  - Persistent rooms stored in MongoDB  
  - Message history loaded on join, timestamped  

- **Real-Time Messaging**  
  - Socket.IO “RPC” style calls (`joinRoom`, `sendRoomMessage`, etc.)  
  - Broadcasts to room participants  
  - New messages and room creations pushed instantly  

- **Online User Presence**  
  - Tracks connected users via Socket.IO middleware  
  - Lists who’s online in real time  

## Tech Stack

- **Server:** Node.js, Express, TypeScript, Socket.IO  
- **Database:** MongoDB (Mongoose)  
- **Client:** React, TypeScript, Tailwind CSS  
- **Auth:** JSON Web Tokens (JWT)

## Installation

1. **Clone the repo**  
    ```bash
    git clone https://github.com/LStackH/mern-chat-app.git
    cd mern-chat-app
    ```
    
 2. **Back-end "/server" setup**
    ```bash
    cd server
    npm install
    ```
    Create a new .env file with these variables
    
    ```bash
    PORT=5000                                     
    MONGO_URI=mongodb://localhost:27017/mern-chat # Or whatever connection string to your MongoDB
    JWT_SECRET=your_jwt_secret                    # Choose a secure, complex and obscure key
    ```
    Finally, run the server (in dev mode)
    
    ```bash
    npm run dev
    ```
3. **Front-end "/client" setup**
    ```bash
    cd client
    npm install
    npm run dev                # starts app on :3000
    ```

4. **Open your browser at http://localhost:3000 and register or log in!**

   Tip: Open up another private browser session, register a new account and test the chat room functionalities locally
