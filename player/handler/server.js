const Repository = require("../models/repository");
const repository = new Repository();
class Server {
    setDataBase(db) {
        repository.setDataBase(db);
    }
    async getPlayerInfoByDeviceId(deviceId) {
        return await repository.getPlayerInfoByDeviceId(deviceId);
    }
    async getPlayerInfoByPlayerId(playerId) {
        return await repository.getPlayerInfoByPlayerId(playerId);
    }
    async createPlayerInfo(deviceId) {
        return await repository.createPlayerInfo(deviceId);
    }
    async uploadPlayerData(playerId, playerData) {
        return await repository.updatePlayerInfo(playerId, playerData);
    }
}

module.exports = new Server();