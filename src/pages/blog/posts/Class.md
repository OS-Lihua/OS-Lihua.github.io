---
layout: /src/layouts/MarkdownPostLayout.astro
title: 类
author: YaCo
image:
    url: "https://image.yaco.email/cpp_op.png"
    alt: "cpp class"
pubDate: 2023-07-01
tags: ["基础知识"]
languages: ["markdown", "cpp"]
---
一般来说，类的声明形式：

```cpp
// template <typename T>
Class A
{
public:
    explicit A() = default;                    // 构造函数
    virtual ~A() = default;                   // 析构函数
    inline T getXXX();
    inline bool setXXX();
private:
	A(const A&) = default;            // 复制构造函数
	A& operator=(const A&) = default; // 复制赋值运算符
	A(A&&) = default;                 // 移动构造函数
	A& operator=(A&&) = default;      // 移动赋值运算符
private:
    ...
};
```
## 注意
1. C++11: 会生成默认构造函数、析构函数、复制构造函数、复制赋值运算符、移动构造函数和移动赋值运算符


2. 在google风格的代码中，为了保证程序的异常安全，我们一般只是声明实现拷贝构造、移动构造，重载赋值运算符等，而不会行为，并且通常放在私有域中。
3. set、get 函数要设置为 inline
4. 析构函数通常声明为 virtual
5. 在C++中，移动构造 > 拷贝构造 > 自定义构造 > 默认构造
6. 只要指定了一个要求传参的构造函数, 就会阻止编译器生成默认构造函数和复制构造函数
7. 两种复制操作是彼此独立的, 即显式声明了其中一个, 不会阻止编译器默认生成另一个
8. 两种移动操作并不彼此独立, 即显式声明了其中一个, 就会阻止编译器默认生成另一个
9. 一旦显式声明了复制操作, 就会阻止编译器默认生成移动操作
10. 一旦显式声明了移动操作, 就会阻止编译器默认生成复制操作
11. 一旦显式申明了析构函数, 就会阻止编译器默认生成移动操作
12. 可以根据需求使用 = delete / = default 



## 大三律 (Rule of Three)
如果你声明了复制构造函数, 复制赋值运算符, 或析构函数的任何一个, 你就得同时声明所有这三个。这个思想源于: 如果有改写复制操作的需求, 往往意味着该类需要执行某种资源管理, 而这就意味着:

1. 在一种复制操作中进行的任何资源管理, 也极有可能在另一种复制操作中也需要进行
2. 该类的析构函数也会参与到该资源的管理中(通常是释放)