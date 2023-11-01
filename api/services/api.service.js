const { ServiceBroker } = require("moleculer");
const NATS = require("nats");

const Init = require('../handler/init');
const Routes = require('../handler/routes');
// 创建NATS客户端实例
const nats = NATS.connect();

// 创建服务代理
const broker = new ServiceBroker({
    nodeID: "api",
    transporter: "NATS",
    transporterOptions: {
        nats: nats,
    },
});

broker.createService({
    name: "api",
    actions: {
        request(ctx) {
            console.log(ctx.params);
            return Routes.callRoute(`${ctx.params.module}.${ctx.params.action}`,ctx,broker)
        }
    }
});
// 启动服务代理
broker.start().then(() => {
    new Init().registerHandler();
    console.log("Api service started!");
});