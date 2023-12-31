const { ServiceBroker } = require("moleculer");
const ApiGatewayService = require("moleculer-web");
const jwt = require("jsonwebtoken");
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
const jwtKey = "game_micro_jwt";

const myLogger = broker.getLogger('adminGatewayLogger');

// 创建网关服务
broker.createService({
    mixins: [ApiGatewayService],
    settings: {
        port: 3001,
        routes: [
            {
                path: "/admin_api",
                //拦截器:
                async onBeforeCall(ctx, route, req, event) {
                    let error = Auth.requestAuth(req);
                    if (error.code !== 0) {
                        myLogger.error(`adminRequest: ${ctx.requestID} validate app_id error`);
                        throw new Error(error.msg);
                    }
                    let module = req.$params.module;
                    let action = req.$params.action;
                    if (action !== "login") {
                        //非login,验证token
                        error = await Auth.requestToken(req, jwtKey);
                        if (error.code !== 0) {
                            myLogger.error(`adminRequest: ${ctx.requestID} validate token error`);
                            throw new Error(error.msg);
                        }
                    }
                    myLogger.info(`adminRequest: ${ctx.requestID} start , module: ${module}, action ${action},params: %j`, req.$params);
                },
                aliases: {
                    "POST /:module/:action": "adminApi.request"
                },
                onAfterCall(ctx, route, req, res, data) {
                    let module = req.$params.module;
                    let action = req.$params.action;
                    if (module === "admin" && action === "login") {
                        let username = ctx.params.username;
                        const user = {
                            username: username
                        };
                        if (data && data.code === 0) {
                            const token = jwt.sign(user, jwtKey, {
                                expiresIn: "1h"
                            });
                            data.token = token;
                        }

                    }
                    myLogger.info(`adminRequest: ${ctx.requestID} finish , module: ${module}, action ${action},res: %j`, data);
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