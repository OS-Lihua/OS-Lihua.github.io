---
layout: /src/layouts/MarkdownPostLayout.astro
title: C++开发知识梳理
author: YaCo
image:
    url: "https://image.yaco.email/cpp.png"
    alt: "cpp roadmap"
pubDate: 2023-07-28
tags: ["知识梳理"]
languages: ["markdown", "cpp"]
---

## C++

- ### 对象生命周期, 垃圾回收
- ### 标准库
- ### 错误与异常处理
- ### 日志分析, 断点调试
- ### 面向对象的理解 
- ### 设计模式
- ### gdb 的使用


## 数据结构与算法

- ###  链表, 队列, 栈
- ### 二叉树, 红黑树
- ### b 数, b+ 树
- ### dijkstra算法, 最小生成树
- ### 递归
- ### 排序: 希尔, 归并,  快排,  堆排序
- ### 贪心算法, 动态规划
- ### 跳表, 散列表, hash, 布隆过滤器

## 数据库

### mysql
- ### mysql安装与配置
- ### sql 建表, 索引, 存储过程
- ### 存储引擎 myisam/innode/OceanBase
- ### 持久化 mysql
- ### 数据库连接池
- ### 异步数据库请求
- ### 数据库集群,  分库分表, 读写分离

### redis
- ### redis 编译安全, 配置
- ### redis 命令使用
- ### redis 连接池/异步redis做法
- ### redis 集群, 数据备份
- ### 缓存雪崩,  缓存击穿

## 网络编程
- ### ping, telnet, ifconfig
- ### 网络体系模型
- ### tcp 原理, 三次握手, 四次挥手, 滑动窗口, 拥塞窗口, 状态机
- ### udp 原理
- ### http/https/http2.0/http3.0
- ### Session, Cookie, appication
- ### 网络安全, 加密, 数字安全
- ### wireshark,  tcpdump
- ### iperf

## 操作系统
- ### 文件操作, 系统操作
- ### 程序编译, 运行
- ### shell/vim 使用
- ### Linux 系统性能监控参数 ps/netstat/df
- ### 进程管理
- ### 用户态/内核态
- ### 内存管理, 内存池, 内存泄漏
- ### 磁盘文件系统, 虚拟文件系统 
- ### 磁盘 IO

## 网络原理
- ### socket
- ### 网络IO模型, 阻塞/非阻塞, 同步/异步
- ### IO多路复用 select/poll/epoll
- ### timewait/close_wait
- ### C10K/C1000K/C10M
- ### 网络框架 libevent/libev , 协程 neyco, libco

## 分布式
- ### rpc, grpc, tars, brpc, srpc
- ### 简单 rpc 协议设计/框架搭建 
- ### 分布式锁 (多台机器共用一把锁, 放在一个地方)
- ### 协议传输的序列化, 反序列化  protobuf, xml, json, yml
- ### 服务注册, 服务发现
- ### 容灾, 降级熔断, 流控制
- ### 高并发, 高可以

## 云原生
- ### 腾讯云/阿里云
- ### docker使用, 编排, 网络
- ### k8s 管理

## 软技能
- ### 沟通能力
- ### 组织能力
- ### 协调能力
- ### 需求分析