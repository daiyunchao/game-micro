### NodeJs版微服务

#### 一览

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
