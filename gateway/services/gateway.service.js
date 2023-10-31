const { ServiceBroker } = require("moleculer");
const ApiGatewayService = require("moleculer-web");
const NATS = require("nats");

// 创建NATS客户端实例
const nats = NATS.connect();

// 创建服务代理
const broker = new ServiceBroker({
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
                path: "/users",
                //拦截器:
                onBeforeCall(ctx,route,req,event){
                    console.log("in onBeforeCall");
                    throw new Error("未经授权的访问");
                },
                aliases: {
                    "GET /": "users.list",
                    "GET /:id": "users.get",
                    "POST /": "users.create",
                    "PUT /:id": "users.update",
                    "DELETE /:id": "users.remove",
                },
            },
        ],
    },
});

// 启动服务代理
broker.start().then(() => {
    console.log("Gateway service started!");
});