---
layout: /src/layouts/MarkdownPostLayout.astro
title: 单例模式
author: YaCo
pubDate: 2023-06-26
tags: ["单例模式","GOF","创建型"]
languages: ["cpp"]
---

***只是实例化一次，只有一个对象***

## 饿汉式

```cpp
//饿汉式:先创建好，没有线程安全问题  懒汉式:懒得创建好，你要我就创建,不过要考虑线程安全问题
class Single
{
public:
    static Single *GetInstance() // 饿汉
    {
        static Single ins;
        return &ins;
    };
private:
    Single(){};
    Single(const Single &other){};
    Single &operator=(const Single &other){};
    ~Single(){};
}
```

## 懒汉式

```cpp
// 懒汉式的设计模式一般使用双检查锁和原子化的方式来解决线程安全的问题
// 下面是线程安全的懒汉式单例模式的实现
// 头文件
class Single
{
public:
    static Single *instance();
    ...
private:
    static mutex lock_;
    static atomic<Single *> inst_ptr_;
};
// 实现文件
mutex Single::lock_;
atomic<Single *> Single::inst_ptr_;
Single *Single::instance()
{
    Single *ptr = inst_ptr_.load(memory_order_acquire);
    if (ptr == nullptr)
    {
        lock_guard<mutex> guard{lock_};
        ptr = inst_ptr_.load(memory_order_relaxed);
        if (ptr == nullptr)
        {
            ptr = new Single();
            inst_ptr_.store(ptr, memory_order_release);
        }
    }
    return inst_ptr_;
};
```
