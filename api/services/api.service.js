const { ServiceBroker } = require("moleculer");
const NATS = require("nats");

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
    actions:{
        request(ctx){
            console.log(ctx.params);
             // 返回所有用户的逻辑
             const users = [
                { id: 1, name: "John Doe", email: "john.doe@example.com" },
                { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
                { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com" },
            ];

            // 返回用户数据
            return users;
        }
    },
    events: {
        "api.request": async (payload, sender) => {
            console.log(payload);
            const result = [
                {
                    "id": 1,
                    "name": "John Doe",
                    "email": "john.doe@example.com"
                },
                {
                    "id": 2,
                    "name": "Jane Smith",
                    "email": "jane.smith@example.com"
                },
                {
                    "id": 3,
                    "name": "Bob Johnson",
                    "email": "bob.johnson@example.com"
                }
            ]
            // 返回响应到网关
            await broker.emit("gateway.response", {
                result,
                targetServiceRequestId: this.context.meta.requestID,
            }, { nodeID: "gateway" });
        }
    }
});
// 启动服务代理
broker.start().then(() => {
    console.log("Api service started!");
});