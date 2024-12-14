---
title: Doxygen 用法
date: '2023/06/27 16:15:00'
tags:
  - UML
  - 自动生成
categories:
  - Tool
cover: 'https://image.yaco.email/DargonEg.png'
abbrlink: 1844275311
---
# 使用 Doxygen 从源代码生成 UML 类图

Doxygen是可以根据代码文档自动生成UML，保存在html内

## 常用配置

```bash
EXTRACT_ALL            = YES
HAVE_DOT               = YES
UML_LOOK               = YES
RECURSIVE              = YES 
CALL_GRAPH             = YES
CALLER_GRAPH           = YES
REFERENCED_BY_RELATION = YES
REFERENCES_RELATION    = YES
```

## 下载安装
```bash
sudo apt install graphviz    # 用于生成代码关系图 
sudo apt install doxygen
```

## Sample
```bash
cd CODE_DIR
doxygen -g Doxygen.config  # 生成配置文件 
vim Doxygen.config          # 修改配置文件
```

### 修改配置文件

```bash
EXTRACT_ALL            = YES
HAVE_DOT               = YES
UML_LOOK               = YES
RECURSIVE              = YES 
```

- 注释：使用vim进行内容查找
1. 在vi 模式下，直接输入“/” 斜杠；再输入要查找的字符串，然后回车即可；
2. 如果查找下一个，按“n”即可

### 运行
```bash
doxygen Doxygen.config
```

### 在工程目录下可以看到 生成的 html 和 latex 目录，使用浏览器打开 html 目录中的 index.html 文件,看到类继承图和协助图

### 生成函数调用关系图

```bash
CALL_GRAPH             = YES
REFERENCED_BY_RELATION = YES
REFERENCES_RELATION    = YES
```



## 其他配置参考

```bash
# 项目名称，将作为于所生成的程序文档首页标题
PROJECT_NAME           = "Test"
 
# 文档版本号，可对应于项目版本号，譬如 svn、cvs 所生成的项目版本号
PROJECT_NUMBER       = "1.0.0"
# 程序文档输出目录
OUTPUT_DIRECTORY    =  out/
# 程序文档语言环境
OUTPUT_LANGUAGE    = Chinese
# 如果是制作 C 程序文档，该选项必须设为 YES，否则默认生成 C++ 文档格式
OPTIMIZE_OUTPUT_FOR_C  = YES
# 对于使用 typedef 定义的结构体、枚举、联合等数据类型，只按照 typedef 定义的类型名进行文档化
TYPEDEF_HIDES_STRUCT   = YES
# 在 C++ 程序文档中，该值可以设置为 NO，而在 C 程序文档中，由于 C 语言没有所谓的域/名字空间这样的概念，所以此处设置为 YES
HIDE_SCOPE_NAMES        = YES
# 让 doxygen 静悄悄地为你生成文档，只有出现警告或错误时，才在终端输出提示信息
QUIET   = YES
# 只对头文件中的文档化信息生成程序文档
FILE_PATTERNS          = *.h
# 递归遍历当前目录的子目录，寻找被文档化的程序源文件
RECURSIVE              = YES
# 示例程序目录
EXAMPLE_PATH           = example/
# 示例程序的头文档 (.h 文件) 与实现文档 (.c 文件) 都作为程序文档化对象
EXAMPLE_PATTERNS       = *.c *.h
# 递归遍历示例程序目录的子目录，寻找被文档化的程序源文件
EXAMPLE_RECURSIVE      = YES
# 允许程序文档中显示本文档化的函数相互调用关系
REFERENCED_BY_RELATION = YES
REFERENCES_RELATION    = YES
REFERENCES_LINK_SOURCE = YES
# 生成 latex 格式的程序文档
GENERATE_LATEX         = YES
# 在程序文档中允许以图例形式显示函数调用关系，前提是你已经安装了 graphviz 软件包
HAVE_DOT               = YES
CALL_GRAPH             = YES
CALLER_GRAPH           = YES
# 让doxygen从配置文件所在的文件夹开始，递归地搜索所有的子目录及源文件
RECURSIVE = YES  
#在最后生成的文档中，把所有的源代码包含在其中
SOURCE_BROWSER = YES
# 在HTML文档中，添加一个侧边栏，并以树状结构显示包、类、接口等的关系
GENERATE_TREEVIEW ＝ ALL
```

