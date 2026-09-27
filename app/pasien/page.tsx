'use client';

import { useState } from 'react';
import { patients, medicalRecords, formatCurrency, getStatusLabel } from '../data/dummy';

export default function PasienPage() {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [patientList, setPatientList] = useState(patients);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredPatients = patientList.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery)
  );

  const activePatient = selectedPatient ? patientList.find(p => p.id === selectedPatient) : null;
  const patientRecords = selectedPatient ? medicalRecords.filter(r => r.patientId === selectedPatient) : [];

  return (
    <>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1>Pasien & Rekam Medis</h1>
            <p className="subtitle">Kelola data pasien dan riwayat rekam medis</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>➕ Pasien Baru</button>
        </div>
      </div>

      <div className="page-content">
        {!selectedPatient ? (
          <>
            {/* Patient List */}
            <div className="filter-bar">
              <input
                type="text"
                className="form-input"
                placeholder="🔍 Cari nama pasien, ID, atau nomor telepon..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ minWidth: 300 }}
              />
              <select className="form-select" style={{ width: 'auto', minWidth: 160 }}>
                <option>Semua Membership</option>
                <option>Platinum</option>
                <option>Gold</option>
                <option>Silver</option>
                <option>Non-Member</option>
              </select>
            </div>

            <div className="card">
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Pasien</th>
                      <th>Telepon</th>
                      <th>Membership</th>
                      <th>Total Kunjungan</th>
                      <th>Kunjungan Terakhir</th>
                      <th>Alergi</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map(patient => (
                      <tr key={patient.id}>
                        <td>
                          <div className="patient-card">
                            <div className="patient-avatar">
                              {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <div className="patient-name">{patient.name}</div>
                              <div className="patient-id">{patient.id} • {patient.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>{patient.phone}</td>
                        <td>
                          {patient.membership ? (
                            <span className={`badge badge-${patient.membership.toLowerCase()}`}>
                              {patient.membership === 'Platinum' ? '💎' : patient.membership === 'Gold' ? '🥇' : '🥈'} {patient.membership}
                            </span>
                          ) : (
                            <span className="text-muted">—</span>
                          )}
                        </td>
                        <td style={{ fontWeight: 600 }}>{patient.totalVisits}x</td>
                        <td>{patient.lastVisit}</td>
                        <td>
                          {patient.allergies.length > 0 ? (
                            <span className="badge badge-cancelled">⚠️ {patient.allergies.join(', ')}</span>
                          ) : (
                            <span className="text-muted text-sm">Tidak ada</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => setSelectedPatient(patient.id)}
                          >
                            👁️ Detail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                <span className="pagination-info">
                  Menampilkan {filteredPatients.length} dari {patients.length} pasien
                </span>
                <div className="pagination-controls">
                  <button className="pagination-btn">←</button>
                  <button className="pagination-btn active">1</button>
                  <button className="pagination-btn">2</button>
                  <button className="pagination-btn">→</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Patient Detail */}
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setSelectedPatient(null)}
              style={{ marginBottom: 20 }}
            >
              ← Kembali ke Daftar Pasien
            </button>

            {activePatient && (
              <>
                {/* Patient Info Card */}
                <div className="card" style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    <div className="patient-avatar lg">
                      {activePatient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div style={{ flex: 1, minWidth: 250 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                        <h2>{activePatient.name}</h2>
                        {activePatient.membership && (
                          <span className={`badge badge-${activePatient.membership.toLowerCase()}`}>
                            {activePatient.membership}
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                        <div>
                          <div className="text-muted text-sm">ID Pasien</div>
                          <div style={{ fontWeight: 500 }}>{activePatient.id}</div>
                        </div>
                        <div>
                          <div className="text-muted text-sm">Telepon</div>
                          <div style={{ fontWeight: 500 }}>{activePatient.phone}</div>
                        </div>
                        <div>
                          <div className="text-muted text-sm">Email</div>
                          <div style={{ fontWeight: 500 }}>{activePatient.email}</div>
                        </div>
                        <div>
                          <div className="text-muted text-sm">Tanggal Lahir</div>
                          <div style={{ fontWeight: 500 }}>{activePatient.dob}</div>
                        </div>
                        <div>
                          <div className="text-muted text-sm">Alamat</div>
                          <div style={{ fontWeight: 500 }}>{activePatient.address}</div>
                        </div>
                        <div>
                          <div className="text-muted text-sm">Alergi</div>
                          <div style={{ fontWeight: 500, color: activePatient.allergies.length > 0 ? 'var(--color-error)' : 'inherit' }}>
                            {activePatient.allergies.length > 0 ? `⚠️ ${activePatient.allergies.join(', ')}` : 'Tidak ada alergi tercatat'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ textAlign: 'center', padding: '12px 20px', background: 'var(--color-primary-light)', borderRadius: 12 }}>
                        <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-primary)' }}>{activePatient.totalVisits}</div>
                        <div className="text-sm text-muted">Kunjungan</div>
                      </div>
                      <div style={{ textAlign: 'center', padding: '12px 20px', background: 'var(--color-gold-light)', borderRadius: 12 }}>
                        <div style={{ fontSize: 28, fontWeight: 700, color: '#8B6914' }}>
                          {activePatient.membership === 'Platinum' ? '1250' : activePatient.membership === 'Gold' ? '680' : '320'}
                        </div>
                        <div className="text-sm text-muted">Poin</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medical Timeline */}
                <div className="card">
                  <div className="card-header">
                    <h3>📋 Rekam Medis — Timeline</h3>
                    <button className="btn btn-primary btn-sm">➕ Tambah Catatan</button>
                  </div>

                  <div className="timeline">
                    {patientRecords.map(record => (
                      <div key={record.id} className="timeline-item">
                        <div className={`timeline-dot ${
                          record.type === 'treatment' ? '' :
                          record.type === 'konsultasi' ? 'accent' :
                          record.type === 'foto' ? 'gold' : 'success'
                        }`} />
                        <div className="timeline-date">{record.date} • {record.doctor}</div>
                        <div className="timeline-content">
                          <h4>
                            {record.type === 'treatment' ? '💆' :
                             record.type === 'konsultasi' ? '🩺' :
                             record.type === 'foto' ? '📸' : '✅'} {record.title}
                          </h4>
                          <p>{record.notes}</p>
                          {record.products && record.products.length > 0 && (
                            <div style={{ marginTop: 8 }}>
                              <div className="text-sm" style={{ fontWeight: 600, marginBottom: 4 }}>Produk digunakan:</div>
                              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                {record.products.map((prod, i) => (
                                  <span key={i} className="badge badge-confirmed">{prod}</span>
                                ))}
                              </div>
                            </div>
                          )}
                          {record.postCareInstructions && (
                            <div style={{ marginTop: 8, padding: 12, background: 'var(--color-warning-bg)', borderRadius: 8 }}>
                              <div className="text-sm" style={{ fontWeight: 600, color: 'var(--color-warning)' }}>
                                📝 Instruksi Pasca-Treatment:
                              </div>
                              <p style={{ fontSize: 13, marginTop: 4 }}>{record.postCareInstructions}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: 500, padding: 24 }}>
            <h2 style={{ marginBottom: 16 }}>➕ Pasien Baru</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Nama Lengkap</label>
                <input type="text" className="form-input" id="newPatName" placeholder="Contoh: Siti Aminah" />
              </div>
              <div className="form-group">
                <label className="form-label">Nomor Telepon (WhatsApp)</label>
                <input type="tel" className="form-input" id="newPatPhone" placeholder="08..." />
              </div>
              <div className="form-group">
                <label className="form-label">Tanggal Lahir</label>
                <input type="date" className="form-input" id="newPatDob" />
              </div>
              <div className="form-group">
                <label className="form-label">Riwayat Alergi (Opsional)</label>
                <input type="text" className="form-input" id="newPatAllergies" placeholder="Contoh: Seafood, Obat tertentu..." />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                <button className="btn btn-outline" onClick={() => setShowAddModal(false)}>Batal</button>
                <button className="btn btn-primary" onClick={() => {
                  const newPat = {
                    id: `P-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                    name: (document.getElementById('newPatName') as HTMLInputElement).value || 'Pasien Baru',
                    phone: (document.getElementById('newPatPhone') as HTMLInputElement).value || '-',
                    dob: (document.getElementById('newPatDob') as HTMLInputElement).value || '1990-01-01',
                    gender: 'Wanita',
                    membership: 'Non-Member' as const,
                    joinDate: new Date().toISOString().split('T')[0],
                    totalVisits: 0,
                    totalSpent: 0,
                    allergies: [(document.getElementById('newPatAllergies') as HTMLInputElement).value].filter(Boolean),
                    email: '-',
                    address: '-',
                    lastVisit: '-',
                    registeredDate: new Date().toISOString().split('T')[0],
                  };
                  setPatientList([newPat as any, ...patientList]);
                  setShowAddModal(false);
                  alert('Pasien berhasil ditambahkan!');
                }}>Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
