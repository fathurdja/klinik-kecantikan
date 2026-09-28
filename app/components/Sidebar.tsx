'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', icon: '📊', href: '/' },
  { section: 'OPERASIONAL' },
  { label: 'Appointment', icon: '📅', href: '/appointment', badge: 6 },
  { label: 'Pasien', icon: '👤', href: '/pasien' },
  { label: 'Rekam Medis', icon: '📝', href: '/emr' },
  { label: 'POS & Kasir', icon: '💳', href: '/pos' },
  { section: 'MANAJEMEN' },
  { label: 'Inventori', icon: '📦', href: '/inventori' },
  { label: 'Paket & Member', icon: '🎁', href: '/paket' },
  { label: 'Komisi', icon: '💰', href: '/komisi' },
  { label: 'Keuangan', icon: '📈', href: '/keuangan' },
  { section: 'SISTEM' },
  { label: 'Data Master', icon: '🗂️', href: '/master' },
  { label: 'Pengaturan', icon: '⚙️', href: '/pengaturan' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-logo">G</div>
          <div className="sidebar-brand-text">
            <h2>GlowCare</h2>
            <span>Beauty Clinic ERP</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item, index) => {
            if ('section' in item) {
              return (
                <div key={index} className="sidebar-section-title">
                  {item.section}
                </div>
              );
            }

            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href!));

            return (
              <Link
                key={index}
                href={item.href!}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="sidebar-link-icon">{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="sidebar-link-badge">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-user">
          <div className="sidebar-avatar">AP</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">Dr. Ayu Paramitha</div>
            <div className="sidebar-user-role">Owner / Manajemen</div>
          </div>
        </div>
      </aside>
    </>
  );
}
