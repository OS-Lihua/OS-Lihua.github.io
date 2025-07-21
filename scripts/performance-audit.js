#!/usr/bin/env node

/**
 * 综合性能审计脚本
 * 运行所有性能分析工具并生成综合报告
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 运行命令并捕获输出
 */
function runCommand(command, description) {
  console.log(`🔄 ${description}...`);
  try {
    const output = execSync(command, { 
      encoding: 'utf-8',
      cwd: path.join(__dirname, '..')
    });
    console.log(`✅ ${description} 完成`);
    return { success: true, output };
  } catch (error) {
    console.error(`❌ ${description} 失败:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * 读取JSON报告文件
 */
function readReport(filename) {
  const filePath = path.join(__dirname, '..', filename);
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
      console.warn(`无法读取报告文件 ${filename}:`, error.message);
      return null;
    }
  }
  return null;
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
 * 生成性能评分
 */
function calculatePerformanceScore(reports) {
  let score = 100;
  const issues = [];
  
  // 构建分析评分
  if (reports.bundle) {
    const jsSize = reports.bundle.javascript?.totalSize || 0;
    const cssSize = reports.bundle.css?.totalSize || 0;
    
    if (jsSize > 1.5 * 1024 * 1024) { // 1.5MB
      score -= 15;
      issues.push('JavaScript包过大 (>1.5MB)');
    } else if (jsSize > 1 * 1024 * 1024) { // 1MB
      score -= 10;
      issues.push('JavaScript包较大 (>1MB)');
    }
    
    if (cssSize > 150 * 1024) { // 150KB
      score -= 10;
      issues.push('CSS文件过大 (>150KB)');
    } else if (cssSize > 100 * 1024) { // 100KB
      score -= 5;
      issues.push('CSS文件较大 (>100KB)');
    }
  }
  
  // 图片分析评分
  if (reports.images) {
    const totalImageSize = reports.images.totalSize || 0;
    const largeImages = reports.images.largeImages?.length || 0;
    
    if (totalImageSize > 20 * 1024 * 1024) { // 20MB
      score -= 20;
      issues.push('图片总大小过大 (>20MB)');
    } else if (totalImageSize > 10 * 1024 * 1024) { // 10MB
      score -= 10;
      issues.push('图片总大小较大 (>10MB)');
    }
    
    if (largeImages > 10) {
      score -= 15;
      issues.push(`大图片文件过多 (${largeImages}个 >500KB)`);
    } else if (largeImages > 5) {
      score -= 8;
      issues.push(`大图片文件较多 (${largeImages}个 >500KB)`);
    }
  }
  
  // CSS分析评分
  if (reports.css) {
    const unusedPercentage = reports.css.unusedPercentage || 0;
    
    if (unusedPercentage > 50) {
      score -= 15;
      issues.push(`未使用CSS过多 (${unusedPercentage}%)`);
    } else if (unusedPercentage > 30) {
      score -= 10;
      issues.push(`未使用CSS较多 (${unusedPercentage}%)`);
    }
  }
  
  return {
    score: Math.max(0, Math.round(score)),
    issues,
    grade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F'
  };
}

/**
 * 生成优化建议
 */
function generateRecommendations(reports, performanceScore) {
  const recommendations = [];
  
  // 基于性能评分的建议
  performanceScore.issues.forEach(issue => {
    if (issue.includes('JavaScript包')) {
      recommendations.push({
        priority: 'high',
        category: 'JavaScript优化',
        action: '进一步优化代码分割，移除未使用的代码',
        impact: '减少首屏加载时间'
      });
    }
    
    if (issue.includes('CSS文件')) {
      recommendations.push({
        priority: 'medium',
        category: 'CSS优化',
        action: '使用PurgeCSS移除未使用的样式',
        impact: '减少样式文件大小'
      });
    }
    
    if (issue.includes('图片')) {
      recommendations.push({
        priority: 'high',
        category: '图片优化',
        action: '压缩图片，转换为WebP/AVIF格式',
        impact: '显著减少页面加载时间'
      });
    }
  });
  
  // 通用建议
  recommendations.push({
    priority: 'medium',
    category: '缓存策略',
    action: '配置适当的浏览器缓存头',
    impact: '提升回访用户体验'
  });
  
  recommendations.push({
    priority: 'low',
    category: '监控',
    action: '设置性能监控和告警',
    impact: '及时发现性能问题'
  });
  
  return recommendations;
}

/**
 * 生成HTML报告
 */
function generateHTMLReport(auditResults) {
  const { reports, performanceScore, recommendations } = auditResults;
  
  const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>性能审计报告</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; }
        .score { font-size: 4em; font-weight: bold; margin: 20px 0; }
        .score.A { color: #22c55e; }
        .score.B { color: #84cc16; }
        .score.C { color: #eab308; }
        .score.D { color: #f97316; }
        .score.F { color: #ef4444; }
        .section { margin: 30px 0; }
        .section h2 { color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
        .metric { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
        .recommendations { display: grid; gap: 15px; }
        .recommendation { padding: 15px; border-left: 4px solid #3b82f6; background: #f8fafc; }
        .recommendation.high { border-color: #ef4444; }
        .recommendation.medium { border-color: #f59e0b; }
        .recommendation.low { border-color: #10b981; }
        .timestamp { text-align: center; color: #6b7280; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>性能审计报告</h1>
            <div class="score ${performanceScore.grade}">${performanceScore.score}</div>
            <p>性能评分: ${performanceScore.grade} 级</p>
        </div>
        
        <div class="section">
            <h2>📊 构建分析</h2>
            ${reports.bundle ? `
                <div class="metric"><span>JavaScript大小:</span><span>${formatSize(reports.bundle.javascript?.totalSize || 0)}</span></div>
                <div class="metric"><span>CSS大小:</span><span>${formatSize(reports.bundle.css?.totalSize || 0)}</span></div>
                <div class="metric"><span>总文件数:</span><span>${reports.bundle.summary?.totalFiles || 0}</span></div>
            ` : '<p>构建分析数据不可用</p>'}
        </div>
        
        <div class="section">
            <h2>🖼️ 图片分析</h2>
            ${reports.images ? `
                <div class="metric"><span>图片总数:</span><span>${reports.images.totalImages || 0}</span></div>
                <div class="metric"><span>图片总大小:</span><span>${formatSize(reports.images.totalSize || 0)}</span></div>
                <div class="metric"><span>大文件数 (>500KB):</span><span>${reports.images.largeImages?.length || 0}</span></div>
            ` : '<p>图片分析数据不可用</p>'}
        </div>
        
        <div class="section">
            <h2>🎨 CSS分析</h2>
            ${reports.css ? `
                <div class="metric"><span>总选择器数:</span><span>${reports.css.totalSelectors || 0}</span></div>
                <div class="metric"><span>已使用选择器:</span><span>${reports.css.usedSelectors || 0}</span></div>
                <div class="metric"><span>未使用比例:</span><span>${reports.css.unusedPercentage || 0}%</span></div>
            ` : '<p>CSS分析数据不可用</p>'}
        </div>
        
        <div class="section">
            <h2>💡 优化建议</h2>
            <div class="recommendations">
                ${recommendations.map(rec => `
                    <div class="recommendation ${rec.priority}">
                        <h3>${rec.category}</h3>
                        <p><strong>建议:</strong> ${rec.action}</p>
                        <p><strong>影响:</strong> ${rec.impact}</p>
                        <p><strong>优先级:</strong> ${rec.priority === 'high' ? '高' : rec.priority === 'medium' ? '中' : '低'}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="timestamp">
            报告生成时间: ${new Date().toLocaleString('zh-CN')}
        </div>
    </div>
</body>
</html>`;
  
  return html;
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始综合性能审计...\n');
  
  const reports = {};
  
  // 1. 构建分析
  console.log('📦 运行构建分析...');
  const buildResult = runCommand('yarn build', '项目构建');
  if (buildResult.success) {
    const analyzeResult = runCommand('node scripts/analyze-bundle.js', '构建分析');
    if (analyzeResult.success) {
      reports.bundle = readReport('bundle-analysis.json');
    }
  }
  
  // 2. 图片分析
  console.log('\n🖼️ 运行图片分析...');
  const imageResult = runCommand('node scripts/optimize-images.js', '图片分析');
  if (imageResult.success) {
    reports.images = readReport('image-analysis.json');
  }
  
  // 3. CSS分析
  console.log('\n🎨 运行CSS分析...');
  const cssResult = runCommand('node scripts/analyze-css.js', 'CSS分析');
  if (cssResult.success) {
    reports.css = readReport('css-analysis.json');
  }
  
  // 4. 生成综合报告
  console.log('\n📊 生成综合报告...');
  
  const performanceScore = calculatePerformanceScore(reports);
  const recommendations = generateRecommendations(reports, performanceScore);
  
  const auditResults = {
    timestamp: new Date().toISOString(),
    reports,
    performanceScore,
    recommendations
  };
  
  // 保存JSON报告
  const jsonReportPath = path.join(__dirname, '..', 'performance-audit.json');
  fs.writeFileSync(jsonReportPath, JSON.stringify(auditResults, null, 2));
  
  // 生成HTML报告
  const htmlReport = generateHTMLReport(auditResults);
  const htmlReportPath = path.join(__dirname, '..', 'performance-audit.html');
  fs.writeFileSync(htmlReportPath, htmlReport);
  
  // 输出结果
  console.log('\n🎯 性能审计结果:');
  console.log(`性能评分: ${performanceScore.score}/100 (${performanceScore.grade}级)`);
  
  if (performanceScore.issues.length > 0) {
    console.log('\n⚠️ 发现的问题:');
    performanceScore.issues.forEach(issue => {
      console.log(`  • ${issue}`);
    });
  }
  
  console.log('\n💡 优化建议:');
  recommendations.slice(0, 3).forEach(rec => {
    const priority = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
    console.log(`  ${priority} ${rec.category}: ${rec.action}`);
  });
  
  console.log(`\n📄 详细报告:`);
  console.log(`  JSON: ${jsonReportPath}`);
  console.log(`  HTML: ${htmlReportPath}`);
  
  console.log('\n✅ 性能审计完成!');
}

// 运行审计
main().catch(console.error);
