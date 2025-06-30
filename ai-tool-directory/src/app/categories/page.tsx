"use client";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import Breadcrumbs from "../Breadcrumbs";

const CATEGORY_LIST = [
  "AI Writing & Content Generation",
  "Image Generation & Design",
  "Video Production & Editing",
  "Audio Processing & Generation",
  "Office Productivity Tools",
  "Coding & Development",
  "Search & Prompt Engineering"
];

// 分类icon和描述映射
const categoryMeta: Record<string, { icon: string; desc: string }> = {
  "AI Writing & Content Generation": {
    icon: "📝",
    desc: "AI writing, content generation, summarization, and more."
  },
  "Image Generation & Design": {
    icon: "🎨",
    desc: "AI drawing, image generation, design assistant, and creative tools."
  },
  "Video Production & Editing": {
    icon: "🎬",
    desc: "AI video creation, editing, and production tools."
  },
  "Audio Processing & Generation": {
    icon: "🎵",
    desc: "AI audio processing, speech synthesis, and music generation."
  },
  "Office Productivity Tools": {
    icon: "💼",
    desc: "Office automation, productivity, document processing, and more."
  },
  "Coding & Development": {
    icon: "💻",
    desc: "AI coding assistants, code generation, and developer tools."
  },
  "Search & Prompt Engineering": {
    icon: "🔍",
    desc: "AI search, prompt engineering, and information retrieval tools."
  }
};

export default function CategoriesPage() {
  // 新增：用来保存异步加载的工具数据
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/AI tool.json")
      .then(res => res.json())
      .then(data => {
        setTools(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 统计每个分类下的工具数量
  const categoryStats = useMemo(() => {
    return CATEGORY_LIST.map(cat => {
      const toolsInCat = tools.filter(t => t.category === cat);
      return {
        name: cat,
        count: toolsInCat.length,
        tools: toolsInCat
      };
    });
  }, [tools]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 text-lg">加载中...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 pt-4 pb-12">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">All Categories</h1>
        <p className="text-gray-500 mb-8 text-center">Browse all AI tool categories and discover the best tools for your needs.</p>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {categoryStats.map(cat => {
            const meta = categoryMeta[cat.name] || { icon: "📦", desc: "AI tool category." };
            const topTools = cat.tools.slice(0, 3);
            return (
              <Link
                key={cat.name}
                href={`/categories/${encodeURIComponent(cat.name.toLowerCase().replace(/\s+/g, '-'))}`}
                className="block p-6 rounded-xl shadow bg-white hover:bg-indigo-50 border border-gray-200 transition group relative"
                style={{ minHeight: 180 }}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{meta.icon}</span>
                  <span className="text-lg font-semibold text-gray-800 group-hover:text-indigo-700 transition">{cat.name}</span>
                </div>
                <div className="text-gray-500 text-sm mb-2 min-h-[36px]">{meta.desc}</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-indigo-100 text-indigo-700 rounded-full px-2 py-0.5">{cat.count} tools</span>
                  {topTools.map(t => t.screenshot && (
                    <img
                      key={t.name}
                      src={t.screenshot}
                      alt={t.name}
                      className="w-6 h-6 rounded shadow border border-gray-200 bg-white"
                      title={t.name}
                    />
                  ))}
                </div>
                <span className="absolute right-4 bottom-4 text-indigo-400 text-xl group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
} 