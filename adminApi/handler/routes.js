class Routes {
    constructor() {
        this.routes = {}
    }

    //注册路由:
    registerRoute(routeName, routeHandler) {
        this.routes[routeName] = routeHandler
    }
    //调用处理函数
    callRoute(routeName,ctx,broker) {
        console.log(this.routes,routeName);
        return this.routes[routeName](ctx,broker)
    }
}

module.exports = new Routes;