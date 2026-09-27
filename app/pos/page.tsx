'use client';

import { useState } from 'react';
import { posProducts, transactions, patients, formatCurrency } from '../data/dummy';
import type { Product } from '../data/dummy';

interface CartItem {
  product: Product;
  qty: number;
}

export default function POSPage() {
  const [activeTab, setActiveTab] = useState<'pos' | 'riwayat'>('pos');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'treatment' | 'product'>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPatient, setSelectedPatient] = useState('P-001');

  const filteredProducts = categoryFilter === 'all'
    ? posProducts
    : posProducts.filter(p => p.category === categoryFilter);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(c => c.product.id === product.id);
      if (existing) {
        return prev.map(c => c.product.id === product.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(c => {
        if (c.product.id === productId) {
          const newQty = c.qty + delta;
          return newQty > 0 ? { ...c, qty: newQty } : c;
        }
        return c;
      }).filter(c => c.qty > 0);
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(c => c.product.id !== productId));
  };

  const subtotal = cart.reduce((sum, c) => sum + c.product.price * c.qty, 0);
  const discount = 0;
  const total = subtotal - discount;

  const patient = patients.find(p => p.id === selectedPatient);

  return (
    <>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1>POS & Kasir</h1>
            <p className="subtitle">Point of Sale — transaksi treatment & produk</p>
          </div>
          <div className="filter-tabs">
            <button className={`filter-tab ${activeTab === 'pos' ? 'active' : ''}`} onClick={() => setActiveTab('pos')}>
              💳 POS
            </button>
            <button className={`filter-tab ${activeTab === 'riwayat' ? 'active' : ''}`} onClick={() => setActiveTab('riwayat')}>
              📋 Riwayat Transaksi
            </button>
          </div>
        </div>
      </div>

      <div className="page-content">
        {activeTab === 'pos' ? (
          <div className="pos-layout">
            {/* Products Grid */}
            <div className="pos-products">
              {/* Patient Selector */}
              <div className="card" style={{ marginBottom: 16, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>👤 Pasien:</span>
                  <select
                    className="form-select"
                    value={selectedPatient}
                    onChange={e => setSelectedPatient(e.target.value)}
                    style={{ flex: 1, minWidth: 200 }}
                  >
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                    ))}
                  </select>
                  {patient?.membership && (
                    <span className={`badge badge-${patient.membership.toLowerCase()}`}>
                      {patient.membership} • Diskon {patient.membership === 'Platinum' ? '15' : patient.membership === 'Gold' ? '10' : '5'}%
                    </span>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                <button className={`btn btn-sm ${categoryFilter === 'all' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setCategoryFilter('all')}>
                  Semua
                </button>
                <button className={`btn btn-sm ${categoryFilter === 'treatment' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setCategoryFilter('treatment')}>
                  💆 Treatment
                </button>
                <button className={`btn btn-sm ${categoryFilter === 'product' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setCategoryFilter('product')}>
                  🧴 Produk
                </button>
              </div>

              {/* Products */}
              <div className="pos-products-grid">
                {filteredProducts.map(product => {
                  const inCart = cart.find(c => c.product.id === product.id);
                  return (
                    <div
                      key={product.id}
                      className={`pos-product-card ${inCart ? 'selected' : ''}`}
                      onClick={() => addToCart(product)}
                    >
                      <div className="pos-product-icon">{product.icon}</div>
                      <div className="pos-product-name">{product.name}</div>
                      {product.description && (
                        <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginBottom: 4 }}>
                          {product.description}
                        </div>
                      )}
                      <div className="pos-product-price">{formatCurrency(product.price)}</div>
                      {inCart && (
                        <div style={{ marginTop: 8, fontSize: 12, fontWeight: 600, color: 'var(--color-primary)' }}>
                          ✓ {inCart.qty}x dalam keranjang
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cart */}
            <div className="pos-cart">
              <div className="pos-cart-header">
                <h3>🛒 Keranjang Transaksi</h3>
                <p className="text-sm text-muted" style={{ marginTop: 4 }}>
                  {patient?.name || 'Pilih pasien'}
                </p>
              </div>

              <div className="pos-cart-items">
                {cart.length === 0 ? (
                  <div className="empty-state" style={{ padding: '32px 16px' }}>
                    <div className="empty-state-icon">🛒</div>
                    <h3>Keranjang Kosong</h3>
                    <p>Pilih treatment atau produk untuk memulai transaksi</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.product.id} className="pos-cart-item">
                      <span style={{ fontSize: 24 }}>{item.product.icon}</span>
                      <div className="pos-cart-item-info">
                        <div className="pos-cart-item-name">{item.product.name}</div>
                        <div className="pos-cart-item-price">{formatCurrency(item.product.price)}</div>
                      </div>
                      <div className="pos-cart-qty">
                        <button onClick={(e) => { e.stopPropagation(); updateQty(item.product.id, -1); }}>−</button>
                        <span>{item.qty}</span>
                        <button onClick={(e) => { e.stopPropagation(); updateQty(item.product.id, 1); }}>+</button>
                      </div>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => removeFromCart(item.product.id)}
                        style={{ color: 'var(--color-error)', fontSize: 16, padding: 4 }}
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="pos-cart-footer">
                  <div className="pos-cart-summary">
                    <div className="pos-cart-summary-row">
                      <span>Subtotal ({cart.reduce((s, c) => s + c.qty, 0)} item)</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    {patient?.membership && (
                      <div className="pos-cart-summary-row" style={{ color: 'var(--color-success)' }}>
                        <span>Diskon Member ({patient.membership})</span>
                        <span>-{formatCurrency(Math.round(subtotal * (patient.membership === 'Platinum' ? 0.15 : patient.membership === 'Gold' ? 0.10 : 0.05)))}</span>
                      </div>
                    )}
                    <div className="pos-cart-summary-row total">
                      <span>Total</span>
                      <span>{formatCurrency(patient?.membership 
                        ? Math.round(subtotal * (1 - (patient.membership === 'Platinum' ? 0.15 : patient.membership === 'Gold' ? 0.10 : 0.05)))
                        : subtotal)}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <select className="form-select">
                      <option>💵 Pilih Metode Pembayaran</option>
                      <option>💵 Tunai</option>
                      <option>📱 QRIS</option>
                      <option>🏦 Transfer Bank</option>
                      <option>💳 Kartu Kredit/Debit</option>
                      <option>💰 Deposit Pasien</option>
                    </select>
                    <button 
                      className="btn btn-primary btn-lg" 
                      style={{ width: '100%' }}
                      onClick={() => {
                        alert(`Pembayaran berhasil diproses sebesar ${formatCurrency(patient?.membership ? Math.round(subtotal * (1 - (patient.membership === 'Platinum' ? 0.15 : patient.membership === 'Gold' ? 0.10 : 0.05))) : subtotal)}!\nInvoice akan dikirim ke WhatsApp pasien.`);
                        setCart([]);
                        setActiveTab('riwayat');
                      }}
                    >
                      ✅ Proses Pembayaran
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Transaction History */
          <div className="card">
            <div className="card-header">
              <h3>Riwayat Transaksi</h3>
              <button className="btn btn-outline btn-sm">📥 Export</button>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tanggal</th>
                    <th>Pasien</th>
                    <th>Item</th>
                    <th>Total</th>
                    <th>Pembayaran</th>
                    <th>Status</th>
                    <th>Kasir</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(trx => (
                    <tr key={trx.id}>
                      <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{trx.id}</td>
                      <td>{trx.date}</td>
                      <td style={{ fontWeight: 500 }}>{trx.patientName}</td>
                      <td>
                        {trx.items.map((item, i) => (
                          <div key={i} className="text-sm">{item}</div>
                        ))}
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                        {formatCurrency(trx.total)}
                      </td>
                      <td>
                        <span className="badge badge-confirmed">{trx.paymentMethod}</span>
                      </td>
                      <td>
                        <span className={`badge ${trx.status === 'completed' ? 'badge-completed' : trx.status === 'pending' ? 'badge-checked-in' : 'badge-cancelled'}`}>
                          {trx.status === 'completed' ? '✅ Lunas' : trx.status === 'pending' ? '⏳ Pending' : '↩️ Refund'}
                        </span>
                      </td>
                      <td className="text-sm">{trx.cashier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
