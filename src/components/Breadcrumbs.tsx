import React from 'react';
import { useRouter } from '../context/RouterContext';
import { PageRoute } from '../types';

interface BreadcrumbsProps {
  items: { label: string; page?: PageRoute }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { navigateTo } = useRouter();

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 max-w-7xl mx-auto w-full">
      <ol className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
        <li>
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Home
          </button>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li aria-hidden="true" className="text-neutral-400 select-none">/</li>
              <li>
                {isLast || !item.page ? (
                  <span className="text-neutral-900 font-semibold" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <button
                    onClick={() => navigateTo(item.page!)}
                    className="hover:text-neutral-900 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
