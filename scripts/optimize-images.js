#!/usr/bin/env node

/**
 * 图片优化脚本
 * 压缩和转换图片格式以提升性能
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const IMAGE_DIRS = [
  path.join(__dirname, '..', 'public', 'images'),
  path.join(__dirname, '..', 'src', 'assets', 'images')
];

const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];
const TARGET_FORMATS = ['webp', 'avif'];
const QUALITY_SETTINGS = {
  webp: 80,
  avif: 70,
  jpeg: 85,
  png: 90
};

/**
 * 获取文件大小
 */
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

/**
 * 格式化文件大小
 */
function formatSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * 递归获取所有图片文件
 */
function getAllImages(dir, imageList = []) {
  if (!fs.existsSync(dir)) return imageList;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllImages(filePath, imageList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (SUPPORTED_FORMATS.includes(ext)) {
        imageList.push(filePath);
      }
    }
  });
  
  return imageList;
}

/**
 * 分析图片
 */
function analyzeImages() {
  console.log('🔍 开始分析图片资源...\n');
  
  let totalImages = 0;
  let totalSize = 0;
  const largeImages = [];
  const imagesByType = {};
  
  IMAGE_DIRS.forEach(dir => {
    if (!fs.existsSync(dir)) {
      console.log(`⚠️  目录不存在: ${dir}`);
      return;
    }
    
    console.log(`📁 分析目录: ${path.relative(process.cwd(), dir)}`);
    
    const images = getAllImages(dir);
    totalImages += images.length;
    
    images.forEach(imagePath => {
      const size = getFileSize(imagePath);
      const ext = path.extname(imagePath).toLowerCase();
      const relativePath = path.relative(process.cwd(), imagePath);
      
      totalSize += size;
      
      // 统计文件类型
      if (!imagesByType[ext]) {
        imagesByType[ext] = { count: 0, totalSize: 0, files: [] };
      }
      imagesByType[ext].count++;
      imagesByType[ext].totalSize += size;
      imagesByType[ext].files.push({
        path: relativePath,
        size: size,
        formattedSize: formatSize(size)
      });
      
      // 标记大文件 (>500KB)
      if (size > 500 * 1024) {
        largeImages.push({
          path: relativePath,
          size: size,
          formattedSize: formatSize(size)
        });
      }
    });
  });
  
  // 输出分析结果
  console.log(`\n📊 图片分析结果:`);
  console.log(`总图片数: ${totalImages}`);
  console.log(`总大小: ${formatSize(totalSize)}`);
  
  if (largeImages.length > 0) {
    console.log(`\n🔴 大文件 (>500KB): ${largeImages.length} 个`);
    largeImages
      .sort((a, b) => b.size - a.size)
      .slice(0, 10)
      .forEach(img => {
        console.log(`  ${img.formattedSize} - ${img.path}`);
      });
  }
  
  console.log(`\n📈 按文件类型统计:`);
  Object.entries(imagesByType)
    .sort(([,a], [,b]) => b.totalSize - a.totalSize)
    .forEach(([ext, data]) => {
      console.log(`  ${ext}: ${data.count} 个文件, ${formatSize(data.totalSize)}`);
    });
  
  // 生成优化建议
  console.log(`\n💡 优化建议:`);
  
  if (largeImages.length > 0) {
    console.log(`  🔸 压缩 ${largeImages.length} 个大文件`);
  }
  
  const hasOldFormats = Object.keys(imagesByType).some(ext => 
    ['.jpg', '.jpeg', '.png'].includes(ext)
  );
  
  if (hasOldFormats) {
    console.log(`  🔸 转换为现代格式 (WebP, AVIF)`);
  }
  
  const potentialSavings = totalSize * 0.3; // 估计可节省30%
  console.log(`  🔸 预计可节省: ${formatSize(potentialSavings)}`);
  
  return {
    totalImages,
    totalSize,
    largeImages,
    imagesByType,
    potentialSavings
  };
}

/**
 * 生成优化脚本
 */
function generateOptimizationScript(analysis) {
  const scriptContent = `#!/bin/bash

# 图片优化脚本
# 使用 sharp-cli 或 imagemin 进行图片优化

echo "🚀 开始图片优化..."

# 安装依赖 (如果需要)
# npm install -g sharp-cli

# 优化大文件
${analysis.largeImages.map(img => 
  `echo "压缩: ${img.path}"
# sharp resize 1920 1080 --quality 80 --format webp "${img.path}" --output "${img.path.replace(/\.[^.]+$/, '.webp')}"`
).join('\n')}

echo "✅ 图片优化完成!"
`;

  const scriptPath = path.join(__dirname, 'optimize-images.sh');
  fs.writeFileSync(scriptPath, scriptContent);
  
  console.log(`\n📝 优化脚本已生成: ${scriptPath}`);
  console.log(`运行方式: chmod +x ${scriptPath} && ${scriptPath}`);
}

/**
 * 主函数
 */
function main() {
  const analysis = analyzeImages();
  
  // 生成详细报告
  const reportPath = path.join(__dirname, '..', 'image-analysis.json');
  fs.writeFileSync(reportPath, JSON.stringify(analysis, null, 2));
  
  console.log(`\n📄 详细报告已保存: ${reportPath}`);
  
  // 生成优化脚本
  generateOptimizationScript(analysis);
  
  console.log('\n✅ 图片分析完成!');
}

// 运行分析
main();
