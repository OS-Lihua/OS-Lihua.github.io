---
layout: /src/layouts/MarkdownPostLayout.astro
title: 智能合约安全模板
author: YaCo
image:
    url: "/images/posts/security-report-template.png"
    alt: "智能合约安全流程"
pubDate: 2025-07-11
tags: ["智能合约","安全"]
languages: ["md","solidity"]
---

在进行智能合约审计之前，我们要做几项确认工作。
1. 确定审计范围
   - [需要项目方确定的问题](https://github.com/Cyfrin/security-and-auditing-full-course-s23/blob/main/extensive-onboarding-questions.md)

2. 进行 审计/Review 分析
3. 确定漏洞级别
4. 
    ```md
    Likelihood & Impact:
    Impact: 
    Likelihood: 
    Severity: 
    ```
5. 编辑审计报告
   
    ```md
    ### [S-#] TITLE (Root Cause + Impact)

    **Description:** 

    **Impact:** 

    **Proof of Concept:**

    **Recommended Mitigation:** 
    ```

**参考报告模板：** 
- [cyfrin-audit-reports](https://github.com/Cyfrin/cyfrin-audit-reports)

---

### 智能合约分析流程

1. 阅读文档

2. 进行笔记

3. 从小合约开始读

4. 合约审计工具列表
   - [solidity-metrics](https://github.com/ConsenSysDiligence/solidity-metrics)
   - [Slither](https://github.com/crytic/slither)
     - 静态分析工具
   - [Aderyn](https://github.com/Cyfrin/aderyn)
     - 静态分析工具

