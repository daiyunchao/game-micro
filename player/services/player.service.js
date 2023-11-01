const { ServiceBroker } = require("moleculer");
const NATS = require("nats");

const Handler = require('../handler/handler');
const Server = require('../handler/server');
const server = new Server();
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
            return await server.getPlayerInfoByDeviceId(ctx.params.deviceId)
        }
    }
});

// 启动服务代理
broker.start().then(() => {
    console.log("User service started!");
});