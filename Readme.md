### NodeJs 使用(Moleculer)框架落地微服务

#### 开发环境

- Node v12.18.0
- Moleculer v0.14

#### 第三方软件

| 软件            | 作用   |
| --------------- | ------ |
| Docker          | 虚拟机 |
| NATS(Docker)    | RPC    |
| Mongodb(Docker) | 数据库 |

#### 软件安装

1. Docker
   在`Mac`上安装比较简单,可以直接安装 `Docker Desktop`


2. 安装`NATS`

``` sh
docker pull nats
docker run -p 4222:4222 --name nats-server -d nats
```

3. 安装`mongodb`

```sh
docker pull mongo:6.0
docker run -itd --name mongo -p 27017:27017 mongo:6.0
```

#### 服务器之间的关系

一共有7类服务器,他们分别是 `GateWay, Api , Player, Leaderboard, LeaderboardCache AdminGateway, AdminApi`
他们的作用是

| 服务器类型       | 作用                                                         | 数量 | 说明                                                         |
| ---------------- | ------------------------------------------------------------ | ---- | ------------------------------------------------------------ |
| Gateway          | 鉴权,基本验证,限流                                           | N    | 多个服务器都监听相同端口,负载均衡请求                        |
| Api              | 聚合请求,分发请求                                            | N    | Gateway的转发请求后达到Api服后,Api服务器进行业务聚合,转发到不同的业务服务器进行处理,再聚合结果返回给Gateway |
| Player           | 玩家,处理玩家相关的业务                                      | N    | 业务服                                                       |
| Leaderboard      | 排行榜,处理排行榜相关业务                                    | N    | 业务服                                                       |
| LeaderboardCache | 排行榜缓存服,缓存排行榜数据,对Leaderboard负责,对其他服务器来说是透明的 | 1    | 缓存服                                                       |
| AdminGateway     | 管理后台访问的Gateway,作用同Gateway,但为了不影响正常的业务,所以做了服务器的区分 | N    | 接收客户端请求                                               |
| AdminApi         | 同Api服,但为了不影响正常的业务,所以做了服务器的区分          | N    | 同Api服务                                                    |

<img width="914" alt="image" src="https://github.com/daiyunchao/game-micro/assets/8706280/2b1fe2ea-dc4d-41e4-9bd2-f40730aa4960">


#### 实现API

| Api名称                      | 描述                     | 说明                                                         |
| ---------------------------- | ------------------------ | ------------------------------------------------------------ |
| api/player/login             | 玩家登录                 | 如果玩家账号已经存在则返回玩家数据,如果玩家信息不存在则创建玩家数据再返回 |
| api/player/upload            | 玩家上传数据到服务器     | 玩家上传最新的数据到服务器,服务器做存档                      |
| api/leaderboard/list         | 获取排行榜列表           |                                                              |
| api/leaderboard/join         | 加入排行榜               |                                                              |
| api/leaderboard/upload       | 更新玩家在排行榜中的数据 |                                                              |
| admin_api/admin/login        | 管理员登录               |                                                              |
| admin_api/admin/query_player | 管理员查询玩家信息       |                                                              |

#### 微服务"关键字"实现方案

| 模块名             | 方案             | 说明                                                         |
| ------------------ | ---------------- | ------------------------------------------------------------ |
| Gateway负载均衡    | 监听相同的端口   | 由操作系统分配,当然这里也可以通过nginx做负载均衡,但缺少了有扩展的灵活性 |
| 业务服务器负载均衡 | Nats + Moleculer | 当服务器启动后会向nats发送消息,nats也会向所有的另外服务器发送有新服务器加入的通知,需要调用的时候通过Moleculer来做负载均衡算法(目前采用的是轮询) |
| 服务注册           | Nats             | 服务启动时会向nats服务器发送消息                             |
| 服务发现           | Nats             | 服务启动时会向nats服务器发送消息,nats也会通知其他服务器有新的服务器加入 |
| RPC                | Nats             | 同样使用Nats来进行服务器之间的通讯                           |
| 限流               | Moleculer        | 在框架中可设置流量的限额                                     |
| 日志               | Moleculer        | Moleculer框架中集成了很多日志收集方式,目前使用File方式,将各个微服务的日志统一存放到按照日期分割的日志文件中 |
| 链路追踪           | Moleculer        | Moleculer框架为每一个请求添加了requestID,我们在输出日志的时候可以把这个参数打印出来,方便追踪日志. 另外Moleculer框架在每次服务器启动,调用另外服务器的时候都会添加日志,也能实现完整的梳理出调用栈 |
| 进程管理方式       | PM2              | 使用PM2,未使用Docker,原因在于我们目前并没有涉及到分布式的需求,使用PM2管理进程能很直观的看出进程的状态(是否重启,占用内存,CPU使用率) |

#### 启动进程

- 安装`pm2` 执行命令 `npm i pm2 -g`
- 使用`pm2`启动和管理进程, 在项目跟目录执行命令`sh pm2_start_all.sh`



#### 待改进的点:

- 服务之间也需要API文档,不像`GRPC`有IDE文件,可改进

#### 参考:

Molecular文档: https://moleculer.services/docs/0.14

Nats介绍: https://zhuanlan.zhihu.com/p/40871363

