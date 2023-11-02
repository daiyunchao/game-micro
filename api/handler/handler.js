class Handler {
    async login(ctx,broker){
       let playerInfo= await broker.call('player.getPlayerInfoByDeviceId',{"deviceId":ctx.params.deviceId});
       if (!playerInfo) {
           //创建玩家数据
           playerInfo=  await broker.call('player.createPlayerInfo',{"deviceId":ctx.params.deviceId});
       } 
       return playerInfo;
    }

    async upload(ctx,broker){
        console.log(ctx.params);
        await broker.call('player.uploadPlayerData',{"playerId":ctx.params.playerId,"playerData":ctx.params.playerData});
        return {};
    }
}

module.exports = Handler;