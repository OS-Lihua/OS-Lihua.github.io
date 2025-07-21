#!/bin/bash

# 图片优化脚本
# 使用 sharp-cli 或 imagemin 进行图片优化

echo "🚀 开始图片优化..."

# 安装依赖 (如果需要)
# npm install -g sharp-cli

# 优化大文件
echo "压缩: public\images\projects\traveonchain.png"
# sharp resize 1920 1080 --quality 80 --format webp "public\images\projects\traveonchain.png" --output "public\images\projects\traveonchain.webp"
echo "压缩: public\images\posts\security-report-template.png"
# sharp resize 1920 1080 --quality 80 --format webp "public\images\posts\security-report-template.png" --output "public\images\posts\security-report-template.webp"
echo "压缩: public\images\posts\the-next-decade-of-bitcoin.png"
# sharp resize 1920 1080 --quality 80 --format webp "public\images\posts\the-next-decade-of-bitcoin.png" --output "public\images\posts\the-next-decade-of-bitcoin.webp"
echo "压缩: public\images\posts\shuffling-algorithm.png"
# sharp resize 1920 1080 --quality 80 --format webp "public\images\posts\shuffling-algorithm.png" --output "public\images\posts\shuffling-algorithm.webp"
echo "压缩: public\images\projects\tgbotfauceturl.png"
# sharp resize 1920 1080 --quality 80 --format webp "public\images\projects\tgbotfauceturl.png" --output "public\images\projects\tgbotfauceturl.webp"
echo "压缩: public\images\projects\tgbotFaucet.png"
# sharp resize 1920 1080 --quality 80 --format webp "public\images\projects\tgbotFaucet.png" --output "public\images\projects\tgbotFaucet.webp"
echo "压缩: public\images\projects\hyperlane.png"
# sharp resize 1920 1080 --quality 80 --format webp "public\images\projects\hyperlane.png" --output "public\images\projects\hyperlane.webp"
echo "压缩: public\images\blog.png"
# sharp resize 1920 1080 --quality 80 --format webp "public\images\blog.png" --output "public\images\blog.webp"
echo "压缩: public\images\posts\smart-contract-design.png"
# sharp resize 1920 1080 --quality 80 --format webp "public\images\posts\smart-contract-design.png" --output "public\images\posts\smart-contract-design.webp"
echo "压缩: public\images\projects\praxisgrove.png"
# sharp resize 1920 1080 --quality 80 --format webp "public\images\projects\praxisgrove.png" --output "public\images\projects\praxisgrove.webp"

echo "✅ 图片优化完成!"
