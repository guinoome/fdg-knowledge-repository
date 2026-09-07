// State
const state = {
  inventory: [
    { id: 'M001', name: 'Burger Patty', category: 'Meat', stock: 150, min: 200, cost: 1.5 },
    { id: 'M002', name: 'Burger Bun', category: 'Bakery', stock: 300, min: 100, cost: 0.5 },
    { id: 'M003', name: 'Lettuce', category: 'Produce', stock: 50, min: 20, cost: 0.2 },
    { id: 'M004', name: 'Cheese Slice', category: 'Dairy', stock: 400, min: 100, cost: 0.3 },
    { id: 'M005', name: 'Tomato', category: 'Produce', stock: 15, min: 30, cost: 0.15 },
    { id: 'M006', name: 'Fries (Frozen)', category: 'Frozen', stock: 80, min: 50, cost: 1.2 },
  ],
  products: [
    { id: 'P001', name: 'Classic Burger', category: 'Mains', cost: 2.35, price: 8.99 },
    { id: 'P002', name: 'Cheese Burger', category: 'Mains', cost: 2.65, price: 9.99 },
    { id: 'P003', name: 'Fries', category: 'Sides', cost: 1.2, price: 3.99 },
    { id: 'P004', name: 'Soda', category: 'Drinks', cost: 0.5, price: 1.99 },
  ],
  imports: [],
  kpis: {
    revenue: 1245.50,
    profit: 850.20,
    foodCost: 31.5,
  }
};

// Elements
const els = {
  navLinks: document.querySelectorAll('.nav-links li'),
  pages: document.querySelectorAll('.page'),
  pageTitle: document.getElementById('page-title'),
  btnImport: document.getElementById('btn-import'),
  posInput: document.getElementById('pos-data-input'),
  importStatus: document.getElementById('import-status'),
  inventoryTable: document.querySelector('#inventory-table tbody'),
  productsTable: document.querySelector('#products-table tbody'),
  importLogTable: document.querySelector('#import-log-table tbody'),
  kpiRevenue: document.getElementById('kpi-revenue'),
  kpiProfit: document.getElementById('kpi-profit'),
  kpiFoodCost: document.getElementById('kpi-foodcost'),
  kpiLowStock: document.getElementById('kpi-lowstock'),
};

let revenueChartInstance = null;
let topProductsChartInstance = null;

// Initialize
function init() {
  document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  setupNavigation();
  setupEvents();
  renderDashboard();
  renderInventory();
  renderProducts();
  renderImportLogs();
}

function setupNavigation() {
  els.navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const pageId = link.getAttribute('data-page');
      
      // Update nav active state
      els.navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Update page visibility
      els.pages.forEach(p => p.classList.remove('active'));
      document.getElementById(`page-${pageId}`).classList.add('active');
      
      // Update Title
      els.pageTitle.textContent = link.textContent;
    });
  });
}

function setupEvents() {
  els.btnImport.addEventListener('click', handleImport);
}

function handleImport() {
  const data = els.posInput.value.trim();
  if (!data) {
    showStatus('Please paste POS data first.', 'error');
    return;
  }
  
  // Basic TSV/CSV parsing simulation
  const rows = data.split('\n').filter(r => r.trim().length > 0);
  if(rows.length < 2) {
     showStatus('Data must contain at least headers and one row.', 'error');
     return;
  }

  // Simulate processing
  const linesCount = rows.length - (rows[0].toLowerCase().includes('date') ? 1 : 0);
  const simulatedRevenue = linesCount * 12.5; // dummy calc
  const simulatedProfit = simulatedRevenue * 0.65;
  
  state.imports.unshift({
    time: new Date().toLocaleTimeString(),
    rows: linesCount,
    revenue: simulatedRevenue,
    status: 'Success'
  });

  state.kpis.revenue += simulatedRevenue;
  state.kpis.profit += simulatedProfit;
  
  // Randomly deduct some stock for simulation to show inventory changes
  state.inventory.forEach(item => {
    item.stock = Math.max(0, item.stock - Math.floor(Math.random() * 15));
  });

  showStatus(`Successfully processed ${linesCount} rows. Dashboard and Inventory updated!`, 'success');
  els.posInput.value = '';
  
  renderDashboard();
  renderImportLogs();
  renderInventory();
}

function showStatus(msg, type) {
  els.importStatus.textContent = msg;
  els.importStatus.style.color = type === 'error' ? 'var(--danger)' : 'var(--success)';
  els.importStatus.style.marginTop = '1rem';
  els.importStatus.style.fontWeight = '500';
  setTimeout(() => els.importStatus.textContent = '', 4000);
}

function renderDashboard() {
  els.kpiRevenue.textContent = `$${state.kpis.revenue.toFixed(2)}`;
  els.kpiProfit.textContent = `$${state.kpis.profit.toFixed(2)}`;
  els.kpiFoodCost.textContent = `${state.kpis.foodCost}%`;
  
  const lowStockItems = state.inventory.filter(i => i.stock <= i.min).length;
  els.kpiLowStock.textContent = lowStockItems;

  renderCharts();
}

function renderCharts() {
  const ctxRev = document.getElementById('revenueChart').getContext('2d');
  
  if (revenueChartInstance) revenueChartInstance.destroy();
  
  Chart.defaults.color = '#8b9bb4';
  Chart.defaults.font.family = 'Inter';

  // Gradient for line chart
  let gradient = ctxRev.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(29, 209, 161, 0.4)');
  gradient.addColorStop(1, 'rgba(29, 209, 161, 0.0)');

  revenueChartInstance = new Chart(ctxRev, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Revenue ($)',
        data: [850, 920, 1100, 1050, 1400, 1850, Math.floor(state.kpis.revenue)],
        borderColor: '#1dd1a1',
        backgroundColor: gradient,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#1dd1a1',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#1dd1a1',
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { 
          grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
          ticks: { callback: function(value) { return '$' + value; } }
        },
        x: { grid: { display: false, drawBorder: false } }
      }
    }
  });

  const ctxProd = document.getElementById('topProductsChart').getContext('2d');
  if (topProductsChartInstance) topProductsChartInstance.destroy();
  
  topProductsChartInstance = new Chart(ctxProd, {
    type: 'doughnut',
    data: {
      labels: ['Classic Burger', 'Cheese Burger', 'Fries', 'Drinks'],
      datasets: [{
        data: [45, 30, 15, 10],
        backgroundColor: ['#1dd1a1', '#5f27cd', '#ff9f43', '#ee5253'],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: { position: 'right', labels: { usePointStyle: true, padding: 20 } }
      }
    }
  });
}

function renderInventory() {
  els.inventoryTable.innerHTML = state.inventory.map(item => {
    const isLow = item.stock <= item.min;
    const value = item.stock * item.cost;
    return `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td style="font-weight: 600; color: ${isLow ? 'var(--danger)' : 'inherit'}">${item.stock}</td>
        <td>${item.min}</td>
        <td>$${item.cost.toFixed(2)}</td>
        <td>$${value.toFixed(2)}</td>
        <td><span class="badge ${isLow ? 'low-stock' : 'ok'}">${isLow ? 'Low Stock' : 'Optimal'}</span></td>
      </tr>
    `;
  }).join('');
}

function renderProducts() {
  els.productsTable.innerHTML = state.products.map(p => {
    const margin = ((p.price - p.cost) / p.price * 100).toFixed(1);
    return `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>$${p.cost.toFixed(2)}</td>
        <td>$${p.price.toFixed(2)}</td>
        <td style="color: var(--success); font-weight: 600;">${margin}%</td>
      </tr>
    `;
  }).join('');
}

function renderImportLogs() {
  if (state.imports.length === 0) {
    els.importLogTable.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 2rem;">No imports yet. Paste data above to get started.</td></tr>';
    return;
  }
  
  els.importLogTable.innerHTML = state.imports.map(log => `
    <tr>
      <td>${log.time}</td>
      <td>${log.rows}</td>
      <td style="font-weight: 600;">$${log.revenue.toFixed(2)}</td>
      <td><span class="badge ok">${log.status}</span></td>
    </tr>
  `).join('');
}

// Start
document.addEventListener('DOMContentLoaded', init);

