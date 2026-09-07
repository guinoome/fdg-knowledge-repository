/* ═══════════════════════════════════════════════════════════════
   Restaurant Management System — Application Logic
   ═══════════════════════════════════════════════════════════════ */

// ── Global State ──────────────────────────────────────────────
let currentModule = 'dashboard';
let modalCallback = null;
let editingId = null;
let chartInstances = {};
let currentUser = null;

const ROLES = {
  'Admin': ['*'],
  'Manager': ['dashboard', 'products', 'recipes', 'raw-materials', 'purchase-orders', 'goods-receipt', 'purchases', 'stock-adj', 'wastage', 'production', 'inv-ledger', 'low-stock', 'sales-analysis', 'profit-analysis', 'daily-report', 'weekly-report', 'monthly-report', 'suppliers', 'employees'],
  'Cashier': ['dashboard', 'pos-import'],
  'Chef': ['recipes', 'raw-materials', 'production', 'wastage']
};

const STORAGE_KEY = 'restaurantERP';

// ── Data Store ────────────────────────────────────────────────
let DB = {
  settings: {
    companyName: 'Gourmet Kitchen Co.',
    branch: 'Main Branch',
    taxRate: 12,
    currency: '₱',
    address: '123 Food Street, Metro Manila',
    phone: '+63 912 345 6789',
    email: 'info@gourmetkitchen.ph'
  },
  posImport: [],
  products: [],
  recipes: [],
  rawMaterials: [],
  purchases: [],
  purchaseOrders: [],
  goodsReceipts: [],
  stockAdjustments: [],
  wastage: [],
  production: [],
  inventoryLedger: [],
  suppliers: [],
  employees: [],
  auditLog: [],
  users: []
};

// ── Persistence ───────────────────────────────────────────────
function saveDB() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DB));
  } catch(e) {
    console.warn('Storage full:', e);
  }
}

function loadDB() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      DB = { ...DB, ...parsed };
    } catch(e) {
      console.warn('Corrupt data, using defaults');
    }
  }
}

// ── ID Generator ──────────────────────────────────────────────
function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ── Date Helpers ──────────────────────────────────────────────
function today() { return new Date().toISOString().slice(0, 10); }
function formatDate(d) {
  if (!d) return '—';
  const dt = new Date(d);
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
function formatCurrency(n) {
  const num = parseFloat(n) || 0;
  return DB.settings.currency + ' ' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function formatNum(n, dec = 0) {
  return (parseFloat(n) || 0).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}
function formatPct(n) { return (parseFloat(n) || 0).toFixed(1) + '%'; }

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

function startOfWeek() {
  const d = new Date();
  d.setDate(d.getDate() - d.getDay());
  return d.toISOString().slice(0, 10);
}

function startOfMonth() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().slice(0, 10);
}

// ── Toast ─────────────────────────────────────────────────────
function toast(message, type = 'success') {
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-circle', info: 'fa-info-circle' };
  const container = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="fas ${icons[type]} toast-icon"></i><span class="toast-message">${message}</span>`;
  container.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateX(40px)'; setTimeout(() => el.remove(), 300); }, 3500);
}

// ── Audit Log ─────────────────────────────────────────────────
function addAudit(action, details) {
  DB.auditLog.unshift({
    id: genId(),
    date: new Date().toISOString(),
    action,
    details,
    user: 'Admin'
  });
  if (DB.auditLog.length > 500) DB.auditLog.length = 500;
  saveDB();
}

// ── Navigation ────────────────────────────────────────────────
const MODULE_TITLES = {
  'dashboard': ['Dashboard', 'Overview'],
  'settings': ['Settings', 'Configuration'],
  'pos-import': ['POS Import', 'Import Sales Data'],
  'products': ['Product Master', 'Product Catalog'],
  'recipes': ['Recipe / BOM', 'Bill of Materials'],
  'raw-materials': ['Raw Materials', 'Ingredient Inventory'],
  'purchases': ['Purchases', 'Purchase Register'],
  'purchase-orders': ['Purchase Orders', 'Order Management'],
  'goods-receipt': ['Goods Receipt', 'Receiving Dock'],
  'stock-adj': ['Stock Adjustments', 'Inventory Corrections'],
  'wastage': ['Wastage', 'Food Waste Tracking'],
  'production': ['Production', 'Kitchen Production Log'],
  'inv-ledger': ['Inventory Ledger', 'Stock Movements'],
  'sales-analysis': ['Sales Analysis', 'Revenue & Trends'],
  'profit-analysis': ['Profit Analysis', 'Profitability Report'],
  'daily-report': ['Daily Report', today()],
  'weekly-report': ['Weekly Report', 'Week Summary'],
  'monthly-report': ['Monthly Report', 'Executive Summary'],
  'low-stock': ['Low Stock', 'Reorder Alerts'],
  'suppliers': ['Suppliers', 'Vendor Management'],
  'employees': ['Employees', 'Staff Directory'],
  'audit-log': ['Audit Log', 'Activity History']
};

function switchModule(moduleId) {
  // Check RBAC permissions
  if (currentUser && currentUser.role !== 'Admin' && ROLES[currentUser.role]) {
    if (!ROLES[currentUser.role].includes(moduleId)) {
      toast('Access Denied: You do not have permission to view this module.', 'error');
      return;
    }
  }

  currentModule = moduleId;
  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.module === moduleId);
  });
  // Update page title
  const titles = MODULE_TITLES[moduleId] || [moduleId, ''];
  document.getElementById('pageTitle').innerHTML = `${titles[0]} <span>${titles[1]}</span>`;
  // Render module
  renderModule(moduleId);
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ── Modal ─────────────────────────────────────────────────────
function openModal(title, bodyHTML, onSave, footerHTML) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = bodyHTML;
  if (footerHTML) {
    document.getElementById('modalFooter').innerHTML = footerHTML;
  } else {
    document.getElementById('modalFooter').innerHTML = `
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveModal()">Save</button>
    `;
  }
  modalCallback = onSave;
  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  modalCallback = null;
  editingId = null;
}

function closeModalOverlay(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

function saveModal() {
  if (modalCallback) modalCallback();
}

// ── Module Renderer ───────────────────────────────────────────
function renderModule(moduleId) {
  const area = document.getElementById('contentArea');
  const renderers = {
    'dashboard': renderDashboard,
    'settings': renderSettings,
    'pos-import': renderPOSImport,
    'products': renderProducts,
    'recipes': renderRecipes,
    'raw-materials': renderRawMaterials,
    'purchases': renderPurchases,
    'purchase-orders': renderPurchaseOrders,
    'goods-receipt': renderGoodsReceipt,
    'stock-adj': renderStockAdj,
    'wastage': renderWastage,
    'production': renderProduction,
    'inv-ledger': renderInvLedger,
    'sales-analysis': renderSalesAnalysis,
    'profit-analysis': renderProfitAnalysis,
    'daily-report': renderDailyReport,
    'weekly-report': renderWeeklyReport,
    'monthly-report': renderMonthlyReport,
    'low-stock': renderLowStock,
    'suppliers': renderSuppliers,
    'employees': renderEmployees,
    'audit-log': renderAuditLog
  };
  // Destroy existing charts
  Object.values(chartInstances).forEach(c => { try { c.destroy(); } catch(e) {} });
  chartInstances = {};

  if (renderers[moduleId]) {
    area.innerHTML = `<div class="module-panel active" id="mod-${moduleId}"></div>`;
    renderers[moduleId](document.getElementById(`mod-${moduleId}`));
  } else {
    area.innerHTML = `<div class="module-panel active"><div class="empty-state"><i class="fas fa-tools"></i><p>Module "${moduleId}" coming soon</p></div></div>`;
  }
  updateLowStockBadge();
}

// ══════════════════════════════════════════════════════════════
// MODULE: 00 — Settings
// ══════════════════════════════════════════════════════════════
function renderSettings(container) {
  const s = DB.settings;
  container.innerHTML = `
    <div class="settings-grid">
      <div class="settings-card">
        <div class="settings-card-title"><i class="fas fa-building"></i> Company Information</div>
        <div class="form-grid" style="grid-template-columns:1fr">
          <div class="form-group"><label class="form-label">Company Name</label>
            <input class="form-input" id="s-company" value="${s.companyName}"></div>
          <div class="form-group"><label class="form-label">Branch</label>
            <input class="form-input" id="s-branch" value="${s.branch}"></div>
          <div class="form-group"><label class="form-label">Address</label>
            <input class="form-input" id="s-address" value="${s.address}"></div>
        </div>
      </div>
      <div class="settings-card">
        <div class="settings-card-title"><i class="fas fa-phone"></i> Contact</div>
        <div class="form-grid" style="grid-template-columns:1fr">
          <div class="form-group"><label class="form-label">Phone</label>
            <input class="form-input" id="s-phone" value="${s.phone}"></div>
          <div class="form-group"><label class="form-label">Email</label>
            <input class="form-input" id="s-email" value="${s.email}"></div>
        </div>
      </div>
      <div class="settings-card">
        <div class="settings-card-title"><i class="fas fa-receipt"></i> Financial</div>
        <div class="form-grid" style="grid-template-columns:1fr">
          <div class="form-group"><label class="form-label">Tax Rate (%)</label>
            <input class="form-input" type="number" id="s-tax" value="${s.taxRate}" step="0.1"></div>
          <div class="form-group"><label class="form-label">Currency Symbol</label>
            <input class="form-input" id="s-currency" value="${s.currency}"></div>
        </div>
      </div>
      <div class="settings-card">
        <div class="settings-card-title"><i class="fas fa-database"></i> Data Management</div>
        <div class="form-grid" style="grid-template-columns:1fr">
          <div class="form-group">
            <button class="btn btn-primary" onclick="saveSettings()"><i class="fas fa-save"></i> Save Settings</button>
          </div>
          <div class="form-group">
            <button class="btn" onclick="exportAllData()"><i class="fas fa-file-export"></i> Export All Data (JSON)</button>
          </div>
          <div class="form-group">
            <button class="btn btn-danger" onclick="confirmResetData()"><i class="fas fa-exclamation-triangle"></i> Reset All Data</button>
          </div>
        </div>
      </div>
    </div>`;
}

function saveSettings() {
  DB.settings.companyName = document.getElementById('s-company').value;
  DB.settings.branch = document.getElementById('s-branch').value;
  DB.settings.address = document.getElementById('s-address').value;
  DB.settings.phone = document.getElementById('s-phone').value;
  DB.settings.email = document.getElementById('s-email').value;
  DB.settings.taxRate = parseFloat(document.getElementById('s-tax').value) || 0;
  DB.settings.currency = document.getElementById('s-currency').value || '₱';
  saveDB();
  addAudit('Settings Updated', 'Company settings saved');
  toast('Settings saved successfully');
}

function exportAllData() {
  const blob = new Blob([JSON.stringify(DB, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'RestaurantERP_Backup_' + today() + '.json'; a.click();
  URL.revokeObjectURL(url);
  toast('Data exported successfully');
}

function confirmResetData() {
  openModal('Reset All Data', `
    <div class="confirm-dialog">
      <i class="fas fa-exclamation-triangle"></i>
      <h3>Are you sure?</h3>
      <p>This will delete all data and reload with sample data. This action cannot be undone.</p>
    </div>
  `, () => {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }, `
    <button class="btn" onclick="closeModal()">Cancel</button>
    <button class="btn btn-danger" onclick="saveModal()"><i class="fas fa-trash"></i> Reset Everything</button>
  `);
}

// ══════════════════════════════════════════════════════════════
// MODULE: 01 — POS Import
// ══════════════════════════════════════════════════════════════
function renderPOSImport(container) {
  container.innerHTML = `
    <div class="card mb-5">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-file-import"></i> Import POS Data</div>
        <button class="btn btn-sm" onclick="loadSamplePOS()"><i class="fas fa-magic"></i> Load Sample Data</button>
      </div>
      <p class="text-muted text-sm mb-4">Paste your POS export data below (CSV format with headers). Columns: Date, Invoice No, Product Name, Category, Quantity Sold, Selling Price, Amount Sold</p>
      <textarea class="import-textarea" id="posTextarea" placeholder="Date,Invoice No,Product Name,Category,Quantity Sold,Selling Price,Amount Sold&#10;2026-07-16,INV-001,Classic Burger,Burgers,3,185.00,555.00&#10;..."></textarea>
      <div class="mt-4 flex gap-3">
        <button class="btn btn-primary" onclick="importPOS()"><i class="fas fa-upload"></i> Import Data</button>
        <button class="btn" onclick="clearPOSInput()"><i class="fas fa-eraser"></i> Clear</button>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-table"></i> Imported Records (${DB.posImport.length})</div>
        <button class="btn btn-sm btn-danger" onclick="clearPOSData()"><i class="fas fa-trash"></i> Clear All</button>
      </div>
      <div class="table-container">${posImportTable()}</div>
    </div>`;
}

function posImportTable() {
  if (!DB.posImport.length) return '<div class="empty-state"><i class="fas fa-inbox"></i><p>No POS data imported yet</p><p class="hint">Paste CSV data above or load sample data</p></div>';
  const rows = DB.posImport.slice(0, 200).map(r => `
    <tr>
      <td>${formatDate(r.date)}</td>
      <td class="font-mono">${r.invoiceNo}</td>
      <td>${r.productName}</td>
      <td><span class="status-badge info">${r.category}</span></td>
      <td class="text-right">${r.qtySold}</td>
      <td class="text-right">${formatCurrency(r.sellingPrice)}</td>
      <td class="text-right font-bold">${formatCurrency(r.amountSold)}</td>
    </tr>`).join('');
  return `<table class="data-table"><thead><tr>
    <th>Date</th><th>Invoice</th><th>Product</th><th>Category</th><th>Qty</th><th>Price</th><th>Amount</th>
  </tr></thead><tbody>${rows}</tbody></table>`;
}

function importPOS() {
  const text = document.getElementById('posTextarea').value.trim();
  if (!text) return toast('Please paste POS data first', 'warning');
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length < 2) return toast('Need at least a header and one data row', 'warning');
  let imported = 0;
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map(c => c.trim());
    if (cols.length >= 5) {
      DB.posImport.push({
        id: genId(),
        date: cols[0] || today(),
        invoiceNo: cols[1] || 'INV-' + genId().slice(0,4).toUpperCase(),
        productName: cols[2] || 'Unknown',
        category: cols[3] || 'General',
        qtySold: parseInt(cols[4]) || 1,
        sellingPrice: parseFloat(cols[5]) || 0,
        amountSold: parseFloat(cols[6]) || (parseInt(cols[4]) || 1) * (parseFloat(cols[5]) || 0)
      });
      imported++;
    }
  }
  saveDB();
  addAudit('POS Import', `${imported} records imported`);
  toast(`${imported} records imported successfully`);
  renderModule('pos-import');
}

function loadSamplePOS() {
  // Generate sample POS data
  const products = [
    { name: 'Classic Burger', cat: 'Burgers', price: 185 },
    { name: 'Cheese Burger', cat: 'Burgers', price: 210 },
    { name: 'Bacon Burger', cat: 'Burgers', price: 245 },
    { name: 'Margherita Pizza', cat: 'Pizza', price: 320 },
    { name: 'Pepperoni Pizza', cat: 'Pizza', price: 365 },
    { name: 'Hawaiian Pizza', cat: 'Pizza', price: 345 },
    { name: 'Caesar Salad', cat: 'Salads', price: 175 },
    { name: 'Garden Salad', cat: 'Salads', price: 145 },
    { name: 'French Fries', cat: 'Sides', price: 95 },
    { name: 'Onion Rings', cat: 'Sides', price: 115 },
    { name: 'Chicken Wings', cat: 'Sides', price: 195 },
    { name: 'Iced Tea', cat: 'Beverages', price: 65 },
    { name: 'Soda', cat: 'Beverages', price: 55 },
    { name: 'Fresh Juice', cat: 'Beverages', price: 95 },
    { name: 'Chocolate Cake', cat: 'Desserts', price: 155 },
    { name: 'Cheesecake', cat: 'Desserts', price: 175 }
  ];
  let invCounter = 1000;
  for (let d = 30; d >= 0; d--) {
    const date = daysAgo(d);
    const txCount = 8 + Math.floor(Math.random() * 15);
    for (let t = 0; t < txCount; t++) {
      const p = products[Math.floor(Math.random() * products.length)];
      const qty = 1 + Math.floor(Math.random() * 4);
      DB.posImport.push({
        id: genId(),
        date: date,
        invoiceNo: 'INV-' + (invCounter++),
        productName: p.name,
        category: p.cat,
        qtySold: qty,
        sellingPrice: p.price,
        amountSold: qty * p.price
      });
    }
  }
  saveDB();
  addAudit('POS Import', 'Sample POS data loaded');
  toast('Sample POS data loaded');
  renderModule('pos-import');
}

function clearPOSInput() { document.getElementById('posTextarea').value = ''; }
function clearPOSData() {
  openModal('Clear POS Data', '<div class="confirm-dialog"><i class="fas fa-trash"></i><h3>Clear all POS data?</h3><p>This cannot be undone.</p></div>', () => {
    DB.posImport = []; saveDB(); closeModal(); renderModule('pos-import'); toast('POS data cleared');
  }, '<button class="btn" onclick="closeModal()">Cancel</button><button class="btn btn-danger" onclick="saveModal()">Clear All</button>');
}

// ══════════════════════════════════════════════════════════════
// MODULE: 02 — Product Master
// ══════════════════════════════════════════════════════════════
function renderProducts(container) {
  container.innerHTML = `
    <div class="card">
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn btn-primary" onclick="openProductForm()"><i class="fas fa-plus"></i> Add Product</button>
          <span class="text-muted text-sm">${DB.products.length} products</span>
        </div>
        <div class="toolbar-right">
          <div class="filter-pills" id="productCategoryFilter"></div>
        </div>
      </div>
      <div class="table-container" id="productsTable">${productsTable()}</div>
    </div>`;
  renderCategoryFilter('productCategoryFilter', DB.products, 'category', () => renderModule('products'));
}

function productsTable(filter) {
  let items = DB.products;
  if (filter && filter !== 'All') items = items.filter(p => p.category === filter);
  if (!items.length) return '<div class="empty-state"><i class="fas fa-box-open"></i><p>No products yet</p></div>';
  return `<table class="data-table"><thead><tr>
    <th>ID</th><th>Product Name</th><th>Category</th><th>Type</th><th>Unit</th><th>Selling Price</th><th>Std Cost</th><th>Margin</th><th>Status</th><th>Actions</th>
  </tr></thead><tbody>${items.map(p => {
    const margin = p.sellingPrice > 0 ? ((p.sellingPrice - p.standardCost) / p.sellingPrice * 100) : 0;
    return `<tr>
      <td class="font-mono text-muted">${p.id.slice(0,8)}</td>
      <td class="font-bold">${p.name}</td>
      <td><span class="status-badge info">${p.category}</span></td>
      <td>${p.isMenuItem ? '🍔 Menu' : '📦 Raw'}</td>
      <td>${p.unit}</td>
      <td class="text-right">${formatCurrency(p.sellingPrice)}</td>
      <td class="text-right">${formatCurrency(p.standardCost)}</td>
      <td class="text-right"><span class="status-badge ${margin >= 50 ? 'success' : margin >= 30 ? 'warning' : 'danger'}">${formatPct(margin)}</span></td>
      <td><span class="status-badge ${p.status === 'Active' ? 'active' : 'neutral'}">${p.status}</span></td>
      <td><div class="table-actions">
        <button class="action-btn edit" onclick="openProductForm('${p.id}')"><i class="fas fa-pen"></i></button>
        <button class="action-btn delete" onclick="deleteRecord('products','${p.id}','Product')"><i class="fas fa-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('')}</tbody></table>`;
}

function openProductForm(id) {
  const p = id ? DB.products.find(x => x.id === id) : null;
  editingId = id || null;
  const categories = ['Burgers', 'Pizza', 'Salads', 'Sides', 'Beverages', 'Desserts', 'Appetizers', 'Main Course', 'Other'];
  openModal(p ? 'Edit Product' : 'Add Product', `
    <div class="form-grid">
      <div class="form-group"><label class="form-label">Product Name</label>
        <input class="form-input" id="f-name" value="${p ? p.name : ''}"></div>
      <div class="form-group"><label class="form-label">Category</label>
        <select class="form-select" id="f-category">${categories.map(c => `<option ${p && p.category === c ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Unit</label>
        <select class="form-select" id="f-unit">
          ${['pcs', 'kg', 'g', 'L', 'mL', 'serving', 'plate', 'cup', 'bottle'].map(u => `<option ${p && p.unit === u ? 'selected' : ''}>${u}</option>`).join('')}
        </select></div>
      <div class="form-group"><label class="form-label">Type</label>
        <select class="form-select" id="f-type">
          <option value="menu" ${!p || p.isMenuItem ? 'selected' : ''}>Menu Item</option>
          <option value="raw" ${p && !p.isMenuItem ? 'selected' : ''}>Raw Material</option>
        </select></div>
      <div class="form-group"><label class="form-label">Selling Price</label>
        <input class="form-input" type="number" id="f-price" value="${p ? p.sellingPrice : '0'}" step="0.01"></div>
      <div class="form-group"><label class="form-label">Standard Cost</label>
        <input class="form-input" type="number" id="f-cost" value="${p ? p.standardCost : '0'}" step="0.01"></div>
      <div class="form-group"><label class="form-label">Tax Rate (%)</label>
        <input class="form-input" type="number" id="f-tax" value="${p ? p.taxRate : DB.settings.taxRate}" step="0.1"></div>
      <div class="form-group"><label class="form-label">Status</label>
        <select class="form-select" id="f-status">
          <option ${!p || p.status === 'Active' ? 'selected' : ''}>Active</option>
          <option ${p && p.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
        </select></div>
    </div>
  `, () => {
    const record = {
      id: editingId || genId(),
      name: document.getElementById('f-name').value || 'Unnamed Product',
      category: document.getElementById('f-category').value,
      unit: document.getElementById('f-unit').value,
      isMenuItem: document.getElementById('f-type').value === 'menu',
      sellingPrice: parseFloat(document.getElementById('f-price').value) || 0,
      standardCost: parseFloat(document.getElementById('f-cost').value) || 0,
      taxRate: parseFloat(document.getElementById('f-tax').value) || 0,
      status: document.getElementById('f-status').value
    };
    if (editingId) {
      const idx = DB.products.findIndex(x => x.id === editingId);
      if (idx >= 0) DB.products[idx] = record;
      addAudit('Product Updated', record.name);
    } else {
      DB.products.push(record);
      addAudit('Product Added', record.name);
    }
    saveDB(); closeModal(); renderModule('products');
    toast(editingId ? 'Product updated' : 'Product added');
  });
}

// ══════════════════════════════════════════════════════════════
// MODULE: 03 — Recipe / BOM
// ══════════════════════════════════════════════════════════════
function renderRecipes(container) {
  const menuProducts = DB.products.filter(p => p.isMenuItem);
  container.innerHTML = `
    <div class="card mb-5">
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn btn-primary" onclick="openRecipeForm()"><i class="fas fa-plus"></i> Add Recipe Entry</button>
          <span class="text-muted text-sm">${DB.recipes.length} recipe ingredients</span>
        </div>
      </div>
      <div class="table-container">${recipesTable()}</div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title"><i class="fas fa-calculator"></i> Recipe Cost Summary</div></div>
      ${recipeCostSummary()}
    </div>`;
}

function recipesTable() {
  if (!DB.recipes.length) return '<div class="empty-state"><i class="fas fa-utensils"></i><p>No recipes defined</p><p class="hint">Add recipe ingredients for menu items</p></div>';
  const grouped = {};
  DB.recipes.forEach(r => { if (!grouped[r.product]) grouped[r.product] = []; grouped[r.product].push(r); });
  let rows = '';
  Object.entries(grouped).forEach(([product, ingredients]) => {
    const totalCost = ingredients.reduce((s, i) => s + (i.qtyRequired * i.cost), 0);
    rows += `<tr style="background:rgba(16,185,129,0.04)"><td colspan="7" class="font-bold" style="padding:12px 16px">
      🍔 ${product} <span class="text-muted text-sm" style="margin-left:8px">— ${ingredients.length} ingredients, Total: ${formatCurrency(totalCost)}</span></td></tr>`;
    ingredients.forEach(r => {
      rows += `<tr>
        <td style="padding-left:36px">${r.ingredient}</td>
        <td class="text-right">${r.qtyRequired}</td>
        <td>${r.unit}</td>
        <td class="text-right">${formatCurrency(r.cost)}</td>
        <td class="text-right font-bold">${formatCurrency(r.qtyRequired * r.cost)}</td>
        <td>${r.version || '1'}</td>
        <td><div class="table-actions">
          <button class="action-btn edit" onclick="openRecipeForm('${r.id}')"><i class="fas fa-pen"></i></button>
          <button class="action-btn delete" onclick="deleteRecord('recipes','${r.id}','Recipe')"><i class="fas fa-trash"></i></button>
        </div></td></tr>`;
    });
  });
  return `<table class="data-table"><thead><tr>
    <th>Ingredient</th><th>Qty Required</th><th>Unit</th><th>Unit Cost</th><th>Line Cost</th><th>Version</th><th>Actions</th>
  </tr></thead><tbody>${rows}</tbody></table>`;
}

function recipeCostSummary() {
  const grouped = {};
  DB.recipes.forEach(r => {
    if (!grouped[r.product]) grouped[r.product] = 0;
    grouped[r.product] += r.qtyRequired * r.cost;
  });
  if (!Object.keys(grouped).length) return '<p class="text-muted text-sm">No recipes to summarize</p>';
  return `<div class="table-container"><table class="data-table"><thead><tr><th>Product</th><th>Recipe Cost</th><th>Selling Price</th><th>Margin</th></tr></thead><tbody>${
    Object.entries(grouped).map(([product, cost]) => {
      const prod = DB.products.find(p => p.name === product);
      const price = prod ? prod.sellingPrice : 0;
      const margin = price > 0 ? ((price - cost) / price * 100) : 0;
      return `<tr><td class="font-bold">${product}</td><td class="text-right">${formatCurrency(cost)}</td><td class="text-right">${formatCurrency(price)}</td>
        <td class="text-right"><span class="status-badge ${margin >= 60 ? 'success' : margin >= 30 ? 'warning' : 'danger'}">${formatPct(margin)}</span></td></tr>`;
    }).join('')
  }</tbody></table></div>`;
}

function openRecipeForm(id) {
  const r = id ? DB.recipes.find(x => x.id === id) : null;
  editingId = id || null;
  const menuNames = DB.products.filter(p => p.isMenuItem).map(p => p.name);
  const matNames = DB.rawMaterials.map(m => m.name);
  openModal(r ? 'Edit Recipe Entry' : 'Add Recipe Entry', `
    <div class="form-grid">
      <div class="form-group"><label class="form-label">Menu Product</label>
        <select class="form-select" id="f-product">${menuNames.map(n => `<option ${r && r.product === n ? 'selected' : ''}>${n}</option>`).join('')}
          ${!menuNames.length ? '<option>No menu products — add some first</option>' : ''}</select></div>
      <div class="form-group"><label class="form-label">Ingredient</label>
        <input class="form-input" id="f-ingredient" list="matList" value="${r ? r.ingredient : ''}">
        <datalist id="matList">${matNames.map(n => `<option value="${n}">`).join('')}</datalist></div>
      <div class="form-group"><label class="form-label">Quantity Required</label>
        <input class="form-input" type="number" id="f-qty" value="${r ? r.qtyRequired : '1'}" step="0.01"></div>
      <div class="form-group"><label class="form-label">Unit</label>
        <select class="form-select" id="f-unit">${['pcs','kg','g','L','mL','cup','tbsp','tsp','slice'].map(u => `<option ${r && r.unit === u ? 'selected' : ''}>${u}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Unit Cost</label>
        <input class="form-input" type="number" id="f-cost" value="${r ? r.cost : '0'}" step="0.01"></div>
      <div class="form-group"><label class="form-label">Version</label>
        <input class="form-input" id="f-version" value="${r ? r.version : '1'}"></div>
    </div>
  `, () => {
    const record = {
      id: editingId || genId(),
      product: document.getElementById('f-product').value,
      ingredient: document.getElementById('f-ingredient').value || 'Unnamed',
      qtyRequired: parseFloat(document.getElementById('f-qty').value) || 1,
      unit: document.getElementById('f-unit').value,
      cost: parseFloat(document.getElementById('f-cost').value) || 0,
      version: document.getElementById('f-version').value || '1',
      effectiveDate: today()
    };
    if (editingId) {
      const idx = DB.recipes.findIndex(x => x.id === editingId);
      if (idx >= 0) DB.recipes[idx] = record;
    } else {
      DB.recipes.push(record);
    }
    saveDB(); closeModal(); renderModule('recipes');
    toast(editingId ? 'Recipe updated' : 'Recipe entry added');
  });
}

// ══════════════════════════════════════════════════════════════
// MODULE: 04 — Raw Materials
// ══════════════════════════════════════════════════════════════
function renderRawMaterials(container) {
  container.innerHTML = `
    <div class="card">
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn btn-primary" onclick="openMaterialForm()"><i class="fas fa-plus"></i> Add Material</button>
          <span class="text-muted text-sm">${DB.rawMaterials.length} materials | Inventory: ${formatCurrency(DB.rawMaterials.reduce((s,m) => s + m.currentStock * m.unitCost, 0))}</span>
        </div>
      </div>
      <div class="table-container">${materialsTable()}</div>
    </div>`;
}

function materialsTable() {
  if (!DB.rawMaterials.length) return '<div class="empty-state"><i class="fas fa-carrot"></i><p>No raw materials</p></div>';
  return `<table class="data-table"><thead><tr>
    <th>Material</th><th>Category</th><th>Unit</th><th>Stock</th><th>Min</th><th>Reorder</th><th>Unit Cost</th><th>Value</th><th>Supplier</th><th>Expiry</th><th>Status</th><th>Actions</th>
  </tr></thead><tbody>${DB.rawMaterials.map(m => {
    const ratio = m.minStock > 0 ? m.currentStock / m.minStock : 999;
    const cls = ratio <= 0.5 ? 'stock-critical' : ratio <= 1 ? 'stock-warning' : ratio <= 1.5 ? 'stock-low' : '';
    const badge = ratio <= 0.5 ? 'danger' : ratio <= 1 ? 'warning' : 'success';
    return `<tr class="${cls}">
      <td class="font-bold">${m.name}</td>
      <td><span class="status-badge info">${m.category}</span></td>
      <td>${m.unit}</td>
      <td class="text-right font-bold">${formatNum(m.currentStock, 1)}</td>
      <td class="text-right text-muted">${formatNum(m.minStock)}</td>
      <td class="text-right">${formatNum(m.reorderQty)}</td>
      <td class="text-right">${formatCurrency(m.unitCost)}</td>
      <td class="text-right">${formatCurrency(m.currentStock * m.unitCost)}</td>
      <td>${m.supplier || '—'}</td>
      <td>${m.expiryDate ? formatDate(m.expiryDate) : '—'}</td>
      <td><span class="status-badge ${badge}">${ratio <= 0.5 ? 'Critical' : ratio <= 1 ? 'Low' : 'OK'}</span></td>
      <td><div class="table-actions">
        <button class="action-btn edit" onclick="openMaterialForm('${m.id}')"><i class="fas fa-pen"></i></button>
        <button class="action-btn delete" onclick="deleteRecord('rawMaterials','${m.id}','Material')"><i class="fas fa-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('')}</tbody></table>`;
}

function openMaterialForm(id) {
  const m = id ? DB.rawMaterials.find(x => x.id === id) : null;
  editingId = id || null;
  const supplierNames = DB.suppliers.map(s => s.name);
  openModal(m ? 'Edit Material' : 'Add Material', `
    <div class="form-grid">
      <div class="form-group"><label class="form-label">Material Name</label><input class="form-input" id="f-name" value="${m ? m.name : ''}"></div>
      <div class="form-group"><label class="form-label">Category</label>
        <select class="form-select" id="f-category">${['Produce','Meat','Dairy','Bakery','Condiments','Beverages','Packaging','Dry Goods','Frozen','Other'].map(c => `<option ${m && m.category === c ? 'selected' : ''}>${c}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Unit</label>
        <select class="form-select" id="f-unit">${['kg','g','L','mL','pcs','pack','can','bottle','bag','box'].map(u => `<option ${m && m.unit === u ? 'selected' : ''}>${u}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Current Stock</label><input class="form-input" type="number" id="f-stock" value="${m ? m.currentStock : '0'}" step="0.1"></div>
      <div class="form-group"><label class="form-label">Minimum Stock</label><input class="form-input" type="number" id="f-min" value="${m ? m.minStock : '10'}" step="0.1"></div>
      <div class="form-group"><label class="form-label">Reorder Quantity</label><input class="form-input" type="number" id="f-reorder" value="${m ? m.reorderQty : '50'}" step="0.1"></div>
      <div class="form-group"><label class="form-label">Unit Cost</label><input class="form-input" type="number" id="f-cost" value="${m ? m.unitCost : '0'}" step="0.01"></div>
      <div class="form-group"><label class="form-label">Supplier</label>
        <select class="form-select" id="f-supplier"><option value="">— Select —</option>${supplierNames.map(n => `<option ${m && m.supplier === n ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Batch Number</label><input class="form-input" id="f-batch" value="${m ? m.batchNumber : ''}"></div>
      <div class="form-group"><label class="form-label">Expiry Date</label><input class="form-input" type="date" id="f-expiry" value="${m ? m.expiryDate : ''}"></div>
      <div class="form-group"><label class="form-label">Shelf Life (days)</label><input class="form-input" type="number" id="f-shelf" value="${m ? m.shelfLife : ''}"></div>
    </div>
  `, () => {
    const record = {
      id: editingId || genId(),
      name: document.getElementById('f-name').value || 'Unnamed',
      category: document.getElementById('f-category').value,
      unit: document.getElementById('f-unit').value,
      currentStock: parseFloat(document.getElementById('f-stock').value) || 0,
      minStock: parseFloat(document.getElementById('f-min').value) || 0,
      reorderQty: parseFloat(document.getElementById('f-reorder').value) || 0,
      unitCost: parseFloat(document.getElementById('f-cost').value) || 0,
      supplier: document.getElementById('f-supplier').value,
      batchNumber: document.getElementById('f-batch').value,
      expiryDate: document.getElementById('f-expiry').value,
      shelfLife: parseInt(document.getElementById('f-shelf').value) || 0
    };
    if (editingId) {
      const idx = DB.rawMaterials.findIndex(x => x.id === editingId);
      if (idx >= 0) DB.rawMaterials[idx] = record;
    } else {
      DB.rawMaterials.push(record);
    }
    saveDB(); closeModal(); renderModule('raw-materials');
    toast(editingId ? 'Material updated' : 'Material added');
  });
}

// ══════════════════════════════════════════════════════════════
// MODULE: 05 — Purchases
// ══════════════════════════════════════════════════════════════
function renderPurchases(container) {
  const totalSpend = DB.purchases.reduce((s, p) => s + p.totalCost, 0);
  container.innerHTML = `
    <div class="kpi-grid mb-5">
      <div class="kpi-card blue"><div class="kpi-icon blue"><i class="fas fa-truck"></i></div><div class="kpi-label">Total Purchases</div><div class="kpi-value">${DB.purchases.length}</div></div>
      <div class="kpi-card green"><div class="kpi-icon green"><i class="fas fa-coins"></i></div><div class="kpi-label">Total Spend</div><div class="kpi-value">${formatCurrency(totalSpend)}</div></div>
      <div class="kpi-card purple"><div class="kpi-icon purple"><i class="fas fa-calendar"></i></div><div class="kpi-label">This Month</div><div class="kpi-value">${formatCurrency(DB.purchases.filter(p => p.date >= startOfMonth()).reduce((s,p) => s + p.totalCost, 0))}</div></div>
    </div>
    <div class="card">
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn btn-primary" onclick="openPurchaseForm()"><i class="fas fa-plus"></i> Record Purchase</button>
        </div>
      </div>
      <div class="table-container">${purchasesTable()}</div>
    </div>`;
}

function purchasesTable() {
  if (!DB.purchases.length) return '<div class="empty-state"><i class="fas fa-truck"></i><p>No purchases recorded</p></div>';
  return `<table class="data-table"><thead><tr>
    <th>Date</th><th>Supplier</th><th>PO #</th><th>Invoice #</th><th>Material</th><th>Qty</th><th>Unit Cost</th><th>Total</th><th>Received By</th><th>Actions</th>
  </tr></thead><tbody>${DB.purchases.slice().reverse().map(p => `<tr>
    <td>${formatDate(p.date)}</td><td>${p.supplier}</td><td class="font-mono">${p.poNumber}</td><td class="font-mono">${p.invoiceNumber}</td>
    <td class="font-bold">${p.material}</td><td class="text-right">${formatNum(p.quantity, 1)}</td><td class="text-right">${formatCurrency(p.unitCost)}</td>
    <td class="text-right font-bold">${formatCurrency(p.totalCost)}</td><td>${p.receivedBy}</td>
    <td><div class="table-actions"><button class="action-btn delete" onclick="deleteRecord('purchases','${p.id}','Purchase')"><i class="fas fa-trash"></i></button></div></td>
  </tr>`).join('')}</tbody></table>`;
}

function openPurchaseForm() {
  editingId = null;
  const matNames = DB.rawMaterials.map(m => m.name);
  const supNames = DB.suppliers.map(s => s.name);
  openModal('Record Purchase', `
    <div class="form-grid">
      <div class="form-group"><label class="form-label">Date</label><input class="form-input" type="date" id="f-date" value="${today()}"></div>
      <div class="form-group"><label class="form-label">Supplier</label>
        <select class="form-select" id="f-supplier"><option value="">— Select —</option>${supNames.map(n => `<option>${n}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">PO Number</label><input class="form-input" id="f-po" value="PO-${Date.now().toString().slice(-6)}"></div>
      <div class="form-group"><label class="form-label">Invoice Number</label><input class="form-input" id="f-invoice" value=""></div>
      <div class="form-group"><label class="form-label">Material</label>
        <select class="form-select" id="f-material" onchange="autofillPurchaseCost()">${matNames.map(n => `<option>${n}</option>`).join('')}
          ${!matNames.length ? '<option>No materials — add some first</option>' : ''}</select></div>
      <div class="form-group"><label class="form-label">Quantity</label><input class="form-input" type="number" id="f-qty" value="1" step="0.1"></div>
      <div class="form-group"><label class="form-label">Unit Cost</label><input class="form-input" type="number" id="f-cost" value="0" step="0.01"></div>
      <div class="form-group"><label class="form-label">Received By</label><input class="form-input" id="f-received" value="Admin"></div>
    </div>
  `, () => {
    const qty = parseFloat(document.getElementById('f-qty').value) || 0;
    const cost = parseFloat(document.getElementById('f-cost').value) || 0;
    const material = document.getElementById('f-material').value;
    const record = {
      id: genId(),
      date: document.getElementById('f-date').value || today(),
      supplier: document.getElementById('f-supplier').value,
      poNumber: document.getElementById('f-po').value,
      invoiceNumber: document.getElementById('f-invoice').value,
      material,
      quantity: qty,
      unitCost: cost,
      totalCost: qty * cost,
      receivedBy: document.getElementById('f-received').value
    };
    DB.purchases.push(record);
    // Update raw material stock
    const mat = DB.rawMaterials.find(m => m.name === material);
    if (mat) {
      mat.currentStock += qty;
      mat.unitCost = cost; // update latest cost
    }
    // Add to inventory ledger
    DB.inventoryLedger.push({
      id: genId(), date: record.date, item: material, movementType: 'Purchase',
      qtyIn: qty, qtyOut: 0, balance: mat ? mat.currentStock : qty, reference: record.poNumber
    });
    saveDB(); closeModal(); renderModule('purchases');
    addAudit('Purchase Recorded', `${material} x${qty}`);
    toast('Purchase recorded & inventory updated');
  });
}

function autofillPurchaseCost() {
  const name = document.getElementById('f-material').value;
  const mat = DB.rawMaterials.find(m => m.name === name);
  if (mat) document.getElementById('f-cost').value = mat.unitCost;
}

// ══════════════════════════════════════════════════════════════
// MODULE: 05b — Purchase Orders
// ══════════════════════════════════════════════════════════════
function renderPurchaseOrders(container) {
  if (!DB.purchaseOrders) DB.purchaseOrders = [];
  const total = DB.purchaseOrders.length;
  const pending = DB.purchaseOrders.filter(po => po.status === 'Pending').length;
  const partial = DB.purchaseOrders.filter(po => po.status === 'Partial').length;
  const completed = DB.purchaseOrders.filter(po => po.status === 'Completed').length;
  const totalValue = DB.purchaseOrders.reduce((s, po) => s + (po.totalAmount || 0), 0);

  container.innerHTML = `
    <div class="kpi-grid mb-5">
      <div class="kpi-card blue"><div class="kpi-icon blue"><i class="fas fa-file-alt"></i></div><div class="kpi-label">Total POs</div><div class="kpi-value">${total}</div></div>
      <div class="kpi-card warm"><div class="kpi-icon warm"><i class="fas fa-clock"></i></div><div class="kpi-label">Pending</div><div class="kpi-value">${pending}</div></div>
      <div class="kpi-card purple"><div class="kpi-icon purple"><i class="fas fa-adjust"></i></div><div class="kpi-label">Partially Received</div><div class="kpi-value">${partial}</div></div>
      <div class="kpi-card green"><div class="kpi-icon green"><i class="fas fa-check-circle"></i></div><div class="kpi-label">Completed</div><div class="kpi-value">${completed}</div></div>
    </div>
    <div class="card">
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn btn-primary" onclick="openPOForm()"><i class="fas fa-plus"></i> Create Purchase Order</button>
          <span class="text-muted text-sm">Total Value: ${formatCurrency(totalValue)}</span>
        </div>
      </div>
      <div class="table-container">${poTable()}</div>
    </div>`;
}

function poTable() {
  if (!DB.purchaseOrders || !DB.purchaseOrders.length) return '<div class="empty-state"><i class="fas fa-file-alt"></i><p>No purchase orders yet</p><p class="hint">Create a PO to start the procurement workflow</p></div>';
  const statusColors = { 'Pending': 'warning', 'Approved': 'info', 'Partial': 'purple', 'Completed': 'success', 'Cancelled': 'danger' };
  return `<table class="data-table"><thead><tr>
    <th>PO #</th><th>Date</th><th>Supplier</th><th>Items</th><th>Total</th><th>Expected</th><th>Status</th><th>Actions</th>
  </tr></thead><tbody>${DB.purchaseOrders.slice().reverse().map(po => `<tr>
    <td class="font-mono font-bold">${po.poNumber}</td>
    <td>${formatDate(po.date)}</td>
    <td>${po.supplier}</td>
    <td>${(po.items || []).length} line(s)</td>
    <td class="text-right font-bold">${formatCurrency(po.totalAmount)}</td>
    <td>${po.expectedDate ? formatDate(po.expectedDate) : '—'}</td>
    <td><span class="status-badge ${statusColors[po.status] || 'neutral'}">${po.status}</span></td>
    <td><div class="table-actions">
      <button class="action-btn edit" onclick="viewPO('${po.id}')" title="View Details"><i class="fas fa-eye"></i></button>
      ${po.status === 'Pending' ? `<button class="action-btn edit" onclick="openPOForm('${po.id}')" title="Edit"><i class="fas fa-pen"></i></button>` : ''}
      ${po.status === 'Pending' || po.status === 'Approved' ? `<button class="action-btn delete" onclick="cancelPO('${po.id}')" title="Cancel"><i class="fas fa-ban"></i></button>` : ''}
    </div></td>
  </tr>`).join('')}</tbody></table>`;
}

function openPOForm(id) {
  const po = id ? DB.purchaseOrders.find(x => x.id === id) : null;
  editingId = id || null;
  const supNames = DB.suppliers.map(s => s.name);
  const matNames = DB.rawMaterials.map(m => m.name);

  const existingItems = po ? (po.items || []) : [];
  const itemsHTML = existingItems.length ?
    existingItems.map((item, i) => `
      <div class="po-line-item" data-idx="${i}">
        <select class="form-select po-mat" onchange="poLineAutoFill(this)">
          ${matNames.map(n => `<option ${item.material === n ? 'selected' : ''}>${n}</option>`).join('')}
        </select>
        <input class="form-input po-qty" type="number" value="${item.quantity}" step="0.1" placeholder="Qty" style="width:90px">
        <input class="form-input po-cost" type="number" value="${item.unitCost}" step="0.01" placeholder="Unit Cost" style="width:120px">
        <button class="action-btn delete" onclick="this.closest('.po-line-item').remove()" title="Remove"><i class="fas fa-times"></i></button>
      </div>
    `).join('') : '';

  openModal(po ? 'Edit Purchase Order' : 'Create Purchase Order', `
    <div class="form-grid">
      <div class="form-group"><label class="form-label">PO Number</label><input class="form-input" id="f-po" value="${po ? po.poNumber : 'PO-' + Date.now().toString().slice(-6)}"></div>
      <div class="form-group"><label class="form-label">Date</label><input class="form-input" type="date" id="f-date" value="${po ? po.date : today()}"></div>
      <div class="form-group"><label class="form-label">Supplier</label>
        <select class="form-select" id="f-supplier"><option value="">— Select —</option>${supNames.map(n => `<option ${po && po.supplier === n ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Expected Delivery</label><input class="form-input" type="date" id="f-expected" value="${po ? po.expectedDate || '' : ''}"></div>
      <div class="form-group full-width"><label class="form-label">Notes</label><input class="form-input" id="f-notes" value="${po ? po.notes || '' : ''}"></div>
    </div>
    <div style="margin-top:16px;border-top:1px solid var(--border);padding-top:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <label class="form-label" style="margin:0">Order Lines</label>
        <button class="btn btn-sm" onclick="addPOLine()"><i class="fas fa-plus"></i> Add Line</button>
      </div>
      <div id="poLinesContainer" style="display:flex;flex-direction:column;gap:8px">
        ${itemsHTML}
      </div>
    </div>
  `, () => {
    const supplier = document.getElementById('f-supplier').value;
    if (!supplier) return toast('Please select a supplier', 'warning');

    const lines = [];
    document.querySelectorAll('.po-line-item').forEach(row => {
      const material = row.querySelector('.po-mat').value;
      const quantity = parseFloat(row.querySelector('.po-qty').value) || 0;
      const unitCost = parseFloat(row.querySelector('.po-cost').value) || 0;
      if (material && quantity > 0) {
        lines.push({ material, quantity, unitCost, lineTotal: quantity * unitCost, qtyReceived: 0 });
      }
    });

    if (!lines.length) return toast('Add at least one order line', 'warning');

    // Preserve qtyReceived from existing PO
    if (po && po.items) {
      lines.forEach(line => {
        const existing = po.items.find(i => i.material === line.material);
        if (existing) line.qtyReceived = existing.qtyReceived || 0;
      });
    }

    const record = {
      id: editingId || genId(),
      poNumber: document.getElementById('f-po').value,
      date: document.getElementById('f-date').value || today(),
      supplier,
      expectedDate: document.getElementById('f-expected').value,
      notes: document.getElementById('f-notes').value,
      items: lines,
      totalAmount: lines.reduce((s, l) => s + l.lineTotal, 0),
      status: po ? po.status : 'Pending'
    };

    if (editingId) {
      const idx = DB.purchaseOrders.findIndex(x => x.id === editingId);
      if (idx >= 0) DB.purchaseOrders[idx] = record;
      addAudit('PO Updated', `${record.poNumber}`);
    } else {
      DB.purchaseOrders.push(record);
      addAudit('PO Created', `${record.poNumber} — ${supplier} — ${formatCurrency(record.totalAmount)}`);
    }
    saveDB(); closeModal(); renderModule('purchase-orders');
    toast(editingId ? 'Purchase order updated' : 'Purchase order created');
  });
}

function addPOLine() {
  const matNames = DB.rawMaterials.map(m => m.name);
  if (!matNames.length) return toast('Add raw materials first', 'warning');
  const container = document.getElementById('poLinesContainer');
  const div = document.createElement('div');
  div.className = 'po-line-item';
  div.innerHTML = `
    <select class="form-select po-mat" onchange="poLineAutoFill(this)">
      ${matNames.map(n => `<option>${n}</option>`).join('')}
    </select>
    <input class="form-input po-qty" type="number" value="1" step="0.1" placeholder="Qty" style="width:90px">
    <input class="form-input po-cost" type="number" value="0" step="0.01" placeholder="Unit Cost" style="width:120px">
    <button class="action-btn delete" onclick="this.closest('.po-line-item').remove()" title="Remove"><i class="fas fa-times"></i></button>
  `;
  container.appendChild(div);
  // Auto-fill cost for first material
  poLineAutoFill(div.querySelector('.po-mat'));
}

function poLineAutoFill(selectEl) {
  const name = selectEl.value;
  const mat = DB.rawMaterials.find(m => m.name === name);
  if (mat) {
    const row = selectEl.closest('.po-line-item');
    row.querySelector('.po-cost').value = mat.unitCost;
  }
}

function viewPO(id) {
  const po = DB.purchaseOrders.find(x => x.id === id);
  if (!po) return;
  const statusColors = { 'Pending': 'warning', 'Approved': 'info', 'Partial': 'purple', 'Completed': 'success', 'Cancelled': 'danger' };
  const linesHTML = (po.items || []).map(item => {
    const pct = item.quantity > 0 ? Math.min(100, (item.qtyReceived || 0) / item.quantity * 100) : 0;
    const fillCls = pct >= 100 ? 'green' : pct > 0 ? 'warm' : 'blue';
    return `<tr>
      <td class="font-bold">${item.material}</td>
      <td class="text-right">${formatNum(item.quantity, 1)}</td>
      <td class="text-right">${formatNum(item.qtyReceived || 0, 1)}</td>
      <td class="text-right">${formatCurrency(item.unitCost)}</td>
      <td class="text-right font-bold">${formatCurrency(item.lineTotal)}</td>
      <td><div class="progress-bar"><div class="progress-fill ${fillCls}" style="width:${pct}%"></div></div></td>
    </tr>`;
  }).join('');

  const grHistory = (DB.goodsReceipts || []).filter(gr => gr.poId === id);
  const grRows = grHistory.map(gr => `<tr>
    <td class="font-mono">${gr.grNumber}</td><td>${formatDate(gr.date)}</td>
    <td>${(gr.items || []).map(i => `${i.material} ×${i.qtyReceived}`).join(', ')}</td>
    <td>${gr.receivedBy}</td>
  </tr>`).join('');

  openModal(`PO: ${po.poNumber}`, `
    <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:16px">
      <div><span class="text-muted text-sm">Supplier:</span> <strong>${po.supplier}</strong></div>
      <div><span class="text-muted text-sm">Date:</span> ${formatDate(po.date)}</div>
      <div><span class="text-muted text-sm">Expected:</span> ${po.expectedDate ? formatDate(po.expectedDate) : '—'}</div>
      <div><span class="text-muted text-sm">Status:</span> <span class="status-badge ${statusColors[po.status]}">${po.status}</span></div>
    </div>
    ${po.notes ? `<p class="text-muted text-sm" style="margin-bottom:16px">Notes: ${po.notes}</p>` : ''}
    <div class="table-container">
      <table class="data-table"><thead><tr><th>Material</th><th>Ordered</th><th>Received</th><th>Unit Cost</th><th>Line Total</th><th>Progress</th></tr></thead>
      <tbody>${linesHTML}</tbody>
      <tfoot><tr><td colspan="4" class="text-right font-bold">Total:</td><td class="text-right font-bold">${formatCurrency(po.totalAmount)}</td><td></td></tr></tfoot></table>
    </div>
    ${grRows ? `
    <div style="margin-top:16px;border-top:1px solid var(--border);padding-top:16px">
      <div class="form-label" style="margin-bottom:8px">Goods Receipt History</div>
      <div class="table-container"><table class="data-table"><thead><tr><th>GR #</th><th>Date</th><th>Items</th><th>Received By</th></tr></thead><tbody>${grRows}</tbody></table></div>
    </div>` : ''}
  `, null, `
    ${po.status === 'Pending' ? `<button class="btn btn-primary" onclick="approvePO('${po.id}')"><i class="fas fa-check"></i> Approve</button>` : ''}
    <button class="btn" onclick="closeModal()">Close</button>
  `);
}

function approvePO(id) {
  const po = DB.purchaseOrders.find(x => x.id === id);
  if (!po) return;
  po.status = 'Approved';
  saveDB();
  addAudit('PO Approved', po.poNumber);
  closeModal();
  renderModule('purchase-orders');
  toast(`${po.poNumber} approved — ready for goods receipt`);
}

function cancelPO(id) {
  openModal('Cancel Purchase Order', '<div class="confirm-dialog"><i class="fas fa-ban"></i><h3>Cancel this PO?</h3><p>This will mark the PO as cancelled.</p></div>', () => {
    const po = DB.purchaseOrders.find(x => x.id === id);
    if (po) {
      po.status = 'Cancelled';
      saveDB();
      addAudit('PO Cancelled', po.poNumber);
    }
    closeModal();
    renderModule('purchase-orders');
    toast('Purchase order cancelled');
  }, '<button class="btn" onclick="closeModal()">Keep</button><button class="btn btn-danger" onclick="saveModal()"><i class="fas fa-ban"></i> Cancel PO</button>');
}

// ══════════════════════════════════════════════════════════════
// MODULE: 05c — Goods Receipt
// ══════════════════════════════════════════════════════════════
function renderGoodsReceipt(container) {
  if (!DB.goodsReceipts) DB.goodsReceipts = [];
  const receivablePOs = (DB.purchaseOrders || []).filter(po => po.status === 'Approved' || po.status === 'Partial');
  const totalGRs = DB.goodsReceipts.length;
  const todayGRs = DB.goodsReceipts.filter(gr => gr.date === today()).length;

  container.innerHTML = `
    <div class="kpi-grid mb-5">
      <div class="kpi-card green"><div class="kpi-icon green"><i class="fas fa-dolly"></i></div><div class="kpi-label">Total Receipts</div><div class="kpi-value">${totalGRs}</div></div>
      <div class="kpi-card blue"><div class="kpi-icon blue"><i class="fas fa-calendar-day"></i></div><div class="kpi-label">Today's Receipts</div><div class="kpi-value">${todayGRs}</div></div>
      <div class="kpi-card warm"><div class="kpi-icon warm"><i class="fas fa-hourglass-half"></i></div><div class="kpi-label">Awaiting Receipt</div><div class="kpi-value">${receivablePOs.length}</div></div>
    </div>
    ${receivablePOs.length ? `
    <div class="card mb-5">
      <div class="card-header"><div class="card-title"><i class="fas fa-hourglass-half"></i> POs Awaiting Receipt</div></div>
      <div class="table-container">${pendingPOsForGR(receivablePOs)}</div>
    </div>` : ''}
    <div class="card">
      <div class="card-header"><div class="card-title"><i class="fas fa-clipboard-check"></i> Goods Receipt History (${totalGRs})</div></div>
      <div class="table-container">${grTable()}</div>
    </div>`;
}

function pendingPOsForGR(pos) {
  return `<table class="data-table"><thead><tr>
    <th>PO #</th><th>Supplier</th><th>Items</th><th>Total</th><th>Status</th><th>Actions</th>
  </tr></thead><tbody>${pos.map(po => `<tr>
    <td class="font-mono font-bold">${po.poNumber}</td>
    <td>${po.supplier}</td>
    <td>${(po.items || []).length} line(s)</td>
    <td class="text-right">${formatCurrency(po.totalAmount)}</td>
    <td><span class="status-badge ${po.status === 'Partial' ? 'purple' : 'info'}">${po.status}</span></td>
    <td><button class="btn btn-sm btn-primary" onclick="openGRForm('${po.id}')"><i class="fas fa-dolly"></i> Receive</button></td>
  </tr>`).join('')}</tbody></table>`;
}

function grTable() {
  if (!DB.goodsReceipts.length) return '<div class="empty-state"><i class="fas fa-dolly"></i><p>No goods received yet</p><p class="hint">Approve a PO first, then receive goods here</p></div>';
  return `<table class="data-table"><thead><tr>
    <th>GR #</th><th>Date</th><th>PO #</th><th>Supplier</th><th>Items Received</th><th>Received By</th><th>Actions</th>
  </tr></thead><tbody>${DB.goodsReceipts.slice().reverse().map(gr => `<tr>
    <td class="font-mono font-bold">${gr.grNumber}</td>
    <td>${formatDate(gr.date)}</td>
    <td class="font-mono">${gr.poNumber || '—'}</td>
    <td>${gr.supplier}</td>
    <td class="text-muted text-sm">${(gr.items || []).map(i => `${i.material} ×${formatNum(i.qtyReceived, 1)}`).join(', ')}</td>
    <td>${gr.receivedBy}</td>
    <td><button class="action-btn delete" onclick="deleteRecord('goodsReceipts','${gr.id}','Goods Receipt')"><i class="fas fa-trash"></i></button></td>
  </tr>`).join('')}</tbody></table>`;
}

function openGRForm(poId) {
  const po = DB.purchaseOrders.find(x => x.id === poId);
  if (!po) return toast('Purchase order not found', 'error');

  const linesHTML = (po.items || []).map((item, i) => {
    const remaining = item.quantity - (item.qtyReceived || 0);
    return `
      <div class="po-line-item" data-material="${item.material}" data-ordered="${item.quantity}" data-received="${item.qtyReceived || 0}">
        <span style="min-width:160px;font-weight:500">${item.material}</span>
        <span class="text-muted text-sm" style="min-width:100px">Ordered: ${formatNum(item.quantity, 1)}</span>
        <span class="text-muted text-sm" style="min-width:100px">Pending: ${formatNum(remaining, 1)}</span>
        <input class="form-input gr-qty" type="number" value="${remaining}" step="0.1" style="width:100px" max="${remaining}" placeholder="Receive">
      </div>`;
  }).join('');

  openModal(`Receive Goods — ${po.poNumber}`, `
    <div style="display:flex;gap:16px;margin-bottom:16px">
      <div><span class="text-muted text-sm">Supplier:</span> <strong>${po.supplier}</strong></div>
      <div><span class="text-muted text-sm">PO Date:</span> ${formatDate(po.date)}</div>
    </div>
    <div class="form-grid" style="margin-bottom:16px">
      <div class="form-group"><label class="form-label">GR Number</label><input class="form-input" id="f-gr" value="GR-${Date.now().toString().slice(-6)}"></div>
      <div class="form-group"><label class="form-label">Receipt Date</label><input class="form-input" type="date" id="f-date" value="${today()}"></div>
      <div class="form-group"><label class="form-label">Received By</label><input class="form-input" id="f-received" value="${currentUser ? currentUser.name : 'Admin'}"></div>
      <div class="form-group"><label class="form-label">Invoice #</label><input class="form-input" id="f-invoice" value=""></div>
    </div>
    <div style="border-top:1px solid var(--border);padding-top:16px">
      <label class="form-label" style="margin-bottom:12px">Quantities to Receive</label>
      <div style="display:flex;flex-direction:column;gap:8px">${linesHTML}</div>
    </div>
  `, () => {
    const grItems = [];
    let hasOverReceive = false;

    document.querySelectorAll('.po-line-item').forEach(row => {
      const material = row.dataset.material;
      const ordered = parseFloat(row.dataset.ordered);
      const alreadyReceived = parseFloat(row.dataset.received);
      const qtyReceived = parseFloat(row.querySelector('.gr-qty').value) || 0;
      const remaining = ordered - alreadyReceived;

      if (qtyReceived > 0) {
        if (qtyReceived > remaining * 1.1) { // Allow 10% over-receipt tolerance
          hasOverReceive = true;
        }
        grItems.push({ material, qtyReceived, unitCost: po.items.find(i => i.material === material)?.unitCost || 0 });
      }
    });

    if (!grItems.length) return toast('Enter quantities to receive', 'warning');
    if (hasOverReceive) return toast('Received quantity exceeds ordered + 10% tolerance', 'error');

    const grDate = document.getElementById('f-date').value || today();
    const grRecord = {
      id: genId(),
      grNumber: document.getElementById('f-gr').value,
      poId: po.id,
      poNumber: po.poNumber,
      date: grDate,
      supplier: po.supplier,
      invoiceNumber: document.getElementById('f-invoice').value,
      receivedBy: document.getElementById('f-received').value,
      items: grItems
    };

    DB.goodsReceipts.push(grRecord);

    // Update PO received quantities and status
    grItems.forEach(grItem => {
      const poItem = po.items.find(i => i.material === grItem.material);
      if (poItem) poItem.qtyReceived = (poItem.qtyReceived || 0) + grItem.qtyReceived;

      // Update raw material stock
      const mat = DB.rawMaterials.find(m => m.name === grItem.material);
      if (mat) {
        mat.currentStock += grItem.qtyReceived;
        mat.unitCost = grItem.unitCost;
      }

      // Add to inventory ledger
      DB.inventoryLedger.push({
        id: genId(), date: grDate, item: grItem.material, movementType: 'Purchase',
        qtyIn: grItem.qtyReceived, qtyOut: 0,
        balance: mat ? mat.currentStock : grItem.qtyReceived,
        reference: `${grRecord.grNumber} (${po.poNumber})`
      });

      // Add to legacy purchases for backward compat
      DB.purchases.push({
        id: genId(), date: grDate, supplier: po.supplier, poNumber: po.poNumber,
        invoiceNumber: grRecord.invoiceNumber, material: grItem.material,
        quantity: grItem.qtyReceived, unitCost: grItem.unitCost,
        totalCost: grItem.qtyReceived * grItem.unitCost,
        receivedBy: grRecord.receivedBy
      });
    });

    // Update PO status
    const allReceived = po.items.every(i => (i.qtyReceived || 0) >= i.quantity);
    const someReceived = po.items.some(i => (i.qtyReceived || 0) > 0);
    po.status = allReceived ? 'Completed' : someReceived ? 'Partial' : po.status;

    saveDB(); closeModal(); renderModule('goods-receipt');
    addAudit('Goods Received', `${grRecord.grNumber} for ${po.poNumber}`);
    toast(`Goods received — inventory updated`);
  });
}

// ══════════════════════════════════════════════════════════════
// MODULE: 06 — Stock Adjustments
// ══════════════════════════════════════════════════════════════
function renderStockAdj(container) {
  container.innerHTML = `
    <div class="card">
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn btn-primary" onclick="openStockAdjForm()"><i class="fas fa-plus"></i> New Adjustment</button>
          <span class="text-muted text-sm">${DB.stockAdjustments.length} adjustments</span>
        </div>
      </div>
      <div class="table-container">${stockAdjTable()}</div>
    </div>`;
}

function stockAdjTable() {
  if (!DB.stockAdjustments.length) return '<div class="empty-state"><i class="fas fa-sliders-h"></i><p>No stock adjustments</p></div>';
  return `<table class="data-table"><thead><tr>
    <th>Date</th><th>Item</th><th>Quantity</th><th>Reason</th><th>Approved By</th><th>Actions</th>
  </tr></thead><tbody>${DB.stockAdjustments.slice().reverse().map(a => `<tr>
    <td>${formatDate(a.date)}</td><td class="font-bold">${a.item}</td>
    <td class="text-right ${a.quantity >= 0 ? 'text-success' : 'text-danger'}">${a.quantity >= 0 ? '+' : ''}${formatNum(a.quantity, 1)}</td>
    <td><span class="status-badge ${a.reason === 'Damage' || a.reason === 'Expired' ? 'danger' : a.reason === 'Physical Count' ? 'info' : 'neutral'}">${a.reason}</span></td>
    <td>${a.approvedBy}</td>
    <td><button class="action-btn delete" onclick="deleteRecord('stockAdjustments','${a.id}','Adjustment')"><i class="fas fa-trash"></i></button></td>
  </tr>`).join('')}</tbody></table>`;
}

function openStockAdjForm() {
  const matNames = DB.rawMaterials.map(m => m.name);
  openModal('Stock Adjustment', `
    <div class="form-grid">
      <div class="form-group"><label class="form-label">Date</label><input class="form-input" type="date" id="f-date" value="${today()}"></div>
      <div class="form-group"><label class="form-label">Item</label>
        <select class="form-select" id="f-item">${matNames.map(n => `<option>${n}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Quantity (+/-)</label><input class="form-input" type="number" id="f-qty" value="0" step="0.1"></div>
      <div class="form-group"><label class="form-label">Reason</label>
        <select class="form-select" id="f-reason">${['Physical Count','Damage','Expired','Correction','Transfer'].map(r => `<option>${r}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Approved By</label><input class="form-input" id="f-approved" value="Admin"></div>
    </div>
  `, () => {
    const item = document.getElementById('f-item').value;
    const qty = parseFloat(document.getElementById('f-qty').value) || 0;
    const record = {
      id: genId(), date: document.getElementById('f-date').value || today(), item,
      quantity: qty, reason: document.getElementById('f-reason').value, approvedBy: document.getElementById('f-approved').value
    };
    DB.stockAdjustments.push(record);
    // Update stock
    const mat = DB.rawMaterials.find(m => m.name === item);
    if (mat) mat.currentStock += qty;
    DB.inventoryLedger.push({
      id: genId(), date: record.date, item, movementType: 'Adjustment',
      qtyIn: qty > 0 ? qty : 0, qtyOut: qty < 0 ? Math.abs(qty) : 0,
      balance: mat ? mat.currentStock : 0, reference: record.reason
    });
    saveDB(); closeModal(); renderModule('stock-adj');
    addAudit('Stock Adjustment', `${item}: ${qty >= 0 ? '+' : ''}${qty} (${record.reason})`);
    toast('Stock adjustment recorded');
  });
}

// ══════════════════════════════════════════════════════════════
// MODULE: 07 — Wastage
// ══════════════════════════════════════════════════════════════
function renderWastage(container) {
  const totalWasteCost = DB.wastage.reduce((s, w) => s + w.cost * w.quantity, 0);
  container.innerHTML = `
    <div class="kpi-grid mb-5">
      <div class="kpi-card warm"><div class="kpi-icon red"><i class="fas fa-trash-alt"></i></div><div class="kpi-label">Total Waste Entries</div><div class="kpi-value">${DB.wastage.length}</div></div>
      <div class="kpi-card warm"><div class="kpi-icon warm"><i class="fas fa-coins"></i></div><div class="kpi-label">Total Waste Cost</div><div class="kpi-value">${formatCurrency(totalWasteCost)}</div></div>
    </div>
    <div class="card">
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn btn-primary" onclick="openWastageForm()"><i class="fas fa-plus"></i> Record Waste</button>
        </div>
      </div>
      <div class="table-container">${wastageTable()}</div>
    </div>`;
}

function wastageTable() {
  if (!DB.wastage.length) return '<div class="empty-state"><i class="fas fa-recycle"></i><p>No wastage recorded</p><p class="hint">That\'s great! Keep it up 🎉</p></div>';
  return `<table class="data-table"><thead><tr>
    <th>Date</th><th>Ingredient</th><th>Quantity</th><th>Cost</th><th>Total</th><th>Reason</th><th>Employee</th><th>Actions</th>
  </tr></thead><tbody>${DB.wastage.slice().reverse().map(w => `<tr>
    <td>${formatDate(w.date)}</td><td class="font-bold">${w.ingredient}</td>
    <td class="text-right">${formatNum(w.quantity, 1)}</td><td class="text-right">${formatCurrency(w.cost)}</td>
    <td class="text-right font-bold text-danger">${formatCurrency(w.cost * w.quantity)}</td>
    <td><span class="status-badge danger">${w.reason}</span></td><td>${w.employee}</td>
    <td><button class="action-btn delete" onclick="deleteRecord('wastage','${w.id}','Waste')"><i class="fas fa-trash"></i></button></td>
  </tr>`).join('')}</tbody></table>`;
}

function openWastageForm() {
  const matNames = DB.rawMaterials.map(m => m.name);
  const empNames = DB.employees.map(e => e.name);
  openModal('Record Wastage', `
    <div class="form-grid">
      <div class="form-group"><label class="form-label">Date</label><input class="form-input" type="date" id="f-date" value="${today()}"></div>
      <div class="form-group"><label class="form-label">Ingredient</label>
        <select class="form-select" id="f-ingredient" onchange="autofillWasteCost()">${matNames.map(n => `<option>${n}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Quantity</label><input class="form-input" type="number" id="f-qty" value="1" step="0.1"></div>
      <div class="form-group"><label class="form-label">Unit Cost</label><input class="form-input" type="number" id="f-cost" value="0" step="0.01"></div>
      <div class="form-group"><label class="form-label">Reason</label>
        <select class="form-select" id="f-reason">${['Burned','Spoiled','Expired','Customer Complaint','Preparation Error','Staff Meal'].map(r => `<option>${r}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Employee</label>
        <select class="form-select" id="f-employee"><option value="">— Select —</option>${empNames.map(n => `<option>${n}</option>`).join('')}</select></div>
    </div>
  `, () => {
    const ingredient = document.getElementById('f-ingredient').value;
    const qty = parseFloat(document.getElementById('f-qty').value) || 0;
    const cost = parseFloat(document.getElementById('f-cost').value) || 0;
    const record = {
      id: genId(), date: document.getElementById('f-date').value || today(), ingredient, quantity: qty, cost,
      reason: document.getElementById('f-reason').value, employee: document.getElementById('f-employee').value || 'Unknown'
    };
    DB.wastage.push(record);
    const mat = DB.rawMaterials.find(m => m.name === ingredient);
    if (mat) mat.currentStock = Math.max(0, mat.currentStock - qty);
    DB.inventoryLedger.push({
      id: genId(), date: record.date, item: ingredient, movementType: 'Waste',
      qtyIn: 0, qtyOut: qty, balance: mat ? mat.currentStock : 0, reference: record.reason
    });
    saveDB(); closeModal(); renderModule('wastage');
    addAudit('Wastage Recorded', `${ingredient} x${qty} (${record.reason})`);
    toast('Waste recorded');
  });
}

function autofillWasteCost() {
  const name = document.getElementById('f-ingredient').value;
  const mat = DB.rawMaterials.find(m => m.name === name);
  if (mat) document.getElementById('f-cost').value = mat.unitCost;
}

// ══════════════════════════════════════════════════════════════
// MODULE: 08 — Production
// ══════════════════════════════════════════════════════════════
function renderProduction(container) {
  container.innerHTML = `
    <div class="card">
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn btn-primary" onclick="openProductionForm()"><i class="fas fa-plus"></i> Log Production</button>
          <span class="text-muted text-sm">${DB.production.length} production runs</span>
        </div>
      </div>
      <div class="table-container">${productionTable()}</div>
    </div>`;
}

function productionTable() {
  if (!DB.production.length) return '<div class="empty-state"><i class="fas fa-industry"></i><p>No production logged</p></div>';
  return `<table class="data-table"><thead><tr>
    <th>Date</th><th>Product</th><th>Quantity</th><th>Ingredients Consumed</th><th>Notes</th><th>Actions</th>
  </tr></thead><tbody>${DB.production.slice().reverse().map(p => `<tr>
    <td>${formatDate(p.date)}</td><td class="font-bold">${p.product}</td>
    <td class="text-right">${formatNum(p.quantity)}</td>
    <td class="text-muted text-sm">${(p.ingredientsUsed || []).map(i => `${i.name} ×${i.qty}`).join(', ') || '—'}</td>
    <td class="text-muted">${p.notes || '—'}</td>
    <td><button class="action-btn delete" onclick="deleteRecord('production','${p.id}','Production')"><i class="fas fa-trash"></i></button></td>
  </tr>`).join('')}</tbody></table>`;
}

function openProductionForm() {
  const menuNames = DB.products.filter(p => p.isMenuItem).map(p => p.name);
  openModal('Log Production', `
    <div class="form-grid">
      <div class="form-group"><label class="form-label">Date</label><input class="form-input" type="date" id="f-date" value="${today()}"></div>
      <div class="form-group"><label class="form-label">Product</label>
        <select class="form-select" id="f-product">${menuNames.map(n => `<option>${n}</option>`).join('')}
          ${!menuNames.length ? '<option>No menu products</option>' : ''}</select></div>
      <div class="form-group"><label class="form-label">Quantity Produced</label><input class="form-input" type="number" id="f-qty" value="1"></div>
      <div class="form-group full-width"><label class="form-label">Notes</label><input class="form-input" id="f-notes" value=""></div>
    </div>
  `, () => {
    const product = document.getElementById('f-product').value;
    const qty = parseInt(document.getElementById('f-qty').value) || 1;
    // Consume ingredients from BOM
    const recipeIngredients = DB.recipes.filter(r => r.product === product);
    const ingredientsUsed = [];
    recipeIngredients.forEach(ri => {
      const needed = ri.qtyRequired * qty;
      const mat = DB.rawMaterials.find(m => m.name === ri.ingredient);
      if (mat) {
        mat.currentStock = Math.max(0, mat.currentStock - needed);
        ingredientsUsed.push({ name: ri.ingredient, qty: needed });
        DB.inventoryLedger.push({
          id: genId(), date: today(), item: ri.ingredient, movementType: 'Production',
          qtyIn: 0, qtyOut: needed, balance: mat.currentStock, reference: `Produced ${product} x${qty}`
        });
      }
    });
    DB.production.push({
      id: genId(), date: document.getElementById('f-date').value || today(), product, quantity: qty,
      ingredientsUsed, notes: document.getElementById('f-notes').value
    });
    saveDB(); closeModal(); renderModule('production');
    addAudit('Production Logged', `${product} x${qty}`);
    toast(`${product} x${qty} produced — ingredients consumed`);
  });
}

// ══════════════════════════════════════════════════════════════
// MODULE: 09 — Inventory Ledger
// ══════════════════════════════════════════════════════════════
function renderInvLedger(container) {
  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-book"></i> Stock Movement Log (${DB.inventoryLedger.length} entries)</div>
      </div>
      <div class="table-container" style="max-height:600px;overflow-y:auto">${invLedgerTable()}</div>
    </div>`;
}

function invLedgerTable() {
  if (!DB.inventoryLedger.length) return '<div class="empty-state"><i class="fas fa-book-open"></i><p>No inventory movements</p><p class="hint">Movements are auto-recorded from purchases, production, wastage, and adjustments</p></div>';
  const typeColors = { 'Purchase': 'success', 'Production': 'purple', 'Waste': 'danger', 'Adjustment': 'info', 'Sales Consumption': 'warning', 'Opening Balance': 'neutral' };
  return `<table class="data-table"><thead><tr>
    <th>Date</th><th>Item</th><th>Movement</th><th>In</th><th>Out</th><th>Balance</th><th>Reference</th>
  </tr></thead><tbody>${DB.inventoryLedger.slice().reverse().slice(0, 300).map(l => `<tr>
    <td>${formatDate(l.date)}</td><td class="font-bold">${l.item}</td>
    <td><span class="status-badge ${typeColors[l.movementType] || 'neutral'}">${l.movementType}</span></td>
    <td class="text-right ${l.qtyIn > 0 ? 'text-success' : ''}">${l.qtyIn > 0 ? '+' + formatNum(l.qtyIn, 1) : '—'}</td>
    <td class="text-right ${l.qtyOut > 0 ? 'text-danger' : ''}">${l.qtyOut > 0 ? '-' + formatNum(l.qtyOut, 1) : '—'}</td>
    <td class="text-right font-bold">${formatNum(l.balance, 1)}</td>
    <td class="text-muted text-sm">${l.reference || '—'}</td>
  </tr>`).join('')}</tbody></table>`;
}

// ══════════════════════════════════════════════════════════════
// MODULE: 10 — Sales Analysis
// ══════════════════════════════════════════════════════════════
function renderSalesAnalysis(container) {
  const pos = DB.posImport;
  const todaySales = pos.filter(p => p.date === today()).reduce((s, p) => s + p.amountSold, 0);
  const weekSales = pos.filter(p => p.date >= startOfWeek()).reduce((s, p) => s + p.amountSold, 0);
  const monthSales = pos.filter(p => p.date >= startOfMonth()).reduce((s, p) => s + p.amountSold, 0);
  const totalSales = pos.reduce((s, p) => s + p.amountSold, 0);
  const totalTx = new Set(pos.map(p => p.invoiceNo)).size;
  const avgTx = totalTx > 0 ? totalSales / totalTx : 0;

  // Best & worst sellers
  const productSales = {};
  pos.forEach(p => {
    if (!productSales[p.productName]) productSales[p.productName] = { qty: 0, amount: 0 };
    productSales[p.productName].qty += p.qtySold;
    productSales[p.productName].amount += p.amountSold;
  });
  const sorted = Object.entries(productSales).sort((a, b) => b[1].amount - a[1].amount);
  const best = sorted[0] || ['—', { qty: 0, amount: 0 }];
  const worst = sorted[sorted.length - 1] || ['—', { qty: 0, amount: 0 }];

  // Category sales
  const catSales = {};
  pos.forEach(p => { catSales[p.category] = (catSales[p.category] || 0) + p.amountSold; });

  container.innerHTML = `
    <div class="kpi-grid">
      <div class="kpi-card green"><div class="kpi-icon green"><i class="fas fa-dollar-sign"></i></div><div class="kpi-label">Today's Sales</div><div class="kpi-value">${formatCurrency(todaySales)}</div></div>
      <div class="kpi-card blue"><div class="kpi-icon blue"><i class="fas fa-chart-line"></i></div><div class="kpi-label">This Week</div><div class="kpi-value">${formatCurrency(weekSales)}</div></div>
      <div class="kpi-card purple"><div class="kpi-icon purple"><i class="fas fa-calendar"></i></div><div class="kpi-label">This Month</div><div class="kpi-value">${formatCurrency(monthSales)}</div></div>
      <div class="kpi-card warm"><div class="kpi-icon warm"><i class="fas fa-receipt"></i></div><div class="kpi-label">Avg Transaction</div><div class="kpi-value">${formatCurrency(avgTx)}</div></div>
      <div class="kpi-card green"><div class="kpi-icon green"><i class="fas fa-trophy"></i></div><div class="kpi-label">Best Seller</div><div class="kpi-value" style="font-size:1.1rem">${best[0]}</div></div>
    </div>
    <div class="charts-grid">
      <div class="chart-card wide">
        <div class="chart-header"><div class="chart-title">Daily Sales Trend</div></div>
        <canvas id="chartDailySales"></canvas>
      </div>
      <div class="chart-card">
        <div class="chart-header"><div class="chart-title">Sales by Category</div></div>
        <canvas id="chartCatSales"></canvas>
      </div>
      <div class="chart-card">
        <div class="chart-header"><div class="chart-title">Top Products</div></div>
        <canvas id="chartTopProducts"></canvas>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title"><i class="fas fa-list"></i> Product Sales Summary</div></div>
      <div class="table-container">
        <table class="data-table"><thead><tr><th>Product</th><th>Qty Sold</th><th>Revenue</th><th>Share</th></tr></thead><tbody>
          ${sorted.map(([name, data]) => `<tr><td class="font-bold">${name}</td><td class="text-right">${data.qty}</td><td class="text-right">${formatCurrency(data.amount)}</td>
            <td class="text-right">${formatPct(totalSales > 0 ? data.amount / totalSales * 100 : 0)}</td></tr>`).join('')}
        </tbody></table>
      </div>
    </div>`;

  // Charts
  renderDailySalesChart(pos);
  renderCategorySalesChart(catSales);
  renderTopProductsChart(sorted.slice(0, 8));
}

function renderDailySalesChart(pos) {
  const dailyMap = {};
  pos.forEach(p => { dailyMap[p.date] = (dailyMap[p.date] || 0) + p.amountSold; });
  const labels = Object.keys(dailyMap).sort().slice(-30);
  const data = labels.map(d => dailyMap[d] || 0);
  const ctx = document.getElementById('chartDailySales');
  if (!ctx) return;
  chartInstances.dailySales = new Chart(ctx, {
    type: 'line',
    data: { labels: labels.map(d => formatDate(d)), datasets: [{ label: 'Revenue', data, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', fill: true, tension: 0.4, pointRadius: 2 }] },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#888', maxTicksLimit: 10 }, grid: { color: 'rgba(255,255,255,0.03)' } }, y: { ticks: { color: '#888' }, grid: { color: 'rgba(255,255,255,0.03)' } } } }
  });
}

function renderCategorySalesChart(catSales) {
  const labels = Object.keys(catSales);
  const data = Object.values(catSales);
  const colors = ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#3b82f6', '#14b8a6'];
  const ctx = document.getElementById('chartCatSales');
  if (!ctx) return;
  chartInstances.catSales = new Chart(ctx, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors.slice(0, labels.length), borderWidth: 0 }] },
    options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#aaa', padding: 12, font: { size: 11 } } } } }
  });
}

function renderTopProductsChart(top) {
  const ctx = document.getElementById('chartTopProducts');
  if (!ctx) return;
  chartInstances.topProducts = new Chart(ctx, {
    type: 'bar',
    data: { labels: top.map(([n]) => n.length > 15 ? n.slice(0,15) + '…' : n), datasets: [{ label: 'Revenue', data: top.map(([, d]) => d.amount), backgroundColor: 'rgba(6,182,212,0.6)', borderRadius: 6 }] },
    options: { responsive: true, indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#888' }, grid: { color: 'rgba(255,255,255,0.03)' } }, y: { ticks: { color: '#ccc' }, grid: { display: false } } } }
  });
}

// ══════════════════════════════════════════════════════════════
// MODULE: 11 — Profit Analysis
// ══════════════════════════════════════════════════════════════
function renderProfitAnalysis(container) {
  const pos = DB.posImport;
  const totalRevenue = pos.reduce((s, p) => s + p.amountSold, 0);
  // Calculate COGS from recipes
  let totalCOGS = 0;
  pos.forEach(p => {
    const recipe = DB.recipes.filter(r => r.product === p.productName);
    if (recipe.length) {
      const recipeCost = recipe.reduce((s, r) => s + r.qtyRequired * r.cost, 0);
      totalCOGS += recipeCost * p.qtySold;
    } else {
      const prod = DB.products.find(x => x.name === p.productName);
      if (prod) totalCOGS += prod.standardCost * p.qtySold;
    }
  });
  const wasteCost = DB.wastage.reduce((s, w) => s + w.cost * w.quantity, 0);
  const grossProfit = totalRevenue - totalCOGS;
  const netProfit = grossProfit - wasteCost;
  const grossMargin = totalRevenue > 0 ? grossProfit / totalRevenue * 100 : 0;
  const foodCostPct = totalRevenue > 0 ? totalCOGS / totalRevenue * 100 : 0;

  container.innerHTML = `
    <div class="kpi-grid">
      <div class="kpi-card green"><div class="kpi-icon green"><i class="fas fa-dollar-sign"></i></div><div class="kpi-label">Total Revenue</div><div class="kpi-value">${formatCurrency(totalRevenue)}</div></div>
      <div class="kpi-card warm"><div class="kpi-icon warm"><i class="fas fa-receipt"></i></div><div class="kpi-label">Cost of Goods</div><div class="kpi-value">${formatCurrency(totalCOGS)}</div></div>
      <div class="kpi-card blue"><div class="kpi-icon blue"><i class="fas fa-chart-line"></i></div><div class="kpi-label">Gross Profit</div><div class="kpi-value">${formatCurrency(grossProfit)}</div></div>
      <div class="kpi-card purple"><div class="kpi-icon purple"><i class="fas fa-percentage"></i></div><div class="kpi-label">Gross Margin</div><div class="kpi-value">${formatPct(grossMargin)}</div></div>
      <div class="kpi-card warm"><div class="kpi-icon red"><i class="fas fa-trash"></i></div><div class="kpi-label">Waste Cost</div><div class="kpi-value">${formatCurrency(wasteCost)}</div></div>
      <div class="kpi-card green"><div class="kpi-icon green"><i class="fas fa-piggy-bank"></i></div><div class="kpi-label">Net Profit</div><div class="kpi-value">${formatCurrency(netProfit)}</div></div>
      <div class="kpi-card blue"><div class="kpi-icon cyan"><i class="fas fa-utensils"></i></div><div class="kpi-label">Food Cost %</div><div class="kpi-value">${formatPct(foodCostPct)}</div></div>
    </div>
    <div class="charts-grid">
      <div class="chart-card">
        <div class="chart-header"><div class="chart-title">Revenue Breakdown</div></div>
        <canvas id="chartProfitBreakdown"></canvas>
      </div>
      <div class="chart-card">
        <div class="chart-header"><div class="chart-title">Profit by Product</div></div>
        <canvas id="chartProfitByProduct"></canvas>
      </div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title"><i class="fas fa-table"></i> Profit & Loss Statement</div></div>
      <div class="table-container"><table class="data-table">
        <tbody>
          <tr><td class="font-bold">Revenue</td><td class="text-right font-bold">${formatCurrency(totalRevenue)}</td></tr>
          <tr><td style="padding-left:32px">Less: Cost of Goods Sold</td><td class="text-right text-danger">(${formatCurrency(totalCOGS)})</td></tr>
          <tr style="border-top:2px solid var(--border)"><td class="font-bold">Gross Profit</td><td class="text-right font-bold">${formatCurrency(grossProfit)}</td></tr>
          <tr><td style="padding-left:32px">Less: Waste Cost</td><td class="text-right text-danger">(${formatCurrency(wasteCost)})</td></tr>
          <tr style="border-top:2px solid var(--accent)"><td class="font-bold text-accent" style="font-size:1.1rem">Net Profit</td><td class="text-right font-bold text-accent" style="font-size:1.1rem">${formatCurrency(netProfit)}</td></tr>
          <tr><td class="text-muted">Gross Margin</td><td class="text-right">${formatPct(grossMargin)}</td></tr>
          <tr><td class="text-muted">Food Cost %</td><td class="text-right">${formatPct(foodCostPct)}</td></tr>
        </tbody>
      </table></div>
    </div>`;

  // Charts
  const ctx1 = document.getElementById('chartProfitBreakdown');
  if (ctx1) {
    chartInstances.profitBreakdown = new Chart(ctx1, {
      type: 'doughnut',
      data: { labels: ['COGS', 'Waste', 'Net Profit'], datasets: [{ data: [totalCOGS, wasteCost, Math.max(0, netProfit)], backgroundColor: ['#ef4444', '#f59e0b', '#10b981'], borderWidth: 0 }] },
      options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#aaa', padding: 12, font: { size: 11 } } } } }
    });
  }

  // Profit by product
  const productProfit = {};
  pos.forEach(p => {
    const recipe = DB.recipes.filter(r => r.product === p.productName);
    let cost = 0;
    if (recipe.length) cost = recipe.reduce((s, r) => s + r.qtyRequired * r.cost, 0) * p.qtySold;
    else { const prod = DB.products.find(x => x.name === p.productName); if (prod) cost = prod.standardCost * p.qtySold; }
    if (!productProfit[p.productName]) productProfit[p.productName] = 0;
    productProfit[p.productName] += p.amountSold - cost;
  });
  const sortedProfit = Object.entries(productProfit).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const ctx2 = document.getElementById('chartProfitByProduct');
  if (ctx2) {
    chartInstances.profitByProduct = new Chart(ctx2, {
      type: 'bar',
      data: { labels: sortedProfit.map(([n]) => n.length > 12 ? n.slice(0,12)+'…' : n), datasets: [{ label: 'Profit', data: sortedProfit.map(([,v]) => v), backgroundColor: sortedProfit.map(([,v]) => v >= 0 ? 'rgba(16,185,129,0.6)' : 'rgba(239,68,68,0.6)'), borderRadius: 6 }] },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#888' }, grid: { display: false } }, y: { ticks: { color: '#888' }, grid: { color: 'rgba(255,255,255,0.03)' } } } }
    });
  }
}

// ══════════════════════════════════════════════════════════════
// MODULE: 12 — Daily Report
// ══════════════════════════════════════════════════════════════
function renderDailyReport(container) {
  const d = today();
  const sales = DB.posImport.filter(p => p.date === d);
  const revenue = sales.reduce((s, p) => s + p.amountSold, 0);
  const qtySold = sales.reduce((s, p) => s + p.qtySold, 0);
  const transactions = new Set(sales.map(p => p.invoiceNo)).size;
  const waste = DB.wastage.filter(w => w.date === d);
  const wasteCost = waste.reduce((s, w) => s + w.cost * w.quantity, 0);
  const lowStockItems = DB.rawMaterials.filter(m => m.currentStock <= m.minStock);
  const invValue = DB.rawMaterials.reduce((s, m) => s + m.currentStock * m.unitCost, 0);

  // Top products today
  const prodMap = {};
  sales.forEach(p => { prodMap[p.productName] = (prodMap[p.productName] || 0) + p.amountSold; });
  const topProducts = Object.entries(prodMap).sort((a,b) => b[1] - a[1]).slice(0, 5);

  container.innerHTML = `
    <div class="card mb-5">
      <div class="report-header">
        <div><div class="report-title">📋 Daily Operations Report</div><div class="report-date">${formatDate(d)}</div></div>
        <button class="btn" onclick="exportCurrentModule()"><i class="fas fa-download"></i> Export</button>
      </div>
      <div class="kpi-grid mb-5">
        <div class="kpi-card green"><div class="kpi-icon green"><i class="fas fa-dollar-sign"></i></div><div class="kpi-label">Revenue</div><div class="kpi-value">${formatCurrency(revenue)}</div></div>
        <div class="kpi-card blue"><div class="kpi-icon blue"><i class="fas fa-shopping-cart"></i></div><div class="kpi-label">Items Sold</div><div class="kpi-value">${qtySold}</div></div>
        <div class="kpi-card purple"><div class="kpi-icon purple"><i class="fas fa-receipt"></i></div><div class="kpi-label">Transactions</div><div class="kpi-value">${transactions}</div></div>
        <div class="kpi-card warm"><div class="kpi-icon red"><i class="fas fa-trash"></i></div><div class="kpi-label">Waste Cost</div><div class="kpi-value">${formatCurrency(wasteCost)}</div></div>
        <div class="kpi-card blue"><div class="kpi-icon cyan"><i class="fas fa-warehouse"></i></div><div class="kpi-label">Inventory Value</div><div class="kpi-value">${formatCurrency(invValue)}</div></div>
        <div class="kpi-card warm"><div class="kpi-icon warm"><i class="fas fa-exclamation-triangle"></i></div><div class="kpi-label">Low Stock Items</div><div class="kpi-value">${lowStockItems.length}</div></div>
      </div>
      <div class="report-section">
        <div class="report-section-title"><i class="fas fa-trophy"></i> Top Selling Products</div>
        <div class="table-container"><table class="data-table"><thead><tr><th>#</th><th>Product</th><th>Revenue</th></tr></thead><tbody>
          ${topProducts.map(([name, amount], i) => `<tr><td>${i+1}</td><td class="font-bold">${name}</td><td class="text-right">${formatCurrency(amount)}</td></tr>`).join('')}
          ${!topProducts.length ? '<tr><td colspan="3" class="text-center text-muted">No sales today</td></tr>' : ''}
        </tbody></table></div>
      </div>
    </div>`;
}

// ══════════════════════════════════════════════════════════════
// MODULE: 13 — Weekly Report
// ══════════════════════════════════════════════════════════════
function renderWeeklyReport(container) {
  const weekStart = startOfWeek();
  const lastWeekStart = daysAgo(new Date().getDay() + 7);
  const lastWeekEnd = daysAgo(new Date().getDay() + 1);
  const thisWeekSales = DB.posImport.filter(p => p.date >= weekStart);
  const lastWeekSales = DB.posImport.filter(p => p.date >= lastWeekStart && p.date <= lastWeekEnd);
  const thisRev = thisWeekSales.reduce((s, p) => s + p.amountSold, 0);
  const lastRev = lastWeekSales.reduce((s, p) => s + p.amountSold, 0);
  const growth = lastRev > 0 ? ((thisRev - lastRev) / lastRev * 100) : 0;

  // Daily breakdown
  const dailyMap = {};
  thisWeekSales.forEach(p => { dailyMap[p.date] = (dailyMap[p.date] || 0) + p.amountSold; });

  container.innerHTML = `
    <div class="card mb-5">
      <div class="report-header">
        <div><div class="report-title">📊 Weekly Report</div><div class="report-date">Week of ${formatDate(weekStart)}</div></div>
      </div>
      <div class="kpi-grid mb-5">
        <div class="kpi-card green"><div class="kpi-icon green"><i class="fas fa-dollar-sign"></i></div><div class="kpi-label">This Week Revenue</div><div class="kpi-value">${formatCurrency(thisRev)}</div>
          <div class="kpi-change ${growth >= 0 ? 'up' : 'down'}"><i class="fas fa-arrow-${growth >= 0 ? 'up' : 'down'}"></i> ${formatPct(Math.abs(growth))} vs last week</div></div>
        <div class="kpi-card blue"><div class="kpi-icon blue"><i class="fas fa-chart-line"></i></div><div class="kpi-label">Last Week Revenue</div><div class="kpi-value">${formatCurrency(lastRev)}</div></div>
        <div class="kpi-card purple"><div class="kpi-icon purple"><i class="fas fa-shopping-bag"></i></div><div class="kpi-label">Items Sold</div><div class="kpi-value">${thisWeekSales.reduce((s,p) => s + p.qtySold, 0)}</div></div>
        <div class="kpi-card warm"><div class="kpi-icon warm"><i class="fas fa-receipt"></i></div><div class="kpi-label">Transactions</div><div class="kpi-value">${new Set(thisWeekSales.map(p => p.invoiceNo)).size}</div></div>
      </div>
      <div class="charts-grid">
        <div class="chart-card wide">
          <div class="chart-header"><div class="chart-title">This Week — Daily Revenue</div></div>
          <canvas id="chartWeeklyDaily"></canvas>
        </div>
      </div>
    </div>`;

  const labels = Object.keys(dailyMap).sort();
  const data = labels.map(d => dailyMap[d]);
  const ctx = document.getElementById('chartWeeklyDaily');
  if (ctx) {
    chartInstances.weeklyDaily = new Chart(ctx, {
      type: 'bar',
      data: { labels: labels.map(d => formatDate(d)), datasets: [{ label: 'Revenue', data, backgroundColor: 'rgba(16,185,129,0.5)', borderRadius: 8 }] },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#888' }, grid: { display: false } }, y: { ticks: { color: '#888' }, grid: { color: 'rgba(255,255,255,0.03)' } } } }
    });
  }
}

// ══════════════════════════════════════════════════════════════
// MODULE: 14 — Monthly Report
// ══════════════════════════════════════════════════════════════
function renderMonthlyReport(container) {
  const monthStart = startOfMonth();
  const sales = DB.posImport.filter(p => p.date >= monthStart);
  const revenue = sales.reduce((s, p) => s + p.amountSold, 0);
  let cogs = 0;
  sales.forEach(p => {
    const recipe = DB.recipes.filter(r => r.product === p.productName);
    if (recipe.length) cogs += recipe.reduce((s, r) => s + r.qtyRequired * r.cost, 0) * p.qtySold;
    else { const prod = DB.products.find(x => x.name === p.productName); if (prod) cogs += prod.standardCost * p.qtySold; }
  });
  const wasteCost = DB.wastage.filter(w => w.date >= monthStart).reduce((s, w) => s + w.cost * w.quantity, 0);
  const grossProfit = revenue - cogs;
  const foodCostPct = revenue > 0 ? cogs / revenue * 100 : 0;
  const invValue = DB.rawMaterials.reduce((s, m) => s + m.currentStock * m.unitCost, 0);

  // Category sales
  const catSales = {};
  sales.forEach(p => { catSales[p.category] = (catSales[p.category] || 0) + p.amountSold; });
  const topCats = Object.entries(catSales).sort((a,b) => b[1] - a[1]);

  // Top products
  const prodSales = {};
  sales.forEach(p => { prodSales[p.productName] = (prodSales[p.productName] || 0) + p.amountSold; });
  const topProducts = Object.entries(prodSales).sort((a,b) => b[1] - a[1]).slice(0, 10);

  container.innerHTML = `
    <div class="card mb-5">
      <div class="report-header">
        <div><div class="report-title">📈 Monthly Executive Report</div><div class="report-date">${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div></div>
      </div>
      <div class="kpi-grid mb-5">
        <div class="kpi-card green"><div class="kpi-icon green"><i class="fas fa-dollar-sign"></i></div><div class="kpi-label">Revenue</div><div class="kpi-value">${formatCurrency(revenue)}</div></div>
        <div class="kpi-card warm"><div class="kpi-icon warm"><i class="fas fa-receipt"></i></div><div class="kpi-label">COGS</div><div class="kpi-value">${formatCurrency(cogs)}</div></div>
        <div class="kpi-card blue"><div class="kpi-icon blue"><i class="fas fa-chart-line"></i></div><div class="kpi-label">Gross Profit</div><div class="kpi-value">${formatCurrency(grossProfit)}</div></div>
        <div class="kpi-card purple"><div class="kpi-icon purple"><i class="fas fa-percentage"></i></div><div class="kpi-label">Food Cost %</div><div class="kpi-value">${formatPct(foodCostPct)}</div></div>
        <div class="kpi-card warm"><div class="kpi-icon red"><i class="fas fa-trash"></i></div><div class="kpi-label">Waste %</div><div class="kpi-value">${formatPct(revenue > 0 ? wasteCost / revenue * 100 : 0)}</div></div>
        <div class="kpi-card blue"><div class="kpi-icon cyan"><i class="fas fa-warehouse"></i></div><div class="kpi-label">Inventory Value</div><div class="kpi-value">${formatCurrency(invValue)}</div></div>
      </div>
      <div class="report-section">
        <div class="report-section-title"><i class="fas fa-trophy"></i> Top Products</div>
        <div class="table-container"><table class="data-table"><thead><tr><th>#</th><th>Product</th><th>Revenue</th><th>Share</th></tr></thead><tbody>
          ${topProducts.map(([name, amount], i) => `<tr><td>${i+1}</td><td class="font-bold">${name}</td><td class="text-right">${formatCurrency(amount)}</td><td class="text-right">${formatPct(revenue > 0 ? amount / revenue * 100 : 0)}</td></tr>`).join('')}
        </tbody></table></div>
      </div>
      <div class="report-section">
        <div class="report-section-title"><i class="fas fa-layer-group"></i> Category Performance</div>
        <div class="table-container"><table class="data-table"><thead><tr><th>Category</th><th>Revenue</th><th>Share</th></tr></thead><tbody>
          ${topCats.map(([cat, amount]) => `<tr><td class="font-bold">${cat}</td><td class="text-right">${formatCurrency(amount)}</td><td class="text-right">${formatPct(revenue > 0 ? amount / revenue * 100 : 0)}</td></tr>`).join('')}
        </tbody></table></div>
      </div>
    </div>`;
}

// ══════════════════════════════════════════════════════════════
// MODULE: 15 — Dashboard
// ══════════════════════════════════════════════════════════════
function renderDashboard(container) {
  const pos = DB.posImport;
  const todaySales = pos.filter(p => p.date === today()).reduce((s, p) => s + p.amountSold, 0);
  const weekSales = pos.filter(p => p.date >= startOfWeek()).reduce((s, p) => s + p.amountSold, 0);
  const monthSales = pos.filter(p => p.date >= startOfMonth()).reduce((s, p) => s + p.amountSold, 0);
  const totalRevenue = pos.reduce((s, p) => s + p.amountSold, 0);

  // Profit calc
  let totalCOGS = 0;
  pos.forEach(p => {
    const recipe = DB.recipes.filter(r => r.product === p.productName);
    if (recipe.length) totalCOGS += recipe.reduce((s, r) => s + r.qtyRequired * r.cost, 0) * p.qtySold;
    else { const prod = DB.products.find(x => x.name === p.productName); if (prod) totalCOGS += prod.standardCost * p.qtySold; }
  });
  const grossProfit = totalRevenue - totalCOGS;
  const wasteCost = DB.wastage.reduce((s, w) => s + w.cost * w.quantity, 0);
  const netProfit = grossProfit - wasteCost;
  const invValue = DB.rawMaterials.reduce((s, m) => s + m.currentStock * m.unitCost, 0);
  const foodCostPct = totalRevenue > 0 ? totalCOGS / totalRevenue * 100 : 0;
  const wastePct = totalRevenue > 0 ? wasteCost / totalRevenue * 100 : 0;
  const lowStockCount = DB.rawMaterials.filter(m => m.currentStock <= m.minStock).length;

  // Last week comparison
  const lastWeekStart = daysAgo(new Date().getDay() + 7);
  const lastWeekEnd = daysAgo(new Date().getDay() + 1);
  const lastWeekRev = pos.filter(p => p.date >= lastWeekStart && p.date <= lastWeekEnd).reduce((s,p) => s + p.amountSold, 0);
  const weekGrowth = lastWeekRev > 0 ? ((weekSales - lastWeekRev) / lastWeekRev * 100) : 0;

  container.innerHTML = `
    <div class="kpi-grid">
      <div class="kpi-card green"><div class="kpi-icon green"><i class="fas fa-dollar-sign"></i></div><div class="kpi-label">Today's Revenue</div><div class="kpi-value">${formatCurrency(todaySales)}</div></div>
      <div class="kpi-card blue"><div class="kpi-icon blue"><i class="fas fa-chart-line"></i></div><div class="kpi-label">Weekly Revenue</div><div class="kpi-value">${formatCurrency(weekSales)}</div>
        <div class="kpi-change ${weekGrowth >= 0 ? 'up' : 'down'}"><i class="fas fa-arrow-${weekGrowth >= 0 ? 'up' : 'down'}"></i> ${formatPct(Math.abs(weekGrowth))}</div></div>
      <div class="kpi-card purple"><div class="kpi-icon purple"><i class="fas fa-calendar"></i></div><div class="kpi-label">Monthly Revenue</div><div class="kpi-value">${formatCurrency(monthSales)}</div></div>
      <div class="kpi-card green"><div class="kpi-icon green"><i class="fas fa-piggy-bank"></i></div><div class="kpi-label">Gross Profit</div><div class="kpi-value">${formatCurrency(grossProfit)}</div></div>
      <div class="kpi-card blue"><div class="kpi-icon cyan"><i class="fas fa-hand-holding-usd"></i></div><div class="kpi-label">Net Profit</div><div class="kpi-value">${formatCurrency(netProfit)}</div></div>
      <div class="kpi-card purple"><div class="kpi-icon purple"><i class="fas fa-warehouse"></i></div><div class="kpi-label">Inventory Value</div><div class="kpi-value">${formatCurrency(invValue)}</div></div>
      <div class="kpi-card warm"><div class="kpi-icon warm"><i class="fas fa-utensils"></i></div><div class="kpi-label">Food Cost %</div><div class="kpi-value">${formatPct(foodCostPct)}</div></div>
      <div class="kpi-card warm"><div class="kpi-icon red"><i class="fas fa-trash"></i></div><div class="kpi-label">Waste %</div><div class="kpi-value">${formatPct(wastePct)}</div></div>
      <div class="kpi-card ${lowStockCount > 0 ? 'warm' : 'green'}"><div class="kpi-icon ${lowStockCount > 0 ? 'red' : 'green'}"><i class="fas fa-exclamation-triangle"></i></div><div class="kpi-label">Low Stock</div><div class="kpi-value">${lowStockCount}</div></div>
    </div>

    <div class="charts-grid">
      <div class="chart-card wide">
        <div class="chart-header"><div class="chart-title">📈 Daily Sales Trend (Last 30 Days)</div></div>
        <canvas id="dashChartSales"></canvas>
      </div>
      <div class="chart-card">
        <div class="chart-header"><div class="chart-title">🍕 Sales by Category</div></div>
        <canvas id="dashChartCategory"></canvas>
      </div>
      <div class="chart-card">
        <div class="chart-header"><div class="chart-title">🏆 Product Performance</div></div>
        <canvas id="dashChartProducts"></canvas>
      </div>
      <div class="chart-card">
        <div class="chart-header"><div class="chart-title">📦 Inventory Value by Category</div></div>
        <canvas id="dashChartInventory"></canvas>
      </div>
      <div class="chart-card">
        <div class="chart-header"><div class="chart-title">📊 Profit Trend</div></div>
        <canvas id="dashChartProfit"></canvas>
      </div>
    </div>

    ${lowStockCount > 0 ? `
    <div class="card">
      <div class="card-header"><div class="card-title"><i class="fas fa-exclamation-triangle text-warning"></i> Low Stock Alerts</div></div>
      <div class="table-container"><table class="data-table"><thead><tr><th>Material</th><th>Stock</th><th>Minimum</th><th>Status</th><th>Supplier</th></tr></thead><tbody>
        ${DB.rawMaterials.filter(m => m.currentStock <= m.minStock).map(m => {
          const ratio = m.minStock > 0 ? m.currentStock / m.minStock : 0;
          return `<tr class="${ratio <= 0.5 ? 'stock-critical' : 'stock-warning'}">
            <td class="font-bold">${m.name}</td><td class="text-right">${formatNum(m.currentStock, 1)} ${m.unit}</td>
            <td class="text-right text-muted">${formatNum(m.minStock)} ${m.unit}</td>
            <td><span class="status-badge ${ratio <= 0.5 ? 'danger' : 'warning'}">${ratio <= 0.5 ? 'Critical' : 'Low'}</span></td>
            <td>${m.supplier || '—'}</td></tr>`;
        }).join('')}
      </tbody></table></div>
    </div>` : ''}
  `;

  // Render dashboard charts
  renderDashboardCharts();
}

function renderDashboardCharts() {
  const pos = DB.posImport;
  const colors = ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#3b82f6', '#14b8a6'];

  // 1. Daily Sales Line
  const dailyMap = {};
  pos.forEach(p => { dailyMap[p.date] = (dailyMap[p.date] || 0) + p.amountSold; });
  const last30 = [];
  for (let i = 29; i >= 0; i--) last30.push(daysAgo(i));
  const salesData = last30.map(d => dailyMap[d] || 0);
  const ctx1 = document.getElementById('dashChartSales');
  if (ctx1) {
    chartInstances.dashSales = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: last30.map(d => { const dt = new Date(d); return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); }),
        datasets: [{ label: 'Revenue', data: salesData, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.08)', fill: true, tension: 0.4, pointRadius: 1.5, pointBackgroundColor: '#10b981', borderWidth: 2 }]
      },
      options: chartOptions()
    });
  }

  // 2. Category Doughnut
  const catSales = {};
  pos.forEach(p => { catSales[p.category] = (catSales[p.category] || 0) + p.amountSold; });
  const ctx2 = document.getElementById('dashChartCategory');
  if (ctx2) {
    const labels = Object.keys(catSales);
    chartInstances.dashCat = new Chart(ctx2, {
      type: 'doughnut',
      data: { labels, datasets: [{ data: Object.values(catSales), backgroundColor: colors.slice(0, labels.length), borderWidth: 0 }] },
      options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#aaa', padding: 10, font: { size: 11 } } } } }
    });
  }

  // 3. Top Products Bar
  const prodSales = {};
  pos.forEach(p => { prodSales[p.productName] = (prodSales[p.productName] || 0) + p.amountSold; });
  const topProd = Object.entries(prodSales).sort((a,b) => b[1] - a[1]).slice(0, 7);
  const ctx3 = document.getElementById('dashChartProducts');
  if (ctx3) {
    chartInstances.dashProd = new Chart(ctx3, {
      type: 'bar',
      data: { labels: topProd.map(([n]) => n.length > 12 ? n.slice(0,12)+'…' : n), datasets: [{ label: 'Revenue', data: topProd.map(([,v]) => v), backgroundColor: 'rgba(6,182,212,0.5)', borderRadius: 6 }] },
      options: { responsive: true, indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#888' }, grid: { color: 'rgba(255,255,255,0.03)' } }, y: { ticks: { color: '#ccc', font: { size: 11 } }, grid: { display: false } } } }
    });
  }

  // 4. Inventory Value by Category
  const invByCat = {};
  DB.rawMaterials.forEach(m => { invByCat[m.category] = (invByCat[m.category] || 0) + m.currentStock * m.unitCost; });
  const ctx4 = document.getElementById('dashChartInventory');
  if (ctx4) {
    const labels = Object.keys(invByCat);
    chartInstances.dashInv = new Chart(ctx4, {
      type: 'doughnut',
      data: { labels, datasets: [{ data: Object.values(invByCat), backgroundColor: colors.slice(0, labels.length).reverse(), borderWidth: 0 }] },
      options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#aaa', padding: 10, font: { size: 11 } } } } }
    });
  }

  // 5. Profit Trend
  const profitByDay = {};
  pos.forEach(p => {
    if (!profitByDay[p.date]) profitByDay[p.date] = { rev: 0, cost: 0 };
    profitByDay[p.date].rev += p.amountSold;
    const recipe = DB.recipes.filter(r => r.product === p.productName);
    if (recipe.length) profitByDay[p.date].cost += recipe.reduce((s, r) => s + r.qtyRequired * r.cost, 0) * p.qtySold;
    else { const prod = DB.products.find(x => x.name === p.productName); if (prod) profitByDay[p.date].cost += prod.standardCost * p.qtySold; }
  });
  const profitLabels = last30;
  const profitData = profitLabels.map(d => profitByDay[d] ? profitByDay[d].rev - profitByDay[d].cost : 0);
  const ctx5 = document.getElementById('dashChartProfit');
  if (ctx5) {
    chartInstances.dashProfit = new Chart(ctx5, {
      type: 'line',
      data: {
        labels: profitLabels.map(d => { const dt = new Date(d); return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); }),
        datasets: [{ label: 'Profit', data: profitData, borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,0.08)', fill: true, tension: 0.4, pointRadius: 1.5, borderWidth: 2 }]
      },
      options: chartOptions()
    });
  }
}

function chartOptions() {
  return { responsive: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#666', maxTicksLimit: 8, font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.03)' } }, y: { ticks: { color: '#666', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.03)' } } } };
}

// ══════════════════════════════════════════════════════════════
// MODULE: 16 — Low Stock
// ══════════════════════════════════════════════════════════════
function renderLowStock(container) {
  const low = DB.rawMaterials.filter(m => m.currentStock <= m.minStock * 1.5).sort((a, b) => {
    const ra = a.minStock > 0 ? a.currentStock / a.minStock : 999;
    const rb = b.minStock > 0 ? b.currentStock / b.minStock : 999;
    return ra - rb;
  });
  const critical = low.filter(m => m.minStock > 0 && m.currentStock / m.minStock <= 0.5).length;
  const warning = low.filter(m => m.minStock > 0 && m.currentStock / m.minStock > 0.5 && m.currentStock / m.minStock <= 1).length;

  container.innerHTML = `
    <div class="kpi-grid mb-5">
      <div class="kpi-card warm"><div class="kpi-icon red"><i class="fas fa-exclamation-circle"></i></div><div class="kpi-label">Critical</div><div class="kpi-value">${critical}</div></div>
      <div class="kpi-card warm"><div class="kpi-icon warm"><i class="fas fa-exclamation-triangle"></i></div><div class="kpi-label">Low</div><div class="kpi-value">${warning}</div></div>
      <div class="kpi-card blue"><div class="kpi-icon blue"><i class="fas fa-box"></i></div><div class="kpi-label">Near Low</div><div class="kpi-value">${low.length - critical - warning}</div></div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title"><i class="fas fa-exclamation-triangle"></i> Reorder Alerts</div></div>
      ${low.length ? `<div class="table-container"><table class="data-table"><thead><tr>
        <th>Material</th><th>Current Stock</th><th>Minimum</th><th>Reorder Qty</th><th>Status</th><th>Supplier</th><th>Est. Cost</th>
      </tr></thead><tbody>${low.map(m => {
        const ratio = m.minStock > 0 ? m.currentStock / m.minStock : 999;
        const cls = ratio <= 0.5 ? 'stock-critical' : ratio <= 1 ? 'stock-warning' : 'stock-low';
        const badge = ratio <= 0.5 ? 'danger' : ratio <= 1 ? 'warning' : 'info';
        const label = ratio <= 0.5 ? 'CRITICAL' : ratio <= 1 ? 'LOW' : 'Near Low';
        return `<tr class="${cls}">
          <td class="font-bold">${m.name}</td>
          <td class="text-right">${formatNum(m.currentStock, 1)} ${m.unit}</td>
          <td class="text-right">${formatNum(m.minStock)} ${m.unit}</td>
          <td class="text-right font-bold">${formatNum(m.reorderQty)} ${m.unit}</td>
          <td><span class="status-badge ${badge}">${label}</span></td>
          <td>${m.supplier || '—'}</td>
          <td class="text-right">${formatCurrency(m.reorderQty * m.unitCost)}</td>
        </tr>`;
      }).join('')}</tbody></table></div>` : '<div class="empty-state"><i class="fas fa-check-circle"></i><p>All stock levels are healthy! 🎉</p></div>'}
    </div>`;
}

function updateLowStockBadge() {
  const count = DB.rawMaterials.filter(m => m.currentStock <= m.minStock).length;
  const badge = document.getElementById('lowStockBadge');
  if (badge) {
    badge.style.display = count > 0 ? 'inline' : 'none';
    badge.textContent = count;
  }
  const notifBadge = document.getElementById('notifBadge');
  if (notifBadge) {
    notifBadge.style.display = count > 0 ? 'flex' : 'none';
    notifBadge.textContent = count;
  }
}

// ══════════════════════════════════════════════════════════════
// MODULE: 17 — Suppliers
// ══════════════════════════════════════════════════════════════
function renderSuppliers(container) {
  container.innerHTML = `
    <div class="card">
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn btn-primary" onclick="openSupplierForm()"><i class="fas fa-plus"></i> Add Supplier</button>
          <span class="text-muted text-sm">${DB.suppliers.length} suppliers</span>
        </div>
      </div>
      <div class="table-container">${suppliersTable()}</div>
    </div>`;
}

function suppliersTable() {
  if (!DB.suppliers.length) return '<div class="empty-state"><i class="fas fa-handshake"></i><p>No suppliers</p></div>';
  return `<table class="data-table"><thead><tr>
    <th>Supplier</th><th>Contact</th><th>Email</th><th>Phone</th><th>Lead Time</th><th>Products</th><th>Avg Cost</th><th>Rating</th><th>Actions</th>
  </tr></thead><tbody>${DB.suppliers.map(s => `<tr>
    <td class="font-bold">${s.name}</td><td>${s.contact}</td><td>${s.email}</td><td>${s.phone}</td>
    <td>${s.leadTime} days</td><td class="text-muted text-sm truncate">${s.productsSupplied}</td>
    <td class="text-right">${formatCurrency(s.avgCost)}</td>
    <td>${'⭐'.repeat(s.rating || 0)}</td>
    <td><div class="table-actions">
      <button class="action-btn edit" onclick="openSupplierForm('${s.id}')"><i class="fas fa-pen"></i></button>
      <button class="action-btn delete" onclick="deleteRecord('suppliers','${s.id}','Supplier')"><i class="fas fa-trash"></i></button>
    </div></td>
  </tr>`).join('')}</tbody></table>`;
}

function openSupplierForm(id) {
  const s = id ? DB.suppliers.find(x => x.id === id) : null;
  editingId = id || null;
  openModal(s ? 'Edit Supplier' : 'Add Supplier', `
    <div class="form-grid">
      <div class="form-group"><label class="form-label">Supplier Name</label><input class="form-input" id="f-name" value="${s ? s.name : ''}"></div>
      <div class="form-group"><label class="form-label">Contact Person</label><input class="form-input" id="f-contact" value="${s ? s.contact : ''}"></div>
      <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" id="f-email" value="${s ? s.email : ''}"></div>
      <div class="form-group"><label class="form-label">Phone</label><input class="form-input" id="f-phone" value="${s ? s.phone : ''}"></div>
      <div class="form-group"><label class="form-label">Lead Time (days)</label><input class="form-input" type="number" id="f-lead" value="${s ? s.leadTime : '3'}"></div>
      <div class="form-group"><label class="form-label">Products Supplied</label><input class="form-input" id="f-products" value="${s ? s.productsSupplied : ''}"></div>
      <div class="form-group"><label class="form-label">Avg Cost</label><input class="form-input" type="number" id="f-avgcost" value="${s ? s.avgCost : '0'}" step="0.01"></div>
      <div class="form-group"><label class="form-label">Rating (1-5)</label><input class="form-input" type="number" id="f-rating" value="${s ? s.rating : '4'}" min="1" max="5"></div>
    </div>
  `, () => {
    const record = {
      id: editingId || genId(),
      name: document.getElementById('f-name').value || 'Unnamed',
      contact: document.getElementById('f-contact').value,
      email: document.getElementById('f-email').value,
      phone: document.getElementById('f-phone').value,
      leadTime: parseInt(document.getElementById('f-lead').value) || 3,
      productsSupplied: document.getElementById('f-products').value,
      avgCost: parseFloat(document.getElementById('f-avgcost').value) || 0,
      rating: Math.min(5, Math.max(1, parseInt(document.getElementById('f-rating').value) || 4))
    };
    if (editingId) { const idx = DB.suppliers.findIndex(x => x.id === editingId); if (idx >= 0) DB.suppliers[idx] = record; }
    else DB.suppliers.push(record);
    saveDB(); closeModal(); renderModule('suppliers'); toast(editingId ? 'Supplier updated' : 'Supplier added');
  });
}

// ══════════════════════════════════════════════════════════════
// MODULE: 18 — Employees
// ══════════════════════════════════════════════════════════════
function renderEmployees(container) {
  container.innerHTML = `
    <div class="card">
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn btn-primary" onclick="openEmployeeForm()"><i class="fas fa-plus"></i> Add Employee</button>
          <span class="text-muted text-sm">${DB.employees.length} employees</span>
        </div>
      </div>
      <div class="table-container">${employeesTable()}</div>
    </div>`;
}

function employeesTable() {
  if (!DB.employees.length) return '<div class="empty-state"><i class="fas fa-users"></i><p>No employees</p></div>';
  return `<table class="data-table"><thead><tr>
    <th>Employee</th><th>Position</th><th>Sales</th><th>Waste Count</th><th>Production</th><th>Performance</th><th>Actions</th>
  </tr></thead><tbody>${DB.employees.map(e => {
    const empWaste = DB.wastage.filter(w => w.employee === e.name).length;
    const empProd = DB.production.filter(p => p.notes && p.notes.includes(e.name)).length;
    return `<tr>
      <td class="font-bold">${e.name}</td>
      <td><span class="status-badge purple">${e.position}</span></td>
      <td class="text-right">${formatCurrency(e.sales || 0)}</td>
      <td class="text-right">${empWaste}</td>
      <td class="text-right">${empProd}</td>
      <td>${'⭐'.repeat(e.performance || 3)}</td>
      <td><div class="table-actions">
        <button class="action-btn edit" onclick="openEmployeeForm('${e.id}')"><i class="fas fa-pen"></i></button>
        <button class="action-btn delete" onclick="deleteRecord('employees','${e.id}','Employee')"><i class="fas fa-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('')}</tbody></table>`;
}

function openEmployeeForm(id) {
  const e = id ? DB.employees.find(x => x.id === id) : null;
  editingId = id || null;
  openModal(e ? 'Edit Employee' : 'Add Employee', `
    <div class="form-grid">
      <div class="form-group"><label class="form-label">Name</label><input class="form-input" id="f-name" value="${e ? e.name : ''}"></div>
      <div class="form-group"><label class="form-label">Position</label>
        <select class="form-select" id="f-position">${['Manager','Chef','Sous Chef','Line Cook','Cashier','Server','Kitchen Staff','Barista','Delivery'].map(p => `<option ${e && e.position === p ? 'selected' : ''}>${p}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Performance (1-5)</label><input class="form-input" type="number" id="f-perf" value="${e ? e.performance : '4'}" min="1" max="5"></div>
    </div>
  `, () => {
    const record = {
      id: editingId || genId(),
      name: document.getElementById('f-name').value || 'Unnamed',
      position: document.getElementById('f-position').value,
      sales: 0,
      performance: Math.min(5, Math.max(1, parseInt(document.getElementById('f-perf').value) || 4))
    };
    if (editingId) { const idx = DB.employees.findIndex(x => x.id === editingId); if (idx >= 0) { record.sales = DB.employees[idx].sales; DB.employees[idx] = record; } }
    else DB.employees.push(record);
    saveDB(); closeModal(); renderModule('employees'); toast(editingId ? 'Employee updated' : 'Employee added');
  });
}

// ══════════════════════════════════════════════════════════════
// MODULE: 19 — Audit Log
// ══════════════════════════════════════════════════════════════
function renderAuditLog(container) {
  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div class="card-title"><i class="fas fa-clipboard-list"></i> Activity Log (${DB.auditLog.length} entries)</div>
        <button class="btn btn-sm btn-danger" onclick="clearAuditLog()"><i class="fas fa-trash"></i> Clear</button>
      </div>
      <div class="table-container" style="max-height:600px;overflow-y:auto">
        ${DB.auditLog.length ? `<table class="data-table"><thead><tr>
          <th>Timestamp</th><th>Action</th><th>Details</th><th>User</th>
        </tr></thead><tbody>${DB.auditLog.slice(0, 200).map(a => `<tr>
          <td class="font-mono text-muted text-sm">${new Date(a.date).toLocaleString()}</td>
          <td><span class="status-badge info">${a.action}</span></td>
          <td>${a.details}</td>
          <td>${a.user}</td>
        </tr>`).join('')}</tbody></table>` : '<div class="empty-state"><i class="fas fa-clipboard-check"></i><p>No activity logged yet</p></div>'}
      </div>
    </div>`;
}

function clearAuditLog() {
  openModal('Clear Audit Log', '<div class="confirm-dialog"><i class="fas fa-trash"></i><h3>Clear audit log?</h3></div>', () => {
    DB.auditLog = []; saveDB(); closeModal(); renderModule('audit-log'); toast('Audit log cleared');
  }, '<button class="btn" onclick="closeModal()">Cancel</button><button class="btn btn-danger" onclick="saveModal()">Clear</button>');
}

// ══════════════════════════════════════════════════════════════
// SHARED: Delete Record
// ══════════════════════════════════════════════════════════════
function deleteRecord(collection, id, label) {
  openModal(`Delete ${label}`, `<div class="confirm-dialog"><i class="fas fa-trash"></i><h3>Delete this ${label.toLowerCase()}?</h3><p>This action cannot be undone.</p></div>`, () => {
    DB[collection] = DB[collection].filter(x => x.id !== id);
    saveDB(); closeModal(); renderModule(currentModule);
    addAudit(`${label} Deleted`, `ID: ${id.slice(0,8)}`);
    toast(`${label} deleted`);
  }, `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn btn-danger" onclick="saveModal()"><i class="fas fa-trash"></i> Delete</button>`);
}

// ══════════════════════════════════════════════════════════════
// SHARED: Category Filter
// ══════════════════════════════════════════════════════════════
function renderCategoryFilter(containerId, data, field, onChange) {
  const cats = [...new Set(data.map(d => d[field]))].filter(Boolean);
  const container = document.getElementById(containerId);
  if (!container || !cats.length) return;
  container.innerHTML = `<button class="filter-pill active" onclick="filterCategory(this, 'All')">All</button>` +
    cats.map(c => `<button class="filter-pill" onclick="filterCategory(this, '${c}')">${c}</button>`).join('');
}

function filterCategory(btn, category) {
  btn.parentElement.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  // For now, just re-render. A more sophisticated implementation would filter in-place.
}

// ══════════════════════════════════════════════════════════════
// SHARED: Export
// ══════════════════════════════════════════════════════════════
function exportCurrentModule() {
  const collections = {
    'products': { data: DB.products, name: 'products' },
    'recipes': { data: DB.recipes, name: 'recipes' },
    'raw-materials': { data: DB.rawMaterials, name: 'raw_materials' },
    'purchases': { data: DB.purchases, name: 'purchases' },
    'stock-adj': { data: DB.stockAdjustments, name: 'stock_adjustments' },
    'wastage': { data: DB.wastage, name: 'wastage' },
    'production': { data: DB.production, name: 'production' },
    'inv-ledger': { data: DB.inventoryLedger, name: 'inventory_ledger' },
    'pos-import': { data: DB.posImport, name: 'pos_import' },
    'suppliers': { data: DB.suppliers, name: 'suppliers' },
    'employees': { data: DB.employees, name: 'employees' },
    'audit-log': { data: DB.auditLog, name: 'audit_log' }
  };
  const cfg = collections[currentModule];
  if (!cfg || !cfg.data.length) return toast('Nothing to export', 'warning');
  // Convert to CSV
  const headers = Object.keys(cfg.data[0]);
  const csv = [headers.join(','), ...cfg.data.map(row => headers.map(h => {
    let val = row[h];
    if (typeof val === 'object') val = JSON.stringify(val);
    if (typeof val === 'string' && val.includes(',')) val = `"${val}"`;
    return val;
  }).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `${cfg.name}_${today()}.csv`; a.click();
  URL.revokeObjectURL(url);
  toast(`${cfg.name} exported as CSV`);
}

// ══════════════════════════════════════════════════════════════
// SHARED: Search
// ══════════════════════════════════════════════════════════════
function handleGlobalSearch(query) {
  // Simple highlight — for now just filter visible table rows
  if (!query) {
    document.querySelectorAll('.data-table tbody tr').forEach(tr => tr.style.display = '');
    return;
  }
  const q = query.toLowerCase();
  document.querySelectorAll('.data-table tbody tr').forEach(tr => {
    tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

// ══════════════════════════════════════════════════════════════
// SHARED: Notifications
// ══════════════════════════════════════════════════════════════
function showNotifications() {
  const low = DB.rawMaterials.filter(m => m.currentStock <= m.minStock);
  const expiring = DB.rawMaterials.filter(m => m.expiryDate && new Date(m.expiryDate) <= new Date(Date.now() + 7 * 86400000));
  let html = '<div style="max-height:400px;overflow-y:auto">';
  if (low.length) {
    html += `<div class="report-section-title"><i class="fas fa-exclamation-triangle text-warning"></i> Low Stock (${low.length})</div>`;
    low.forEach(m => { html += `<div style="padding:8px 0;border-bottom:1px solid var(--border)"><span class="font-bold">${m.name}</span> — ${formatNum(m.currentStock,1)} ${m.unit} (min: ${m.minStock})</div>`; });
  }
  if (expiring.length) {
    html += `<div class="report-section-title mt-4"><i class="fas fa-clock text-danger"></i> Expiring Soon (${expiring.length})</div>`;
    expiring.forEach(m => { html += `<div style="padding:8px 0;border-bottom:1px solid var(--border)"><span class="font-bold">${m.name}</span> — Expires: ${formatDate(m.expiryDate)}</div>`; });
  }
  if (!low.length && !expiring.length) html += '<div class="empty-state"><i class="fas fa-check-circle"></i><p>No alerts</p></div>';
  html += '</div>';
  openModal('Notifications', html, null, '<button class="btn btn-primary" onclick="closeModal()">OK</button>');
}

// ══════════════════════════════════════════════════════════════
// SAMPLE DATA GENERATOR
// ══════════════════════════════════════════════════════════════
function loadSampleData() {
  // Suppliers
  DB.suppliers = [
    { id: genId(), name: 'FreshMart Supply', contact: 'Juan Reyes', email: 'juan@freshmart.ph', phone: '+63 917 111 2222', leadTime: 2, productsSupplied: 'Produce, Dairy, Meat', avgCost: 250, rating: 5 },
    { id: genId(), name: 'Metro Foods Inc.', contact: 'Maria Santos', email: 'maria@metrofoods.ph', phone: '+63 918 333 4444', leadTime: 3, productsSupplied: 'Dry Goods, Condiments, Packaging', avgCost: 180, rating: 4 },
    { id: genId(), name: 'Pacific Beverages', contact: 'Carlos Tan', email: 'carlos@pacificbev.ph', phone: '+63 919 555 6666', leadTime: 1, productsSupplied: 'Beverages, Juices, Syrups', avgCost: 120, rating: 4 },
    { id: genId(), name: 'Island Meats Co.', contact: 'Rosa Lim', email: 'rosa@islandmeats.ph', phone: '+63 920 777 8888', leadTime: 2, productsSupplied: 'Beef, Chicken, Pork, Seafood', avgCost: 380, rating: 5 }
  ];

  // Employees
  DB.employees = [
    { id: genId(), name: 'Chef Antonio', position: 'Chef', sales: 0, performance: 5 },
    { id: genId(), name: 'Maria Garcia', position: 'Sous Chef', sales: 0, performance: 4 },
    { id: genId(), name: 'Diego Cruz', position: 'Line Cook', sales: 0, performance: 4 },
    { id: genId(), name: 'Ana Reyes', position: 'Cashier', sales: 45000, performance: 5 },
    { id: genId(), name: 'Marco Tan', position: 'Server', sales: 38000, performance: 4 },
    { id: genId(), name: 'Sofia Santos', position: 'Barista', sales: 22000, performance: 4 },
    { id: genId(), name: 'Luis Rivera', position: 'Kitchen Staff', sales: 0, performance: 3 },
    { id: genId(), name: 'Bella Lim', position: 'Manager', sales: 0, performance: 5 }
  ];

  // Products
  DB.products = [
    { id: genId(), name: 'Classic Burger', category: 'Burgers', isMenuItem: true, unit: 'pcs', sellingPrice: 185, standardCost: 72, taxRate: 12, status: 'Active' },
    { id: genId(), name: 'Cheese Burger', category: 'Burgers', isMenuItem: true, unit: 'pcs', sellingPrice: 210, standardCost: 85, taxRate: 12, status: 'Active' },
    { id: genId(), name: 'Bacon Burger', category: 'Burgers', isMenuItem: true, unit: 'pcs', sellingPrice: 245, standardCost: 98, taxRate: 12, status: 'Active' },
    { id: genId(), name: 'Margherita Pizza', category: 'Pizza', isMenuItem: true, unit: 'pcs', sellingPrice: 320, standardCost: 110, taxRate: 12, status: 'Active' },
    { id: genId(), name: 'Pepperoni Pizza', category: 'Pizza', isMenuItem: true, unit: 'pcs', sellingPrice: 365, standardCost: 135, taxRate: 12, status: 'Active' },
    { id: genId(), name: 'Hawaiian Pizza', category: 'Pizza', isMenuItem: true, unit: 'pcs', sellingPrice: 345, standardCost: 125, taxRate: 12, status: 'Active' },
    { id: genId(), name: 'Caesar Salad', category: 'Salads', isMenuItem: true, unit: 'serving', sellingPrice: 175, standardCost: 55, taxRate: 12, status: 'Active' },
    { id: genId(), name: 'Garden Salad', category: 'Salads', isMenuItem: true, unit: 'serving', sellingPrice: 145, standardCost: 42, taxRate: 12, status: 'Active' },
    { id: genId(), name: 'French Fries', category: 'Sides', isMenuItem: true, unit: 'serving', sellingPrice: 95, standardCost: 28, taxRate: 12, status: 'Active' },
    { id: genId(), name: 'Onion Rings', category: 'Sides', isMenuItem: true, unit: 'serving', sellingPrice: 115, standardCost: 35, taxRate: 12, status: 'Active' },
    { id: genId(), name: 'Chicken Wings', category: 'Sides', isMenuItem: true, unit: 'serving', sellingPrice: 195, standardCost: 78, taxRate: 12, status: 'Active' },
    { id: genId(), name: 'Iced Tea', category: 'Beverages', isMenuItem: true, unit: 'cup', sellingPrice: 65, standardCost: 12, taxRate: 12, status: 'Active' },
    { id: genId(), name: 'Soda', category: 'Beverages', isMenuItem: true, unit: 'bottle', sellingPrice: 55, standardCost: 18, taxRate: 12, status: 'Active' },
    { id: genId(), name: 'Fresh Juice', category: 'Beverages', isMenuItem: true, unit: 'cup', sellingPrice: 95, standardCost: 30, taxRate: 12, status: 'Active' },
    { id: genId(), name: 'Chocolate Cake', category: 'Desserts', isMenuItem: true, unit: 'slice', sellingPrice: 155, standardCost: 48, taxRate: 12, status: 'Active' },
    { id: genId(), name: 'Cheesecake', category: 'Desserts', isMenuItem: true, unit: 'slice', sellingPrice: 175, standardCost: 55, taxRate: 12, status: 'Active' }
  ];

  // Raw Materials
  const supNames = DB.suppliers.map(s => s.name);
  DB.rawMaterials = [
    { id: genId(), name: 'Burger Bun', category: 'Bakery', unit: 'pcs', currentStock: 120, minStock: 50, reorderQty: 200, unitCost: 12, supplier: supNames[0], batchNumber: 'BK-001', expiryDate: daysAgo(-5), shelfLife: 5 },
    { id: genId(), name: 'Beef Patty', category: 'Meat', unit: 'pcs', currentStock: 80, minStock: 40, reorderQty: 150, unitCost: 35, supplier: supNames[3], batchNumber: 'MT-001', expiryDate: daysAgo(-3), shelfLife: 7 },
    { id: genId(), name: 'Cheddar Cheese', category: 'Dairy', unit: 'kg', currentStock: 8, minStock: 5, reorderQty: 20, unitCost: 280, supplier: supNames[0], batchNumber: 'DY-001', expiryDate: daysAgo(-14), shelfLife: 30 },
    { id: genId(), name: 'Lettuce', category: 'Produce', unit: 'kg', currentStock: 6, minStock: 3, reorderQty: 15, unitCost: 85, supplier: supNames[0], batchNumber: 'PR-001', expiryDate: daysAgo(-3), shelfLife: 5 },
    { id: genId(), name: 'Tomato', category: 'Produce', unit: 'kg', currentStock: 10, minStock: 5, reorderQty: 20, unitCost: 65, supplier: supNames[0], batchNumber: 'PR-002', expiryDate: daysAgo(-4), shelfLife: 7 },
    { id: genId(), name: 'Bacon', category: 'Meat', unit: 'kg', currentStock: 5, minStock: 3, reorderQty: 15, unitCost: 420, supplier: supNames[3], batchNumber: 'MT-002', expiryDate: daysAgo(-7), shelfLife: 14 },
    { id: genId(), name: 'Pizza Dough', category: 'Bakery', unit: 'pcs', currentStock: 35, minStock: 20, reorderQty: 80, unitCost: 25, supplier: supNames[0], batchNumber: 'BK-002', expiryDate: daysAgo(-2), shelfLife: 3 },
    { id: genId(), name: 'Mozzarella', category: 'Dairy', unit: 'kg', currentStock: 7, minStock: 4, reorderQty: 15, unitCost: 320, supplier: supNames[0], batchNumber: 'DY-002', expiryDate: daysAgo(-10), shelfLife: 21 },
    { id: genId(), name: 'Pepperoni', category: 'Meat', unit: 'kg', currentStock: 4, minStock: 3, reorderQty: 10, unitCost: 380, supplier: supNames[3], batchNumber: 'MT-003', expiryDate: daysAgo(-14), shelfLife: 30 },
    { id: genId(), name: 'Pizza Sauce', category: 'Condiments', unit: 'L', currentStock: 8, minStock: 4, reorderQty: 15, unitCost: 95, supplier: supNames[1], batchNumber: 'CD-001', expiryDate: daysAgo(-30), shelfLife: 60 },
    { id: genId(), name: 'French Fries (Frozen)', category: 'Frozen', unit: 'kg', currentStock: 25, minStock: 10, reorderQty: 50, unitCost: 110, supplier: supNames[1], batchNumber: 'FZ-001', expiryDate: daysAgo(-60), shelfLife: 90 },
    { id: genId(), name: 'Chicken Wings (Raw)', category: 'Meat', unit: 'kg', currentStock: 12, minStock: 6, reorderQty: 25, unitCost: 240, supplier: supNames[3], batchNumber: 'MT-004', expiryDate: daysAgo(-5), shelfLife: 7 },
    { id: genId(), name: 'Romaine Lettuce', category: 'Produce', unit: 'kg', currentStock: 4, minStock: 3, reorderQty: 10, unitCost: 95, supplier: supNames[0], batchNumber: 'PR-003', expiryDate: daysAgo(-3), shelfLife: 5 },
    { id: genId(), name: 'Parmesan', category: 'Dairy', unit: 'kg', currentStock: 2.5, minStock: 2, reorderQty: 5, unitCost: 580, supplier: supNames[0], batchNumber: 'DY-003', expiryDate: daysAgo(-30), shelfLife: 60 },
    { id: genId(), name: 'Croutons', category: 'Dry Goods', unit: 'kg', currentStock: 3, minStock: 2, reorderQty: 8, unitCost: 120, supplier: supNames[1], batchNumber: 'DG-001', expiryDate: daysAgo(-60), shelfLife: 90 },
    { id: genId(), name: 'Onion', category: 'Produce', unit: 'kg', currentStock: 8, minStock: 4, reorderQty: 15, unitCost: 55, supplier: supNames[0], batchNumber: 'PR-004', expiryDate: daysAgo(-7), shelfLife: 14 },
    { id: genId(), name: 'Cooking Oil', category: 'Condiments', unit: 'L', currentStock: 15, minStock: 8, reorderQty: 30, unitCost: 85, supplier: supNames[1], batchNumber: 'CD-002', expiryDate: daysAgo(-180), shelfLife: 365 },
    { id: genId(), name: 'Burger Sauce', category: 'Condiments', unit: 'L', currentStock: 5, minStock: 3, reorderQty: 10, unitCost: 110, supplier: supNames[1], batchNumber: 'CD-003', expiryDate: daysAgo(-30), shelfLife: 90 },
    { id: genId(), name: 'Pineapple (Canned)', category: 'Dry Goods', unit: 'can', currentStock: 15, minStock: 8, reorderQty: 30, unitCost: 65, supplier: supNames[1], batchNumber: 'DG-002', expiryDate: daysAgo(-180), shelfLife: 365 },
    { id: genId(), name: 'Ham', category: 'Meat', unit: 'kg', currentStock: 4, minStock: 3, reorderQty: 10, unitCost: 350, supplier: supNames[3], batchNumber: 'MT-005', expiryDate: daysAgo(-7), shelfLife: 14 },
    { id: genId(), name: 'Tea Leaves', category: 'Beverages', unit: 'kg', currentStock: 2, minStock: 1, reorderQty: 5, unitCost: 250, supplier: supNames[2], batchNumber: 'BV-001', expiryDate: daysAgo(-90), shelfLife: 180 },
    { id: genId(), name: 'Sugar', category: 'Dry Goods', unit: 'kg', currentStock: 10, minStock: 5, reorderQty: 25, unitCost: 55, supplier: supNames[1], batchNumber: 'DG-003', expiryDate: daysAgo(-365), shelfLife: 730 },
    { id: genId(), name: 'Chocolate (Baking)', category: 'Bakery', unit: 'kg', currentStock: 3, minStock: 2, reorderQty: 8, unitCost: 380, supplier: supNames[1], batchNumber: 'BK-003', expiryDate: daysAgo(-60), shelfLife: 180 },
    { id: genId(), name: 'Cream Cheese', category: 'Dairy', unit: 'kg', currentStock: 2, minStock: 2, reorderQty: 5, unitCost: 350, supplier: supNames[0], batchNumber: 'DY-004', expiryDate: daysAgo(-10), shelfLife: 21 },
    { id: genId(), name: 'Soda Syrup', category: 'Beverages', unit: 'L', currentStock: 8, minStock: 4, reorderQty: 15, unitCost: 95, supplier: supNames[2], batchNumber: 'BV-002', expiryDate: daysAgo(-30), shelfLife: 60 }
  ];

  // Recipes (BOM)
  const findProduct = name => DB.products.find(p => p.name === name);
  DB.recipes = [
    // Classic Burger
    { id: genId(), product: 'Classic Burger', ingredient: 'Burger Bun', qtyRequired: 1, unit: 'pcs', cost: 12, version: '1', effectiveDate: today() },
    { id: genId(), product: 'Classic Burger', ingredient: 'Beef Patty', qtyRequired: 1, unit: 'pcs', cost: 35, version: '1', effectiveDate: today() },
    { id: genId(), product: 'Classic Burger', ingredient: 'Lettuce', qtyRequired: 0.03, unit: 'kg', cost: 85, version: '1', effectiveDate: today() },
    { id: genId(), product: 'Classic Burger', ingredient: 'Tomato', qtyRequired: 0.05, unit: 'kg', cost: 65, version: '1', effectiveDate: today() },
    { id: genId(), product: 'Classic Burger', ingredient: 'Burger Sauce', qtyRequired: 0.02, unit: 'L', cost: 110, version: '1', effectiveDate: today() },
    // Cheese Burger
    { id: genId(), product: 'Cheese Burger', ingredient: 'Burger Bun', qtyRequired: 1, unit: 'pcs', cost: 12, version: '1', effectiveDate: today() },
    { id: genId(), product: 'Cheese Burger', ingredient: 'Beef Patty', qtyRequired: 1, unit: 'pcs', cost: 35, version: '1', effectiveDate: today() },
    { id: genId(), product: 'Cheese Burger', ingredient: 'Cheddar Cheese', qtyRequired: 0.04, unit: 'kg', cost: 280, version: '1', effectiveDate: today() },
    { id: genId(), product: 'Cheese Burger', ingredient: 'Lettuce', qtyRequired: 0.03, unit: 'kg', cost: 85, version: '1', effectiveDate: today() },
    { id: genId(), product: 'Cheese Burger', ingredient: 'Burger Sauce', qtyRequired: 0.02, unit: 'L', cost: 110, version: '1', effectiveDate: today() },
    // Margherita Pizza
    { id: genId(), product: 'Margherita Pizza', ingredient: 'Pizza Dough', qtyRequired: 1, unit: 'pcs', cost: 25, version: '1', effectiveDate: today() },
    { id: genId(), product: 'Margherita Pizza', ingredient: 'Pizza Sauce', qtyRequired: 0.1, unit: 'L', cost: 95, version: '1', effectiveDate: today() },
    { id: genId(), product: 'Margherita Pizza', ingredient: 'Mozzarella', qtyRequired: 0.15, unit: 'kg', cost: 320, version: '1', effectiveDate: today() },
    { id: genId(), product: 'Margherita Pizza', ingredient: 'Tomato', qtyRequired: 0.1, unit: 'kg', cost: 65, version: '1', effectiveDate: today() },
    // Pepperoni Pizza
    { id: genId(), product: 'Pepperoni Pizza', ingredient: 'Pizza Dough', qtyRequired: 1, unit: 'pcs', cost: 25, version: '1', effectiveDate: today() },
    { id: genId(), product: 'Pepperoni Pizza', ingredient: 'Pizza Sauce', qtyRequired: 0.1, unit: 'L', cost: 95, version: '1', effectiveDate: today() },
    { id: genId(), product: 'Pepperoni Pizza', ingredient: 'Mozzarella', qtyRequired: 0.15, unit: 'kg', cost: 320, version: '1', effectiveDate: today() },
    { id: genId(), product: 'Pepperoni Pizza', ingredient: 'Pepperoni', qtyRequired: 0.08, unit: 'kg', cost: 380, version: '1', effectiveDate: today() },
    // Caesar Salad
    { id: genId(), product: 'Caesar Salad', ingredient: 'Romaine Lettuce', qtyRequired: 0.15, unit: 'kg', cost: 95, version: '1', effectiveDate: today() },
    { id: genId(), product: 'Caesar Salad', ingredient: 'Parmesan', qtyRequired: 0.03, unit: 'kg', cost: 580, version: '1', effectiveDate: today() },
    { id: genId(), product: 'Caesar Salad', ingredient: 'Croutons', qtyRequired: 0.03, unit: 'kg', cost: 120, version: '1', effectiveDate: today() },
    // French Fries
    { id: genId(), product: 'French Fries', ingredient: 'French Fries (Frozen)', qtyRequired: 0.2, unit: 'kg', cost: 110, version: '1', effectiveDate: today() },
    { id: genId(), product: 'French Fries', ingredient: 'Cooking Oil', qtyRequired: 0.05, unit: 'L', cost: 85, version: '1', effectiveDate: today() },
    // Chicken Wings
    { id: genId(), product: 'Chicken Wings', ingredient: 'Chicken Wings (Raw)', qtyRequired: 0.25, unit: 'kg', cost: 240, version: '1', effectiveDate: today() },
    { id: genId(), product: 'Chicken Wings', ingredient: 'Cooking Oil', qtyRequired: 0.05, unit: 'L', cost: 85, version: '1', effectiveDate: today() }
  ];

  // POS Import (30 days of realistic data)
  DB.posImport = [];
  const menuProducts = DB.products.filter(p => p.isMenuItem);
  let invCounter = 1000;
  for (let d = 30; d >= 0; d--) {
    const date = daysAgo(d);
    const dayOfWeek = new Date(date).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const txCount = isWeekend ? 15 + Math.floor(Math.random() * 12) : 8 + Math.floor(Math.random() * 10);
    for (let t = 0; t < txCount; t++) {
      const itemsInTx = 1 + Math.floor(Math.random() * 3);
      const invoiceNo = 'INV-' + (invCounter++);
      for (let i = 0; i < itemsInTx; i++) {
        const p = menuProducts[Math.floor(Math.random() * menuProducts.length)];
        const qty = 1 + Math.floor(Math.random() * 3);
        DB.posImport.push({
          id: genId(), date, invoiceNo, productName: p.name, category: p.category,
          qtySold: qty, sellingPrice: p.sellingPrice, amountSold: qty * p.sellingPrice
        });
      }
    }
  }

  // Purchases (some history)
  DB.purchases = [];
  for (let d = 25; d >= 0; d -= 3) {
    const date = daysAgo(d);
    const mats = DB.rawMaterials.sort(() => Math.random() - 0.5).slice(0, 3 + Math.floor(Math.random() * 4));
    mats.forEach(m => {
      const qty = m.reorderQty * (0.5 + Math.random() * 0.5);
      DB.purchases.push({
        id: genId(), date, supplier: m.supplier || supNames[0], poNumber: 'PO-' + (100 + Math.floor(Math.random() * 900)),
        invoiceNumber: 'SI-' + (1000 + Math.floor(Math.random() * 9000)), material: m.name,
        quantity: Math.round(qty * 10) / 10, unitCost: m.unitCost, totalCost: Math.round(qty * m.unitCost * 10) / 10, receivedBy: 'Admin'
      });
    });
  }

  // Wastage
  const wasteReasons = ['Burned', 'Spoiled', 'Expired', 'Preparation Error', 'Staff Meal'];
  DB.wastage = [];
  for (let d = 20; d >= 0; d -= 2) {
    const date = daysAgo(d);
    const mat = DB.rawMaterials[Math.floor(Math.random() * DB.rawMaterials.length)];
    const qty = Math.round((0.5 + Math.random() * 2) * 10) / 10;
    DB.wastage.push({
      id: genId(), date, ingredient: mat.name, quantity: qty, cost: mat.unitCost,
      reason: wasteReasons[Math.floor(Math.random() * wasteReasons.length)],
      employee: DB.employees[Math.floor(Math.random() * DB.employees.length)].name
    });
  }

  // Stock Adjustments
  DB.stockAdjustments = [
    { id: genId(), date: daysAgo(15), item: DB.rawMaterials[0].name, quantity: -5, reason: 'Physical Count', approvedBy: 'Bella Lim' },
    { id: genId(), date: daysAgo(10), item: DB.rawMaterials[3].name, quantity: -2, reason: 'Expired', approvedBy: 'Bella Lim' },
    { id: genId(), date: daysAgo(5), item: DB.rawMaterials[6].name, quantity: 10, reason: 'Correction', approvedBy: 'Bella Lim' }
  ];

  // Inventory Ledger entries
  DB.inventoryLedger = [];
  // Add opening balances
  DB.rawMaterials.forEach(m => {
    DB.inventoryLedger.push({
      id: genId(), date: daysAgo(30), item: m.name, movementType: 'Opening Balance',
      qtyIn: m.currentStock, qtyOut: 0, balance: m.currentStock, reference: 'Initial stock'
    });
  });

  // Audit log
  DB.auditLog = [
    { id: genId(), date: new Date().toISOString(), action: 'System Initialized', details: 'Sample data loaded', user: 'System' }
  ];

  saveDB();
}

// ══════════════════════════════════════════════════════════════
// INITIALIZATION & AUTHENTICATION
// ══════════════════════════════════════════════════════════════
function handleLogin() {
  const user = document.getElementById('loginUsername').value.trim();
  const pass = document.getElementById('loginPassword').value.trim();
  
  if (!user || !pass) return toast('Please enter username and password', 'warning');

  const authUser = DB.users.find(u => u.username === user && u.password === pass);
  
  if (authUser) {
    currentUser = authUser;
    sessionStorage.setItem('restaurantERPSession', JSON.stringify(authUser));
    document.getElementById('loginOverlay').style.display = 'none';
    document.getElementById('appLayout').style.display = 'flex';
    addAudit('User Login', `User ${authUser.username} logged in`);
    applyRolePermissions();
    switchModule('dashboard');
    toast(`Welcome back, ${authUser.name}`);
  } else {
    toast('Invalid username or password', 'error');
  }
}

function applyRolePermissions() {
  if (!currentUser || currentUser.role === 'Admin') return;
  const allowed = ROLES[currentUser.role] || [];
  document.querySelectorAll('.nav-item').forEach(btn => {
    const mod = btn.dataset.module;
    if (allowed.includes(mod)) {
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none';
    }
  });
}

function logout() {
  addAudit('User Logout', `User ${currentUser.username} logged out`);
  currentUser = null;
  sessionStorage.removeItem('restaurantERPSession');
  location.reload();
}

function init() {
  loadDB();
  
  // Seed default admin if no users exist
  if (!DB.users || DB.users.length === 0) {
    DB.users = [{
      id: genId(), username: 'admin', password: '123', role: 'Admin', name: 'System Admin'
    }, {
      id: genId(), username: 'cashier', password: '123', role: 'Cashier', name: 'Front Desk'
    }];
    saveDB();
  }

  // If no data, load sample data
  if (!DB.products.length && !DB.posImport.length) {
    loadSampleData();
    toast('Welcome! Sample data loaded for demonstration', 'info');
  }
  
  // Check session
  const session = sessionStorage.getItem('restaurantERPSession');
  if (session) {
    currentUser = JSON.parse(session);
    document.getElementById('loginOverlay').style.display = 'none';
    document.getElementById('appLayout').style.display = 'flex';
    applyRolePermissions();
    switchModule('dashboard');
  } else {
    // Show login overlay (default state in HTML)
  }
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
