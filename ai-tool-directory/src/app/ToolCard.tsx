import React, { useRef, useState, useEffect } from 'react';

interface Tool {
  category: string;
  name: string;
  websiteUrl: string;
  description: string;
  id: string;
  screenshot?: string;
}

const ToolCard = ({ tool }: { tool: Tool }) => {
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
};

export default ToolCard; 