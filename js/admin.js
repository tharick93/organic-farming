/* ==========================================================================
   STACKLY ORGANIC FARMING - Admin Dashboard Script (admin.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAdminSidebar();
  initAdminCharts();
  initAdminTableFilters();
  initAdminModals();
});

/* 1. Mobile Sidebar Navigation Toggle */
function initAdminSidebar() {
  const toggleBtn = document.querySelector('.sidebar-toggle-btn');
  const sidebar = document.querySelector('.sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024 && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
      }
    });
  }
}

/* ==========================================================================
   2. DEMO DATA STRUCTURE FOR ADMIN DASHBOARD
   (Organized for easy future backend API integration)
   ========================================================================== */
const ADMIN_DASHBOARD_DATA = {
  farmerGrowth: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [{
      label: 'Registered Farmers',
      data: [120, 180, 290, 420, 610, 850, 1100, 1380, 1650],
      borderColor: '#2e7d32',
      backgroundColor: 'rgba(46, 125, 50, 0.12)',
      fill: true,
      tension: 0.4
    }]
  },
  monthlyRevenue: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [{
      label: 'Platform Revenue ($)',
      data: [45000, 52000, 68000, 84000, 95000, 112000, 134000, 158000, 175000],
      backgroundColor: '#1b4332',
      borderRadius: 6
    }]
  },
  cropProduction: {
    labels: ['Vegetables', 'Fruits', 'Grains', 'Herbs', 'Pulses'],
    datasets: [{
      label: 'Production (Metric Tons)',
      data: [420, 310, 250, 180, 140],
      backgroundColor: ['#2e7d32', '#52b788', '#dda15e', '#bc6c25', '#a7c957']
    }]
  },
  cropCategoryDoughnut: {
    labels: ['Organic Greens', 'Organic Fruits', 'Heritage Grains', 'Medicinal Plants'],
    datasets: [{
      data: [35, 30, 20, 15],
      backgroundColor: ['#2e7d32', '#74c69d', '#dda15e', '#60a5fa']
    }]
  },
  ordersAnalytics: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      { label: 'Completed Orders', data: [320, 410, 480, 560], backgroundColor: '#2e7d32' },
      { label: 'Pending Orders', data: [45, 30, 25, 18], backgroundColor: '#dda15e' }
    ]
  },
  farmPerformance: {
    labels: ['North Region', 'South Region', 'East Region', 'West Region'],
    datasets: [{
      label: 'Average Soil Quality Index',
      data: [94, 88, 91, 96],
      backgroundColor: '#52b788',
      borderRadius: 6
    }]
  },
  sustainabilityMetrics: {
    labels: ['Water Saved (ML)', 'Carbon Offset (Tons)', 'Bio-Waste Composted (Tons)', 'Chemicals Avoided (Kg)'],
    datasets: [{
      label: 'Impact Score',
      data: [14.5, 820, 340, 1250],
      backgroundColor: ['#0284c7', '#16a34a', '#d97706', '#9333ea']
    }]
  }
};

/* 3. Initialize Admin Charts */
function initAdminCharts() {
  if (typeof Chart === 'undefined') return;

  const chartConfigs = [
    { id: 'chart-farmer-growth', type: 'line', data: ADMIN_DASHBOARD_DATA.farmerGrowth },
    { id: 'chart-admin-revenue', type: 'bar', data: ADMIN_DASHBOARD_DATA.monthlyRevenue },
    { id: 'chart-admin-crops', type: 'bar', data: ADMIN_DASHBOARD_DATA.cropProduction },
    { id: 'chart-admin-doughnut', type: 'doughnut', data: ADMIN_DASHBOARD_DATA.cropCategoryDoughnut },
    { id: 'chart-admin-orders', type: 'bar', data: ADMIN_DASHBOARD_DATA.ordersAnalytics },
    { id: 'chart-farm-performance', type: 'bar', data: ADMIN_DASHBOARD_DATA.farmPerformance },
    { id: 'chart-sustainability-metrics', type: 'bar', data: ADMIN_DASHBOARD_DATA.sustainabilityMetrics }
  ];

  chartConfigs.forEach(cfg => {
    const canvas = document.getElementById(cfg.id);
    if (canvas) {
      new Chart(canvas, {
        type: cfg.type,
        data: cfg.data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: cfg.type === 'doughnut' || cfg.id === 'chart-admin-orders' }
          },
          scales: cfg.type !== 'doughnut' ? {
            y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
            x: { grid: { display: false } }
          } : {}
        }
      });
    }
  });
}

/* 4. Universal Admin Data Tables Search & Filter */
function initAdminTableFilters() {
  const searchInputs = document.querySelectorAll('.admin-table-search');

  searchInputs.forEach(input => {
    input.addEventListener('input', () => {
      const targetTableId = input.getAttribute('data-table');
      const table = document.getElementById(targetTableId);
      if (!table) return;

      const query = input.value.toLowerCase().trim();
      const rows = table.querySelectorAll('tbody tr');

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
    });
  });
}

/* 5. Admin Modal Handlers (Add Farmer, Add Crop, Add Service) */
function initAdminModals() {
  const modals = document.querySelectorAll('.admin-modal-overlay');
  const openBtns = document.querySelectorAll('.open-modal-btn');
  const closeBtns = document.querySelectorAll('.close-modal-btn');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-target-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modals.forEach(m => m.classList.remove('active'));
      document.body.style.overflow = '';
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Handle Form Submissions in Modals
  const addFarmerForm = document.getElementById('form-add-farmer');
  if (addFarmerForm) {
    addFarmerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('new-farmer-name').value;
      const location = document.getElementById('new-farmer-location').value;
      const size = document.getElementById('new-farmer-size').value;

      if (!name || !location) {
        showToast('Please fill required fields', 'error');
        return;
      }

      // Append row to Farmers table
      const tbody = document.querySelector('#farmers-table tbody');
      if (tbody) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>FRM-${Math.floor(1000 + Math.random() * 9000)}</td>
          <td><strong>${name}</strong></td>
          <td>${location}</td>
          <td>${size || '25 Acres'}</td>
          <td>Organic Vegetables</td>
          <td><span class="badge badge-active">Active</span></td>
          <td><button class="btn btn-sm btn-outline"><i class="fa-solid fa-pen"></i> Edit</button></td>
        `;
        tbody.prepend(newRow);
      }

      showToast(`New Farmer "${name}" added successfully!`, 'success');
      addFarmerForm.reset();
      document.getElementById('modal-add-farmer').classList.remove('active');
      document.body.style.overflow = '';
    });
  }
}
