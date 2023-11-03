const Error = require('../menu/Error');
class Handler {
    async login(ctx, broker) {
        let error = new Error();
        try {
            let playerInfo = await broker.call('player.getPlayerInfoByDeviceId', { "deviceId": ctx.params.deviceId });
            if (!playerInfo) {
                //创建玩家数据
                playerInfo = await broker.call('player.createPlayerInfo', { "deviceId": ctx.params.deviceId });
            }
            error.setSuccess(playerInfo);
        } catch (err) {
            error.setServerError();
            //TODO 日志
        }
        return error;
    }

    async upload(ctx, broker) {
        let error = new Error();
        try {
            await broker.call('player.uploadPlayerData', { "playerId": ctx.params.playerId, "playerData": ctx.params.playerData });
            error.setSuccess({});
        } catch (err) {
            error.setServerError();
            //TODO 日志
        }
        return error;
    }

    async updateLeaderboardData(ctx, broker) {
        let error = new Error();
        try {
            await broker.call('leaderboard.updateData', { "playerId": ctx.params.playerId, "newData": ctx.params.leaderboardData });
            error.setSuccess({});
        } catch (err) {
            error.setServerError();
            //TODO 日志
        }
        return error;
    }

    async getLeaderboardList(ctx, broker) {
        let error = new Error();
        try {
            let list = await broker.call('leaderboard.getList', { "playerId": ctx.params.playerId, "newData": ctx.params.leaderboardData });
            error.setSuccess({ list });
        } catch (err) {
            error.setServerError();
            //TODO 日志
        }
        return error;
    }
}

module.exports = Handler;