const Repository = require("../models/repository");
const repository = new Repository();
class Server {
    setDataBase(db) {
        repository.setDataBase(db);
    }

    //获取排行榜列表
    async getLeaderboardList(){
        return await repository.getList();
    }

    //更新/加入排行榜
    async updateLeaderboard(playerId,newData){
        return await repository.updateLeaderboard(playerId,newData);
    }
}

module.exports = new Server();