class LeaderboardItem {
    constructor(jsonObj) {
        this.playerId = jsonObj.playerId;   //ID
        this.name = jsonObj.name;           //名称
        this.headImg = jsonObj.headImg;     //头像
        this.level = jsonObj.level;         //等级
        this.extraData = jsonObj.extraData; //额外数据
    }
}
module.exports = LeaderboardItem;