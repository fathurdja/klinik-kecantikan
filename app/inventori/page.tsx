'use client';

import { useState } from 'react';
import { inventory, formatCurrency } from '../data/dummy';

export default function InventoriPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inventoryList, setInventoryList] = useState(inventory);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredInventory = inventoryList.filter(item => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const lowStockItems = inventoryList.filter(i => i.stock <= i.minStock);
  const totalValue = inventoryList.reduce((sum, i) => sum + (i.costPrice * i.stock), 0);
  const totalItems = inventoryList.reduce((sum, i) => sum + i.stock, 0);

  const isLowStock = (item: typeof inventory[0]) => item.stock <= item.minStock;
  const isExpiringSoon = (item: typeof inventory[0]) => {
    const expiry = new Date(item.expiryDate);
    const threeMonths = new Date();
    threeMonths.setMonth(threeMonths.getMonth() + 3);
    return expiry <= threeMonths;
  };

  return (
    <>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1>Stok & Inventori</h1>
            <p className="subtitle">Kelola stok produk, bahan treatment, dan consumable</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline">📥 Import Stok</button>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>➕ Tambah Produk</button>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon primary">📦</div>
            <div className="stat-info">
              <h4>Total Produk</h4>
              <div className="stat-value">{inventory.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon info">🏷️</div>
            <div className="stat-info">
              <h4>Total Unit</h4>
              <div className="stat-value">{totalItems}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon gold">💰</div>
            <div className="stat-info">
              <h4>Nilai Inventori</h4>
              <div className="stat-value" style={{ fontSize: 20 }}>{formatCurrency(totalValue)}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon warning">⚠️</div>
            <div className="stat-info">
              <h4>Stok Rendah</h4>
              <div className="stat-value" style={{ color: 'var(--color-warning)' }}>{lowStockItems.length}</div>
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <div className="card" style={{ marginBottom: 24, borderLeft: '4px solid var(--color-warning)', background: 'var(--color-warning-bg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 24 }}>⚠️</span>
              <div style={{ flex: 1 }}>
                <h4 style={{ color: 'var(--color-warning)' }}>Peringatan Stok Rendah</h4>
                <p className="text-sm" style={{ marginTop: 4 }}>
                  {lowStockItems.map(i => i.name).join(', ')} — segera lakukan pemesanan ulang.
                </p>
              </div>
              <button className="btn btn-sm" style={{ background: 'var(--color-warning)', color: '#fff' }}>
                📋 Buat PO
              </button>
            </div>
          </div>
        )}

        {/* Filter & Search */}
        <div className="filter-bar">
          <input
            type="text"
            className="form-input"
            placeholder="🔍 Cari produk atau SKU..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ minWidth: 250 }}
          />
          <select
            className="form-select"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            style={{ width: 'auto', minWidth: 180 }}
          >
            <option value="all">Semua Kategori</option>
            <option value="skincare">🧴 Skincare</option>
            <option value="injectable">💉 Injectable</option>
            <option value="consumable">📎 Consumable</option>
            <option value="equipment">🔧 Equipment</option>
          </select>
        </div>

        {/* Inventory Table */}
        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>SKU</th>
                  <th>Kategori</th>
                  <th>Stok</th>
                  <th>Min Stok</th>
                  <th>Harga Jual</th>
                  <th>Harga Beli</th>
                  <th>Batch</th>
                  <th>Kedaluwarsa</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map(item => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{item.sku}</td>
                    <td>
                      <span className="badge badge-confirmed">
                        {item.category === 'skincare' ? '🧴' : item.category === 'injectable' ? '💉' : item.category === 'consumable' ? '📎' : '🔧'} {item.category}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: isLowStock(item) ? 'var(--color-error)' : 'inherit' }}>
                        {item.stock}
                      </span>
                      <span className="text-muted text-sm"> {item.unit}</span>
                    </td>
                    <td className="text-muted">{item.minStock}</td>
                    <td>{item.price > 0 ? formatCurrency(item.price) : <span className="text-muted">—</span>}</td>
                    <td>{formatCurrency(item.costPrice)}</td>
                    <td className="text-sm" style={{ fontFamily: 'monospace' }}>{item.batchNo}</td>
                    <td>{item.expiryDate}</td>
                    <td>
                      {isLowStock(item) ? (
                        <span className="badge badge-low-stock">⚠️ Stok Rendah</span>
                      ) : isExpiringSoon(item) ? (
                        <span className="badge badge-expired">⏰ Segera Expired</span>
                      ) : (
                        <span className="badge badge-active">✅ Normal</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn btn-ghost btn-sm" title="Edit">✏️</button>
                        <button className="btn btn-ghost btn-sm" title="Adjustment">📊</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <span className="pagination-info">
              Menampilkan {filteredInventory.length} dari {inventory.length} produk
            </span>
            <div className="pagination-controls">
              <button className="pagination-btn active">1</button>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: 500, padding: 24 }}>
            <h2 style={{ marginBottom: 16 }}>➕ Tambah Produk</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Nama Produk</label>
                <input type="text" className="form-input" id="newProdName" placeholder="Contoh: Serum Vitamin C" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Kategori</label>
                  <select className="form-select" id="newProdCat">
                    <option value="skincare">🧴 Skincare</option>
                    <option value="injectable">💉 Injectable</option>
                    <option value="consumable">📎 Consumable</option>
                    <option value="equipment">🔧 Equipment</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">SKU</label>
                  <input type="text" className="form-input" id="newProdSku" defaultValue={`PRD-${Math.floor(Math.random()*1000)}`} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Stok Awal</label>
                  <input type="number" className="form-input" id="newProdStock" defaultValue="10" />
                </div>
                <div className="form-group">
                  <label className="form-label">Satuan</label>
                  <input type="text" className="form-input" id="newProdUnit" defaultValue="pcs" />
                </div>
                <div className="form-group">
                  <label className="form-label">Min Stok</label>
                  <input type="number" className="form-input" id="newProdMinStock" defaultValue="5" />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                <button className="btn btn-outline" onClick={() => setShowAddModal(false)}>Batal</button>
                <button className="btn btn-primary" onClick={() => {
                  const newProd = {
                    id: `INV-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                    name: (document.getElementById('newProdName') as HTMLInputElement).value || 'Produk Baru',
                    sku: (document.getElementById('newProdSku') as HTMLInputElement).value || 'PRD-000',
                    category: (document.getElementById('newProdCat') as HTMLSelectElement).value as any,
                    stock: parseInt((document.getElementById('newProdStock') as HTMLInputElement).value) || 0,
                    minStock: parseInt((document.getElementById('newProdMinStock') as HTMLInputElement).value) || 0,
                    unit: (document.getElementById('newProdUnit') as HTMLInputElement).value || 'pcs',
                    price: 150000,
                    costPrice: 100000,
                    batchNo: 'B-NEW',
                    expiryDate: '2027-12-31',
                    supplier: 'Supplier Default'
                  };
                  setInventoryList([newProd as any, ...inventoryList]);
                  setShowAddModal(false);
                  alert('Produk berhasil ditambahkan!');
                }}>Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
