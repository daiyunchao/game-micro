const Handler = require('./handler');
const Routes = require('./routes');
class ApiInit {
    registerHandler() {
        Routes.registerRoute('player.login', new Handler().login);
    }
}

module.exports = ApiInit;