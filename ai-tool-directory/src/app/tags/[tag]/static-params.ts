import fs from 'fs';
import path from 'path';

function slugifyTagForUrl(tag: string) {
  // 取括号前主干
  let main = tag.split('(')[0].trim();
  // 只保留字母、数字、空格和“-”
  main = main.replace(/[^a-zA-Z0-9\- ]/g, '');
  // 多个空格和“-”都变成“-”，避免连续“-”
  main = main.replace(/[\s\-]+/g, '-');
  // 去除首尾“-”
  main = main.replace(/^\-+|\-+$/g, '');
  // 全部小写
  return main.toLowerCase();
}

function getTagMainPart(tag: string) {
  let main = tag.split('(')[0].trim();
  main = main.replace(/[^a-zA-Z0-9\- ]/g, '');
  main = main.replace(/\s+/g, ' ').trim();
  main = main.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return main;
}

function smartTagMainPart(tag: string) {
  let main = tag.split('(')[0].trim();
  // 先将所有分隔符替换为空格
  main = main.replace(/[-/_]+/g, ' ');
  // 驼峰转空格
  main = main.replace(/([a-z])([A-Z])/g, '$1 $2');
  // 合并多余空格
  main = main.replace(/\s+/g, ' ').trim();
  // 首字母大写
  let words = main.split(' ');
  words = words.filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  return words.join(' ');
}

function smartTagSlug(tag: string) {
  return smartTagMainPart(tag).toLowerCase().replace(/\s+/g, '-');
}

export function getAllTagParams() {
  const filePath = path.join(process.cwd(), 'public', 'AI tool.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const tools = JSON.parse(fileData);
  const tagSet = new Set<string>();
  tools.forEach((tool: any) => {
    if (Array.isArray(tool.tags)) {
      tool.tags.forEach((tag: string) => tagSet.add(smartTagSlug(tag)));
    }
  });
  return Array.from(tagSet).map(tag => ({ tag }));
} 