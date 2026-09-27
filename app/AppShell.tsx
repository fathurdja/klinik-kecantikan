'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <TopBar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        {children}
      </div>
    </div>
  );
}
