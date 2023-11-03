let Leaderboard = require('./leaderboard');
let LeaderboardItem = require('./leaderboardItem');
let generalConfig = require('../config/general.json');
class Repository {
    constructor() {
        this.db;
    }
    setDataBase(db) {
        this.db = db;
    }
    getLeaderboardCollection() {
        let leaderboardCollection = this.db.collection('leaderboard');
        return leaderboardCollection;
    }
    async getList() {
        let collection = this.getLeaderboardCollection();
        let cursor = collection.find().sort({ "level": -1 }).limit(generalConfig.showCount);
        let list = await cursor.toArray();
        let leaderboardList = [];
        console.log(list);
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            let leaderboardItem = new LeaderboardItem(item);
            leaderboardList.push(leaderboardItem);
        }
        return leaderboardList;
    }
    async updateLeaderboard(playerId, newData) {
        let collection = this.getLeaderboardCollection();
        let filter = { "playerId": playerId };
        let updateData = { "playerId": playerId };
        if (newData.level) {
            updateData["level"] = newData.level;
        }
        if (newData.name) {
            updateData["name"] = newData.name;
        }
        if (newData.headImg) {
            updateData["headImg"] = newData.headImg;
        }
        if (newData.extraData) {
            updateData["extraData"] = newData.extraData;
        }
        let update = { "$set": updateData };
        await collection.updateOne(filter, update, { "upsert": true });
    }
}

module.exports = Repository;