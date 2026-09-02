import React from 'react';

export function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Universal Filter Designer
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Conjugate-Aware Digital Filter Analysis
            </p>
          </div>
          
          <div className="text-center sm:text-right">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Designed & Created by</span>{' '}
              <span className="font-semibold text-sky-600 dark:text-sky-400">Chaitanya Shelar</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Developed & Deployed by{' '}
              <span className="font-medium text-slate-600 dark:text-slate-300">Ramzan Khan</span>
            </p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} Universal Filter Designer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
