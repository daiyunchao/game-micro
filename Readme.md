### NodeJs 使用(Moleculer)框架落定微服务
#### 环境
- Node v12.18.0
- Moleculer v0.14

#### 第三方软件
| 软件      | 作用 |
| ----------- | ----------- |
| Docker   | 虚拟机        |
| NATS(Docker)   | RPC        |
| Mongodb(Docker)   | 数据库        |

#### 软件安装
1. Docker
在`Mac`上安装比较简单,可以直接安装 `Docker Desktop`
```
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
> 一共有7类服务器,他们分别是 GateWay, Api, Player, Leaderboard, LeaderboardCache AdminGateway, AdminApi
他们的作用是

#### 包含功能
鉴权 (验证请求是否有效 JWT实现管理员token)
#### 实现API

#### 启动进程
- 安装`pm2` 执行命令 `npm i pm2 -g`
- 使用`pm2`启动和管理进程, 在项目跟目录执行命令`sh pm2_start_all.sh`

#### 开发中遇到的问题:
- API缓存问题,导致重启一个服务器不生效
- 启动多个服务器,实现负载均衡
- 统一的错误处理
#### 待改进的点:
- 服务之间也需要API文档,不像`protobuff`有IDE文件,可改进