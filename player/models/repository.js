let Player = require('./player');
let tools = require('../tools/commonTools');
class Repository {
    constructor() {
        this.db;
    }
    setDataBase(db) {
        this.db = db;
    }
    getPlayerCollection() {
        let playerCollection = this.db.collection('player');
        return playerCollection;
    }
    async getPlayerInfoByDeviceId(deviceId) {
        let playerCollection = this.getPlayerCollection();
        let playerInfo = await playerCollection.findOne({ "deviceId": deviceId });
        let newPlayerInfo = new Player();
        if (!playerInfo) {
            return playerInfo;
        }
        console.log("playerInfo:",playerInfo);
        newPlayerInfo.constructPlayer(playerInfo);
        return newPlayerInfo;
    }

    async getPlayerInfoByPlayerId(playerId) {
        let playerCollection = this.getPlayerCollection();
        let playerInfo = await playerCollection.findOne({ "playerId": playerId });
        let newPlayerInfo = new Player();
        if (!playerInfo) {
            return playerInfo;
        }
        console.log("playerInfo:",playerInfo);
        newPlayerInfo.constructPlayer(playerInfo);
        return newPlayerInfo;
    }

    async createPlayerInfo(deviceId) {
        let playerCollection = this.getPlayerCollection();
        let initPlayerData = JSON.stringify({ level: 0, star: 0 });
        let playerInfo = new Player(deviceId, tools.generateRandomNumber(), initPlayerData);
        await playerCollection.insertOne(playerInfo);
        return playerInfo;
    }
    async updatePlayerInfo(playerId, playerData) {
        let playerCollection = this.getPlayerCollection();
        let filter = { "playerId": playerId }
        let update = { $set: { "playerData": playerData } }
        await playerCollection.updateOne(filter, update)
    }
}

module.exports = Repository;