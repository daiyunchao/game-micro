const Repository = require("../models/repository");
const repository = new Repository();
class Server {
    setDataBase(db) {
        repository.setDataBase(db);
    }
    async getPlayerInfoByDeviceId(deviceId) {
        return await repository.getPlayerInfoByDeviceId(deviceId);
    }
    async createPlayerInfo(deviceId) {
        return await repository.createPlayerInfo(deviceId);
    }
}

module.exports = new Server();