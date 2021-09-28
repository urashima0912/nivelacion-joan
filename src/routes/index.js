const user = require('./user.routes');
const api = require('./api.routes');
const message = require('./message.routes');

module.exports = {
    api,
    user,
    message,
};