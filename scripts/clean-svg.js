#!/usr/bin/env node

/**
 * 清理 SVG 文件中的不必要属性
 * 这个脚本会移除 SVG 文件中的 t、p-id 等不必要的属性
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../src/icons');

// 需要移除的属性列表
const attributesToRemove = [
  't',
  'p-id',
  'style', // 移除内联样式，因为会与 Astro 冲突
];

// 需要移除的样式属性
const stylesToRemove = [
  'flex',
  'content-visibility',
];

function cleanSVGContent(content) {
  let cleaned = content;
  
  // 移除不必要的属性
  attributesToRemove.forEach(attr => {
    const regex = new RegExp(`\\s+${attr}="[^"]*"`, 'g');
    cleaned = cleaned.replace(regex, '');
  });
  
  // 清理样式属性
  stylesToRemove.forEach(style => {
    const regex = new RegExp(`${style}\\s*:[^;]*;?`, 'g');
    cleaned = cleaned.replace(regex, '');
  });
  
  // 移除空的 style 属性
  cleaned = cleaned.replace(/\s+style=""\s*/g, ' ');
  cleaned = cleaned.replace(/\s+style="\s*"\s*/g, ' ');
  
  // 清理多余的空格
  cleaned = cleaned.replace(/\s+/g, ' ');
  cleaned = cleaned.replace(/>\s+</g, '><');
  
  return cleaned.trim();
}

function cleanSVGFiles() {
  if (!fs.existsSync(iconsDir)) {
    console.log('Icons directory not found:', iconsDir);
    return;
  }
  
  const files = fs.readdirSync(iconsDir);
  const svgFiles = files.filter(file => file.endsWith('.svg'));
  
  console.log(`Found ${svgFiles.length} SVG files to clean...`);
  
  let cleanedCount = 0;
  
  svgFiles.forEach(file => {
    const filePath = path.join(iconsDir, file);
    const originalContent = fs.readFileSync(filePath, 'utf8');
    const cleanedContent = cleanSVGContent(originalContent);
    
    if (originalContent !== cleanedContent) {
      fs.writeFileSync(filePath, cleanedContent, 'utf8');
      console.log(`✓ Cleaned: ${file}`);
      cleanedCount++;
    } else {
      console.log(`- No changes needed: ${file}`);
    }
  });
  
  console.log(`\nCleaning complete! ${cleanedCount} files were modified.`);
}

// 运行清理
try {
  cleanSVGFiles();
} catch (error) {
  console.error('Error cleaning SVG files:', error);
  process.exit(1);
}
