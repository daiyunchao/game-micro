const Repository = require("../models/repository");
const repository = new Repository();
class Server {
    setDataBase(db) {
        repository.setDataBase(db);
    }

    //获取排行榜列表
    async getLeaderboardList(ctx, broker) {
        //先读取缓存中的数据
        let cacheList = await broker.call('leaderboardCache.getCacheList', {});
        if (!cacheList || cacheList.length === 0) {
            return await repository.getList();
        }
        console.log("cache hit");
        return cacheList
    }

    //更新/加入排行榜
    async updateLeaderboard(ctx, broker) {
        let playerId = ctx.params.playerId;
        let newData = ctx.params.newData;
        //更新数据库
        await repository.updateLeaderboard(playerId, newData);
        //更新缓存
        broker.call('leaderboardCache.updateCacheData', { playerId, newData });

    }
}

module.exports = new Server();