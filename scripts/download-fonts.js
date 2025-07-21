#!/usr/bin/env node

/**
 * 字体下载脚本
 * 从Google Fonts下载必要的字体文件到本地
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 字体配置
const fonts = [
  {
    family: 'Montserrat',
    weights: [400, 600, 700],
    styles: ['normal'],
    formats: ['woff2', 'woff']
  },
  {
    family: 'Open Sans',
    weights: [400, 600],
    styles: ['normal'],
    formats: ['woff2', 'woff']
  },
  {
    family: 'Roboto',
    weights: [400, 500],
    styles: ['normal'],
    formats: ['woff2', 'woff']
  }
];

// Google Fonts API URLs
const GOOGLE_FONTS_API = 'https://fonts.googleapis.com/css2';

/**
 * 生成Google Fonts URL
 */
function generateGoogleFontsUrl(font) {
  const family = font.family.replace(' ', '+');
  const weights = font.weights.join(';');
  return `${GOOGLE_FONTS_API}?family=${family}:wght@${weights}&display=swap`;
}

/**
 * 获取字体CSS
 */
async function fetchFontCSS(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    return await response.text();
  } catch (error) {
    console.error('获取字体CSS失败:', error);
    return null;
  }
}

/**
 * 从CSS中提取字体URL
 */
function extractFontUrls(css) {
  const urlRegex = /url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g;
  const urls = [];
  let match;
  
  while ((match = urlRegex.exec(css)) !== null) {
    urls.push(match[1]);
  }
  
  return urls;
}

/**
 * 下载字体文件
 */
async function downloadFont(url, filename) {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    
    const fontsDir = path.join(__dirname, '..', 'public', 'fonts');
    if (!fs.existsSync(fontsDir)) {
      fs.mkdirSync(fontsDir, { recursive: true });
    }
    
    const filepath = path.join(fontsDir, filename);
    fs.writeFileSync(filepath, Buffer.from(buffer));
    
    console.log(`✓ 下载完成: ${filename}`);
    return true;
  } catch (error) {
    console.error(`✗ 下载失败 ${filename}:`, error);
    return false;
  }
}

/**
 * 生成文件名
 */
function generateFilename(url, family, weight) {
  const extension = url.includes('.woff2') ? 'woff2' : 'woff';
  const familyName = family.toLowerCase().replace(' ', '');
  return `${familyName}-${weight}.${extension}`;
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始下载字体文件...\n');
  
  for (const font of fonts) {
    console.log(`📥 处理字体: ${font.family}`);
    
    const url = generateGoogleFontsUrl(font);
    const css = await fetchFontCSS(url);
    
    if (!css) {
      console.log(`❌ 无法获取 ${font.family} 的CSS`);
      continue;
    }
    
    const fontUrls = extractFontUrls(css);
    console.log(`找到 ${fontUrls.length} 个字体文件`);
    
    // 下载每个字体文件
    for (let i = 0; i < fontUrls.length; i++) {
      const fontUrl = fontUrls[i];
      const weight = font.weights[Math.floor(i / 2)] || font.weights[0];
      const filename = generateFilename(fontUrl, font.family, weight);
      
      await downloadFont(fontUrl, filename);
      
      // 添加延迟避免请求过快
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('');
  }
  
  console.log('✅ 字体下载完成！');
  console.log('\n📝 请确保在HTML中添加字体预加载：');
  console.log('<link rel="preload" href="/fonts/montserrat-400.woff2" as="font" type="font/woff2" crossorigin>');
  console.log('<link rel="preload" href="/fonts/opensans-400.woff2" as="font" type="font/woff2" crossorigin>');
}

// 运行脚本
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { main as downloadFonts };
