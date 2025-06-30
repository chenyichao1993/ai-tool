// 工具类型定义
export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  logoUrl?: string;
  websiteUrl: string;
  tags: string[];
  features?: string[];
}

// 工具数据
export const tools: Tool[] = [
  {
    id: 'deepl',
    name: 'DeepL',
    category: 'AI Writing & Content Generation',
    websiteUrl: 'https://www.deepl.com',
    description: 'DeepL is a well-known translation tool famous for its high-precision translation quality. It supports mutual translation between multiple languages and can translate all kinds of texts, including documents and web pages.',
    tags: ['翻译', 'AI写作'],
    features: [
      '高精度翻译',
      '多语言支持',
      '文档翻译',
      '网页翻译'
    ]
  },
  {
    id: 'tldr-this',
    name: 'TLDR This',
    category: 'AI Writing & Content Generation',
    websiteUrl: 'https://tldrthis.com',
    description: 'TLDR This can automatically summarize long texts and generate concise abstracts to help users quickly understand the core content of the text.',
    tags: ['文本摘要', 'AI写作'],
    features: [
      '自动摘要',
      '核心内容提取',
      '快速理解'
    ]
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'Image Generation & Design',
    websiteUrl: 'https://www.midjourney.com',
    description: 'Midjourney is an image-generation tool. Users can input text descriptions, and it can generate high-quality artistic images with diverse styles, which are widely used in fields such as illustration and design.',
    tags: ['AI绘画', '图像生成'],
    features: [
      '文本生成图像',
      '多样化风格',
      '高质量输出',
      '艺术创作'
    ]
  },
  {
    id: 'dall-e-2',
    name: 'DALL-E 2',
    category: 'Image Generation & Design',
    websiteUrl: 'https://openai.com/dall-e-2',
    description: 'DALL-E 2 can create realistic and imaginative images based on natural language descriptions. Whether it\'s a real-life scene or a fantasy world, it can generate images with excellent visual effects.',
    tags: ['AI绘画', '图像生成'],
    features: [
      '自然语言生成图像',
      '写实风格',
      '创意场景'
    ]
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    category: 'Image Generation & Design',
    websiteUrl: 'https://stablediffusionweb.com',
    description: 'Stable Diffusion is an open-source image-generation model that allows users to generate various types of images based on text prompts. It also supports operations such as image editing and image style transformation.',
    tags: ['AI绘画', '开源', '图像生成'],
    features: [
      '开源模型',
      '文本生成图像',
      '图像编辑',
      '风格转换'
    ]
  }
]; 