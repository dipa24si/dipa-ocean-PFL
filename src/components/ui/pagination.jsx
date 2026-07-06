import React from 'react';

export function Pagination({ children, className = '' }) {
  return (
    <nav aria-label="Pagination" className={`flex items-center justify-center ${className}`}>
      {children}
    </nav>
  );
}

export function PaginationContent({ children }) {
  return <ul className="inline-flex items-center gap-2">{children}</ul>;
}

export function PaginationItem({ children }) {
  return <li>{children}</li>;
}

export function PaginationLink({ href = '#', isActive = false, onClick, children }) {
  const base = 'inline-flex items-center justify-center px-3 py-1 rounded-md text-sm';
  const active = isActive ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border border-gray-200';

  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      className={`${base} ${active}`}
    >
      {children}
    </a>
  );
}

export function PaginationPrevious({ onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${disabled ? 'opacity-50 cursor-not-allowed' : 'bg-white border border-gray-200'}`}
    >
      Prev
    </button>
  );
}

export function PaginationNext({ onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${disabled ? 'opacity-50 cursor-not-allowed' : 'bg-white border border-gray-200'}`}
    >
      Next
    </button>
  );
}

export function PaginationEllipsis() {
  return <span className="inline-flex items-center px-2 text-sm text-gray-500">…</span>;
}

export default Pagination;
