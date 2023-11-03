const Handler = require('./handler');
const Routes = require('./routes');
class ApiInit {
    registerHandler() {
        Routes.registerRoute('player.login', new Handler().login);
        Routes.registerRoute('player.upload', new Handler().upload);
        Routes.registerRoute('leaderboard.list', new Handler().getLeaderboardList);
        Routes.registerRoute('leaderboard.join', new Handler().updateLeaderboardData);
        Routes.registerRoute('leaderboard.update', new Handler().updateLeaderboardData);
    }
}

module.exports = ApiInit;