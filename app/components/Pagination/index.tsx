import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const prev = currentPage - 1;
  const next = currentPage + 1;
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Build a compact page range: always show first, last, current ± 1
  const pages = new Set<number>();
  pages.add(1);
  pages.add(totalPages);
  for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
    pages.add(i);
  }
  const pageList = Array.from(pages).sort((a, b) => a - b);

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-center gap-1"
    >
      {/* Previous */}
      {hasPrev ? (
        <Link
          href={`/?page=${prev}`}
          className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-nordic-dark dark:text-white bg-white dark:bg-white/5 border border-nordic-dark/10 dark:border-white/10 hover:border-mosque hover:text-mosque transition-all shadow-sm"
        >
          <span className="material-icons text-sm">arrow_back</span>
          Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-nordic-muted bg-white dark:bg-white/5 border border-nordic-dark/5 dark:border-white/5 cursor-not-allowed opacity-50">
          <span className="material-icons text-sm">arrow_back</span>
          Prev
        </span>
      )}

      {/* Page numbers with ellipsis gaps */}
      <div className="flex items-center gap-1">
        {pageList.map((p, idx) => {
          const prevPage = pageList[idx - 1];
          const showEllipsis = prevPage !== undefined && p - prevPage > 1;
          const isActive = p === currentPage;
          return (
            <span key={p} className="flex items-center gap-1">
              {showEllipsis && (
                <span className="px-2 text-nordic-muted text-sm select-none">…</span>
              )}
              {isActive ? (
                <span
                  aria-current="page"
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold bg-mosque text-white shadow-sm"
                >
                  {p}
                </span>
              ) : (
                <Link
                  href={`/?page=${p}`}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium text-nordic-dark dark:text-white bg-white dark:bg-white/5 border border-nordic-dark/10 dark:border-white/10 hover:border-mosque hover:text-mosque transition-all"
                >
                  {p}
                </Link>
              )}
            </span>
          );
        })}
      </div>

      {/* Next */}
      {hasNext ? (
        <Link
          href={`/?page=${next}`}
          className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-nordic-dark dark:text-white bg-white dark:bg-white/5 border border-nordic-dark/10 dark:border-white/10 hover:border-mosque hover:text-mosque transition-all shadow-sm"
        >
          Next
          <span className="material-icons text-sm">arrow_forward</span>
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-nordic-muted bg-white dark:bg-white/5 border border-nordic-dark/5 dark:border-white/5 cursor-not-allowed opacity-50">
          Next
          <span className="material-icons text-sm">arrow_forward</span>
        </span>
      )}
    </nav>
  );
}
