### NodeJs版微服务

#### 一览
| 软件      | 作用 |
| ----------- | ----------- |
| Consul      | 服务发现,服务注册,配置中心       |
| NATS   | RPC        |
#### 软件安装
1. 安装`consul`
```shell
docker pull consul:1.6.1
docker run -d -p 8500:8500 --restart=always --name=consul consul:1.6.1 agent -server -bootstrap -ui -node=1 -client='0.0.0.0'
```
2. 安装`NATS`
``` sh
docker pull nats
docker run -p 4222:4222 --name nats-server -d nats
```


#### 待改进的点:
- 服务之间也需要API文档,不像`protobuff`有IDE文件,可改进