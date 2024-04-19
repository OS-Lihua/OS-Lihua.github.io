title: After C++ 11
date: 2023/06/19 14:25:00
tags: 
    - C++ 11

categories: Cpp

---
### emplace
1. emplace_back -- push_back
2. emplace_front -- push_front
3. emplace -- insert
	- 当调用后者时，先将元素类型的对象传递给后者，然后再元素的对象被拷贝到容器中；
	而当我们使用emplace时，我直接将传递元素类型的ctor的参数，emplace使用这些参数在容器管理的内存空间中直接构造元素。
	- 当调用insert时，我们将元素类型的对象传递给insert，元素的对象被拷贝到容器中，而当我们使用emplace时，我们将参数传递元素类型的构造函数，emplace使用这些参数在容器管理的内存空间中直接构造元素。

### 编码
- 从 g++ 10 版本开始，支持 中文编码，可以在 C++ 中 使用中文定义标识符，但是不建议使用

### // TODO 更多正在学习

