/**
 * Portfolio Client Script
 * Shreyash Kshirsagar - Aspiring Cloud Engineer
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initProjectFilters();
  initClipboardButtons();
  initContactForm();
  initScrollSpy();
});

/* ==========================================================================
   1. Navigation & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  // Add shadow and darkened background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    links.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   2. Scroll Spy (Active Navigation Highlight)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   3. Project Filter Tabs
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   4. Copy to Clipboard & Toast Notifications
   ========================================================================== */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          fallbackCopyText(textToCopy);
        });
      } else {
        fallbackCopyText(textToCopy);
      }
    });
  });

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`Copied: ${text}`);
    } catch (err) {
      showToast('Please copy manually.');
    }
    document.body.removeChild(textArea);
  }

  function showToast(message) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* ==========================================================================
   5. Interactive Contact Form (Mailto Helper & User Feedback)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName')?.value.trim();
    const email = document.getElementById('senderEmail')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim() || 'Portfolio Inquiry / Cloud Role';
    const message = document.getElementById('messageText')?.value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    // Format mailto link to open recruiter's default mail client cleanly
    const recipient = 'kshirsagarshreyas89@gmail.com';
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${subject}`);

    window.location.href = `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Show confirmation feedback
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      Opening Email Client...
    `;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
    }, 4000);
  });
}
