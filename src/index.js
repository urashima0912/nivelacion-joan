const server = require('./server')

require('./database');

server.listen(server.get('PORT'), () => {
    console.log("server listening on port: ", server.get('PORT'));
})