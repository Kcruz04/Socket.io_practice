const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT

const server = app.listen(PORT, () => console.log(`Locked and loaded on port: ${PORT}`))
const io = require('socket.io')(server,{cors: true})

io.on('connection', (socket) => {
    console.log(socket)

    socket.on('chat', (client_input) => {
        console.log('got a message')

        io.emit('post chat', client_input)
    })
})