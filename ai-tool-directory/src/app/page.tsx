'use client';

import React, { useEffect, useState, useRef } from 'react';

// Tool type definition
interface Tool {
  category: string;
  name: string;
  websiteUrl: string;
  description: string;
  id: string;
  screenshot?: string;
}

// 根据网址生成logoUrl（优先unavatar.io，失败用faviconkit，最后用默认SVG）
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

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTooltip, setShowTooltip] = useState<{ [idx: string]: boolean }>({});
  const [showAllMap, setShowAllMap] = useState<{ [cat: string]: boolean }>({});

  useEffect(() => {
    fetch('/AI%20tool.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tool data');
        return res.json();
      })
      .then((data) => {
        // 为每个工具自动生成id字段
        const toolsWithId = data.map((tool) => ({
          ...tool,
          id: tool.name ? tool.name.toLowerCase().replace(/\s+/g, '-') : 'unknown'
        }));
        setTools(toolsWithId);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 获取所有分类
  const categories = Array.from(new Set(tools.map(t => t.category))).filter(Boolean);

  // 搜索过滤逻辑
  const searchLower = search.trim().toLowerCase();
  let filteredTools: Tool[];
  if (searchLower) {
    // 全站搜索，包含tags
    filteredTools = tools.filter(t =>
      t.name.toLowerCase().includes(searchLower) ||
      t.category.toLowerCase().includes(searchLower) ||
      t.description.toLowerCase().includes(searchLower) ||
      (Array.isArray((t as any).tags) && (t as any).tags.join(' ').toLowerCase().includes(searchLower))
    );
  } else {
    // 按分类筛选
    filteredTools = selectedCategory === 'All' ? tools : tools.filter(t => t.category === selectedCategory);
  }

  // 工具分组（基于过滤后的工具）
  const groupedTools: { [cat: string]: Tool[] } = {};
  categories.forEach(cat => {
    groupedTools[cat] = filteredTools.filter(t => t.category === cat);
  });

  // 分类详情页：只显示选中分类全部工具
  const isCategoryPage = selectedCategory !== 'All';

  // 首页分组瀑布流：每组显示前8个，按钮始终显示，点击跳转新页面
  function handleShowAll(cat: string) {
    window.open(`/categories/${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, '-'))}`, '_blank');
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 侧边栏 - fixed定位，始终可见 */}
      <div className={`fixed top-16 left-0 h-[calc(100vh-64px)] z-30 transition-all duration-300 ${sidebarOpen ? 'w-56' : 'w-0'} bg-white border-r border-gray-200 flex flex-col hidden md:flex`}>
        {/* open/close 按钮（SVG图标+tooltip） */}
        {sidebarOpen ? (
          <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-40">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 border border-gray-300 shadow focus:outline-none relative"
              onClick={() => setSidebarOpen(false)}
              onMouseEnter={() => setShowTooltip({ ...showTooltip, sidebar: true })}
              onMouseLeave={() => setShowTooltip({ ...showTooltip, sidebar: false })}
              aria-label="Close sidebar"
              type="button"
            >
              {/* SVG图标 */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="14" height="14" rx="4" fill="#fff" stroke="#bbb" strokeWidth="1.5" />
                <rect x="7.5" y="5" width="2" height="10" rx="1" fill="#bbb" />
              </svg>
              {/* Tooltip */}
              {showTooltip.sidebar && (
                <div className="absolute left-10 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap pointer-events-none">
                  Close sidebar
                </div>
              )}
            </button>
          </div>
        ) : (
          <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 border border-gray-300 shadow focus:outline-none relative"
              onClick={() => setSidebarOpen(true)}
              onMouseEnter={() => setShowTooltip({ ...showTooltip, sidebar: true })}
              onMouseLeave={() => setShowTooltip({ ...showTooltip, sidebar: false })}
              aria-label="Open sidebar"
              type="button"
            >
              {/* SVG图标 */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="14" height="14" rx="4" fill="#fff" stroke="#bbb" strokeWidth="1.5" />
                <rect x="7.5" y="5" width="2" height="10" rx="1" fill="#bbb" />
              </svg>
              {/* Tooltip */}
              {showTooltip.sidebar && (
                <div className="absolute left-10 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap pointer-events-none">
                  Open sidebar
                </div>
              )}
            </button>
          </div>
        )}
        {/* 分类列表 */}
        <div className={`flex flex-col gap-2 mt-4 px-2 overflow-y-auto transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{maxHeight: 'calc(100vh - 48px)'}}>
          <button
            className={`w-full px-4 py-2 rounded-lg text-left border text-sm font-medium transition ${selectedCategory === 'All' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50'}`}
            onClick={() => { setSelectedCategory('All'); setSearch(''); }}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`w-full px-4 py-2 rounded-lg text-left border text-sm font-medium transition ${selectedCategory === cat ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50'}`}
              onClick={() => { setSelectedCategory(cat); setSearch(''); }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      {/* 主内容区，左侧留出sidebar宽度，sidebarOpen=false时内容居中 */}
      <main className={`flex-1 transition-all duration-300 ml-0 ${sidebarOpen ? 'md:ml-[260px]' : 'md:ml-0 md:flex md:justify-center'}`}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-4 py-8">
          {/* 顶部导语 */}
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-6 text-gray-900 mt-8">
            Discover The Best AI Websites & AI Tools
          </h1>
          {/* 搜索框 */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-3xl">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search AI tools by name, category or description..."
                className="w-full pr-16 pl-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base"
                style={{ height: 44 }}
            />
              <span
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-[#6C47FF] flex items-center justify-center shadow"
                style={{ width: 40, height: 40, borderRadius: '50%', boxShadow: '0 2px 8px rgba(108,71,255,0.08)', cursor: 'pointer' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </div>
          {/* 分割线 */}
          <div className="max-w-2xl mx-auto border-b border-gray-200 mb-8"></div>
          {/* 错误或加载状态 */}
          {loading && <div className="text-center text-gray-500">Loading tools...</div>}
          {error && <div className="text-center text-red-500">{error}</div>}
          {/* 分类详情页 or 首页分组瀑布流 */}
          {searchLower ? (
            filteredTools.length === 0 ? (
              <div className="flex items-center justify-center w-full" style={{ minHeight: '220px' }}>
                <span className="text-gray-400 text-xl">No tools found. Please try another keyword.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-12 w-full">
                {categories.filter(cat => groupedTools[cat].length > 0).map(cat => (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{cat}</h2>
                    </div>
                    <div className="grid gap-3 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {groupedTools[cat].map((tool, idx) => (
                        <ToolCard key={idx} tool={tool} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            isCategoryPage ? (
              <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCategory}</h2>
                  <button
                    className="text-indigo-600 hover:underline text-sm font-medium"
                    onClick={() => window.open(`/categories/${encodeURIComponent(selectedCategory.toLowerCase().replace(/\s+/g, '-'))}`, '_blank')}
                  >
                    More »
                  </button>
                </div>
                <div className="grid gap-3 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {groupedTools[selectedCategory]?.length ? (
                    groupedTools[selectedCategory].slice(0, 8).map((tool, idx) => (
                      <ToolCard key={idx} tool={tool} />
                    ))
                  ) : (
                    <div className="col-span-full text-center text-gray-400 py-8">未找到相关工具</div>
                  )}
                </div>
              </div>
            ) : (
              filteredTools.length === 0 ? (
                <div className="flex items-center justify-center w-full" style={{ minHeight: '220px' }}>
                  <span className="text-gray-400 text-xl">No tools found. Please try another keyword.</span>
                </div>
              ) : (
                <div className="flex flex-col gap-12 w-full">
                  {categories.filter(cat => groupedTools[cat].length > 0).map(cat => (
                    <div key={cat}>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">{cat}</h2>
                        {/* Check all XXX tools按钮始终显示 */}
                        <button
                          className="text-indigo-600 hover:underline text-sm font-medium"
                          onClick={() => handleShowAll(cat)}
                        >
                          More »
                        </button>
                      </div>
                      <div className="grid gap-3 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {groupedTools[cat].slice(0, 8).map((tool, idx) => (
                          <ToolCard key={idx} tool={tool} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )
            )
          )}
        </div>
      </main>
    </div>
  );
}

// 工具卡片组件
function ToolCard({ tool }: { tool: Tool }) {
  const descRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ left: number; top: number } | null>(null);

  useEffect(() => {
    const element = descRef.current;
    if (element) {
      if (element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth) {
        setIsClamped(true);
    } else {
        setIsClamped(false);
      }
    }
  }, [tool.description, descRef]);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (isClamped && descRef.current) {
      const rect = descRef.current.getBoundingClientRect();
      setTooltipPos({
        left: rect.left + rect.width / 2,
        top: rect.bottom + 8 // 8px下方间距
      });
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    setTooltipPos(null);
  };

  return (
    <div
      className="group relative block bg-white dark:bg-gray-800 border-2 border-gray-300 shadow-lg rounded-xl max-w-sm w-full mx-auto mb-2 overflow-hidden transition-shadow duration-300 hover:shadow-xl cursor-pointer md:border md:border-gray-200 md:shadow-lg md:rounded-lg md:max-w-full md:mx-0 md:mb-0"
      onClick={() => window.open(`/tools/${tool.id}`, '_blank')}
    >
      <a
        href={tool.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="absolute top-3 right-3 z-10 hidden group-hover:flex items-center justify-center w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full transition"
        title="Visit official website"
        aria-label="Visit official website"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
           <rect x="3" y="3" width="14" height="14" rx="3" stroke="#888" strokeWidth="1.5" fill="none"/>
          <path d="M9 7h4v4" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 11l4-4" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
      <div className="h-52 w-full bg-gray-100 dark:bg-gray-700 md:h-40">
        {tool.screenshot ? (
        <img
            src={tool.screenshot}
            alt={tool.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>
      <div className="p-4 md:p-4">
        <h3 className="text-lg font-bold mb-1 truncate text-gray-800 dark:text-white">{tool.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{tool.category}</p>
        <p
        ref={descRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
          className="text-sm text-gray-600 dark:text-gray-300 relative md:[display:-webkit-box] md:[-webkit-line-clamp:3] md:[-webkit-box-orient:vertical] md:overflow-hidden md:text-ellipsis"
      >
        {tool.description}
        </p>
        {showTooltip && tooltipPos && (
          <div
            className="fixed z-50 bg-black text-white text-sm rounded px-4 py-3 shadow-lg max-w-xs w-max pointer-events-none"
            style={{
              left: tooltipPos.left,
              top: tooltipPos.top,
              transform: 'translateX(-50%)',
              whiteSpace: 'pre-line',
            }}
          >
            {tool.description}
            <span
              className="absolute left-1/2"
              style={{
                bottom: '100%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: '8px solid #000',
                content: '""',
                display: 'block',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}