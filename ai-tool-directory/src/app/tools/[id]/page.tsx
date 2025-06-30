"use client"

import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Breadcrumbs from '../../Breadcrumbs'

// 星级评分组件
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ToolDetailPage({ params }: { params: { id: string } }) {
  const [tool, setTool] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    fetch('/AI%20tool.json')
      .then(res => res.json())
      .then(data => {
        const toolsWithId = data.map((tool: any) => ({
          ...tool,
          id: tool.name ? tool.name.toLowerCase().replace(/\s+/g, '-') : 'unknown'
        }))
        const found = toolsWithId.find((t: any) => t.id === params.id)
        setTool(found)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [params.id])

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>
  }
  if (!tool) {
    notFound()
  }

  const screenshot = tool.screenshot || '/placeholder1.png';
  const rating = tool.rating || 5; // 默认5星
  const reviews = tool.reviews || 0;
  const saved = tool.saved || 0;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        {/* Breadcrumbs: Home > Category > [Category Name] > [Tool Name] */}
        <Breadcrumbs paths={[
          { name: 'Home', href: '/' },
          { name: 'Category', href: '/categories' },
          tool.category ? { name: tool.category, href: `/categories/${encodeURIComponent(tool.category.toLowerCase().replace(/\s+/g, '-') )}` } : null,
          { name: tool.name }
        ].filter(Boolean)} />
        {/* Main content */}
        <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-8">
          {/* Left: Name, Intro, Button, Social */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{tool.name}</h1>
            <p className="text-base text-gray-700 mb-4">{tool.description}</p>
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <StarRating rating={rating} />
                <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span className="text-sm text-gray-600">{reviews} reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span className="text-sm text-gray-600">{saved} saved</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-[#7C5CFA] hover:bg-[#6842e6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C5CFA]"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Visit Website
              </a>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-[#7C5CFA] hover:bg-[#6842e6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C5CFA]"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {copySuccess ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
            {/* 动态渲染tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {tool.tags && tool.tags.map((tag: string) => (
                <Link key={tag} href={`/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`} target="_blank" rel="noopener noreferrer">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium border border-gray-200 text-gray-600 bg-gray-50 hover:bg-[#7C5CFA] hover:text-white hover:border-[#7C5CFA] cursor-pointer transition-colors duration-200"
                  >
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          {/* Right: Screenshot */}
          <div className="mt-8 md:mt-0 md:ml-8 flex-shrink-0">
            {/* 分享条 */}
            <div className="tool-social-row mb-3">
              <span className="text-sm text-gray-700 font-medium">Send to a friend:</span>
              <div className="tool-social-icons">
                {/* Facebook */}
                <div className="relative group">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="transition-colors">
                    <img src="/social/facebook.png" alt="Facebook" className="w-5 h-5 object-contain rounded-lg group-hover:ring-2 group-hover:ring-[#1877F3] transition" />
                  </a>
                  <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">Share on Facebook</span>
                </div>
                {/* Instagram */}
                <div className="relative group">
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Share on Instagram" className="transition-colors">
                    <img src="/social/instagram.png" alt="Instagram" className="w-5 h-5 object-contain rounded-lg group-hover:ring-2 group-hover:ring-[#E4405F] transition" />
                  </a>
                  <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">Share on Instagram</span>
                </div>
                {/* X(Twitter) */}
                <div className="relative group">
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(tool.name)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" className="transition-colors">
                    <img src="/social/x.png" alt="X" className="w-5 h-5 object-contain rounded-lg group-hover:ring-2 group-hover:ring-black transition" />
                  </a>
                  <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">Share on X</span>
                </div>
                {/* LinkedIn */}
                <div className="relative group">
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className="transition-colors">
                    <img src="/social/linkedin.png" alt="LinkedIn" className="w-5 h-5 object-contain rounded-lg group-hover:ring-2 group-hover:ring-[#0A66C2] transition" />
                  </a>
                  <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">Share on LinkedIn</span>
                </div>
                {/* Reddit */}
                <div className="relative group">
                  <a href={`https://www.reddit.com/submit?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&title=${encodeURIComponent(tool.name)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Reddit" className="transition-colors">
                    <img src="/social/reddit.png" alt="Reddit" className="w-5 h-5 object-contain rounded-lg group-hover:ring-2 group-hover:ring-[#FF4500] transition" />
                  </a>
                  <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">Share on Reddit</span>
                </div>
                {/* 邮件 */}
                <div className="relative group">
                  <a href={`mailto:?subject=${encodeURIComponent('Check out this AI tool: ' + tool.name)}&body=${encodeURIComponent('I found this AI tool and thought you might like it: ' + (typeof window !== 'undefined' ? window.location.href : ''))}`} target="_blank" rel="noopener noreferrer" aria-label="Share by Email" className="transition-colors">
                    <img src="/social/email.png" alt="Email" className="w-5 h-5 object-contain rounded-lg group-hover:ring-2 group-hover:ring-[#7C5CFA] transition" />
                  </a>
                  <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">Share by Email</span>
                </div>
              </div>
            </div>
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[460px] h-[260px] relative group rounded-xl overflow-hidden"
            >
              <img
                src={screenshot}
                alt="Website Screenshot"
                className="w-full h-full object-cover rounded-xl border shadow"
                loading="lazy"
                onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder1.png'; }}
              />
              {/* 遮罩层 */}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                <span className="text-white text-2xl font-bold">Visit Website</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
} 