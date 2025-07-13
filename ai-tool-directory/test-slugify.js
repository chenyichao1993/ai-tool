function slugifyTag(tag) {
  // 首先处理包含括号的tag，只保留括号前的主要部分
  let processedTag = tag;
  if (tag.includes('(')) {
    processedTag = tag.split('(')[0].trim();
  }
  
  return processedTag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, ' ')  // 将特殊字符替换为空格
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// 测试特殊的tag
const testTags = [
  "Formal/Informal Tone Selection",
  "File Translation (.pdf, .docx, .pptx)",
  "Text-to-speech and file translation"
];

testTags.forEach(tag => {
  console.log(`原始: "${tag}"`);
  console.log(`Slug: "${slugifyTag(tag)}"`);
  console.log('---');
}); 