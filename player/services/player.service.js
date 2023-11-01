const { ServiceBroker } = require("moleculer");
const NATS = require("nats");

// 创建NATS客户端实例
const nats = NATS.connect();

// 创建服务代理
const broker = new ServiceBroker({
    nodeID:"player",
    transporter: "NATS",
    transporterOptions: {
        nats: nats,
    },
});

// 创建用户服务
broker.createService({
    name: "player",
    actions: {
        list(ctx) {
            // 返回所有用户的逻辑
            const users = [
                { id: 1, name: "Joh11n Doe", email: "john.doe@example.com" },
                { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
                { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com" },
            ];

            // 返回用户数据
            return users;
        },

        get(ctx) {
            const userId = ctx.params.id;
            // 根据用户ID获取用户信息的逻辑
            // ...
            
        },

        create(ctx) {
            const newUser = ctx.params.user;
            // 创建新用户的逻辑
            // 发布用户创建消息到NATS
            nats.publish("user.created", newUser);
            // ...
        },

        update(ctx) {
            const userId = ctx.params.id;
            const updatedUserData = ctx.params.user;
            // 更新用户信息的逻辑
            // 发布用户更新消息到NATS
            nats.publish("user.updated", { id: userId, ...updatedUserData });
            // ...
        },

        remove(ctx) {
            const userId = ctx.params.id;
            // 删除用户的逻辑
            // 发布用户删除消息到NATS
            nats.publish("user.removed", { id: userId });
            // ...
        },
    },
});

// 启动服务代理
broker.start().then(() => {
    console.log("User service started!");
});