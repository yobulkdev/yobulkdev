import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io
        io.on('connection', (socket) => {
            socket.on('join-call', (id) => {
                socket.join(roomId)
                socket.to(roomId).emit('user-connected', socket.id)

                socket.on('offer-signal', ({toUserId, fromUserName, signal}) =>{
                    socket.to(toUserId).emit('offer-siganl', {fromUserId: socket.id, fromUserName, signal })
                })

                socket.on('answer-signal', ({toUserId, fromUserName, signal}) =>{
                    socket.to(toUserId).emit('answer-siganl', {fromUserId: socket.id, fromUserName, signal })
                })

                socket.on('leave-call', () => {
                    socket.to(roomId).emit('user-disconnected', {userId: socket.id})
                    socket.leave(roomId)
                })
                
                socket.on('disconnect', () => {
                    socket.to(roomId).emit('user-disconnected', {userId: socket.id})
                    socket.leave(roomId)
                })

                console.log('User joined call with room: ' + id);
            });
        });
    }
    res.end()
}

export default SocketHandler