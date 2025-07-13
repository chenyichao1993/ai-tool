'use client';
import React, { useState } from 'react';

export default function BatchImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<{success: boolean, message: string, details?: { name: string, status: 'success' | 'duplicate' | 'failed', reason?: string }[]} | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);

    try {
      const response = await fetch('/api/batch-import', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: '上传失败，请重试'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const downloadTemplate = () => {
    const link = document.createElement('a');
    link.href = '/tools-template.csv';
    link.download = 'tools-template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">批量导入工具</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">使用说明</h2>
        <div className="space-y-3 text-gray-600">
          <p>• 支持 CSV 和 JSON 格式的文件导入</p>
          <p>• 必需字段：name, category, websiteUrl, description</p>
          <p>• 数组字段（如 tags, keyFeatures）使用 | 分隔</p>
          <p>• FAQ 格式：问题|答案,问题|答案</p>
          <p>• 重复的工具名称将被跳过</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">下载模板</h2>
        <button
          onClick={downloadTemplate}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          下载 CSV 模板
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">上传文件</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              文件格式
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as 'csv' | 'json')}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              选择文件
            </label>
            <input
              type="file"
              accept={format === 'csv' ? '.csv' : '.json'}
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!file || isUploading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isUploading ? '上传中...' : '开始导入'}
          </button>
        </form>

        {result && (
          <>
            <div className={`mt-4 p-4 rounded-lg ${
              result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {result.message}
            </div>
            {/* 详细导入结果表格 */}
            {Array.isArray(result.details) && result.details.length > 0 && (
              <div className="mt-4">
                <table className="min-w-full border text-sm bg-white">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">工具名称</th>
                      <th className="border px-2 py-1">状态</th>
                      <th className="border px-2 py-1">原因</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.details.map((item, idx) => (
                      <tr key={item.name + idx}>
                        <td className="border px-2 py-1">{item.name}</td>
                        <td className="border px-2 py-1">
                          {item.status === 'success' && <span className="text-green-600">成功</span>}
                          {item.status === 'duplicate' && <span className="text-yellow-600">重复</span>}
                          {item.status === 'failed' && <span className="text-red-600">失败</span>}
                        </td>
                        <td className="border px-2 py-1">{item.reason || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">数据格式示例</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">CSV 格式</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`name,category,websiteUrl,description,tags
"ChatGPT","AI Writing","https://chat.openai.com","AI聊天助手","Text Generation|AI Chat"`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">JSON 格式</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`[
  {
    "name": "ChatGPT",
    "category": "AI Writing",
    "websiteUrl": "https://chat.openai.com",
    "description": "AI聊天助手",
    "tags": ["Text Generation", "AI Chat"]
  }
]`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
} 