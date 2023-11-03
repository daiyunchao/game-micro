const Error = require('../menu/Error');
class Handler {
    async login(ctx, broker) {
        const myLogger = broker.getLogger('adminApiLogger');
        let username = ctx.params.username;
        let password = ctx.params.password;
        let error = new Error()
        if (username === "tom" && password === "123456") {
            let data = { "username": username }
            error.setSuccess(data);
            return error;
        }
        error.code = 401;
        error.msg = "用户名或密码错误"
        myLogger.error(`adminRequest:${ctx.requestID} login Error`);
        return error;
    }
    async getPlayerInfoByDeviceIdOrPlayerId(ctx, broker) {
        let error = new Error()
        let playerInfo = await broker.call('player.getPlayerInfoByDeviceId', { "deviceId": ctx.params.id });
        if (!playerInfo || !playerInfo.playerId) {
            playerInfo = await broker.call('player.getPlayerInfoByPlayerId', { "playerId": ctx.params.id });
        }
        if (!playerInfo || !playerInfo.playerId) {
            error.code = 401;
            error.msg = "未查询到玩家,请确认id是否正确"
            return error;
        }
        error.setSuccess(playerInfo);
        return error;
    }

}

module.exports = Handler;