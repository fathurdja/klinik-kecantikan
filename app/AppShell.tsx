'use client';

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { requestForToken, onMessageListener } from '../lib/firebase';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{title: string, body: string} | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Request permission & get token
    requestForToken().then((token) => {
      if (token) {
        // DI SINI LOGIKA UNTUK BACKEND:
        // Jika user sudah login, kirim token ini ke backend
        // fetch('/api/user/fcm-token', { method: 'POST', body: JSON.stringify({ token }) })
        console.log("Token FCM Siap dikirim ke backend:", token);
      }
    });

    // Listen for incoming foreground messages
    let unsubscribe: any = null;
    const listen = async () => {
      try {
        unsubscribe = onMessageListener((payload: any) => {
          console.log("Pesan Diterima di Frontend:", payload);
          if (payload?.notification) {
            const newNotif = {
              id: Date.now(),
              title: payload.notification.title,
              body: payload.notification.body,
              time: new Date().toLocaleTimeString(),
              read: false
            };
            
            // Tampilkan Toast
            setToast({ title: newNotif.title, body: newNotif.body });
            
            // Tambahkan ke Lonceng Notifikasi
            setNotifications(prev => [newNotif, ...prev]);
            
            // Auto-hide Toast after 5 seconds
            setTimeout(() => {
              setToast(null);
            }, 5000);
          }
        });
      } catch (err) {
        console.log('Failed to listen to messages: ', err);
      }
    };
    
    listen();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <div className="app-layout">
      {toast && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 9999, 
          background: 'var(--primary-light)', color: 'var(--primary-dark)', 
          padding: '16px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          borderLeft: '4px solid var(--primary-main)', minWidth: '300px',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600 }}>🔔 {toast.title}</h4>
          <p style={{ margin: 0, fontSize: '13px' }}>{toast.body}</p>
          <button 
            onClick={() => setToast(null)}
            style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}
      
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <TopBar 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
          notifications={notifications}
          onMarkAllRead={() => setNotifications(notifications.map(n => ({...n, read: true})))}
        />
        {children}
      </div>
    </div>
  );
}
