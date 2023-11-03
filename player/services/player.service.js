const { ServiceBroker } = require("moleculer");
const NATS = require("nats");

const Init = require('../handler/init');
const Handler = require('../handler/handler');
const Server = require('../handler/server');
// 创建NATS客户端实例
const nats = NATS.connect();

// 创建服务代理
const broker = new ServiceBroker({
    nodeID: process.env.NODE_ID,
    transporter: "NATS",
    transporterOptions: {
        nats: nats,
    },
});

// 创建用户服务
broker.createService({
    name: "player",
    started() {

    },
    actions: {
        async getPlayerInfoByDeviceId(ctx) {
            return await Server.getPlayerInfoByDeviceId(ctx.params.deviceId);
        },
        async getPlayerInfoByPlayerId(ctx) {
            return await Server.getPlayerInfoByPlayerId(ctx.params.playerId);
        },
        async createPlayerInfo(ctx) {
            return await Server.createPlayerInfo(ctx.params.deviceId);
        },
        async uploadPlayerData(ctx) {
            return await Server.uploadPlayerData(ctx.params.playerId, ctx.params.playerData);
        }
    }
});

// 启动服务代理
broker.start().then(async () => {
    try {
        await Init.connectMongo();
    } catch (error) {
        console.error("连接数据失败,进程退出");
        process.exit();
    }

    console.log("User service started!");
});