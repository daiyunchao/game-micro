class Handler {
    async login(ctx,broker){
       let users= await broker.call('player.getPlayerInfoByDeviceId',{"deviceId":"001"});
        return users;
    }
}

module.exports = Handler;