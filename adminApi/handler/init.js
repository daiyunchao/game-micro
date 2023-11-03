const Handler = require('./handler');
const Routes = require('./routes');
class ApiInit {
    registerHandler() {
        Routes.registerRoute('admin.login', new Handler().login);
        Routes.registerRoute('admin.query_player', new Handler().getPlayerInfoByDeviceIdOrPlayerId);
    }
}

module.exports = ApiInit;