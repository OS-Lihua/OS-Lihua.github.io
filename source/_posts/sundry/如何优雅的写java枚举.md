title: Java枚举
date: 2023/08/217 23:47:00
tags: 
    - Java
    - 枚举
categories: Java

---
# 如何写一个优雅的 java 枚举

java 枚举 不能像 C++ 的枚举 可以和 "int" ，"char" 等基本类型直接转换 

为了 更加方便地使用java枚举，这里写了一个通用案例，可以作为模板

## 以水果为例

```java
enum Fruits
{
    FRUIT_APPLE(1),         // 苹果
    FRUIT_BANANA(2),        // 香蕉
    FRUIT_MANGO(3),         // 芒果
    FRUIT_ORANGE(4),        // 橘子
    FRUIT_POMELO(5);        // 柚子
    private final int value;
    Fruits(int value){
        this.value = value;
    };
    
    public int getValue(){
        return this.value;
    }

    public static Fruits valueOf(int value){
        switch (value){
            case 1: return FRUIT_APPLE;
            case 2: return FRUIT_BANANA;
            case 3: return FRUIT_MANGO;
            case 4: return FRUIT_ORANGE;
            case 5: return FRUIT_POMELO;
            default: return null;
        }
    }
}
```

