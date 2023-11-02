const Handler = require('./handler');
const Routes = require('./routes');
class ApiInit {
    registerHandler() {
        Routes.registerRoute('player.login', new Handler().login);
        Routes.registerRoute('player.upload', new Handler().upload);
    }
}

module.exports = ApiInit;