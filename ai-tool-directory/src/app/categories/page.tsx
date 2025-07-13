"use client";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import Breadcrumbs from "../Breadcrumbs";

function slugifyCategory(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [tools, setTools] = useState<any[]>([]);
  const [meta, setMeta] = useState<Record<string, { icon: string; desc: string }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/AI%20tool.json").then(res => res.json()),
      fetch("/categories-meta.json").then(res => res.json())
    ]).then(([toolList, metaObj]) => {
      // 动态提取所有唯一分类，按首次出现顺序
      const seen = new Set<string>();
      const cats: string[] = [];
      for (const tool of toolList) {
        if (tool.category && !seen.has(tool.category)) {
          seen.add(tool.category);
          cats.push(tool.category);
        }
      }
      setCategories(cats);
      setTools(toolList);
      setMeta(metaObj);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // 统计每个分类下的工具数量
  const categoryStats = useMemo(() => {
    return categories.map(cat => {
      const toolsInCat = tools.filter(t => t.category === cat);
      return {
        name: cat,
        count: toolsInCat.length,
        tools: toolsInCat
      };
    });
  }, [categories, tools]);

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
            const metaItem = meta[cat.name] || { icon: "📦", desc: `AI tools for ${cat.name.toLowerCase()}.` };
            const topTools = cat.tools.slice(0, 3);
            return (
              <Link
                key={cat.name}
                href={`/categories/${slugifyCategory(cat.name)}`}
                className="block p-6 rounded-xl shadow bg-white hover:bg-indigo-50 border border-gray-200 transition group relative"
                style={{ minHeight: 180 }}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{metaItem.icon}</span>
                  <span className="text-lg font-semibold text-gray-800 group-hover:text-indigo-700 transition">{cat.name}</span>
                </div>
                <div className="text-gray-500 text-sm mb-2 min-h-[36px]">{metaItem.desc}</div>
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