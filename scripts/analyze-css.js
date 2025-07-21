#!/usr/bin/env node

/**
 * CSS分析脚本
 * 检测未使用的CSS规则和优化建议
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const CSS_FILES = [
  'src/styles/global.css',
  'src/styles/base.css',
  'src/styles/theme.css',
  'src/styles/components.css',
  'src/styles/markdown.css',
  'src/styles/fonts.css'
];

const HTML_DIRS = [
  'dist',
  'src/pages',
  'src/layouts',
  'src/components'
];

/**
 * 读取CSS文件内容
 */
function readCSSFiles() {
  const cssContent = {};
  
  CSS_FILES.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
      cssContent[file] = fs.readFileSync(filePath, 'utf-8');
    }
  });
  
  return cssContent;
}

/**
 * 提取CSS选择器
 */
function extractCSSSelectors(cssContent) {
  const selectors = new Set();
  
  Object.entries(cssContent).forEach(([file, content]) => {
    // 移除注释
    const cleanContent = content.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // 提取选择器 (简化版本)
    const selectorMatches = cleanContent.match(/([^{}]+)\s*\{[^}]*\}/g);
    
    if (selectorMatches) {
      selectorMatches.forEach(match => {
        const selector = match.split('{')[0].trim();
        
        // 跳过@规则
        if (selector.startsWith('@')) return;
        
        // 分割多个选择器
        selector.split(',').forEach(s => {
          const cleanSelector = s.trim();
          if (cleanSelector && !cleanSelector.startsWith('@')) {
            selectors.add(cleanSelector);
          }
        });
      });
    }
  });
  
  return Array.from(selectors);
}

/**
 * 读取HTML/Astro文件内容
 */
function readHTMLFiles() {
  const htmlContent = [];
  
  function scanDirectory(dir) {
    const fullPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(fullPath)) return;
    
    const files = fs.readdirSync(fullPath, { withFileTypes: true });
    
    files.forEach(file => {
      const filePath = path.join(fullPath, file.name);
      
      if (file.isDirectory()) {
        scanDirectory(path.join(dir, file.name));
      } else if (file.name.match(/\.(html|astro|jsx|tsx|vue|svelte)$/)) {
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          htmlContent.push({
            file: path.relative(path.join(__dirname, '..'), filePath),
            content
          });
        } catch (error) {
          console.warn(`无法读取文件: ${filePath}`);
        }
      }
    });
  }
  
  HTML_DIRS.forEach(dir => scanDirectory(dir));
  
  return htmlContent;
}

/**
 * 检查选择器是否被使用
 */
function checkSelectorUsage(selector, htmlFiles) {
  // 简化的选择器检查
  const classMatch = selector.match(/\.([a-zA-Z0-9_-]+)/);
  const idMatch = selector.match(/#([a-zA-Z0-9_-]+)/);
  const tagMatch = selector.match(/^([a-zA-Z0-9]+)(?![a-zA-Z0-9_-])/);
  
  for (const htmlFile of htmlFiles) {
    const content = htmlFile.content;
    
    // 检查类名
    if (classMatch) {
      const className = classMatch[1];
      if (content.includes(`class="${className}"`) || 
          content.includes(`class='${className}'`) ||
          content.includes(`class:${className}`) ||
          content.includes(`className="${className}"`) ||
          content.includes(`className='${className}'`) ||
          content.includes(`@apply ${className}`) ||
          content.includes(` ${className} `) ||
          content.includes(` ${className}"`) ||
          content.includes(` ${className}'`)) {
        return true;
      }
    }
    
    // 检查ID
    if (idMatch) {
      const idName = idMatch[1];
      if (content.includes(`id="${idName}"`) || 
          content.includes(`id='${idName}'`)) {
        return true;
      }
    }
    
    // 检查标签
    if (tagMatch) {
      const tagName = tagMatch[1];
      if (content.includes(`<${tagName}`) || 
          content.includes(`</${tagName}>`)) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * 分析CSS使用情况
 */
function analyzeCSS() {
  console.log('🔍 开始分析CSS使用情况...\n');
  
  const cssContent = readCSSFiles();
  const selectors = extractCSSSelectors(cssContent);
  const htmlFiles = readHTMLFiles();
  
  console.log(`📊 统计信息:`);
  console.log(`CSS文件数: ${Object.keys(cssContent).length}`);
  console.log(`HTML/组件文件数: ${htmlFiles.length}`);
  console.log(`CSS选择器数: ${selectors.length}`);
  
  const unusedSelectors = [];
  const usedSelectors = [];
  
  console.log('\n🔍 检查选择器使用情况...');
  
  selectors.forEach((selector, index) => {
    if (index % 50 === 0) {
      console.log(`进度: ${index}/${selectors.length}`);
    }
    
    const isUsed = checkSelectorUsage(selector, htmlFiles);
    
    if (isUsed) {
      usedSelectors.push(selector);
    } else {
      // 跳过一些常见的伪类和特殊选择器
      if (!selector.includes(':') && 
          !selector.includes('::') && 
          !selector.includes('[') &&
          !selector.startsWith('*') &&
          !selector.includes('@')) {
        unusedSelectors.push(selector);
      }
    }
  });
  
  console.log('\n📈 分析结果:');
  console.log(`已使用选择器: ${usedSelectors.length}`);
  console.log(`可能未使用选择器: ${unusedSelectors.length}`);
  
  if (unusedSelectors.length > 0) {
    console.log('\n🔴 可能未使用的选择器:');
    unusedSelectors.slice(0, 20).forEach(selector => {
      console.log(`  ${selector}`);
    });
    
    if (unusedSelectors.length > 20) {
      console.log(`  ... 还有 ${unusedSelectors.length - 20} 个`);
    }
  }
  
  // 计算潜在节省
  const totalSelectors = selectors.length;
  const unusedPercentage = (unusedSelectors.length / totalSelectors * 100).toFixed(1);
  
  console.log(`\n💡 优化建议:`);
  console.log(`  🔸 ${unusedPercentage}% 的选择器可能未被使用`);
  console.log(`  🔸 建议使用 PurgeCSS 或类似工具进行清理`);
  console.log(`  🔸 考虑将大型CSS文件拆分为更小的模块`);
  
  return {
    totalSelectors,
    usedSelectors: usedSelectors.length,
    unusedSelectors: unusedSelectors.length,
    unusedList: unusedSelectors,
    unusedPercentage: parseFloat(unusedPercentage)
  };
}

/**
 * 生成PurgeCSS配置
 */
function generatePurgeCSSConfig(analysis) {
  const config = {
    content: [
      './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}',
      './dist/**/*.html'
    ],
    css: CSS_FILES,
    safelist: [
      // 保留的类名模式
      /^hljs-/,
      /^language-/,
      /^token/,
      /^pre/,
      /^code/,
      'dark',
      'light'
    ],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
  };
  
  const configPath = path.join(__dirname, '..', 'purgecss.config.js');
  const configContent = `module.exports = ${JSON.stringify(config, null, 2)};`;
  
  fs.writeFileSync(configPath, configContent);
  
  console.log(`\n📝 PurgeCSS配置已生成: ${configPath}`);
  console.log(`安装和使用:`);
  console.log(`  npm install -D @fullhuman/postcss-purgecss`);
  console.log(`  npx purgecss --config purgecss.config.js --output dist/css/`);
}

/**
 * 主函数
 */
function main() {
  const analysis = analyzeCSS();
  
  // 生成详细报告
  const reportPath = path.join(__dirname, '..', 'css-analysis.json');
  fs.writeFileSync(reportPath, JSON.stringify(analysis, null, 2));
  
  console.log(`\n📄 详细报告已保存: ${reportPath}`);
  
  // 生成PurgeCSS配置
  generatePurgeCSSConfig(analysis);
  
  console.log('\n✅ CSS分析完成!');
}

// 运行分析
main();
