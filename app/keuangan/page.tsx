'use client';

import { useState } from 'react';
import { financialSummary, formatCurrency } from '../data/dummy';

export default function KeuanganPage() {
  const [period, setPeriod] = useState('bulan-ini');

  const { thisMonth, lastMonth } = financialSummary;
  const revenueGrowth = ((thisMonth.revenue - lastMonth.revenue) / lastMonth.revenue * 100).toFixed(1);
  const profitGrowth = ((thisMonth.profit - lastMonth.profit) / lastMonth.profit * 100).toFixed(1);
  const maxDailyRevenue = Math.max(...financialSummary.dailyRevenue.map(d => d.revenue));

  return (
    <>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1>Laporan Keuangan</h1>
            <p className="subtitle">Ringkasan keuangan dan laporan pendapatan</p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <select
              className="form-select"
              value={period}
              onChange={e => setPeriod(e.target.value)}
              style={{ width: 'auto', minWidth: 180 }}
            >
              <option value="bulan-ini">📅 September 2026</option>
              <option value="bulan-lalu">📅 Agustus 2026</option>
              <option value="quarter">📅 Q3 2026</option>
            </select>
            <button className="btn btn-outline" onClick={() => alert('Mengekspor laporan ke PDF...')}>📄 Export PDF</button>
            <button className="btn btn-outline" onClick={() => alert('Mengekspor laporan ke Excel...')}>📊 Export Excel</button>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* Financial Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon primary">💰</div>
            <div className="stat-info">
              <h4>Total Pendapatan</h4>
              <div className="stat-value" style={{ fontSize: 22 }}>{formatCurrency(thisMonth.revenue)}</div>
              <span className="stat-change up">↑ {revenueGrowth}% dari bulan lalu</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon warning">📤</div>
            <div className="stat-info">
              <h4>Total Pengeluaran</h4>
              <div className="stat-value" style={{ fontSize: 22 }}>{formatCurrency(thisMonth.expenses)}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon success">📈</div>
            <div className="stat-info">
              <h4>Laba Bersih</h4>
              <div className="stat-value" style={{ fontSize: 22, color: 'var(--color-success)' }}>
                {formatCurrency(thisMonth.profit)}
              </div>
              <span className="stat-change up">↑ {profitGrowth}% dari bulan lalu</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon info">🧾</div>
            <div className="stat-info">
              <h4>Total Transaksi</h4>
              <div className="stat-value">{thisMonth.totalTransactions}</div>
            </div>
          </div>
        </div>

        {/* Revenue Charts */}
        <div className="content-grid">
          {/* Revenue Trend */}
          <div className="card">
            <div className="card-header">
              <h3>📈 Tren Pendapatan</h3>
              <span className="card-header-action">September 2026</span>
            </div>
            <div className="chart-container">
              <div className="bar-chart" style={{ height: 220 }}>
                {financialSummary.dailyRevenue.map((item, idx) => (
                  <div className="bar-chart-item" key={idx}>
                    <span className="bar-chart-value">
                      {(item.revenue / 1000000).toFixed(0)}jt
                    </span>
                    <div
                      className="bar-chart-bar"
                      style={{
                        height: `${(item.revenue / maxDailyRevenue) * 100}%`,
                        background: idx === financialSummary.dailyRevenue.length - 1
                          ? 'linear-gradient(180deg, var(--color-accent) 0%, var(--color-gold) 100%)'
                          : undefined
                      }}
                    />
                    <span className="bar-chart-label">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="card">
            <div className="card-header">
              <h3>📊 Komposisi Pendapatan</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '8px 0' }}>
              {[
                { label: 'Treatment', value: thisMonth.treatmentRevenue, color: 'var(--color-primary)', percent: Math.round(thisMonth.treatmentRevenue / thisMonth.revenue * 100) },
                { label: 'Produk Retail', value: thisMonth.productRevenue, color: 'var(--color-accent)', percent: Math.round(thisMonth.productRevenue / thisMonth.revenue * 100) },
                { label: 'Paket / Member', value: thisMonth.packageRevenue, color: 'var(--color-gold)', percent: Math.round(thisMonth.packageRevenue / thisMonth.revenue * 100) },
              ].map((item, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{item.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{formatCurrency(item.value)} ({item.percent}%)</span>
                  </div>
                  <div style={{ height: 8, background: 'var(--color-background)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{
                      width: `${item.percent}%`,
                      height: '100%',
                      background: item.color,
                      borderRadius: 4,
                      transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison */}
            <div style={{
              marginTop: 24, padding: 16, background: 'var(--color-background)',
              borderRadius: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16
            }}>
              <div>
                <div className="text-sm text-muted" style={{ marginBottom: 4 }}>Bulan Ini</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-primary)' }}>
                  {formatCurrency(thisMonth.revenue)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted" style={{ marginBottom: 4 }}>Bulan Lalu</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>
                  {formatCurrency(lastMonth.revenue)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="card">
          <div className="card-header">
            <h3>📤 Rincian Pengeluaran</h3>
            <span className="card-header-action">Total: {formatCurrency(thisMonth.expenses)}</span>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Kategori</th>
                  <th>Jumlah</th>
                  <th>Persentase</th>
                  <th>Visualisasi</th>
                </tr>
              </thead>
              <tbody>
                {financialSummary.expenseCategories.map((cat, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>
                      {idx === 0 ? '🧪' : idx === 1 ? '👥' : idx === 2 ? '🏢' : idx === 3 ? '📣' : '📎'} {cat.category}
                    </td>
                    <td style={{ fontWeight: 700 }}>{formatCurrency(cat.amount)}</td>
                    <td>
                      <span className="badge badge-confirmed">{cat.percentage}%</span>
                    </td>
                    <td style={{ width: '40%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 8, background: 'var(--color-background)', borderRadius: 4, overflow: 'hidden' }}>
                          <div style={{
                            width: `${cat.percentage}%`,
                            height: '100%',
                            background: idx === 0 ? 'var(--color-primary)' : idx === 1 ? 'var(--color-accent)' : idx === 2 ? 'var(--color-gold)' : idx === 3 ? 'var(--color-info)' : 'var(--color-secondary)',
                            borderRadius: 4,
                          }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Profit Summary */}
          <div style={{
            marginTop: 20,
            padding: 20,
            background: 'linear-gradient(135deg, var(--color-primary), #2A8384)',
            borderRadius: 12,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <div>
              <div style={{ fontSize: 14, opacity: 0.8 }}>💎 Laba Bersih Bulan September 2026</div>
              <div style={{ fontSize: 32, fontWeight: 700, marginTop: 4 }}>{formatCurrency(thisMonth.profit)}</div>
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, opacity: 0.7 }}>Margin</div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>
                  {(thisMonth.profit / thisMonth.revenue * 100).toFixed(0)}%
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, opacity: 0.7 }}>vs Bulan Lalu</div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>
                  +{profitGrowth}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
