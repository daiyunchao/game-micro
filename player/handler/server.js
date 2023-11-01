const Repository = require("../models/repository");

class Server {
    async getPlayerInfoByDeviceId(deviceId) {
        return await Repository.getPlayerInfoByDeviceId(deviceId);
    }
}

module.exports = Server;