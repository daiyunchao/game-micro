const Repository = require("../models/repository");
const generalConfig = require('../config/general.json');
const repository = new Repository();
class Server {
    constructor() {
        this.list = [];
    }
    setDataBase(db) {
        repository.setDataBase(db);
    }

    //获取排行榜列表
    async getLeaderboardList(ctx, broker) {
        this.list = await repository.getList();
    }

    //从缓存中读取数据
    async getCacheList() {
        return this.list;
    }

    //更新/加入排行榜
    async updateCacheLeaderboard(ctx, broker) {
        let playerId = ctx.params.playerId;
        let newData = ctx.params.newData;
        //判断数据是否在player中,如果不在则和最小的level比较,如果小于最小的level则抛弃
        //如果比最小的level大,则加入并且抛弃最小的level
        //如果已在则直接修改数据
        let oldDataIndex = this.getDataIndex(playerId);
        if (oldDataIndex > -1) {
            this.updateData(oldDataIndex, newData);
        } else {
            this.addDataToCache(playerId, newData);
        }
    }

    getDataIndex(playerId) {
        for (let i = 0; i < this.list.length; i++) {
            const item = this.list[i];
            if (item.playerId === playerId) {
                return i;
            }
        }
        return -1;
    }
    addDataToCache(playerId, newData) {
        if (!newData.level) {
            return;
        }
        let lastItem = this.list[this.list.length - 1];
        if (this.list.length >= generalConfig.showCount) {
            if (lastItem.level >= newData.level) {
                //排行榜的level比新数据的高,不更新
                return;
            }
            //新数据等级高于就比较的等级,将最小的等级踢掉,换成这个玩家的数据
            newData["playerId"] = playerId;
            this.list.splice(this.list.length - 1, 1, newData);
        } else {
            newData["playerId"] = playerId;
            this.list.splice(this.list.length - 1, 0, newData);
        }
        this.sortList();
    }
    updateData(index, newData) {
        if (newData.level) {
            this.list[index]["level"] = newData.level;
        }
        if (newData.name) {
            this.list[index]["name"] = newData.name;
        }
        if (newData.headImg) {
            this.list[index]["headImg"] = newData.headImg;
        }
        if (newData.extraData) {
            this.list[index]["extraData"] = newData.extraData;
        }
        this.sortList();
    }
    sortList() {
        this.list = this.list.sort((a, b) => {
            return b.level - a.level;
        })
    }
}

module.exports = new Server();