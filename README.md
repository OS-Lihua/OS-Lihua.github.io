# 操作指南

1. 克隆仓库
   ```shell
   git clone git@github.com:OS-Lihua/OS-Lihua.github.io.git
   ```
2. 更新内容

3. 部署到网站
   ```shell
   hexo g # 生成静态文件
   hexo s # 本地测试
   hexo d # 部署到远程服务器
   ```

4. 提交代码
   ```bash
   git add .
   git commit -m "Remarks"
   git push [origin hexo]
   ```

   

---

### 原理

1. hexo 为默认分支，保存源码，这部分内容github仓库已经配置完成

2. config.yaml 内容

   ```yml
   deploy:
     type: 'git'
     repo: 'git@github.com:OS-Lihua/OS-Lihua.github.io.git'
     branch: 'master'
   ```

   这部分内容意思是部署到 repo 仓库 的 master 分支中

3. 当我们执行 hexo d 时，就部署上 2中的分支了
4. 通过双分支管理 hexo 源码和 master 网页，可以更加轻松在多设备间部署博客

   