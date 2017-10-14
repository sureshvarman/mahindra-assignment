var socketIO = require('socket.io');

module.exports = function(app)
{
    var io = socketIO(app);
    var serverSocket = null

    io.on('connection', function (socket)
    {
        console.log('connected socket');
        serverSocket = socket;
    });

    return {
        emitNewBlog: function(BlogId)
        {
            io.emit('newBlog', BlogId);
        }
    }
}
