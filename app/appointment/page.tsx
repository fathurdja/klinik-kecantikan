'use client';

import { useState } from 'react';
import Link from 'next/link';
import { appointments, formatCurrency, getStatusLabel, getStatusIcon } from '../data/dummy';
import type { AppointmentStatus } from '../data/dummy';

const statusFilters: { label: string; value: AppointmentStatus | 'all' }[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Terjadwal', value: 'booked' },
  { label: 'Dikonfirmasi', value: 'confirmed' },
  { label: 'Check-in', value: 'checked-in' },
  { label: 'Treatment', value: 'in-treatment' },
  { label: 'Selesai', value: 'completed' },
  { label: 'Dibatalkan', value: 'cancelled' },
];

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const weekDays = ['Sen 22', 'Sel 23', 'Rab 24', 'Kam 25', 'Jum 26', 'Sab 27', 'Min 28'];

export default function AppointmentPage() {
  const [activeFilter, setActiveFilter] = useState<AppointmentStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [appointmentsList, setAppointmentsList] = useState(appointments);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const filteredAppointments = activeFilter === 'all'
    ? appointmentsList
    : appointmentsList.filter(a => a.status === activeFilter);

  const todayAppointments = appointmentsList.filter(a => a.date === '2026-09-27');

  return (
    <>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1>Appointment</h1>
            <p className="subtitle">Kelola jadwal appointment & booking pasien</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            ➕ Appointment Baru
          </button>
        </div>
      </div>

      <div className="page-content">
        {/* View Toggle & Filters */}
        <div className="filter-bar">
          <div className="filter-tabs">
            <button
              className={`filter-tab ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              📋 List
            </button>
            <button
              className={`filter-tab ${viewMode === 'calendar' ? 'active' : ''}`}
              onClick={() => setViewMode('calendar')}
            >
              📅 Kalender
            </button>
          </div>

          {viewMode === 'list' && (
            <>
              <input
                type="text"
                className="form-input"
                placeholder="🔍 Cari pasien atau treatment..."
                style={{ minWidth: 250 }}
              />
              <select className="form-select" style={{ width: 'auto', minWidth: 160 }}>
                <option>Semua Dokter</option>
                <option>Dr. Ayu Paramitha</option>
                <option>Dr. Wayan Surya</option>
                <option>Beautician Dewi</option>
              </select>
            </>
          )}
        </div>

        {/* Status Filter Pills */}
        {viewMode === 'list' && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {statusFilters.map(f => (
              <button
                key={f.value}
                className={`btn btn-sm ${activeFilter === f.value ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
                {f.value !== 'all' && (
                  <span style={{ opacity: 0.7, marginLeft: 4 }}>
                    ({appointments.filter(a => a.status === f.value).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="card">
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Pasien</th>
                    <th>Treatment</th>
                    <th>Dokter/Beautician</th>
                    <th>Tanggal</th>
                    <th>Jam</th>
                    <th>Durasi</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map(apt => (
                    <tr key={apt.id}>
                      <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--color-text-muted)' }}>{apt.id}</td>
                      <td>
                        <div className="patient-card">
                          <div className="patient-avatar">
                            {apt.patientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <div className="patient-name">{apt.patientName}</div>
                            <div className="patient-id">{apt.patientId}</div>
                          </div>
                        </div>
                      </td>
                      <td>{apt.treatment}</td>
                      <td>{apt.doctor}</td>
                      <td>{apt.date}</td>
                      <td style={{ fontWeight: 600 }}>{apt.time}</td>
                      <td>{apt.duration} menit</td>
                      <td>
                        <span className={`badge badge-${apt.status}`}>
                          {getStatusIcon(apt.status)} {getStatusLabel(apt.status)}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn btn-ghost btn-sm" title="Detail" onClick={() => { setSelectedAppointment(apt); setShowDetailModal(true); }}>👁️</button>
                          <button className="btn btn-ghost btn-sm" title="Edit" onClick={() => { setSelectedAppointment(apt); setShowEditModal(true); }}>✏️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <span className="pagination-info">
                Menampilkan {filteredAppointments.length} dari {appointments.length} appointment
              </span>
              <div className="pagination-controls">
                <button className="pagination-btn">←</button>
                <button className="pagination-btn active">1</button>
                <button className="pagination-btn">2</button>
                <button className="pagination-btn">→</button>
              </div>
            </div>
          </div>
        )}

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(38,50,56,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button className="btn btn-ghost btn-sm">← Minggu Sebelumnya</button>
                <h3>22 - 28 September 2026</h3>
                <button className="btn btn-ghost btn-sm">Minggu Berikutnya →</button>
              </div>
              <button className="btn btn-outline btn-sm">Hari Ini</button>
            </div>
            <div className="calendar-grid" style={{ overflowX: 'auto' }}>
              {/* Header Row */}
              <div className="calendar-header-cell"></div>
              {weekDays.map((day, idx) => (
                <div key={idx} className="calendar-header-cell" style={day.includes('27') ? { background: 'var(--color-primary-light)', fontWeight: 700, color: 'var(--color-primary)' } : {}}>
                  {day}
                </div>
              ))}

              {/* Time Rows */}
              {timeSlots.map((time, tIdx) => (
                <div key={`row-${tIdx}`} style={{ display: 'contents' }}>
                  <div className="calendar-time">{time}</div>
                  {weekDays.map((day, dIdx) => {
                    const dayDate = `2026-09-${22 + dIdx}`;
                    const slotAppointments = appointments.filter(
                      a => a.date === dayDate && a.time === time
                    );
                    return (
                      <div key={`cell-${tIdx}-${dIdx}`} className="calendar-cell">
                        {slotAppointments.map(apt => (
                          <div key={apt.id} className={`calendar-event ${apt.status}`}>
                            <strong>{apt.patientName.split(' ')[0]}</strong>
                            <br />
                            {apt.treatment.split(' ')[0]}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: 500, padding: 24 }}>
            <h2 style={{ marginBottom: 16 }}>➕ Appointment Baru</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Pasien</label>
                <select className="form-select" id="newAptPatient">
                  <option value="Maya Safira">Maya Safira (P-001)</option>
                  <option value="Budi Santoso">Budi Santoso (P-002)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Treatment</label>
                <select className="form-select" id="newAptTreatment">
                  <option value="Acne Laser Treatment">Acne Laser Treatment</option>
                  <option value="Premium Glow Facial">Premium Glow Facial</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Dokter/Beautician</label>
                <select className="form-select" id="newAptDoctor">
                  <option value="Dr. Ayu Paramitha">Dr. Ayu Paramitha</option>
                  <option value="Beautician Dewi">Beautician Dewi</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Tanggal</label>
                  <input type="date" className="form-input" id="newAptDate" defaultValue="2026-09-27" />
                </div>
                <div className="form-group">
                  <label className="form-label">Jam</label>
                  <input type="time" className="form-input" id="newAptTime" defaultValue="10:00" />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                <button className="btn btn-outline" onClick={() => setShowAddModal(false)}>Batal</button>
                <button className="btn btn-primary" onClick={() => {
                  const newApt = {
                    id: `APT-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                    patientId: 'P-001',
                    patientName: (document.getElementById('newAptPatient') as HTMLSelectElement).value,
                    treatment: (document.getElementById('newAptTreatment') as HTMLSelectElement).value,
                    doctor: (document.getElementById('newAptDoctor') as HTMLSelectElement).value,
                    date: (document.getElementById('newAptDate') as HTMLInputElement).value,
                    time: (document.getElementById('newAptTime') as HTMLInputElement).value,
                    duration: 60,
                    status: 'booked' as AppointmentStatus,
                  };
                  setAppointmentsList([newApt, ...appointmentsList]);
                  setShowAddModal(false);
                  alert('Appointment berhasil ditambahkan!');
                }}>Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditModal && selectedAppointment && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: 500, padding: 24 }}>
            <h2 style={{ marginBottom: 16 }}>✏️ Edit Appointment ({selectedAppointment.id})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-select" id="editAptStatus" defaultValue={selectedAppointment.status}>
                  {statusFilters.filter(f => f.value !== 'all').map(f => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Dokter/Beautician</label>
                <select className="form-select" id="editAptDoctor" defaultValue={selectedAppointment.doctor}>
                  <option value="Dr. Ayu Paramitha">Dr. Ayu Paramitha</option>
                  <option value="Dr. Wayan Surya">Dr. Wayan Surya</option>
                  <option value="Beautician Dewi">Beautician Dewi</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Tanggal</label>
                  <input type="date" className="form-input" id="editAptDate" defaultValue={selectedAppointment.date} />
                </div>
                <div className="form-group">
                  <label className="form-label">Jam</label>
                  <input type="time" className="form-input" id="editAptTime" defaultValue={selectedAppointment.time} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                <button className="btn btn-outline" onClick={() => setShowEditModal(false)}>Batal</button>
                <button className="btn btn-primary" onClick={() => {
                  const updatedList = appointmentsList.map(a => {
                    if (a.id === selectedAppointment.id) {
                      return {
                        ...a,
                        status: (document.getElementById('editAptStatus') as HTMLSelectElement).value as AppointmentStatus,
                        doctor: (document.getElementById('editAptDoctor') as HTMLSelectElement).value,
                        date: (document.getElementById('editAptDate') as HTMLInputElement).value,
                        time: (document.getElementById('editAptTime') as HTMLInputElement).value,
                      };
                    }
                    return a;
                  });
                  setAppointmentsList(updatedList);
                  setShowEditModal(false);
                  alert('Appointment berhasil diupdate!');
                }}>Simpan Perubahan</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedAppointment && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: 600, padding: 32, position: 'relative' }}>
            <button onClick={() => setShowDetailModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>✕</button>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #eee', paddingBottom: 16, marginBottom: 16 }}>
              <div>
                <h2 style={{ margin: '0 0 4px 0' }}>Detail Appointment</h2>
                <span style={{ color: '#666', fontFamily: 'monospace' }}>{selectedAppointment.id}</span>
              </div>
              <span className={`badge badge-${selectedAppointment.status}`} style={{ padding: '6px 12px', fontSize: 14 }}>
                {getStatusIcon(selectedAppointment.status)} {getStatusLabel(selectedAppointment.status)}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              <div>
                <h4 style={{ color: '#888', marginBottom: 8, fontSize: 12, textTransform: 'uppercase' }}>Informasi Pasien</h4>
                <p style={{ margin: '0 0 4px 0', fontWeight: 600, fontSize: 16 }}>{selectedAppointment.patientName}</p>
                <p style={{ margin: 0, color: '#666' }}>ID: {selectedAppointment.patientId}</p>
              </div>
              <div>
                <h4 style={{ color: '#888', marginBottom: 8, fontSize: 12, textTransform: 'uppercase' }}>Informasi Treatment</h4>
                <p style={{ margin: '0 0 4px 0', fontWeight: 600, fontSize: 16 }}>{selectedAppointment.treatment}</p>
                <p style={{ margin: 0, color: '#666' }}>Oleh: {selectedAppointment.doctor}</p>
              </div>
              <div>
                <h4 style={{ color: '#888', marginBottom: 8, fontSize: 12, textTransform: 'uppercase' }}>Jadwal</h4>
                <p style={{ margin: '0 0 4px 0', fontWeight: 600 }}>📅 {selectedAppointment.date}</p>
                <p style={{ margin: 0 }}>⏰ {selectedAppointment.time} ({selectedAppointment.duration} menit)</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, borderTop: '1px solid #eee', paddingTop: 20 }}>
              <button className="btn btn-outline" onClick={() => setShowDetailModal(false)}>Tutup</button>
              {(selectedAppointment.status === 'checked-in' || selectedAppointment.status === 'in-treatment') && (
                <Link href="/emr/1">
                  <button className="btn btn-primary">📝 Buka Rekam Medis (EMR)</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
