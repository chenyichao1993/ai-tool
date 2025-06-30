"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Crumb {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  paths?: Crumb[]; // 可选，传递则手动模式，否则自动模式
}

// 路由-名称映射（可扩展）
const routeMap: Record<string, string> = {
  "categories": "Category",
  "tools": "Tool",
  "tags": "Tag"
};

export default function Breadcrumbs({ paths }: BreadcrumbsProps) {
  const pathname = usePathname();

  // 自动模式：根据当前路径生成面包屑
  let crumbs: Crumb[] = [];
  if (paths && paths.length > 0) {
    crumbs = paths;
  } else {
    // 自动拆分路径
    const segments = pathname.split("/").filter(Boolean);
    // tags页面特殊处理
    if (segments[0] === "tags" && segments.length === 2) {
      crumbs.push({ name: "Home", href: "/" });
      // 标签名美化
      const tagName = decodeURIComponent(segments[1]).replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      crumbs.push({ name: tagName });
    } else {
      crumbs.push({ name: "Home", href: "/" });
      let href = "";
      segments.forEach((seg, idx) => {
        href += "/" + seg;
        let name = routeMap[seg] || seg.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        if (idx === segments.length - 1 && seg !== "categories" && seg !== "tools" && seg !== "tags") {
          name = decodeURIComponent(seg).replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        }
        crumbs.push({ name, href: idx === segments.length - 1 ? undefined : href });
      });
    }
  }

  // 移动端只显示Home、上一级、当前页
  let mobileCrumbs = crumbs;
  if (typeof window !== 'undefined' && window.innerWidth <= 600 && crumbs.length > 3) {
    mobileCrumbs = [crumbs[0], crumbs[crumbs.length - 2], crumbs[crumbs.length - 1]];
  }

  return (
    <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
      <ol
        className="flex items-center space-x-2 md:space-x-2 breadcrumb-mobile-wrap"
      >
        {(typeof window !== 'undefined' && window.innerWidth <= 600 ? mobileCrumbs : crumbs).map((crumb, idx, arr) => (
          <li
            key={idx}
            className="flex items-center breadcrumb-mobile-item"
            style={{ fontSize: window.innerWidth <= 600 ? '13px' : undefined, minWidth: 0, overflowWrap: 'anywhere', wordBreak: 'break-all', marginRight: window.innerWidth <= 600 ? 2 : undefined }}
          >
            {idx > 0 && <span className="mx-1 text-gray-400">&gt;</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:underline text-gray-700 font-medium" style={{overflowWrap: 'anywhere', wordBreak: 'break-all'}}>
                {crumb.name}
              </Link>
            ) : (
              <span className="text-gray-400" style={{overflowWrap: 'anywhere', wordBreak: 'break-all'}}>{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 