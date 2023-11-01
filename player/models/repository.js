let Player = require('./player');
class Repository {
    getPlayerInfoByDeviceId(deviceId) {
        let player = new Player(deviceId, "10001", {
            "level": 10,
            "star": 10,
        });
        return player;
    }
}

module.exports = new Repository();