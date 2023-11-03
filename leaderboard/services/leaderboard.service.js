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
    name: "leaderboard",
    started() {

    },
    actions: {
        async getList(ctx) {
            //获取排行榜列表
            return await Server.getLeaderboardList(ctx,broker);
        },
        async updateData(ctx) {
            //更新我在排行榜中的等级
          
            return await Server.updateLeaderboard(ctx,broker);
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

    console.log("leaderboard service started!");
});