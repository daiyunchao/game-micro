class Handler {
    async login(ctx,broker){
       let playerInfo= await broker.call('player.getPlayerInfoByDeviceId',{"deviceId":"001"});
       if (!playerInfo) {
           //创建玩家数据
           playerInfo=  await broker.call('player.createPlayerInfo',{"deviceId":"001"});
       } 
       return playerInfo;
    }
}

module.exports = Handler;