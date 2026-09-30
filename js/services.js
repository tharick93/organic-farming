/* ==========================================================================
   STACKLY ORGANIC FARMING - Services Page Script (services.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initServiceFilters();
  initFaqAccordion();
  initServiceModals();
});

/* 1. Services Filtering System */
function initServiceFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card-item');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* 2. FAQ Accordion Handler */
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordion items
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle current if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* 3. Service Details Modal Handler */
function initServiceModals() {
  const modalOverlay = document.getElementById('service-modal');
  const openBtns = document.querySelectorAll('.view-service-detail');
  const closeBtn = document.querySelector('.modal-close-btn');

  if (!modalOverlay) return;

  const modalTitle = document.getElementById('modal-service-title');
  const modalDesc = document.getElementById('modal-service-desc');
  const modalProcess = document.getElementById('modal-service-process');

  const serviceDataMap = {
    'organic-crop': {
      title: 'Organic Crop Farming',
      desc: 'Our organic crop farming solutions prioritize natural soil health, non-GMO seed lines, and zero synthetic pesticides. We optimize crop cycles to maximize yield while maintaining ecological balance.',
      process: '1. Comprehensive Soil Analysis → 2. Organic Seed Selection → 3. Eco-friendly Pest Management → 4. Harvest & Distribution'
    },
    'soil-testing': {
      title: 'Soil Testing & Management',
      desc: 'Precision soil diagnostics measuring micronutrients, organic matter percentage, pH balance, and microbial activity to formulate custom organic enhancement programs.',
      process: '1. Field Sampling → 2. Lab Spectrometry → 3. Organic Bio-Nutrient Plan → 4. Seasonal Monitoring'
    },
    'fertilizer-solutions': {
      title: 'Organic Fertilizer Solutions',
      desc: 'Custom-formulated bio-fertilizers, vermicompost, and liquid compost teas designed to enrich soil microbiome and enhance plant immunity against diseases naturally.',
      process: '1. Nutrient Gap Identification → 2. Custom Bio-Blend Formulation → 3. Controlled Application → 4. Crop Response Tracking'
    },
    'sustainable-irrigation': {
      title: 'Sustainable Irrigation Systems',
      desc: 'Smart drip irrigation and rainwater harvesting integration using IoT moisture sensors to reduce water consumption by up to 45% while optimizing root hydration.',
      process: '1. Topography Mapping → 2. Drip Grid Installation → 3. Sensor Deployment → 4. Automated Hydration Scheduling'
    },
    'crop-monitoring': {
      title: 'Smart Crop Monitoring',
      desc: 'Real-time crop health tracking leveraging satellite imaging, sensor arrays, and AI predictive analytics to detect nutrient deficiency or pest threats early.',
      process: '1. Aerial Imagery Capture → 2. NDVI Index Analysis → 3. Field Diagnostics Report → 4. Targeted Precision Action'
    },
    'farm-consultation': {
      title: 'Farm Consultation & Transition',
      desc: 'Expert guidance for conventional farms transitioning to certified organic practices, covering regulatory compliance, crop rotation strategies, and market alignment.',
      process: '1. Baseline Farm Audit → 2. Transition Plan Blueprint → 3. Organic Certification Assistance → 4. Ongoing Agronomist Support'
    }
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceId = btn.getAttribute('data-service');
      const data = serviceDataMap[serviceId];

      if (data && modalTitle && modalDesc && modalProcess) {
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalProcess.textContent = data.process;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}
