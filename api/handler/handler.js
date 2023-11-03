class Handler {
    async login(ctx, broker) {
        let playerInfo = await broker.call('player.getPlayerInfoByDeviceId', { "deviceId": ctx.params.deviceId });
        if (!playerInfo) {
            //创建玩家数据
            playerInfo = await broker.call('player.createPlayerInfo', { "deviceId": ctx.params.deviceId });
        }
        return playerInfo;
    }

    async upload(ctx, broker) {
        console.log(ctx.params);
        await broker.call('player.uploadPlayerData', { "playerId": ctx.params.playerId, "playerData": ctx.params.playerData });
        return {};
    }

    async updateLeaderboardData(ctx, broker) {
        await broker.call('leaderboard.updateData', { "playerId": ctx.params.playerId, "newData": ctx.params.leaderboardData });
        return {};
    }

    async getLeaderboardList(ctx, broker) {
        let list = await broker.call('leaderboard.getList', { "playerId": ctx.params.playerId, "newData": ctx.params.leaderboardData });
        return list;
    }
}

module.exports = Handler;