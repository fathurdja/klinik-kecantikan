'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EMRPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'S' | 'O' | 'A' | 'P'>('S');

  return (
    <>
      <div className="page-header" style={{ paddingBottom: 24 }}>
        <div className="card" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: "url('https://i.pravatar.cc/150?u=sarah') center/cover", border: '1px solid #eee' }} />
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 4px 0', fontSize: 20 }}>
                Sarah Anggraini 
                <span style={{ fontSize: 11, background: 'var(--color-gold-light)', color: 'var(--color-gold)', padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>VIP</span>
              </h2>
              <p className="text-muted text-sm" style={{ margin: 0 }}>RM-202609-0012 &bull; 23 Th / P</p>
            </div>
          </div>
          
          <div className="text-sm text-secondary" style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 4px 0' }}>NIK: 7371xxxxxxxxxxxx</p>
            <p style={{ margin: 0 }}>Kunjungan: 28/09/2026 14:30</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
            <span className="badge badge-error" style={{ fontSize: 11 }}>ALERGI: SEAFOOD & AMOXICILLIN</span>
            <span className="badge badge-success" style={{ fontSize: 11 }}>✓ SATUSEHAT SYNCED</span>
          </div>
        </div>
      </div>

      <div className="page-content" style={{ paddingTop: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          
          {/* LEFT COLUMN: Subjective */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ 
              background: activeTab === 'S' ? 'var(--color-primary-light)' : 'transparent', 
              color: activeTab === 'S' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              padding: '10px 16px', borderRadius: '12px 12px 0 0', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 12
            }}>
              <span style={{ background: 'var(--color-primary)', color: '#fff', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, fontSize: 12 }}>S</span>
              Subjective Tab Panel
            </div>

            <div className="card" style={{ padding: 20 }}>
              <h4 style={{ marginBottom: 12 }}>Keluhan Utama</h4>
              <textarea className="form-input" rows={3} style={{ height: 'auto' }} defaultValue="Mencerahkan wajah, bekas jerawat..."></textarea>
            </div>

            <div className="card" style={{ padding: 20 }}>
              <h4 style={{ marginBottom: 12 }}>Riwayat Skincare Saat Ini</h4>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(38, 50, 56, 0.15)', borderRadius: 6, padding: '8px 12px', fontSize: 13, marginBottom: 12 }}>
                <span>Krim malam Dokter X - 6 bulan</span>
                <button style={{ color: 'var(--color-text-muted)', cursor: 'pointer', background: 'none', border: 'none' }}>✕</button>
              </div>
              <select className="form-select">
                <option>Form Input</option>
              </select>
            </div>

            <div className="card" style={{ padding: 20 }}>
              <h4 style={{ marginBottom: 12 }}>Ekspektasi Pasien</h4>
              <textarea className="form-input" rows={3} style={{ height: 'auto' }} defaultValue="Pori mengecil, kulit glowing"></textarea>
            </div>

            <div className="card" style={{ padding: 20 }}>
              <h4 style={{ marginBottom: 12 }}>Informed Consent & Otorisasi</h4>
              <div style={{ border: '1px dashed rgba(38,50,56,0.2)', borderRadius: 8, height: 100, background: 'var(--color-background)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: 13 }}>
                Area Tanda Tangan
              </div>
            </div>
          </div>


          {/* MIDDLE COLUMN: Objective & Assessment */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ 
              background: activeTab === 'O' ? 'var(--color-primary-light)' : 'transparent', 
              color: activeTab === 'O' ? 'var(--color-primary)' : 'var(--color-primary)',
              padding: '10px 16px', borderRadius: '12px 12px 0 0', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 12
            }}>
              <span style={{ background: 'var(--color-primary)', color: '#fff', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, fontSize: 12 }}>O</span>
              Objective Tab Panel
            </div>

            <div className="card" style={{ padding: 20 }}>
              <h4 style={{ marginBottom: 16 }}>Tanda Tanda Vital</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="text-muted" style={{ width: 40 }}>TD:</span>
                  <input type="text" className="form-input" style={{ height: 32, padding: '4px 8px', textAlign: 'center' }} defaultValue="110/70" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="text-muted" style={{ width: 40 }}>Nadi:</span>
                  <input type="text" className="form-input" style={{ height: 32, padding: '4px 8px', textAlign: 'center' }} defaultValue="76" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="text-muted" style={{ width: 40 }}>Suhu:</span>
                  <input type="text" className="form-input" style={{ height: 32, padding: '4px 8px', textAlign: 'center' }} defaultValue="36.5C" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="text-muted" style={{ width: 40 }}>RR:</span>
                  <input type="text" className="form-input" style={{ height: 32, padding: '4px 8px', textAlign: 'center' }} defaultValue="18" />
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h4 style={{ marginBottom: 12 }}>Face Mapping (Interactive Canvas)</h4>
              <div style={{ flex: 1, background: 'var(--color-background)', borderRadius: 8, border: '1px solid rgba(38,50,56,0.1)', minHeight: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'relative' }}>
                 <div style={{ width: 120, height: 160, background: 'var(--color-accent-light)', borderRadius: '40%', border: '2px solid var(--color-accent)', marginBottom: 12, position: 'relative' }}>
                   <span style={{ position: 'absolute', top: 30, left: 20, width: 12, height: 12, background: 'var(--color-error)', borderRadius: '50%' }}></span>
                   <span style={{ position: 'absolute', top: 60, right: 15, width: 12, height: 12, background: 'var(--color-error)', borderRadius: '50%' }}></span>
                 </div>
                 <p className="text-muted text-xs">Interactive Canvas Area</p>
              </div>
            </div>

            <div className="card" style={{ padding: 20 }}>
              <h4 style={{ marginBottom: 4 }}>Diagnosa (Assessment)</h4>
              <p className="text-muted text-xs" style={{ marginBottom: 12 }}>Autocomplete: ICD-10</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(38, 50, 56, 0.15)', borderRadius: 6, padding: '8px 12px', fontSize: 13, marginBottom: 12 }}>
                <span>L70.0 Acne Vulgaris</span>
                <button style={{ color: 'var(--color-text-muted)', cursor: 'pointer', background: 'none', border: 'none' }}>✕</button>
              </div>
              <textarea className="form-input" rows={2} style={{ height: 'auto' }} placeholder="Clinical Note"></textarea>
            </div>
          </div>

          {/* RIGHT COLUMN: Plan & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 8 }}>
               <div style={{ display: 'flex', gap: 6 }}>
                  {['S','O','A','P'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setActiveTab(t as any)}
                      style={{ 
                        width: 36, height: 36, borderRadius: 8, fontWeight: 700, fontSize: 14,
                        background: activeTab === t ? 'var(--color-primary)' : '#fff',
                        color: activeTab === t ? '#fff' : 'var(--color-primary)',
                        border: `1px solid ${activeTab === t ? 'var(--color-primary)' : 'var(--color-primary-light)'}`
                      }}
                    >
                      {t}
                    </button>
                  ))}
               </div>
            </div>

            <div className="card" style={{ padding: 20 }}>
              <h4 style={{ marginBottom: 16 }}>Galeri Komparasi (Before - After)</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <div style={{ height: 100, borderRadius: 8, marginBottom: 6, background: "url('https://i.pravatar.cc/150?img=5') center/cover" }}></div>
                  <p className="text-muted text-xs" style={{ fontSize: 10, textTransform: 'uppercase' }}>BEFORE (Dahi)</p>
                </div>
                <div>
                  <div style={{ height: 100, borderRadius: 8, marginBottom: 6, background: "url('https://i.pravatar.cc/150?img=9') center/cover" }}></div>
                  <p className="text-muted text-xs" style={{ fontSize: 10, textTransform: 'uppercase' }}>AFTER (Treatment 1)</p>
                </div>
                <div>
                  <div style={{ height: 100, borderRadius: 8, marginBottom: 6, background: "url('https://i.pravatar.cc/150?img=5') center/cover" }}></div>
                  <p className="text-muted text-xs" style={{ fontSize: 10, textTransform: 'uppercase' }}>BEFORE (Pipi)</p>
                </div>
                <div>
                  <div style={{ height: 100, borderRadius: 8, marginBottom: 6, background: "url('https://i.pravatar.cc/150?img=9') center/cover" }}></div>
                  <p className="text-muted text-xs" style={{ fontSize: 10, textTransform: 'uppercase' }}>AFTER (Treatment 1)</p>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: 20, flex: 1 }}>
              <h4 style={{ marginBottom: 4 }}>Resep Obat (E-Prescription)</h4>
              <p className="text-muted text-xs" style={{ marginBottom: 16 }}>Meds std. Standards</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--color-success-bg)', background: 'var(--color-success-bg)', borderRadius: 8, padding: '10px 12px', fontSize: 13 }}>
                  <span>Amoxicillin 500mg 3x1</span>
                  <div style={{ display: 'flex', gap: 12, color: 'var(--color-text-muted)' }}>
                    <button style={{ cursor: 'pointer' }}>➕</button>
                    <button style={{ cursor: 'pointer' }}>🗑️</button>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--color-success-bg)', background: 'var(--color-success-bg)', borderRadius: 8, padding: '10px 12px', fontSize: 13 }}>
                  <span>Krim Racikan A - Malam</span>
                  <div style={{ display: 'flex', gap: 12, color: 'var(--color-text-muted)' }}>
                    <button style={{ cursor: 'pointer' }}>➕</button>
                    <button style={{ cursor: 'pointer' }}>🗑️</button>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
              <button className="btn btn-outline">Save Draft</button>
              <button className="btn btn-primary">Finalize & Sync Satusehat</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
