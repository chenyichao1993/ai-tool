"use client";
import React, { useEffect, useState } from 'react';
import Breadcrumbs from "../../Breadcrumbs";
import ToolCard from '../../ToolCard';

interface Tool {
  category: string;
  name: string;
  websiteUrl: string;
  description: string;
  tags?: string[];
  id: string;
  screenshot?: string;
}

function slugifyCategory(category: string) {
  return category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export default function CategoryClient({ categorySlug, categoryName }: { categorySlug: string; categoryName?: string | null }) {
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCategory, setDisplayCategory] = useState('');

  useEffect(() => {
    fetch('/AI%20tool.json')
      .then(res => res.json())
      .then(data => {
        const toolsWithId = data.map((tool: any) => ({
          ...tool,
          id: tool.name ? tool.name.toLowerCase().replace(/[.&\s]+/g, '-') : 'unknown',
        }));
        setAllTools(toolsWithId);
      });
  }, []);

  useEffect(() => {
    if (allTools.length > 0) {
      const slugToFind = decodeURIComponent(categorySlug);
      const results = allTools.filter(tool =>
        slugifyCategory(tool.category) === slugToFind
      );
      setFilteredTools(results);
      setLoading(false);
    }
  }, [allTools, categorySlug]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <Breadcrumbs />
        <div className="category-title-wrap mb-8">
          <h1 className="category-title text-3xl font-bold text-gray-900 mb-2">
            {categoryName || categorySlug}{/tools$/i.test(displayCategory.trim()) ? '' : ' Tools'}
          </h1>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">Loading tools...</div>
        ) : filteredTools.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredTools.map((tool, idx) => (
              <ToolCard key={idx} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-16">
            <h3 className="text-xl font-semibold">No tools found</h3>
            <p>No tools found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
} 