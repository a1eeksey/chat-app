const express = require('express')
const { Server } = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
// set params of server
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})
let usersArr = []

io.on('connection', (socket) => {
    console.log(`user ${socket.id} has connected` );

    // rooms
    socket.on('setUserRoom', data => {
        // join the room
        socket.join(data.room)
        // clean the previous join of this acc if it was
        usersArr.filter((user) => user.id !== socket.id)
        // add to the begining of array
        usersArr.push({
            name: data.name,
            room: data.room,
            id: data.id
        })
        // send connected to this room users
        io.to(data.room).emit('updateUsers', usersArr.filter((us) => us.room === data.room))
        // send new message 
        socket.emit('newMessage', `Welcome, ${data.name}`)
        // send new user 
        socket.broadcast.to(data.room).emit('newMessage', `${data.name} has connected`)  
    })
    // messages
    socket.on('message', data => {
        // метод broadcast обращает внимание на всех пользователей кроме текущего
        socket.broadcast.emit('message:received', data)
    })

    // disconnect from frontend
    socket.on('disconnectUser', data => {
        usersArr = usersArr.filter((us) => us.id !== data.id)
        io.to(data.room).emit('updateUsers', usersArr.filter((us) => us.room === data.room))
        socket.broadcast.to(data.room).emit('newMessage', `${data.name} has left`)
        console.log(`user ${socket.id} has disconnected`)       
    })

    // disconnect using page reloading

    // socket.on('disconnect', () => {
    //     const user = usersArr.filter((us) => us.id === socket.id)
    //     usersArr = usersArr.filter((us) => us.id !== socket.id)
    //     io.to(user.room).emit('updateUsers', usersArr.filter((us) => us.room === user.room))
    //     socket.broadcast.to(user.room).emit('newMessage', `${user.name} has left`)

    //     console.log(`user ${socket.id} has disconnected`)   
    // })
})

server.listen(3000, () => {
    console.log('server started on port 3000');
})