// ===== ALL GALLERY IMAGES (for lightbox navigation) =====
var allGalleryImages = [
  // Grid images (0-5)
  'images/20250915_081925905_iOS.jpg',
  'images/20251026_080611514_iOS.jpg',
  'images/20250824_141652434_iOS.jpg',
  'images/20250825_152316825_iOS.jpg',
  'images/20250825_150335458_iOS.jpg',
  'images/PXL_20250825_113938697.jpg',
  // Apartment slider (6-39): Bedroom 1
  'images/20250824_124554476_iOS.jpg',
  'images/20250915_081837522_iOS.jpg',
  'images/20250915_124026573_iOS.jpg',
  'images/20250915_124036385_iOS.jpg',
  'images/20251026_080546472_iOS.jpg',
  'images/PXL_20250824_120759659.jpg',
  'images/PXL_20250824_120817331.jpg',
  // Bedroom 2
  'images/20250824_140557433_iOS.jpg',
  'images/20251026_080623687_iOS.jpg',
  // Living Room
  'images/20250915_081930044_iOS.jpg',
  'images/20250915_081934503_iOS.jpg',
  'images/20250915_082005045_iOS.jpg',
  'images/20250915_082012797_iOS.jpg',
  'images/20250915_124107079_iOS.jpg',
  'images/20251026_080555783_iOS.jpg',
  'images/20251026_080649069_iOS.jpg',
  // Kitchen
  'images/20250825_150353113_iOS.jpg',
  'images/20250825_150422311_iOS.jpg',
  'images/20250915_082422289_iOS.jpg',
  'images/20250915_082432092_iOS.jpg',
  'images/20250915_124219657_iOS.jpg',
  // Bathroom
  'images/20250824_141700280_iOS.jpg',
  'images/20250824_141725264_iOS.jpg',
  // Hallway
  'images/20250825_151244498_iOS.jpg',
  'images/20250825_151322961_iOS.jpg',
  'images/20250915_082506546_iOS.jpg',
  // Terrace
  'images/20250825_152748732_iOS.jpg',
  'images/20250825_153929939_iOS.jpg',
  'images/20250927_100535089_iOS.jpg',
  // Building Exterior
  'images/PXL_20250825_113926403.jpg',
  // Wellness & Details
  'images/20250915_082154680_iOS.jpg',
  'images/20250915_082018438_iOS.jpg',
  'images/20250915_082032969_iOS.jpg',
  'images/PXL_20250824_140031726.jpg',
  // Nature & Surroundings slider (40-52)
  'images/20250825_153949432_iOS.jpg',
  'images/20250913_111904660_iOS.jpg',
  'images/20250913_112505599_iOS.jpg',
  'images/20250913_113507370_iOS.jpg',
  'images/20250913_113517885_iOS.jpg',
  'images/20250913_113634724_iOS.jpg',
  'images/20250913_113714861_iOS.jpg',
  'images/20250913_113918678_iOS.jpg',
  'images/20250913_114022747_iOS.jpg',
  'images/20250913_114213932_iOS.jpg',
  'images/PXL_20220710_114133878.jpg',
  'images/20250913_112548760_iOS.jpg',
  'images/20250913_113015579_iOS.jpg'
];

// ===== LANGUAGE SWITCHING =====
function setLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem('erlachoase-lang', lang);

  document.querySelectorAll('[data-de]').forEach(function(el) {
    var text = el.getAttribute('data-' + lang);
    if (text !== null) {
      if (el.tagName === 'META') {
        el.setAttribute('content', text);
      } else if (el.tagName === 'TITLE') {
        el.textContent = text;
      } else if (el.hasAttribute('data-html')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    }
  });

  document.querySelectorAll('.lang-switch button, .mobile-lang-switch button').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

// ===== NAV SCROLL EFFECT =====
var nav = document.getElementById('nav');
window.addEventListener('scroll', function() {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', function() {
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

function closeMobile() {
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== LIGHTBOX =====
var currentImg = 0;

function openLightbox(index) {
  currentImg = index;
  document.getElementById('lightbox-img').src = allGalleryImages[currentImg];
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(dir) {
  currentImg = (currentImg + dir + allGalleryImages.length) % allGalleryImages.length;
  document.getElementById('lightbox-img').src = allGalleryImages[currentImg];
}

document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === e.currentTarget) closeLightbox();
});

document.addEventListener('keydown', function(e) {
  if (document.getElementById('lightbox').classList.contains('active')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
    return;
  }
  if (document.getElementById('impressumModal').classList.contains('active')) {
    if (e.key === 'Escape') closeImpressum();
  }
});

// ===== GALLERY SLIDERS =====
function slideContainer(containerId, dir) {
  var container = document.getElementById(containerId);
  var item = container.querySelector('.gallery-slider-item');
  if (!item) return;
  var itemWidth = item.offsetWidth + 16;
  var visibleItems = Math.floor(container.offsetWidth / itemWidth);
  container.scrollBy({ left: dir * itemWidth * Math.max(1, visibleItems - 1), behavior: 'smooth' });
}

function slideGallery(dir) { slideContainer('gallerySlider', dir); }
function slideNature(dir) { slideContainer('natureSlider', dir); }

// ===== IMPRESSUM MODAL =====
function openImpressum() {
  document.getElementById('impressumModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeImpressum() {
  document.getElementById('impressumModal').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('impressumModal').addEventListener('click', function(e) {
  if (e.target === e.currentTarget) closeImpressum();
});

// ===== SCROLL REVEAL =====
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(function(el) {
  observer.observe(el);
});

// ===== INIT LANGUAGE =====
var savedLang = localStorage.getItem('erlachoase-lang') || 'de';
setLanguage(savedLang);
