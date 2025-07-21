#!/usr/bin/env node

/**
 * 构建分析脚本
 * 分析构建产物的大小、依赖关系和性能指标
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const DIST_DIR = path.join(__dirname, '..', 'dist');
const REPORT_FILE = path.join(__dirname, '..', 'bundle-analysis.json');

/**
 * 获取文件大小（字节）
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
 * 递归获取目录中的所有文件
 */
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * 分析文件类型分布
 */
function analyzeFileTypes(files) {
  const types = {};

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    const size = getFileSize(file);

    if (!types[ext]) {
      types[ext] = {
        count: 0,
        totalSize: 0,
        files: []
      };
    }

    types[ext].count++;
    types[ext].totalSize += size;
    types[ext].files.push({
      name: path.basename(file),
      size: size,
      path: path.relative(DIST_DIR, file)
    });
  });

  // 按总大小排序
  Object.keys(types).forEach(ext => {
    types[ext].files.sort((a, b) => b.size - a.size);
  });

  return types;
}

/**
 * 分析JavaScript文件
 */
function analyzeJavaScript(files) {
  const jsFiles = files.filter(file =>
    file.endsWith('.js') || file.endsWith('.mjs')
  );

  const analysis = {
    totalFiles: jsFiles.length,
    totalSize: 0,
    chunks: [],
    vendors: [],
    pages: []
  };

  jsFiles.forEach(file => {
    const size = getFileSize(file);
    const name = path.basename(file);
    const relativePath = path.relative(DIST_DIR, file);

    analysis.totalSize += size;

    const fileInfo = {
      name,
      size,
      path: relativePath,
      formattedSize: formatSize(size)
    };

    if (name.includes('vendor')) {
      analysis.vendors.push(fileInfo);
    } else if (name.includes('chunk')) {
      analysis.chunks.push(fileInfo);
    } else {
      analysis.pages.push(fileInfo);
    }
  });

  // 按大小排序
  analysis.chunks.sort((a, b) => b.size - a.size);
  analysis.vendors.sort((a, b) => b.size - a.size);
  analysis.pages.sort((a, b) => b.size - a.size);

  return analysis;
}

/**
 * 分析CSS文件
 */
function analyzeCSS(files) {
  const cssFiles = files.filter(file => file.endsWith('.css'));

  const analysis = {
    totalFiles: cssFiles.length,
    totalSize: 0,
    files: []
  };

  cssFiles.forEach(file => {
    const size = getFileSize(file);
    analysis.totalSize += size;
    analysis.files.push({
      name: path.basename(file),
      size,
      path: path.relative(DIST_DIR, file),
      formattedSize: formatSize(size)
    });
  });

  analysis.files.sort((a, b) => b.size - a.size);

  return analysis;
}

/**
 * 生成性能建议
 */
function generateRecommendations(analysis) {
  const recommendations = [];

  // JavaScript 分析
  if (analysis.javascript.totalSize > 500 * 1024) { // 500KB
    recommendations.push({
      type: 'warning',
      category: 'JavaScript',
      message: `JavaScript总大小 ${formatSize(analysis.javascript.totalSize)} 较大，建议进一步优化代码分割`
    });
  }

  // CSS 分析
  if (analysis.css.totalSize > 100 * 1024) { // 100KB
    recommendations.push({
      type: 'warning',
      category: 'CSS',
      message: `CSS总大小 ${formatSize(analysis.css.totalSize)} 较大，建议移除未使用的样式`
    });
  }

  // 大文件检查
  const largeFiles = [];
  Object.values(analysis.fileTypes).forEach(type => {
    type.files.forEach(file => {
      if (file.size > 200 * 1024) { // 200KB
        largeFiles.push(file);
      }
    });
  });

  if (largeFiles.length > 0) {
    recommendations.push({
      type: 'info',
      category: 'Large Files',
      message: `发现 ${largeFiles.length} 个大文件 (>200KB)`,
      files: largeFiles.map(f => `${f.name} (${formatSize(f.size)})`)
    });
  }

  return recommendations;
}

/**
 * 主分析函数
 */
function analyzeBuild() {
  console.log('🔍 开始分析构建产物...\n');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ 构建目录不存在，请先运行 yarn build');
    process.exit(1);
  }

  const files = getAllFiles(DIST_DIR);
  const totalSize = files.reduce((sum, file) => sum + getFileSize(file), 0);

  console.log(`📊 总文件数: ${files.length}`);
  console.log(`📦 总大小: ${formatSize(totalSize)}\n`);

  // 分析文件类型
  const fileTypes = analyzeFileTypes(files);

  // 分析JavaScript
  const javascript = analyzeJavaScript(files);

  // 分析CSS
  const css = analyzeCSS(files);

  // 生成完整分析报告
  const analysis = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: files.length,
      totalSize,
      formattedTotalSize: formatSize(totalSize)
    },
    fileTypes,
    javascript,
    css,
    recommendations: []
  };

  // 生成建议
  analysis.recommendations = generateRecommendations(analysis);

  // 保存报告
  fs.writeFileSync(REPORT_FILE, JSON.stringify(analysis, null, 2));

  // 显示摘要
  console.log('📈 构建分析摘要:');
  console.log(`JavaScript: ${javascript.totalFiles} 文件, ${formatSize(javascript.totalSize)}`);
  console.log(`CSS: ${css.totalFiles} 文件, ${formatSize(css.totalSize)}`);

  // 显示最大的文件
  console.log('\n🔝 最大的文件:');
  const allFiles = [];
  Object.values(fileTypes).forEach(type => {
    allFiles.push(...type.files);
  });
  allFiles.sort((a, b) => b.size - a.size);
  allFiles.slice(0, 5).forEach(file => {
    console.log(`  ${file.name}: ${formatSize(file.size)}`);
  });

  // 显示建议
  if (analysis.recommendations.length > 0) {
    console.log('\n💡 优化建议:');
    analysis.recommendations.forEach(rec => {
      const icon = rec.type === 'warning' ? '⚠️' : 'ℹ️';
      console.log(`  ${icon} [${rec.category}] ${rec.message}`);
      if (rec.files) {
        rec.files.forEach(file => console.log(`    - ${file}`));
      }
    });
  }

  console.log(`\n📄 详细报告已保存到: ${REPORT_FILE}`);
  console.log('✅ 分析完成！');
}

// 运行分析
analyzeBuild();

export { analyzeBuild };
