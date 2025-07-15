---
layout: /src/layouts/MarkdownPostLayout.astro
title: 智能合约设计
author: YaCo
image:
    url: "/images/posts/smart-contract-design.png"
    alt: "smart-contract-design"
pubDate: 2024-04-26
tags: ["智能合约","DeFi","security"]
languages: ["solidity"]
---

# 智能合约设计原理



- 更少的代码 -- 严格管理存储 Storage 变量
- 严格的 For 循环
- 对输入做边界处理
- 处理所有可能出现的情况
  - Stablecoin depeg
  - Insolvent Liquidation
- 并行数据结构
  - Consider if necessary 



## 外部调用




## DDOS 攻击

- **For 循环**：对 `for` 循环要格外小心，可以问自己以下问题：
  - 可迭代对象的规模是否有上限？
  - 用户能否随意向列表中添加元素？
  - 用户这样做的成本有多高？

- **外部调用**：包括从转移以太币到调用第三方合约的各种情况。需要评估这些外部调用可能失败的方式，从而导致交易无法完成。

简单来说，DoS 攻击的目标是阻止协议功能的正常运行。它们的来源可能多种多样，但最终结果都是交易无法执行。

## 重入攻击

- 某个状态/变量在代码执行后，但该状态/变量没有立即更新；
- 这个过时的状态，给了攻击者可乘之机
- 如何防止重入攻击
  - 遵循 CEI
    - Checks -> Effects -> Interactions
    - 检查外部输入 -> 更新状态 -> 进行外部调用或交互

### 典型例子

- 被外部攻击递归

```solidity
// SPDX-Licence-Identifier: MIT
pragma solidity ^0.8.20;

contract Vault{
	error NativeTokenTransferError();
	
	mapping(address => uint256) balances;
	function deposit() payable external{
		balances[msg.sender] = msg.value;
	}
	
	function withdraw external{
	
		(bool sent, )= payable(  .sender).call{value: balance[msg.sender]}("");
		if(!sent) revert NativeTokenTransferError();
		
		delete balances[msg.sender];
	}
}
```



### 跨函数重入攻击

### 跨合约重入攻击

### 只读重入攻击



---

## DEX 安全

1. 价格操纵
2.  漏洞原理
3. 攻击关键步骤



## 跨链桥安全

```mermaid
---
config:
  layout: elk
  look: handDrawn
---
flowchart LR
    S["源链合约"] --> V["验证者"]
    V --> T["目标链合约"]
```

1. 源链必须可以 锁定/销毁 用户资产
2. 目标链必须执行转移资产
3. 验证器必须正确的监听、解析、传递消息
4. 验证器私钥必须安全

## NFT 安全




## 其他技巧

### 小技巧：在进行 摘要时，为了防止歧义，更建议使用 `abi.encode`，而不使用 `abi.encodePacked`

**区别**
#### `abi.encode`

- 使用标准的ABI编码规则。

- 会对参数进行填充（padding）以使其成为32字节的倍数。

- 编码结果包括长度信息，并且每个参数都是32字节对齐的。

- 通常用于函数调用参数的编码，或者需要与其他合约交互时使用。

- 编码的结果是确定性的，并且可以安全地用于哈希，但由于填充的存在，可能会产生较长的字节序列。

#### `abi.encodePacked`

- 使用紧凑的编码方式（不进行填充）。
- 直接将参数紧密地打包在一起，没有填充，也没有长度信息（对于动态类型，如string、bytes，会直接将其字节序列打包，而不记录长度）。
- 编码结果更短，节省Gas。
- 但是，由于没有填充和长度信息，当参数包含动态类型时，可能会有歧义（比如两个string连在一起，无法知道第一个字符串在哪里结束，第二个从哪里开始）。
- 通常用于生成签名、哈希（如keccak256）等场景，因为可以节省空间，但需要确保不会出现歧义。





