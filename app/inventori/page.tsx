'use client';

import { useState } from 'react';
import { inventory, formatCurrency } from '../data/dummy';

export default function InventoriPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inventoryList, setInventoryList] = useState(inventory);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showPOModal, setShowPOModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

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
      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          background: 'var(--color-surface)', color: 'var(--color-text)',
          padding: '12px 24px', borderRadius: 8, boxShadow: 'var(--shadow-lg)',
          borderLeft: '4px solid var(--color-success)', fontWeight: 500,
          animation: 'slideIn 0.3s ease-out'
        }}>
          {toastMessage}
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}} />

      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1>Stok & Inventori</h1>
            <p className="subtitle">Kelola stok produk, bahan treatment, dan consumable</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline" onClick={() => setShowImportModal(true)}>📥 Import Stok</button>
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
              <button className="btn btn-sm" style={{ background: 'var(--color-warning)', color: '#fff' }} onClick={() => setShowPOModal(true)}>
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
                        <button className="btn btn-ghost btn-sm" title="Detail" onClick={() => { setSelectedItem(item); setShowDetailModal(true); }}>👁️</button>
                        <button className="btn btn-ghost btn-sm" title="Edit" onClick={() => { setSelectedItem(item); setShowEditModal(true); }}>✏️</button>
                        <button className="btn btn-ghost btn-sm" title="Adjustment" onClick={() => { setSelectedItem(item); setShowAdjustmentModal(true); }}>📊</button>
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
      {showImportModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: 450, padding: 24 }}>
            <h2 style={{ marginBottom: 16 }}>📥 Import Stok</h2>
            <p className="text-muted text-sm" style={{ marginBottom: 20 }}>
              Unggah file Excel atau CSV untuk memperbarui stok produk secara massal.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ border: '2px dashed rgba(38, 50, 56, 0.2)', padding: 32, borderRadius: 8, textAlign: 'center', background: 'var(--color-background)' }}>
                <span style={{ fontSize: 32, display: 'block', marginBottom: 8 }}>📄</span>
                <p style={{ fontWeight: 600 }}>Tarik & Lepas File ke Sini</p>
                <p className="text-muted text-sm" style={{ marginTop: 4 }}>atau klik untuk memilih file (.csv, .xlsx)</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                <a href="#" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Unduh Template Kosong</a>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button className="btn btn-outline" onClick={() => setShowImportModal(false)}>Batal</button>
                <button className="btn btn-primary" onClick={() => {
                  setShowImportModal(false);
                  showToast('✅ Berhasil mengimpor 0 data stok baru.');
                }}>Mulai Import</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPOModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: 500, padding: 24 }}>
            <h2 style={{ marginBottom: 16 }}>📋 Buat Purchase Order (PO)</h2>
            <p className="text-muted text-sm" style={{ marginBottom: 16 }}>
              Berikut adalah item dengan stok rendah yang perlu dipesan ulang.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Pilih Supplier Utama</label>
                <select className="form-select">
                  <option>PT. Derma Beauty Indonesia</option>
                  <option>CV. Medika Supplies</option>
                </select>
              </div>
              
              <div style={{ background: 'var(--color-background)', borderRadius: 8, padding: 12 }}>
                <h4 style={{ fontSize: 13, marginBottom: 8 }}>Item untuk di-order:</h4>
                {lowStockItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '8px 12px', borderRadius: 6, marginBottom: 6, fontSize: 13, border: '1px solid #eee' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div className="text-muted" style={{ fontSize: 11 }}>Stok saat ini: {item.stock} {item.unit}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>Qty:</span>
                      <input type="number" className="form-input" defaultValue={item.minStock * 2} style={{ width: 60, height: 28, padding: '2px 8px' }} />
                    </div>
                  </div>
                ))}
                {lowStockItems.length === 0 && <p className="text-muted text-sm">Tidak ada stok yang rendah saat ini.</p>}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                <button className="btn btn-outline" onClick={() => setShowPOModal(false)}>Batal</button>
                <button className="btn btn-primary" onClick={() => {
                  setShowPOModal(false);
                  showToast('✅ Dokumen PO berhasil dibuat dan dikirim ke email Supplier.');
                }} disabled={lowStockItems.length === 0}>Generate PO</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedItem && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: 500, padding: 24, position: 'relative' }}>
            <button onClick={() => setShowDetailModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>✕</button>
            <h2 style={{ marginBottom: 4, paddingRight: 24 }}>Detail Produk: {selectedItem.name}</h2>
            <p className="text-muted text-sm" style={{ fontFamily: 'monospace', marginBottom: 20 }}>{selectedItem.sku}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <span className="text-muted text-xs" style={{ display: 'block', textTransform: 'uppercase' }}>Kategori</span>
                <span style={{ fontWeight: 600 }}>{selectedItem.category}</span>
              </div>
              <div>
                <span className="text-muted text-xs" style={{ display: 'block', textTransform: 'uppercase' }}>Supplier Utama</span>
                <span style={{ fontWeight: 600 }}>{selectedItem.supplier}</span>
              </div>
              <div>
                <span className="text-muted text-xs" style={{ display: 'block', textTransform: 'uppercase' }}>Harga Beli (HPP)</span>
                <span style={{ fontWeight: 600 }}>{formatCurrency(selectedItem.costPrice)}</span>
              </div>
              <div>
                <span className="text-muted text-xs" style={{ display: 'block', textTransform: 'uppercase' }}>Harga Jual</span>
                <span style={{ fontWeight: 600 }}>{selectedItem.price > 0 ? formatCurrency(selectedItem.price) : '-'}</span>
              </div>
              <div style={{ background: 'var(--color-primary-light)', padding: 12, borderRadius: 8 }}>
                <span className="text-muted text-xs" style={{ display: 'block', textTransform: 'uppercase', color: 'var(--color-primary)' }}>Stok Saat Ini</span>
                <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--color-primary)' }}>{selectedItem.stock} {selectedItem.unit}</span>
              </div>
              <div style={{ background: 'var(--color-background)', padding: 12, borderRadius: 8 }}>
                <span className="text-muted text-xs" style={{ display: 'block', textTransform: 'uppercase' }}>Nilai Inventaris</span>
                <span style={{ fontWeight: 700, fontSize: 18 }}>{formatCurrency(selectedItem.stock * selectedItem.costPrice)}</span>
              </div>
            </div>

            <h4 style={{ fontSize: 13, marginBottom: 8, borderBottom: '1px solid #eee', paddingBottom: 8 }}>Informasi Batch Terakhir</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <span className="text-muted text-xs" style={{ display: 'block', textTransform: 'uppercase' }}>Nomor Batch</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{selectedItem.batchNo}</span>
              </div>
              <div>
                <span className="text-muted text-xs" style={{ display: 'block', textTransform: 'uppercase' }}>Tanggal Kedaluwarsa</span>
                <span style={{ fontWeight: 600 }}>{selectedItem.expiryDate}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
              <button className="btn btn-outline" onClick={() => setShowDetailModal(false)}>Tutup</button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && selectedItem && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: 500, padding: 24 }}>
            <h2 style={{ marginBottom: 16 }}>✏️ Edit Produk</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Nama Produk</label>
                <input type="text" className="form-input" id="editProdName" defaultValue={selectedItem.name} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Kategori</label>
                  <select className="form-select" id="editProdCat" defaultValue={selectedItem.category}>
                    <option value="skincare">🧴 Skincare</option>
                    <option value="injectable">💉 Injectable</option>
                    <option value="consumable">📎 Consumable</option>
                    <option value="equipment">🔧 Equipment</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">SKU</label>
                  <input type="text" className="form-input" id="editProdSku" defaultValue={selectedItem.sku} readOnly style={{ background: '#f5f5f5' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Harga Beli</label>
                  <input type="number" className="form-input" id="editProdCost" defaultValue={selectedItem.costPrice} />
                </div>
                <div className="form-group">
                  <label className="form-label">Harga Jual</label>
                  <input type="number" className="form-input" id="editProdPrice" defaultValue={selectedItem.price} />
                </div>
                <div className="form-group">
                  <label className="form-label">Min Stok</label>
                  <input type="number" className="form-input" id="editProdMinStock" defaultValue={selectedItem.minStock} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                <button className="btn btn-outline" onClick={() => setShowEditModal(false)}>Batal</button>
                <button className="btn btn-primary" onClick={() => {
                  const updatedList = inventoryList.map(item => {
                    if (item.id === selectedItem.id) {
                      return {
                        ...item,
                        name: (document.getElementById('editProdName') as HTMLInputElement).value,
                        category: (document.getElementById('editProdCat') as HTMLSelectElement).value as any,
                        costPrice: parseInt((document.getElementById('editProdCost') as HTMLInputElement).value) || 0,
                        price: parseInt((document.getElementById('editProdPrice') as HTMLInputElement).value) || 0,
                        minStock: parseInt((document.getElementById('editProdMinStock') as HTMLInputElement).value) || 0,
                      };
                    }
                    return item;
                  });
                  setInventoryList(updatedList);
                  setShowEditModal(false);
                  showToast('✅ Data produk berhasil diperbarui!');
                }}>Simpan Perubahan</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAdjustmentModal && selectedItem && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: 450, padding: 24 }}>
            <h2 style={{ marginBottom: 16 }}>📊 Stok Adjustment</h2>
            <p className="text-muted text-sm" style={{ marginBottom: 16 }}>
              Penyesuaian stok untuk produk <strong>{selectedItem.name}</strong>. Stok sistem saat ini: <strong>{selectedItem.stock} {selectedItem.unit}</strong>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Jenis Penyesuaian</label>
                <select className="form-select" id="adjType">
                  <option value="add">➕ Tambah Stok (Barang Masuk / Retur)</option>
                  <option value="subtract">➖ Kurangi Stok (Rusak / Expired / Hilang)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Jumlah (Qty)</label>
                <input type="number" className="form-input" id="adjQty" defaultValue="1" min="1" />
              </div>
              <div className="form-group">
                <label className="form-label">Keterangan / Alasan</label>
                <textarea className="form-input" id="adjReason" rows={2} placeholder="Misal: Barang expired dibuang"></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                <button className="btn btn-outline" onClick={() => setShowAdjustmentModal(false)}>Batal</button>
                <button className="btn btn-primary" onClick={() => {
                  const type = (document.getElementById('adjType') as HTMLSelectElement).value;
                  const qty = parseInt((document.getElementById('adjQty') as HTMLInputElement).value) || 0;
                  
                  const updatedList = inventoryList.map(item => {
                    if (item.id === selectedItem.id) {
                      return {
                        ...item,
                        stock: type === 'add' ? item.stock + qty : Math.max(0, item.stock - qty)
                      };
                    }
                    return item;
                  });
                  setInventoryList(updatedList);
                  setShowAdjustmentModal(false);
                  showToast('✅ Stok berhasil disesuaikan!');
                }}>Konfirmasi Adjustment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
