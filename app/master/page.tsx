'use client';

import { useState, useEffect } from 'react';

const initialStaff = [
  { id: 'STF-001', name: 'Dr. Ayu Paramitha', role: 'Dokter Spesialis', phone: '081234567890' },
  { id: 'STF-002', name: 'Dr. Wayan Surya', role: 'Dokter Estetika', phone: '081234567891' },
  { id: 'STF-003', name: 'Dewi', role: 'Beautician', phone: '081234567892' },
];

export default function DataMasterPage() {
  const [activeTab, setActiveTab] = useState<'treatment' | 'kategori' | 'staff'>('treatment');
  
  const [treatments, setTreatments] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [staffList, setStaffList] = useState(initialStaff);

  useEffect(() => {
    fetch('http://localhost:8000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error fetching categories", err));

    fetch('http://localhost:8000/api/treatments')
      .then(res => res.json())
      .then(data => setTreatments(data))
      .catch(err => console.error("Error fetching treatments", err));
  }, []);

  const handleAdd = async () => {
    if (activeTab === 'treatment') {
      const name = prompt('Nama Treatment Baru:');
      if (name) {
        try {
          const res = await fetch('http://localhost:8000/api/treatments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name, duration: 30, price: 0, commission: 0 })
          });
          const newTreatment = await res.json();
          if (res.ok) setTreatments([newTreatment, ...treatments]);
        } catch (error) {
          console.error(error);
        }
      }
    } else if (activeTab === 'kategori') {
      const name = prompt('Nama Kategori Baru:');
      if (name) {
        try {
          const res = await fetch('http://localhost:8000/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name, type: 'Umum' })
          });
          const newCategory = await res.json();
          if (res.ok) setCategories([newCategory, ...categories]);
        } catch (error) {
          console.error(error);
        }
      }
    } else if (activeTab === 'staff') {
      const name = prompt('Nama Staff Baru:');
      if (name) {
        setStaffList([{ id: `STF-${Math.floor(Math.random() * 1000)}`, name, role: 'Staff', phone: '-' }, ...staffList]);
      }
    }
  };

  return (
    <>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1>Data Master</h1>
            <p className="subtitle">Kelola data referensi utama (Treatment, Kategori, Staff) terpusat</p>
          </div>
          <button className="btn btn-primary" onClick={handleAdd}>
            ➕ Tambah {activeTab === 'treatment' ? 'Treatment' : activeTab === 'kategori' ? 'Kategori' : 'Staff'}
          </button>
        </div>
      </div>

      <div className="page-content">
        <div className="tabs">
          <button className={`tab ${activeTab === 'treatment' ? 'active' : ''}`} onClick={() => setActiveTab('treatment')}>
            💉 Master Treatment
          </button>
          <button className={`tab ${activeTab === 'kategori' ? 'active' : ''}`} onClick={() => setActiveTab('kategori')}>
            🏷️ Master Kategori
          </button>
          <button className={`tab ${activeTab === 'staff' ? 'active' : ''}`} onClick={() => setActiveTab('staff')}>
            👩‍⚕️ Master Staff
          </button>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table>
              {activeTab === 'treatment' && (
                <>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nama Treatment</th>
                      <th>Kategori</th>
                      <th>Durasi (Menit)</th>
                      <th>Harga Standar</th>
                      <th>Komisi Default</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {treatments.map(t => (
                      <tr key={t.id}>
                        <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{t.id}</td>
                        <td style={{ fontWeight: 600 }}>{t.name}</td>
                        <td><span className="badge badge-outline">{t.category?.name || t.category || '-'}</span></td>
                        <td>{t.duration}</td>
                        <td>Rp {Number(t.price).toLocaleString('id-ID')}</td>
                        <td>Rp {Number(t.commission).toLocaleString('id-ID')}</td>
                        <td>
                          <button className="btn btn-ghost btn-sm">✏️ Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

              {activeTab === 'kategori' && (
                <>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nama Kategori</th>
                      <th>Peruntukan (Type)</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(c => (
                      <tr key={c.id}>
                        <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{c.id}</td>
                        <td style={{ fontWeight: 600 }}>{c.name}</td>
                        <td>{c.type}</td>
                        <td>
                          <button className="btn btn-ghost btn-sm">✏️ Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

              {activeTab === 'staff' && (
                <>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nama Lengkap</th>
                      <th>Peran (Role)</th>
                      <th>Telepon</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffList.map(s => (
                      <tr key={s.id}>
                        <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{s.id}</td>
                        <td style={{ fontWeight: 600 }}>{s.name}</td>
                        <td>{s.role}</td>
                        <td>{s.phone}</td>
                        <td><span className="badge badge-completed">Aktif</span></td>
                        <td>
                          <button className="btn btn-ghost btn-sm">✏️ Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
