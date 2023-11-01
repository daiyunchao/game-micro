class Handler {
    async login(ctx,broker){
       let users= await broker.call('player.list',{});
        return users;
    }
}

module.exports = Handler;