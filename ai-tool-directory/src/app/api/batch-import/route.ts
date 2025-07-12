import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 工具数据验证函数
function validateToolData(tool: any) {
  const requiredFields = ['name', 'category', 'websiteUrl', 'description'];
  const missingFields = requiredFields.filter(field => !tool[field]);
  
  if (missingFields.length > 0) {
    return { valid: false, error: `缺少必需字段: ${missingFields.join(', ')}` };
  }
  
  return { valid: true };
}

// 从CSV文件解析数据
function parseCSV(csvContent: string) {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const tools = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    const tool: any = {};
    
    headers.forEach((header, index) => {
      if (values[index]) {
        if (header === 'tags') {
          tool[header] = values[index].split('|').map((tag: string) => tag.trim());
        } else if (header === 'faq') {
          // 假设FAQ格式为 "问题|答案,问题|答案"
          const faqPairs = values[index].split(',').map((pair: string) => {
            const [question, answer] = pair.split('|');
            return { question: question.trim(), answer: answer.trim() };
          });
          tool[header] = faqPairs;
        } else if (header === 'reviews') {
          tool[header] = values[index].split('|').map((review: string) => review.trim());
        } else if (header === 'keyFeatures' || header === 'useCases') {
          tool[header] = values[index].split('|').map((item: string) => item.trim());
        } else {
          tool[header] = values[index];
        }
      }
    });
    
    const validation = validateToolData(tool);
    if (validation.valid) {
      tools.push(tool);
    } else {
      console.error(`工具 "${tool.name || 'Unknown'}" 验证失败: ${validation.error}`);
    }
  }
  
  return tools;
}

// 合并到现有数据
function mergeTools(newTools: any[]) {
  const existingDataPath = path.join(process.cwd(), 'public', 'AI tool.json');
  const existingData = fs.readFileSync(existingDataPath, 'utf-8');
  const existingTools = JSON.parse(existingData);
  
  const existingNames = new Set(existingTools.map((tool: any) => tool.name.toLowerCase()));
  const toolsToAdd = [];
  const duplicates = [];
  
  for (const tool of newTools) {
    if (existingNames.has(tool.name.toLowerCase())) {
      duplicates.push(tool.name);
    } else {
      toolsToAdd.push(tool);
      existingNames.add(tool.name.toLowerCase());
    }
  }
  
  const mergedTools = [...existingTools, ...toolsToAdd];
  
  // 按名称排序
  mergedTools.sort((a: any, b: any) => a.name.localeCompare(b.name));
  
  return { mergedTools, duplicates, added: toolsToAdd.length };
}

// 保存数据
function saveTools(tools: any[]) {
  const outputPath = path.join(process.cwd(), 'public', 'AI tool.json');
  fs.writeFileSync(outputPath, JSON.stringify(tools, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const format = formData.get('format') as string;
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: '没有上传文件' },
        { status: 400 }
      );
    }
    
    const fileContent = await file.text();
    let newTools: any[] = [];
    
    if (format === 'csv') {
      newTools = parseCSV(fileContent);
    } else if (format === 'json') {
      try {
        const parsed = JSON.parse(fileContent);
        newTools = Array.isArray(parsed) ? parsed : [parsed];
        
        // 验证每个工具
        const validTools = [];
        for (const tool of newTools) {
          const validation = validateToolData(tool);
          if (validation.valid) {
            validTools.push(tool);
          } else {
            console.error(`工具 "${tool.name || 'Unknown'}" 验证失败: ${validation.error}`);
          }
        }
        newTools = validTools;
      } catch (error) {
        return NextResponse.json(
          { success: false, message: 'JSON 格式错误' },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, message: '不支持的格式' },
        { status: 400 }
      );
    }
    
    if (newTools.length === 0) {
      return NextResponse.json(
        { success: false, message: '没有有效的工具数据' },
        { status: 400 }
      );
    }
    
    const { mergedTools, duplicates, added } = mergeTools(newTools);
    saveTools(mergedTools);
    
    let message = `成功导入 ${added} 个工具`;
    if (duplicates.length > 0) {
      message += `，跳过 ${duplicates.length} 个重复工具`;
    }
    
    return NextResponse.json({
      success: true,
      message,
      stats: {
        total: mergedTools.length,
        added,
        duplicates: duplicates.length
      }
    });
    
  } catch (error) {
    console.error('批量导入错误:', error);
    return NextResponse.json(
      { success: false, message: '服务器错误，请重试' },
      { status: 500 }
    );
  }
} 