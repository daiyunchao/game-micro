const { ServiceBroker } = require("moleculer");
const ApiGatewayService = require("moleculer-web");
const NATS = require("nats");
//业务:
const Auth = require('../handler/auth');

// 创建NATS客户端实例
const nats = NATS.connect();

// 创建服务代理
const broker = new ServiceBroker({
    nodeID: process.env.NODE_ID,
    transporter: {
        type: "NATS",
        client: nats,
    },
});

// 创建网关服务
broker.createService({
    mixins: [ApiGatewayService],
    settings: {
        routes: [
            {
                path: "/api",
                //拦截器:
                onBeforeCall(ctx, route, req, event) {
                    console.log("1111");
                    let error = Auth.requestAuth(req);
                    if (error.code !== 0) {
                        throw new Error(error.msg);
                    }
                    let dataStr = Auth.decodeData(req);
                    req.body = { data: dataStr }
                },
                aliases: {
                    "POST /:module/:action": "api.request"
                },
                onAfterCall(ctx, route, req, res, data) {
                    // Auth.encodeData(req,data);
                    return data;
                }
            },
        ],
    },
});

// 启动服务代理
broker.start().then(() => {
    console.log("Gateway service started!");
});