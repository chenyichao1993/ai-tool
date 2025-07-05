"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from "../../Breadcrumbs";
import ToolCard from '../../ToolCard';

interface Tool {
  category: string;
  name: string;
  websiteUrl: string;
  description: string;
  tags: string[];
  id: string;
}

function getLogoUrl(websiteUrl: string) {
  try {
    const url = new URL(websiteUrl);
    return [
      `https://unavatar.io/${url.hostname}`,
      `https://api.faviconkit.com/${url.hostname}/64`,
    ];
  } catch {
    return [];
  }
}

function slugifyTag(tag: string) {
  return tag
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function getTagMainPart(tag: string) {
  let main = tag.split('(')[0].trim();
  main = main.replace(/[^a-zA-Z0-9\- ]/g, '');
  main = main.replace(/\s+/g, ' ').trim();
  main = main.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return main;
}

function slugifyTagForUrl(tag: string) {
  let main = tag.split('(')[0].trim();
  main = main.replace(/[^a-zA-Z0-9\- ]/g, '');
  main = main.replace(/[\s\-]+/g, '-');
  main = main.replace(/^\-+|\-+$/g, '');
  return main.toLowerCase();
}

function smartTagMainPart(tag: string) {
  let main = tag.split('(')[0].trim();
  main = main.replace(/[-/_]+/g, ' ');
  main = main.replace(/([a-z])([A-Z])/g, '$1 $2');
  main = main.replace(/\s+/g, ' ').trim();
  let words = main.split(' ');
  words = words.filter(Boolean).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  return words.join(' ');
}

export default function TagClient({ tagSlug, tagName }: { tagSlug: string; tagName?: string | null }) {
  const [allTools, setAllTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayTag, setDisplayTag] = useState('');

  useEffect(() => {
    fetch('/AI%20tool.json')
      .then(res => res.json())
      .then(data => {
        const toolsWithId = data.map((tool: any) => ({
          ...tool,
          id: tool.name ? tool.name.toLowerCase().replace(/\s+/g, '-') : 'unknown'
        }));
        setAllTools(toolsWithId);
      });
  }, []);

  useEffect(() => {
    if (allTools.length > 0) {
      // 用主干分词匹配，所有主干一致的tag都能被检索到
      const mainTag = smartTagMainPart(tagSlug.replace(/-/g, ' '));
      const results = allTools.filter(tool =>
        tool.tags?.some(t => smartTagMainPart(t).toLowerCase() === mainTag.toLowerCase())
      );
      setFilteredTools(results);
      setDisplayTag(mainTag);
      setLoading(false);
    }
  }, [allTools, tagSlug]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <Breadcrumbs />
        {!loading && (
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-center break-words">
              <span className="text-black">Best </span>
              <span className="text-black">{filteredTools.length}</span>
              <span className="text-black"> </span>
              <span className="text-[#7C5CFA]">{displayTag}</span>
              <span className="text-black"> Tools</span>
            </h1>
          </div>
        )}
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
            <p>We couldn't find any tools with the tag "{tagName || tagSlug}".</p>
          </div>
        )}
      </div>
    </main>
  );
} 