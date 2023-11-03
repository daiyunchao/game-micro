class Handler {
    async login(ctx, broker) {
        let username = ctx.params.username;
        let password = ctx.params.password;
        if (username === "tom" && password === "123456") {
            return { "username": username }
        }
        return {}
    }
    async getPlayerInfoByDeviceIdOrPlayerId(ctx, broker) {
        console.log(ctx.params);
        let playerInfo = await broker.call('player.getPlayerInfoByDeviceId', { "deviceId": ctx.params.id });
        if (!playerInfo || !playerInfo.playerId) {
            playerInfo = await broker.call('player.getPlayerInfoByPlayerId', { "playerId": ctx.params.id });
        }
        if (playerInfo || !playerInfo.playerId) {
            return {}
        }
        return playerInfo;
    }

}

module.exports = Handler;