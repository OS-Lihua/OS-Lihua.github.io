---
layout: /src/layouts/MarkdownPostLayout.astro
title: Hyperlane 极简教程 | Warp Route
author: YaCo
image:
    url: "https://image.yaco.email/hyperlane-cook-book.png"
    alt: "Hyperlane 极简教程"
tags: ["博客页面"]
pubDate: 2025-06-05
languages: ["markdown", "md"]
---

## 什么是 Hyperlane

Hyperlane 被描述为跨链基础设施, 它提供命令行工具用于将 Hyperlane 合约部署到新链以及与已部署合约和注册表交互, 它是构建跨链代币桥 (如 Warp Routes) 的基础。今天我们就来使用hyperlane 推荐 warp 工具 构建自己专属的 warp route。

## Hyperlane 跨链最佳实践

### 部署 Hyperlane 环境

_在国内搞开发的同学可能都知道，最复杂的不是coding环节，而是环境部署以及网络代理，来吧，跟着我一起 cook吧_

### 领水(买菜)

#### monad

- https://faucet.monad.xyz/ (免费)

- https://faucet.openbuild.xyz/monad (免费)

#### sepolia

- https://t.me/sevenflux_faucet_bot (免费)

- https://cloud.google.com/application/web3/faucet/ethereum/sepolia

- https://faucets.chain.link/sepolia

- https://docs.metamask.io/developer-tools/faucet

**如果以上方法都不行，请关注下方公众号，加入 hyperlane 中文社区的微信群，或者直接微信添加好友搜 hyperlane 添加小助手**

![hyperlane_wechat_rpc](https://image.yaco.email/hyperlane_wechat_rpc.png)

### 环境搭建(准备好锅碗)

**Linux/Windows/Mac/WSL 均可**

Hyperlane  提供了完备兼容的环境供开发者使用(如果使用体验不佳请及时找到我们)，保证你只要有一台电脑，都可以执行。

_如果你担心在本地部署不安全而且没有云服务器，笔者推荐：推荐使用 https://labs.play-with-docker.com/ 免费的 在线  linux docker 参与实践，保证你在任何条件下都可以参与_

#### Node 下载 :arrow_double_down:

https://nodejs.org/zh-cn/download

#### Hyperlane CLI 环境部署 :rocket:

****

**安装** :shell:

```shell
npm install -g @hyperlane-xyz/cli
```

**检查** :heavy_check_mark:

```shell
hyperlane --version
```
```shell
# 实际操作
npm install -g @hyperlane-xyz/cli
added 1 package in 2s
hyperlane --version
Hyperlane CLI
13.2.1
```
**恭喜你，环境已经部署好了，我们现在已经完成一半了，下面大概10条命令就结束了**。

### 开始跨链

**看看案例** :point_right: https://explorer.hyperlane.xyz/

我现在在看的是`sepolia` 和 `monadtestnet`

![hyperlane.testmonad2sepolia](https://image.yaco.email/hyperlane.testmonad2sepolia.png)

可以看到有许多已经跨链成功的案例，好吧，我们也行动吧

### 明确目标

我们的目标是将 Monad 的原生代币跨链到 Sepolia，MON 在 monadtestnet 上是原生代币(native)，而在 sepolia 上并不存在，那么怎么做呢，我们授权给 hyperlane 直接发一个(synthetic)

这是我做的最终结果，打开看看吧

[Hyperlane Bridge MonadTestNet Sepolia](https://hyperlane.superbridge.app/?hyperlaneWarpRoutes=e3aade14-49c5-4e7f-b8bc-6980100cd341) : https://hyperlane.superbridge.app/?hyperlaneWarpRoutes=e3aade14-49c5-4e7f-b8bc-6980100cd341

![superbridge.mon.monadtest2sepolia](https://image.yaco.email/superbridge.mon.monadtest2sepolia.png)

#### 初始化(洗菜)

`hyperlane warp init`

![warp.init.mon.testmonad2sepolia](https://image.yaco.email/warp.init.mon.testmonad2sepolia.png)

选择测试网

1. monadtestnet
2. sepolia

根据提示输入地址(Enter the desired owner address): 输入<你自己的地址>

确认并选择公链代理地址 :arrow_down:

https://github.com/hyperlane-xyz/hyperlane-registry/blob/main/chains/

选择 对应链，复制并输入

![proxyAdmin.monadtestnet.hyperlane.registry](https://image.yaco.email/proxyAdmin.monadtestnet.hyperlane.registry.png)

**下面给出终端实际操作情况，仅供参考**

```zsh
$/ hyperlane warp init
Hyperlane CLI
Hyperlane Warp Configure
________________________
Creating a new warp route deployment config...
? Select network type Testnet
? Select chains to connect monadtestnet, sepolia
? Is this chain selection correct?: monadtestnet, sepolia yes
monadtestnet: Configuring warp route...
? Enter the desired owner address: 0x459115d03992914fDc832A14a03da78a1e4d87B8
? Use an existing Proxy Admin contract for the warp route deployment on chain "monadtestnet"? yes
? Please enter the address of the Proxy Admin contract to be used on chain "monadtestnet": 0x6966b0E55883d49BFB24539356a2f8A673E02039
? Do you want to use a trusted ISM for warp route? yes
? Select monadtestnet's token type native
sepolia: Configuring warp route...
? Enter the desired owner address: 0x459115d03992914fDc832A14a03da78a1e4d87B8
? Use an existing Proxy Admin contract for the warp route deployment on chain "sepolia"? yes
? Please enter the address of the Proxy Admin contract to be used on chain "sepolia": 0x97Bbc6bBaFa5Ce3b2FA966c121Af63bD09e940f8
? Do you want to use a trusted ISM for warp route? yes
? Select sepolia's token type synthetic
Warp Route config is valid, writing to file undefined:

    monadtestnet:
      type: native
      owner: "0x459115d03992914fDc832A14a03da78a1e4d87B8"
      interchainSecurityModule:
        type: staticAggregationIsm
        modules:
          - type: trustedRelayerIsm
            relayer: "0x459115d03992914fDc832A14a03da78a1e4d87B8"
          - owner: "0x459115d03992914fDc832A14a03da78a1e4d87B8"
            type: defaultFallbackRoutingIsm
            domains: {}
        threshold: 1
      proxyAdmin:
        owner: "0xfaD1C94469700833717Fa8a3017278BC1cA8031C"
        address: "0x6966b0E55883d49BFB24539356a2f8A673E02039"
    sepolia:
      type: synthetic
      owner: "0x459115d03992914fDc832A14a03da78a1e4d87B8"
      interchainSecurityModule:
        type: staticAggregationIsm
        modules:
          - type: trustedRelayerIsm
            relayer: "0x459115d03992914fDc832A14a03da78a1e4d87B8"
          - owner: "0x459115d03992914fDc832A14a03da78a1e4d87B8"
            type: defaultFallbackRoutingIsm
            domains: {}
        threshold: 1
      proxyAdmin:
        owner: "0xfaD1C94469700833717Fa8a3017278BC1cA8031C"
        address: "0x97Bbc6bBaFa5Ce3b2FA966c121Af63bD09e940f8"
    
? Using warp route ID as MON/sepolia from warp deployment config, is this correct? yes
Skipping adding warp route deploy config at github registry
Now adding warp route deploy config at filesystem registry at /root/.hyperlane
Done adding warp route deploy config at filesystem registry
✅ Successfully created new warp route deployment config with warp route id: MON/sepolia
```

最终的结果是输出一个  warp route id：MON/sepolia，记住它

#### 部署(开炒)

`hyperlane warp deploy`

![warp.deploy.mon.testmonad2sepolia](https://image.yaco.email/warp.deploy.mon.testmonad2sepolia.png)

我是直接输入的私钥，你可以提前使用命令，设置私钥，更加方便

`export HYP_KEY=<your_private_key>`

设置好之后，就是等待了，你会看到非常漂亮的界面刷新，再等等，大概2分钟

![pass.warp.deploy.mon.monadtest2sepolia](https://image.yaco.email/pass.warp.deploy.mon.monadtest2sepolia.png)

最后，我们等到合约在两个链上都成功部署，显然，我们很顺利。

最后输出了下面的注册信息，这个很关键。

![complete.warp.deploy.mon.monadtest2sepolia](https://image.yaco.email/complete.warp.deploy.mon.monadtest2sepolia.png)

接下来，我们复制下方从 token 开始到结束的 yml 信息。

```yml
tokens:
  - chainName: monadtestnet
    standard: EvmHypNative
    decimals: 18
    symbol: MON
    name: MON
    addressOrDenom: "0xc842d08f315C9b3fC3EFc8E33898C88BB2d01b7B"
    connections:
      - token: ethereum|sepolia|0x7871782876A2Ebe383cF157eCD4aB58f37c3659D
  - chainName: sepolia
    standard: EvmHypSynthetic
    decimals: 18
    symbol: MON
    name: MON
    addressOrDenom: "0x7871782876A2Ebe383cF157eCD4aB58f37c3659D"
    connections:
      - token: ethereum|monadtestnet|0xc842d08f315C9b3fC3EFc8E33898C88BB2d01b7B
```

打开 :point_right: https://hyperlane.superbridge.app/

点击网络选择，我们会发现，没有我们配置的sepolia和monadtestnet
![hyperlane.superbridge.app](https://image.yaco.email/hyperlane.superbridge.app.png)

现在我们把他们添加上来

![setting.superbridge.mon.monadtest2sepolia](https://image.yaco.email/setting.superbridge.mon.monadtest2sepolia.png)

![customize.setting.superbridge.mon.monadtest2sepolia](https://image.yaco.email/customize.setting.superbridge.mon.monadtest2sepolia.png)

![save.customize.setting.superbridge.mon.monadtest2sepolia](https://image.yaco.email/save.customize.setting.superbridge.mon.monadtest2sepolia.png)

粘贴上deploy 输出的yml，点击 Save，我们就完成了，现在就出现了我们需要的网络，选择 sepolia 和 mon。

![warp.hyperlane.superbridge.app](https://image.yaco.email/warp.hyperlane.superbridge.app.png)

### 恭喜你，完成了

_**出锅，开吃。**_

现在我们通过hyperlane 提供的工具已经完成了跨链桥的制作，还没尝呢，我们来试试吧。


![mon.monadtest2sepolia](https://image.yaco.email/mon.monadtest2sepolia.png)

![check.mon.testmon2sepolia](https://image.yaco.email/check.mon.testmon2sepolia.png)

![support.mon.testmonad.sepolia](https://image.yaco.email/support.mon.testmonad.sepolia.png)

![bridge.mon.testmonad2sepolia](https://image.yaco.email/bridge.mon.testmonad2sepolia.png)

![msg.bridge.mon.testmonad2sepolia](https://image.yaco.email/msg.bridge.mon.testmonad2sepolia.png)

稍作等待 :clock10:

![comfrim.testmonad2sepolia](https://image.yaco.email/comfrim.testmonad2sepolia.png)

![ok.bridge.mon.testmonad2sepolia](https://image.yaco.email/ok.bridge.mon.testmonad2sepolia.png)

OK，完成了，太棒了，我们打开浏览器看看吧。

![msg.bridge.explorer.mon.testmonad2sepolia](https://image.yaco.email/msg.bridge.explorer.mon.testmonad2sepolia.png)

**芜湖 :happy: **

**我们自己做了一个桥，而且通过它完成了跨链，这是一件很有成就感的事情，你从 0~1 完成了warp route 制作和部署，现在可以把你的战绩(截图/hash)发在我们的 hyperlane 微信群，DisCord或者你的个人推特吧。**

[Hyperlane Bridge MonadTestNet Sepolia](https://hyperlane.superbridge.app/?hyperlaneWarpRoutes=e3aade14-49c5-4e7f-b8bc-6980100cd341) : https://hyperlane.superbridge.app/?hyperlaneWarpRoutes=e3aade14-49c5-4e7f-b8bc-6980100cd341

跨链互操作性是未来区块链的基石，这期课程我们学习了如何使用默认的ISM 和 warp route 制作跨链桥，接下来 Hyperlane 中文社区 将为你分享 hyperlane 协议的跨链原理以及更多自定义化的技巧。
