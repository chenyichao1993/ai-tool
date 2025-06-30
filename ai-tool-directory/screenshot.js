const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

// 读取工具数据
const tools = JSON.parse(fs.readFileSync('./public/AI tool.json', 'utf-8'));

// 确保截图目录存在
const screenshotDir = './public/screenshots';
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir);

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' // 这里用你的Chrome实际路径
  });
  for (const tool of tools) {
    if (!tool.websiteUrl) continue; // 这里改成 websiteUrl
    const fileName = tool.name.replace(/\s+/g, '').toLowerCase() + '.png';
    const filePath = path.join(screenshotDir, fileName);
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 800 });
      await page.goto(tool.websiteUrl, { waitUntil: 'networkidle2', timeout: 30000 }); // 这里也改成 websiteUrl
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`已保存：${fileName}`);
      await page.close();
      tool.screenshot = '/screenshots/' + fileName;
    } catch (e) {
      console.log(`截图失败：${tool.name} - ${tool.websiteUrl}`);
    }
  }
  await browser.close();
  fs.writeFileSync('./public/AI tool.json', JSON.stringify(tools, null, 2));
  console.log('全部截图完成，JSON已更新！');
})();