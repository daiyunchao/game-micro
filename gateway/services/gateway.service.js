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
    logger: {
        type: "File",
        options: {
            level: "info",
            folder: "../logs",
            filename: "moleculer-{date}.log",
            formatter: "json",
            objectPrinter: null,
            eol: "\n",
            interval: 1 * 1000
        }
    }
});
const myLogger = broker.getLogger('gatewayLogger');

// 创建网关服务
broker.createService({
    mixins: [ApiGatewayService],
    settings: {
        prot: 3000,
        routes: [
            {
                path: "/api",
                //拦截器:
                onBeforeCall(ctx, route, req, event) {
                    console.log("1111");
                    let module = req.$params.module;
                    let action = req.$params.action;
                    let error = Auth.requestAuth(req);
                    if (error.code !== 0) {
                        myLogger.error(`request: ${ctx.requestID} validate app_id error`);
                        throw new Error(error.msg);
                    }
                    let dataStr = Auth.decodeData(req);
                    req.body = { data: dataStr }
                    myLogger.info(`request: ${ctx.requestID} start , module: ${module}, action ${action},params: %j`, req.$params);
                },
                aliases: {
                    "POST /:module/:action": "api.request"
                },
                onAfterCall(ctx, route, req, res, data) {
                    let module = req.$params.module;
                    let action = req.$params.action;
                    myLogger.info(`request: ${ctx.requestID} finish , module: ${module}, action ${action},res: %j`, data);
                    return data;
                }
            },
        ],
        rateLimit: {
            window: 60 * 1000,
            limit: 30,
            headers: true,
            key: (req) => {
                return req.headers["x-forwarded-for"] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress;
            },
        }
    },
});

// 启动服务代理
broker.start().then(() => {
    console.log("Gateway service started!");
});