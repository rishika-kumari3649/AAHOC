import React from 'react';
import { PageHeader } from './PageHeader';

interface PanelPlaceholderProps {
  panel: string;
  section: string;
  path: string;
  description: string;
}

export const PanelPlaceholder: React.FC<PanelPlaceholderProps> = ({
  panel,
  section,
  path,
  description,
}) => {
  return (
    <div className="w-full">
      <PageHeader 
        title={section} 
        subtitle={description} 
        roleBadge={panel} 
      />
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-800">{section} Route Foundation</h2>
          <p className="mt-1 max-w-md text-sm text-slate-500">
            {panel} Panel component scaffolded at <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-700 font-mono">{path}</code>. Ready for domain feature integration.
          </p>
          <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
            <span>AAHOC Monorepo</span>
            <span>•</span>
            <span>React + TypeScript + Vite</span>
            <span>•</span>
            <span>Role-Based Panel</span>
          </div>
        </div>
      </div>
    </div>
  );
};