'use client';

import { dashboardStats, appointments, formatCurrency, getStatusLabel, getStatusIcon } from './data/dummy';

export default function DashboardPage() {
  const todayAppointments = appointments.filter(a => a.date === '2026-09-27');
  const maxRevenue = Math.max(...dashboardStats.weeklyRevenue.map(d => d.value));

  return (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="subtitle">Selamat pagi, Dr. Ayu — Sabtu, 27 September 2026</p>
      </div>

      <div className="page-content">
        {/* Stat Cards */}
        <div className="stats-grid">
          <div className="stat-card animate-in">
            <div className="stat-icon primary">💰</div>
            <div className="stat-info">
              <h4>Pendapatan Hari Ini</h4>
              <div className="stat-value">{formatCurrency(dashboardStats.todayRevenue)}</div>
              <span className="stat-change up">↑ 12% dari kemarin</span>
            </div>
          </div>
          <div className="stat-card animate-in" style={{ animationDelay: '50ms' }}>
            <div className="stat-icon accent">📅</div>
            <div className="stat-info">
              <h4>Appointment Hari Ini</h4>
              <div className="stat-value">{dashboardStats.todayAppointments}</div>
              <span className="stat-change up">↑ 3 dari kemarin</span>
            </div>
          </div>
          <div className="stat-card animate-in" style={{ animationDelay: '100ms' }}>
            <div className="stat-icon success">👤</div>
            <div className="stat-info">
              <h4>Pasien Baru</h4>
              <div className="stat-value">{dashboardStats.newPatients}</div>
              <span className="stat-change up">↑ 2 dari minggu lalu</span>
            </div>
          </div>
          <div className="stat-card animate-in" style={{ animationDelay: '150ms' }}>
            <div className="stat-icon warning">📦</div>
            <div className="stat-info">
              <h4>Stok Rendah</h4>
              <div className="stat-value">{dashboardStats.lowStockItems}</div>
              <span className="stat-change down">⚠ Perlu restock</span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="content-grid-3">
          {/* Weekly Revenue Chart */}
          <div className="card">
            <div className="card-header">
              <h3>📈 Pendapatan Mingguan</h3>
              <span className="card-header-action">Lihat Detail →</span>
            </div>
            <div className="chart-container">
              <div className="bar-chart">
                {dashboardStats.weeklyRevenue.map((item, idx) => (
                  <div className="bar-chart-item" key={idx}>
                    <span className="bar-chart-value">
                      {(item.value / 1000000).toFixed(0)}jt
                    </span>
                    <div
                      className="bar-chart-bar"
                      style={{ height: `${(item.value / maxRevenue) * 100}%` }}
                    />
                    <span className="bar-chart-label">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue by Category */}
          <div className="card">
            <div className="card-header">
              <h3>📊 Revenue by Kategori</h3>
            </div>
            <div className="donut-chart">
              <div className="donut-visual">
                <svg viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="70" cy="70" r="55" fill="none" stroke="#E8F4F4" strokeWidth="20" />
                  <circle cx="70" cy="70" r="55" fill="none" stroke="#1F6465" strokeWidth="20"
                    strokeDasharray={`${65 * 3.45} ${100 * 3.45}`} strokeDashoffset="0" />
                  <circle cx="70" cy="70" r="55" fill="none" stroke="#C9826B" strokeWidth="20"
                    strokeDasharray={`${20 * 3.45} ${100 * 3.45}`} strokeDashoffset={`${-65 * 3.45}`} />
                  <circle cx="70" cy="70" r="55" fill="none" stroke="#C8A96B" strokeWidth="20"
                    strokeDasharray={`${15 * 3.45} ${100 * 3.45}`} strokeDashoffset={`${-85 * 3.45}`} />
                </svg>
                <div className="donut-center">
                  <div className="donut-center-value">285jt</div>
                  <div className="donut-center-label">bulan ini</div>
                </div>
              </div>
              <div className="donut-legend">
                {dashboardStats.revenueByCategory.map((cat, idx) => (
                  <div className="donut-legend-item" key={idx}>
                    <span className="donut-legend-color" style={{ background: cat.color }} />
                    <span>{cat.category} ({cat.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="content-grid">
          {/* Today Appointments */}
          <div className="card">
            <div className="card-header">
              <h3>📅 Appointment Hari Ini</h3>
              <span className="card-header-action">Lihat Semua →</span>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Pasien</th>
                    <th>Treatment</th>
                    <th>Jam</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todayAppointments.slice(0, 6).map(apt => (
                    <tr key={apt.id}>
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
                      <td>{apt.time}</td>
                      <td>
                        <span className={`badge badge-${apt.status}`}>
                          <span className="badge-dot" />
                          {getStatusIcon(apt.status)} {getStatusLabel(apt.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Treatments */}
          <div className="card">
            <div className="card-header">
              <h3>🏆 Treatment Terlaris</h3>
              <span className="card-header-action">Bulan Ini</span>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Treatment</th>
                    <th>Jumlah</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardStats.topTreatments.map((t, idx) => (
                    <tr key={idx}>
                      <td>
                        <span style={{
                          fontWeight: 700,
                          color: idx === 0 ? '#C8A96B' : idx === 1 ? '#90A4AE' : idx === 2 ? '#C9826B' : '#263238'
                        }}>
                          {idx + 1}
                        </span>
                      </td>
                      <td style={{ fontWeight: 500 }}>{t.name}</td>
                      <td>{t.count}x</td>
                      <td style={{ fontWeight: 600, color: '#1F6465' }}>{formatCurrency(t.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
