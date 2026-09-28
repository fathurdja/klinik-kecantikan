'use client';

import { useState } from 'react';
import Link from 'next/link';

// Dummy EMR records
const emrRecords = [
  { id: '1', recordNumber: 'RM-202609-0012', patientName: 'Sarah Anggraini', patientId: 'P-005', date: '2026-09-28', doctor: 'Dr. Ayu Paramitha', status: 'draft', synced: false, diagnoses: 'Acne Vulgaris' },
  { id: '2', recordNumber: 'RM-202609-0011', patientName: 'Maya Safira', patientId: 'P-001', date: '2026-09-27', doctor: 'Dr. Wayan Surya', status: 'finalized', synced: true, diagnoses: 'Melasma' },
  { id: '3', recordNumber: 'RM-202609-0010', patientName: 'Budi Santoso', patientId: 'P-002', date: '2026-09-25', doctor: 'Dr. Ayu Paramitha', status: 'finalized', synced: true, diagnoses: 'Alopecia' },
];

export default function EMRListPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = emrRecords.filter(r => 
    r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.recordNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1>Rekam Medis (EMR)</h1>
            <p className="subtitle">Kelola Electronic Medical Record pasien & riwayat treatment</p>
          </div>
          <button className="btn btn-primary">
            ➕ EMR Baru
          </button>
        </div>
      </div>

      <div className="page-content">
        <div className="filter-bar" style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <div className="top-bar-search" style={{ flexGrow: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: 8 }}>🔍</span>
            <input
              type="text"
              className="form-input"
              placeholder="Cari nama pasien atau No RM..."
              style={{ paddingLeft: 40, width: '100%', maxWidth: 400 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="form-select" style={{ width: 'auto' }}>
            <option>Semua Status</option>
            <option>Draft</option>
            <option>Finalized</option>
          </select>
          <select className="form-select" style={{ width: 'auto' }}>
            <option>Semua Dokter</option>
            <option>Dr. Ayu Paramitha</option>
            <option>Dr. Wayan Surya</option>
          </select>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>No RM</th>
                  <th>Pasien</th>
                  <th>Tanggal</th>
                  <th>Dokter</th>
                  <th>Diagnosa</th>
                  <th>Status EMR</th>
                  <th>Satusehat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map(record => (
                  <tr key={record.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{record.recordNumber}</td>
                    <td>
                      <div className="patient-card">
                        <div className="patient-avatar">
                          {record.patientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div className="patient-name">{record.patientName}</div>
                          <div className="patient-id">{record.patientId}</div>
                        </div>
                      </div>
                    </td>
                    <td>{record.date}</td>
                    <td>{record.doctor}</td>
                    <td>{record.diagnoses}</td>
                    <td>
                      <span className={`badge badge-${record.status === 'draft' ? 'warning' : 'success'}`}>
                        {record.status === 'draft' ? '📝 Draft' : '✅ Finalized'}
                      </span>
                    </td>
                    <td>
                      {record.synced ? (
                        <span style={{ color: '#059669', fontSize: 12, fontWeight: 600 }}>✓ Synced</span>
                      ) : (
                        <span style={{ color: '#9CA3AF', fontSize: 12 }}>-</span>
                      )}
                    </td>
                    <td>
                      <Link href={`/emr/${record.id}`}>
                        <button className="btn btn-outline btn-sm">Buka EMR</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
