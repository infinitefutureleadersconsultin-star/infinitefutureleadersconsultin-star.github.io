import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-200 ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
