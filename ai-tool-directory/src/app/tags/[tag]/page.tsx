"use client"

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Breadcrumbs from "../../Breadcrumbs";
import ToolCard from '../../ToolCard';

// Tool type definition from your project
interface Tool {
  category: string;
  name: string;
  websiteUrl: string;
  description: string;
  tags: string[];
  id: string;
}

// Helper function to get logo URL
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

export default function TagPage({ params }: { params: { tag: string } }) {
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
      const slugToFind = decodeURIComponent(params.tag);
      
      const results = allTools.filter(tool => 
        tool.tags?.some(t => (t.toLowerCase().replace(/\s+/g, '-')) === slugToFind)
      );
      
      setFilteredTools(results);

      if (results.length > 0) {
        // Find the exact tag string from the first matching tool for correct capitalization
        const matchingTag = results[0].tags.find(t => (t.toLowerCase().replace(/\s+/g, '-')) === slugToFind);
        setDisplayTag(matchingTag || '');
      } else {
        // Fallback for title if no tools are found - this might not be perfectly capitalized
        const fallbackTag = slugToFind
          .replace(/-/g, ' ')
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        setDisplayTag(fallbackTag);
      }
      setLoading(false);
    }
  }, [allTools, params.tag]);

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
            <p>We couldn't find any tools with the tag "{displayTag}".</p>
          </div>
        )}
      </div>
    </main>
  );
} 