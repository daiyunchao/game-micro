const { ServiceBroker } = require("moleculer");
const NATS = require("nats");

const Init = require('../handler/init');
const Handler = require('../handler/handler');
const Server = require('../handler/server');
// 创建NATS客户端实例
const nats = NATS.connect();

// 创建服务代理
const broker = new ServiceBroker({
    nodeID: "player",
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
            return await Server.getPlayerInfoByDeviceId(ctx.params.deviceId)
        },
        async createPlayerInfo(ctx){
            return await Server.createPlayerInfo(ctx.params.deviceId)
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