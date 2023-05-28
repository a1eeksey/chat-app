# chat-main

# About
The backend server, implemented in Express, handles the room management, user authentication, and message routing. It utilizes websockets to establish bi-directional communication channels with connected clients. When a user sends a message, the server broadcasts it to all users in the same room, ensuring real-time message delivery.

On the frontend, Vue.js is employed to create a responsive and interactive user interface. The application supports the creation of multiple rooms, allowing users to join specific rooms to engage in conversations. The UI is designed to be user-friendly and visually appealing, providing a seamless and enjoyable chatting experience.

## server
```
npm i
npm run dev
```
## client
```
npm i
npm run serve
