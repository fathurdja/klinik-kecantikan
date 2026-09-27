// ============================================
// GlowCare ERP — Dummy Data
// ============================================

export const currentUser = {
  name: 'Dr. Ayu Paramitha',
  role: 'Owner/Manajemen',
  branch: 'GlowCare Seminyak',
  avatar: 'AP',
};

export const branches = [
  { id: 1, name: 'GlowCare Seminyak' },
  { id: 2, name: 'GlowCare Ubud' },
  { id: 3, name: 'GlowCare Kuta' },
];

// ── Dashboard Stats ──
export const dashboardStats = {
  todayRevenue: 28750000,
  todayAppointments: 18,
  newPatients: 5,
  lowStockItems: 3,
  weeklyRevenue: [
    { day: 'Sen', value: 22000000 },
    { day: 'Sel', value: 28000000 },
    { day: 'Rab', value: 25000000 },
    { day: 'Kam', value: 31000000 },
    { day: 'Jum', value: 35000000 },
    { day: 'Sab', value: 42000000 },
    { day: 'Min', value: 28750000 },
  ],
  topTreatments: [
    { name: 'Facial Hydrating Premium', count: 45, revenue: 67500000 },
    { name: 'Chemical Peeling', count: 38, revenue: 57000000 },
    { name: 'Botox Treatment', count: 28, revenue: 112000000 },
    { name: 'Laser Rejuvenation', count: 25, revenue: 87500000 },
    { name: 'Dermal Filler', count: 22, revenue: 99000000 },
  ],
  revenueByCategory: [
    { category: 'Treatment', value: 65, color: '#1F6465' },
    { category: 'Produk Retail', value: 20, color: '#C9826B' },
    { category: 'Paket/Member', value: 15, color: '#C8A96B' },
  ],
};

// ── Appointments ──
export type AppointmentStatus = 'booked' | 'confirmed' | 'checked-in' | 'in-treatment' | 'completed' | 'cancelled' | 'no-show';

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  treatment: string;
  doctor: string;
  date: string;
  time: string;
  duration: number; // minutes
  status: AppointmentStatus;
  notes?: string;
}

export const appointments: Appointment[] = [
  { id: 'APT-001', patientName: 'Ni Made Ari Dewi', patientId: 'P-001', treatment: 'Facial Hydrating Premium', doctor: 'Dr. Ayu Paramitha', date: '2026-09-27', time: '09:00', duration: 60, status: 'completed' },
  { id: 'APT-002', patientName: 'Kadek Ratna Sari', patientId: 'P-002', treatment: 'Chemical Peeling', doctor: 'Dr. Wayan Surya', date: '2026-09-27', time: '09:30', duration: 45, status: 'in-treatment' },
  { id: 'APT-003', patientName: 'Putu Ayu Lestari', patientId: 'P-003', treatment: 'Botox Treatment', doctor: 'Dr. Ayu Paramitha', date: '2026-09-27', time: '10:00', duration: 30, status: 'checked-in' },
  { id: 'APT-004', patientName: 'I Gusti Made Rai', patientId: 'P-004', treatment: 'Laser Rejuvenation', doctor: 'Dr. Wayan Surya', date: '2026-09-27', time: '11:00', duration: 90, status: 'confirmed' },
  { id: 'APT-005', patientName: 'Ni Luh Putu Mega', patientId: 'P-005', treatment: 'Dermal Filler', doctor: 'Dr. Ayu Paramitha', date: '2026-09-27', time: '13:00', duration: 45, status: 'booked' },
  { id: 'APT-006', patientName: 'Made Ayu Saraswati', patientId: 'P-006', treatment: 'Facial Glow Up', doctor: 'Beautician Dewi', date: '2026-09-27', time: '14:00', duration: 60, status: 'booked' },
  { id: 'APT-007', patientName: 'Ketut Ariani', patientId: 'P-007', treatment: 'Microneedling', doctor: 'Dr. Wayan Surya', date: '2026-09-27', time: '14:30', duration: 45, status: 'confirmed' },
  { id: 'APT-008', patientName: 'Wayan Eka Putri', patientId: 'P-008', treatment: 'LED Light Therapy', doctor: 'Beautician Dewi', date: '2026-09-27', time: '15:00', duration: 30, status: 'booked' },
  { id: 'APT-009', patientName: 'Nyoman Tri Utami', patientId: 'P-009', treatment: 'PRP Treatment', doctor: 'Dr. Ayu Paramitha', date: '2026-09-28', time: '09:00', duration: 60, status: 'booked' },
  { id: 'APT-010', patientName: 'Komang Ayu Ningsih', patientId: 'P-010', treatment: 'Chemical Peeling', doctor: 'Dr. Wayan Surya', date: '2026-09-28', time: '10:00', duration: 45, status: 'booked' },
  { id: 'APT-011', patientName: 'Sarah Johnson', patientId: 'P-011', treatment: 'Facial Hydrating Premium', doctor: 'Dr. Ayu Paramitha', date: '2026-09-26', time: '10:00', duration: 60, status: 'completed' },
  { id: 'APT-012', patientName: 'Emma Williams', patientId: 'P-012', treatment: 'Botox Treatment', doctor: 'Dr. Ayu Paramitha', date: '2026-09-26', time: '14:00', duration: 30, status: 'cancelled' },
];

// ── Patients ──
export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  dob: string;
  gender: string;
  address: string;
  membership: string | null;
  totalVisits: number;
  lastVisit: string;
  allergies: string[];
  registeredDate: string;
}

export const patients: Patient[] = [
  { id: 'P-001', name: 'Ni Made Ari Dewi', phone: '+62 812-3456-7890', email: 'ari.dewi@email.com', dob: '1992-05-15', gender: 'Wanita', address: 'Jl. Sunset Road No. 88, Seminyak', membership: 'Gold', totalVisits: 24, lastVisit: '2026-09-27', allergies: ['Lidocaine'], registeredDate: '2025-03-10' },
  { id: 'P-002', name: 'Kadek Ratna Sari', phone: '+62 813-4567-8901', email: 'ratna.sari@email.com', dob: '1988-11-22', gender: 'Wanita', address: 'Jl. Raya Ubud No. 45, Ubud', membership: 'Platinum', totalVisits: 42, lastVisit: '2026-09-27', allergies: [], registeredDate: '2024-08-15' },
  { id: 'P-003', name: 'Putu Ayu Lestari', phone: '+62 857-1234-5678', email: 'ayu.lestari@email.com', dob: '1995-03-08', gender: 'Wanita', address: 'Jl. Legian No. 120, Kuta', membership: 'Silver', totalVisits: 12, lastVisit: '2026-09-27', allergies: ['Retinol'], registeredDate: '2026-01-20' },
  { id: 'P-004', name: 'I Gusti Made Rai', phone: '+62 819-8765-4321', email: 'made.rai@email.com', dob: '1985-07-30', gender: 'Pria', address: 'Jl. Bypass Ngurah Rai No. 55, Sanur', membership: null, totalVisits: 5, lastVisit: '2026-09-27', allergies: [], registeredDate: '2026-06-01' },
  { id: 'P-005', name: 'Ni Luh Putu Mega', phone: '+62 821-5678-9012', email: 'mega@email.com', dob: '1990-12-03', gender: 'Wanita', address: 'Jl. Danau Tamblingan No. 78, Sanur', membership: 'Gold', totalVisits: 18, lastVisit: '2026-09-25', allergies: ['Hyaluronic Acid'], registeredDate: '2025-09-12' },
  { id: 'P-006', name: 'Made Ayu Saraswati', phone: '+62 878-2345-6789', email: 'saraswati@email.com', dob: '1997-01-19', gender: 'Wanita', address: 'Jl. Monkey Forest No. 33, Ubud', membership: 'Silver', totalVisits: 8, lastVisit: '2026-09-22', allergies: [], registeredDate: '2026-04-05' },
  { id: 'P-007', name: 'Ketut Ariani', phone: '+62 856-7890-1234', email: 'ariani@email.com', dob: '1993-08-25', gender: 'Wanita', address: 'Jl. Petitenget No. 66, Seminyak', membership: 'Gold', totalVisits: 30, lastVisit: '2026-09-20', allergies: [], registeredDate: '2025-01-15' },
  { id: 'P-008', name: 'Wayan Eka Putri', phone: '+62 815-3456-7890', email: 'eka.putri@email.com', dob: '1991-04-12', gender: 'Wanita', address: 'Jl. Oberoi No. 22, Seminyak', membership: null, totalVisits: 3, lastVisit: '2026-09-18', allergies: ['Vitamin C serum'], registeredDate: '2026-08-01' },
  { id: 'P-009', name: 'Nyoman Tri Utami', phone: '+62 838-9012-3456', email: 'tri.utami@email.com', dob: '1994-06-07', gender: 'Wanita', address: 'Jl. Camplung Tanduk No. 10, Seminyak', membership: 'Platinum', totalVisits: 55, lastVisit: '2026-09-15', allergies: [], registeredDate: '2024-02-20' },
  { id: 'P-010', name: 'Komang Ayu Ningsih', phone: '+62 817-4567-8901', email: 'ningsih@email.com', dob: '1989-09-14', gender: 'Wanita', address: 'Jl. Raya Kerobokan No. 88, Kerobokan', membership: 'Silver', totalVisits: 10, lastVisit: '2026-09-10', allergies: [], registeredDate: '2026-02-14' },
  { id: 'P-011', name: 'Sarah Johnson', phone: '+1 555-0123', email: 'sarah.j@email.com', dob: '1996-02-28', gender: 'Wanita', address: 'Villa Seminyak, Jl. Kayu Aya', membership: null, totalVisits: 2, lastVisit: '2026-09-26', allergies: [], registeredDate: '2026-09-20' },
  { id: 'P-012', name: 'Emma Williams', phone: '+44 7700-900123', email: 'emma.w@email.com', dob: '1987-10-11', gender: 'Wanita', address: 'The Legian Hotel, Seminyak', membership: null, totalVisits: 1, lastVisit: '2026-09-26', allergies: ['Parabens'], registeredDate: '2026-09-25' },
];

// ── Medical Records ──
export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  doctor: string;
  type: 'konsultasi' | 'treatment' | 'kontrol' | 'foto';
  title: string;
  notes: string;
  products?: string[];
  postCareInstructions?: string;
}

export const medicalRecords: MedicalRecord[] = [
  { id: 'MR-001', patientId: 'P-001', date: '2026-09-27', doctor: 'Dr. Ayu Paramitha', type: 'treatment', title: 'Facial Hydrating Premium', notes: 'Treatment berjalan lancar. Kulit pasien merespon dengan baik. Area T-zone fokus utama.', products: ['HA Serum 2%', 'Moisturizer SPF 30'], postCareInstructions: 'Hindari paparan matahari langsung selama 24 jam. Gunakan moisturizer setiap pagi dan malam.' },
  { id: 'MR-002', patientId: 'P-001', date: '2026-09-13', doctor: 'Dr. Ayu Paramitha', type: 'konsultasi', title: 'Konsultasi Rutin', notes: 'Pasien mengeluhkan kulit kering di area pipi. Rekomendasi: Facial Hydrating Premium + home care routine adjustment.' },
  { id: 'MR-003', patientId: 'P-001', date: '2026-08-30', doctor: 'Dr. Wayan Surya', type: 'treatment', title: 'Chemical Peeling (Light)', notes: 'Peeling ringan dengan AHA 15%. Tidak ada reaksi negatif. Kulit tampak lebih cerah setelah treatment.', products: ['AHA Peel 15%', 'Calming Cream'], postCareInstructions: 'Jangan gunakan produk eksfoliasi selama 1 minggu. Wajib sunscreen SPF 50+.' },
  { id: 'MR-004', patientId: 'P-001', date: '2026-08-15', doctor: 'Dr. Ayu Paramitha', type: 'foto', title: 'Foto Before-After (Chemical Peeling Series)', notes: 'Dokumentasi progres setelah 3 sesi chemical peeling. Tampak perbaikan signifikan pada hiperpigmentasi.' },
  { id: 'MR-005', patientId: 'P-001', date: '2026-07-20', doctor: 'Dr. Ayu Paramitha', type: 'kontrol', title: 'Kontrol Pasca Botox', notes: 'Hasil Botox area glabella memuaskan. Tidak ada komplikasi. Rekomendasi touch-up dalam 4-6 bulan.' },
];

// ── POS / Products & Treatments ──
export interface Product {
  id: string;
  name: string;
  category: 'treatment' | 'product';
  price: number;
  icon: string;
  description?: string;
}

export const posProducts: Product[] = [
  { id: 'TR-001', name: 'Facial Hydrating Premium', category: 'treatment', price: 1500000, icon: '💆', description: '60 menit deep hydration facial' },
  { id: 'TR-002', name: 'Chemical Peeling', category: 'treatment', price: 1500000, icon: '🧪', description: '45 menit AHA/BHA peeling' },
  { id: 'TR-003', name: 'Botox Treatment', category: 'treatment', price: 4000000, icon: '💉', description: 'Botulinum toxin injection' },
  { id: 'TR-004', name: 'Laser Rejuvenation', category: 'treatment', price: 3500000, icon: '✨', description: '90 menit laser treatment' },
  { id: 'TR-005', name: 'Dermal Filler', category: 'treatment', price: 4500000, icon: '💎', description: 'HA filler injection' },
  { id: 'TR-006', name: 'Facial Glow Up', category: 'treatment', price: 850000, icon: '🌟', description: '60 menit brightening facial' },
  { id: 'TR-007', name: 'Microneedling', category: 'treatment', price: 2000000, icon: '🪡', description: '45 menit microneedling' },
  { id: 'TR-008', name: 'LED Light Therapy', category: 'treatment', price: 750000, icon: '💡', description: '30 menit LED therapy' },
  { id: 'TR-009', name: 'PRP Treatment', category: 'treatment', price: 5000000, icon: '🩸', description: 'Platelet-Rich Plasma therapy' },
  { id: 'TR-010', name: 'Mesotherapy', category: 'treatment', price: 2500000, icon: '💧', description: 'Vitamin injection therapy' },
  { id: 'PR-001', name: 'HA Serum 2%', category: 'product', price: 450000, icon: '🧴' },
  { id: 'PR-002', name: 'Vitamin C Serum', category: 'product', price: 380000, icon: '🍊' },
  { id: 'PR-003', name: 'Sunscreen SPF 50+', category: 'product', price: 320000, icon: '☀️' },
  { id: 'PR-004', name: 'Retinol Night Cream', category: 'product', price: 520000, icon: '🌙' },
  { id: 'PR-005', name: 'Gentle Cleanser', category: 'product', price: 280000, icon: '🫧' },
  { id: 'PR-006', name: 'Eye Cream Anti-Aging', category: 'product', price: 650000, icon: '👁️' },
];

// ── Transactions ──
export interface Transaction {
  id: string;
  date: string;
  patientName: string;
  items: string[];
  total: number;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'refunded';
  cashier: string;
}

export const transactions: Transaction[] = [
  { id: 'TRX-001', date: '2026-09-27 09:45', patientName: 'Ni Made Ari Dewi', items: ['Facial Hydrating Premium', 'HA Serum 2%'], total: 1950000, paymentMethod: 'QRIS', status: 'completed', cashier: 'Resepsionis Komang' },
  { id: 'TRX-002', date: '2026-09-27 10:30', patientName: 'Kadek Ratna Sari', items: ['Chemical Peeling'], total: 1500000, paymentMethod: 'Transfer Bank', status: 'completed', cashier: 'Resepsionis Komang' },
  { id: 'TRX-003', date: '2026-09-27 11:15', patientName: 'Putu Ayu Lestari', items: ['Botox Treatment'], total: 4000000, paymentMethod: 'Kartu Kredit', status: 'pending', cashier: 'Resepsionis Komang' },
  { id: 'TRX-004', date: '2026-09-26 14:20', patientName: 'Sarah Johnson', items: ['Facial Hydrating Premium', 'Vitamin C Serum', 'Sunscreen SPF 50+'], total: 2200000, paymentMethod: 'Tunai', status: 'completed', cashier: 'Resepsionis Made' },
  { id: 'TRX-005', date: '2026-09-26 16:00', patientName: 'Ketut Ariani', items: ['Laser Rejuvenation'], total: 3500000, paymentMethod: 'Deposit Pasien', status: 'completed', cashier: 'Resepsionis Komang' },
  { id: 'TRX-006', date: '2026-09-25 10:00', patientName: 'Ni Luh Putu Mega', items: ['Dermal Filler'], total: 4500000, paymentMethod: 'Transfer Bank', status: 'completed', cashier: 'Resepsionis Made' },
  { id: 'TRX-007', date: '2026-09-25 13:30', patientName: 'Nyoman Tri Utami', items: ['PRP Treatment', 'Eye Cream Anti-Aging'], total: 5650000, paymentMethod: 'QRIS', status: 'completed', cashier: 'Resepsionis Komang' },
  { id: 'TRX-008', date: '2026-09-24 09:00', patientName: 'Made Ayu Saraswati', items: ['Facial Glow Up'], total: 850000, paymentMethod: 'Tunai', status: 'completed', cashier: 'Resepsionis Made' },
];

// ── Inventory ──
export interface InventoryItem {
  id: string;
  name: string;
  category: 'skincare' | 'injectable' | 'consumable' | 'equipment';
  sku: string;
  stock: number;
  minStock: number;
  unit: string;
  price: number;
  costPrice: number;
  expiryDate: string;
  supplier: string;
  batchNo: string;
}

export const inventory: InventoryItem[] = [
  { id: 'INV-001', name: 'HA Serum 2% (Retail)', category: 'skincare', sku: 'SKC-001', stock: 45, minStock: 10, unit: 'botol', price: 450000, costPrice: 180000, expiryDate: '2027-06-15', supplier: 'PT Derma Indonesia', batchNo: 'BT-2026-001' },
  { id: 'INV-002', name: 'Vitamin C Serum (Retail)', category: 'skincare', sku: 'SKC-002', stock: 32, minStock: 10, unit: 'botol', price: 380000, costPrice: 150000, expiryDate: '2027-04-20', supplier: 'PT Derma Indonesia', batchNo: 'BT-2026-002' },
  { id: 'INV-003', name: 'Sunscreen SPF 50+ (Retail)', category: 'skincare', sku: 'SKC-003', stock: 8, minStock: 15, unit: 'tube', price: 320000, costPrice: 120000, expiryDate: '2027-08-10', supplier: 'PT Skin Protect', batchNo: 'BT-2026-003' },
  { id: 'INV-004', name: 'Botulinum Toxin 100U', category: 'injectable', sku: 'INJ-001', stock: 12, minStock: 5, unit: 'vial', price: 0, costPrice: 2800000, expiryDate: '2027-01-30', supplier: 'PT Medikal Estetika', batchNo: 'BT-2026-010' },
  { id: 'INV-005', name: 'HA Filler 1ml', category: 'injectable', sku: 'INJ-002', stock: 3, minStock: 5, unit: 'syringe', price: 0, costPrice: 1500000, expiryDate: '2027-03-15', supplier: 'PT Medikal Estetika', batchNo: 'BT-2026-011' },
  { id: 'INV-006', name: 'AHA Peel Solution 15%', category: 'consumable', sku: 'CON-001', stock: 18, minStock: 5, unit: 'botol', price: 0, costPrice: 350000, expiryDate: '2027-02-28', supplier: 'PT Chemical Beauty', batchNo: 'BT-2026-020' },
  { id: 'INV-007', name: 'Retinol Night Cream (Retail)', category: 'skincare', sku: 'SKC-004', stock: 2, minStock: 8, unit: 'jar', price: 520000, costPrice: 200000, expiryDate: '2027-05-10', supplier: 'PT Derma Indonesia', batchNo: 'BT-2026-004' },
  { id: 'INV-008', name: 'Masker Hydrogel', category: 'consumable', sku: 'CON-002', stock: 50, minStock: 20, unit: 'pcs', price: 0, costPrice: 45000, expiryDate: '2027-12-01', supplier: 'PT Skin Protect', batchNo: 'BT-2026-021' },
  { id: 'INV-009', name: 'Gentle Cleanser (Retail)', category: 'skincare', sku: 'SKC-005', stock: 28, minStock: 10, unit: 'botol', price: 280000, costPrice: 100000, expiryDate: '2027-09-20', supplier: 'PT Derma Indonesia', batchNo: 'BT-2026-005' },
  { id: 'INV-010', name: 'Microneedling Cartridge', category: 'consumable', sku: 'CON-003', stock: 25, minStock: 10, unit: 'pcs', price: 0, costPrice: 85000, expiryDate: '2028-01-15', supplier: 'PT Medikal Estetika', batchNo: 'BT-2026-022' },
];

// ── Packages ──
export interface TreatmentPackage {
  id: string;
  name: string;
  treatments: string[];
  sessions: number;
  validDays: number;
  originalPrice: number;
  packagePrice: number;
  sold: number;
  isActive: boolean;
}

export const packages: TreatmentPackage[] = [
  { id: 'PKG-001', name: 'Paket Glowing Skin', treatments: ['Facial Hydrating Premium', 'Chemical Peeling'], sessions: 6, validDays: 90, originalPrice: 9000000, packagePrice: 7500000, sold: 28, isActive: true },
  { id: 'PKG-002', name: 'Paket Anti-Aging Complete', treatments: ['Botox Treatment', 'Dermal Filler', 'Laser Rejuvenation'], sessions: 4, validDays: 180, originalPrice: 24000000, packagePrice: 19500000, sold: 12, isActive: true },
  { id: 'PKG-003', name: 'Paket Brightening Journey', treatments: ['Chemical Peeling', 'Facial Glow Up', 'LED Light Therapy'], sessions: 8, validDays: 120, originalPrice: 12400000, packagePrice: 9800000, sold: 35, isActive: true },
  { id: 'PKG-004', name: 'Paket Skin Rejuvenation', treatments: ['Microneedling', 'PRP Treatment'], sessions: 4, validDays: 120, originalPrice: 14000000, packagePrice: 11200000, sold: 8, isActive: true },
  { id: 'PKG-005', name: 'Paket Facial Basic', treatments: ['Facial Glow Up'], sessions: 4, validDays: 60, originalPrice: 3400000, packagePrice: 2800000, sold: 45, isActive: true },
];

// ── Membership Tiers ──
export interface MembershipTier {
  id: string;
  name: string;
  minSpend: number;
  benefits: string[];
  discount: number;
  pointMultiplier: number;
  members: number;
  color: 'silver' | 'gold' | 'platinum';
}

export const membershipTiers: MembershipTier[] = [
  { id: 'MEM-SILVER', name: 'Silver', minSpend: 5000000, benefits: ['Diskon 5% semua treatment', 'Birthday voucher Rp 200.000', 'Priority booking', 'Welcome gift'], discount: 5, pointMultiplier: 1, members: 124, color: 'silver' },
  { id: 'MEM-GOLD', name: 'Gold', minSpend: 15000000, benefits: ['Diskon 10% semua treatment', 'Diskon 5% produk retail', 'Birthday voucher Rp 500.000', 'Priority booking', 'Free facial 1x/bulan', 'Exclusive event access'], discount: 10, pointMultiplier: 1.5, members: 67, color: 'gold' },
  { id: 'MEM-PLATINUM', name: 'Platinum', minSpend: 50000000, benefits: ['Diskon 15% semua treatment', 'Diskon 10% produk retail', 'Birthday voucher Rp 1.000.000', 'VIP room access', 'Free facial 2x/bulan', 'Personal beauty consultant', 'Free home care kit quarterly', 'Exclusive event + bring a friend'], discount: 15, pointMultiplier: 2, members: 23, color: 'platinum' },
];

// ── Staff & Commission ──
export interface Staff {
  id: string;
  name: string;
  role: string;
  commissionScheme: string;
  totalCommission: number;
  thisMonthCommission: number;
  treatments: number;
  productSales: number;
}

export const staff: Staff[] = [
  { id: 'STF-001', name: 'Dr. Ayu Paramitha', role: 'Dokter', commissionScheme: '15% Treatment', totalCommission: 45600000, thisMonthCommission: 8750000, treatments: 85, productSales: 12 },
  { id: 'STF-002', name: 'Dr. Wayan Surya', role: 'Dokter', commissionScheme: '15% Treatment', totalCommission: 38200000, thisMonthCommission: 7200000, treatments: 72, productSales: 8 },
  { id: 'STF-003', name: 'Beautician Dewi', role: 'Beautician', commissionScheme: '10% Treatment', totalCommission: 18500000, thisMonthCommission: 3400000, treatments: 95, productSales: 25 },
  { id: 'STF-004', name: 'Beautician Rina', role: 'Beautician', commissionScheme: '10% Treatment', totalCommission: 15800000, thisMonthCommission: 2900000, treatments: 78, productSales: 20 },
  { id: 'STF-005', name: 'Resepsionis Komang', role: 'Resepsionis', commissionScheme: '3% Product Sales', totalCommission: 4200000, thisMonthCommission: 680000, treatments: 0, productSales: 45 },
  { id: 'STF-006', name: 'Resepsionis Made', role: 'Resepsionis', commissionScheme: '3% Product Sales', totalCommission: 3800000, thisMonthCommission: 520000, treatments: 0, productSales: 38 },
];

// ── Commission Details ──
export interface CommissionDetail {
  id: string;
  staffId: string;
  date: string;
  transactionId: string;
  patientName: string;
  service: string;
  serviceAmount: number;
  rate: number;
  commission: number;
}

export const commissionDetails: CommissionDetail[] = [
  { id: 'COM-001', staffId: 'STF-001', date: '2026-09-27', transactionId: 'TRX-001', patientName: 'Ni Made Ari Dewi', service: 'Facial Hydrating Premium', serviceAmount: 1500000, rate: 15, commission: 225000 },
  { id: 'COM-002', staffId: 'STF-002', date: '2026-09-27', transactionId: 'TRX-002', patientName: 'Kadek Ratna Sari', service: 'Chemical Peeling', serviceAmount: 1500000, rate: 15, commission: 225000 },
  { id: 'COM-003', staffId: 'STF-001', date: '2026-09-27', transactionId: 'TRX-003', patientName: 'Putu Ayu Lestari', service: 'Botox Treatment', serviceAmount: 4000000, rate: 15, commission: 600000 },
  { id: 'COM-004', staffId: 'STF-001', date: '2026-09-26', transactionId: 'TRX-004', patientName: 'Sarah Johnson', service: 'Facial Hydrating Premium', serviceAmount: 1500000, rate: 15, commission: 225000 },
  { id: 'COM-005', staffId: 'STF-002', date: '2026-09-26', transactionId: 'TRX-005', patientName: 'Ketut Ariani', service: 'Laser Rejuvenation', serviceAmount: 3500000, rate: 15, commission: 525000 },
];

// ── Financial Reports ──
export const financialSummary = {
  thisMonth: {
    revenue: 285600000,
    expenses: 142800000,
    profit: 142800000,
    treatmentRevenue: 215400000,
    productRevenue: 42800000,
    packageRevenue: 27400000,
    totalTransactions: 245,
  },
  lastMonth: {
    revenue: 262000000,
    expenses: 138500000,
    profit: 123500000,
  },
  dailyRevenue: [
    { date: '1 Sep', revenue: 8500000 },
    { date: '5 Sep', revenue: 12000000 },
    { date: '10 Sep', revenue: 9800000 },
    { date: '15 Sep', revenue: 15200000 },
    { date: '20 Sep', revenue: 11500000 },
    { date: '25 Sep', revenue: 14800000 },
    { date: '27 Sep', revenue: 28750000 },
  ],
  expenseCategories: [
    { category: 'Bahan Treatment', amount: 58000000, percentage: 40.6 },
    { category: 'Gaji & Komisi', amount: 45000000, percentage: 31.5 },
    { category: 'Sewa & Utilitas', amount: 22000000, percentage: 15.4 },
    { category: 'Marketing', amount: 10800000, percentage: 7.6 },
    { category: 'Operasional Lain', amount: 7000000, percentage: 4.9 },
  ],
};

// ── Helpers ──
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    'booked': 'Terjadwal',
    'confirmed': 'Dikonfirmasi',
    'checked-in': 'Check-in',
    'in-treatment': 'Dalam Treatment',
    'completed': 'Selesai',
    'cancelled': 'Dibatalkan',
    'no-show': 'Tidak Hadir',
  };
  return labels[status] || status;
}

export function getStatusIcon(status: string): string {
  const icons: Record<string, string> = {
    'booked': '📋',
    'confirmed': '✅',
    'checked-in': '🏥',
    'in-treatment': '💆',
    'completed': '✨',
    'cancelled': '❌',
    'no-show': '⏰',
  };
  return icons[status] || '📋';
}
