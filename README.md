# chat-main

# About
This web chat application, developed using Vue.js and Express with websockets, offers an impressive set of features and functionality. It is designed to facilitate real-time communication between users in separate rooms. The application architecture follows a client-server model, where the Vue.js frontend interacts with the Express backend through websockets for instant messaging.

The backend server, implemented in Express, handles the room management, user authentication, and message routing. It utilizes websockets to establish bi-directional communication channels with connected clients. When a user sends a message, the server broadcasts it to all users in the same room, ensuring real-time message delivery.

On the frontend, Vue.js is employed to create a responsive and interactive user interface. The application supports the creation of multiple rooms, allowing users to join specific rooms to engage in conversations. The UI is designed to be user-friendly and visually appealing, providing a seamless and enjoyable chatting experience.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
client - npm run serve
server - npm run dev

```
### Compiles and minifies for production
```
npm run build
```
