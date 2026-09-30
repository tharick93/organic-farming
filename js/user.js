/* ==========================================================================
   STACKLY ORGANIC FARMING - User Dashboard Script (user.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardSidebar();
  initUserCharts();
  initCropTableFilters();
  initQuickActions();
});

/* 1. Mobile Sidebar Navigation Toggle */
function initDashboardSidebar() {
  const toggleBtn = document.querySelector('.sidebar-toggle-btn');
  const sidebar = document.querySelector('.sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024 && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
      }
    });
  }
}

/* ==========================================================================
   2. DEMO DATA STRUCTURE FOR USER DASHBOARD
   (Structured cleanly to facilitate seamless future REST API integration)
   ========================================================================== */
const USER_DASHBOARD_DATA = {
  cropProduction: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [{
      label: 'Crop Yield (Tons)',
      data: [12, 18, 25, 32, 28, 45, 52, 60, 68],
      borderColor: '#2e7d32',
      backgroundColor: 'rgba(46, 125, 50, 0.15)',
      fill: true,
      tension: 0.4
    }]
  },
  farmActivity: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Hours Spent',
      data: [6.5, 8.0, 7.2, 9.0, 8.5, 5.0, 4.0],
      backgroundColor: '#52b788',
      borderRadius: 6
    }]
  },
  cropDistribution: {
    labels: ['Organic Vegetables', 'Fresh Fruits', 'Whole Grains', 'Medicinal Herbs'],
    datasets: [{
      data: [40, 25, 20, 15],
      backgroundColor: ['#2e7d32', '#74c69d', '#dda15e', '#bc6c25']
    }]
  },
  waterUsage: {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [{
      label: 'Water Used (kL)',
      data: [140, 160, 120, 110, 95], // Showing reduction due to smart drip!
      borderColor: '#0284c7',
      backgroundColor: 'rgba(2, 132, 199, 0.15)',
      fill: true,
      tension: 0.3
    }]
  },
  monthlyRevenue: {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [{
      label: 'Revenue ($)',
      data: [4200, 5800, 6400, 7900, 8500],
      backgroundColor: '#1b4332',
      borderRadius: 6
    }]
  }
};

/* 3. Initialize Chart.js Visualizations */
function initUserCharts() {
  if (typeof Chart === 'undefined') return;

  // Chart 1: Crop Production (Line)
  const prodCanvas = document.getElementById('chart-crop-production');
  if (prodCanvas) {
    new Chart(prodCanvas, {
      type: 'line',
      data: USER_DASHBOARD_DATA.cropProduction,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top' }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // Chart 2: Farm Activity (Bar)
  const activityCanvas = document.getElementById('chart-farm-activity');
  if (activityCanvas) {
    new Chart(activityCanvas, {
      type: 'bar',
      data: USER_DASHBOARD_DATA.farmActivity,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // Chart 3: Crop Distribution (Doughnut)
  const distCanvas = document.getElementById('chart-crop-distribution');
  if (distCanvas) {
    new Chart(distCanvas, {
      type: 'doughnut',
      data: USER_DASHBOARD_DATA.cropDistribution,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        },
        cutout: '70%'
      }
    });
  }

  // Chart 4: Water Consumption (Line Area)
  const waterCanvas = document.getElementById('chart-water-usage');
  if (waterCanvas) {
    new Chart(waterCanvas, {
      type: 'line',
      data: USER_DASHBOARD_DATA.waterUsage,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true } },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  // Chart 5: Revenue / Sales (Bar)
  const revCanvas = document.getElementById('chart-user-revenue');
  if (revCanvas) {
    new Chart(revCanvas, {
      type: 'bar',
      data: USER_DASHBOARD_DATA.monthlyRevenue,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}

/* 4. Crops Table Live Search & Filter */
function initCropTableFilters() {
  const searchInput = document.getElementById('crop-table-search');
  const statusFilter = document.getElementById('crop-status-filter');
  const tableRows = document.querySelectorAll('#crops-table-body tr');

  if (!tableRows.length) return;

  function filterTable() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedStatus = statusFilter ? statusFilter.value.toLowerCase() : 'all';

    tableRows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const statusBadge = row.querySelector('.badge');
      const statusText = statusBadge ? statusBadge.textContent.toLowerCase().trim() : '';

      const matchesSearch = text.includes(query);
      const matchesStatus = selectedStatus === 'all' || statusText.includes(selectedStatus);

      if (matchesSearch && matchesStatus) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterTable);
  if (statusFilter) statusFilter.addEventListener('change', filterTable);
}

/* 5. Quick Actions Handling */
function initQuickActions() {
  const addCropBtn = document.getElementById('btn-add-crop');
  if (addCropBtn) {
    addCropBtn.addEventListener('click', () => {
      const cropName = prompt('Enter Crop Name (e.g. Heirloom Tomatoes):');
      if (cropName) {
        showToast(`Added crop "${cropName}" to active cultivation queue!`, 'success');
      }
    });
  }
}
