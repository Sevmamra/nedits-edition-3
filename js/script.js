// ========================
// AOS Initialization
// ========================
AOS.init();

// ========================
// Smooth Scrolling for Navbar Links
// ========================
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    if (link.hash && document.querySelector(link.hash)) {
      e.preventDefault();
      document.querySelector(link.hash).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========================
// Hero Background Slideshow
// ========================
(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const imgs = [
    'images/hero-bg1.jpg',
    'images/hero-bg2.jpg',
    'images/hero-bg3.jpg',
    'images/hero-bg4.jpg',
    'images/hero-bg5.jpg',
    'images/hero-bg6.jpg'
  ];
  let pool = [...imgs];

  const nextBg = () => {
    if (pool.length === 0) pool = [...imgs];
    const idx = Math.floor(Math.random() * pool.length);
    const selected = pool.splice(idx, 1)[0];
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${selected}')`;
  };

  nextBg();
  setInterval(nextBg, 3000);
})();

// ========================
// About Section Animations
// ========================
document.querySelectorAll('#about [data-anim]').forEach(el => {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      el.classList.add('visible');
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  observer.observe(el);
});

// ========================
// Section Heading Animation (Bar Slide-In)
// ========================
(() => {
  const headings = document.querySelectorAll('.section h2');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  headings.forEach(h2 => observer.observe(h2));
})();

// ========================
// Services Carousel Logic
// ========================
(() => {
  const containers = document.querySelectorAll('.services-category');
  const intervalTime = 3000;

  containers.forEach(container => {
    const carousel = container.querySelector('.services-carousel');
    const cards = Array.from(carousel.querySelectorAll('.service-card'));
    const total = cards.length;

    let current = 0;
    let paused = false;
    let animating = false;
    let interval;

    const updateCards = () => {
      if (animating) return;
      animating = true;

      const left = (current - 1 + total) % total;
      const right = (current + 1) % total;

      cards.forEach(card => {
        card.className = 'service-card'; // reset
        card.style.opacity = '0';
      });

      cards[left].classList.add('left');
      cards[current].classList.add('center');
      cards[right].classList.add('right');

      setTimeout(() => animating = false, 800);
    };

    const startAuto = () => {
      if (!paused) {
        interval = setInterval(() => {
          current = (current + 1) % total;
          updateCards();
        }, intervalTime);
      }
    };

    carousel.addEventListener('click', e => {
      const clicked = e.target.closest('.service-card');
      if (!clicked || animating) return;

      clearInterval(interval);
      paused = true;

      if (clicked.classList.contains('center')) {
        clicked.classList.toggle('active');
      } else {
        current = cards.indexOf(clicked);
        updateCards();
      }

      const activeCard = carousel.querySelector('.service-card.active');
      if (!activeCard) {
        paused = false;
        startAuto();
      }
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('.services-category')) {
        const active = carousel.querySelector('.service-card.active');
        if (active) active.classList.remove('active');
        paused = false;
        startAuto();
      }
    });

    updateCards();
    startAuto();
  });
})();

// ========================
// Testimonials Slide-In Animation
// ========================
(() => {
  const testimonials = document.querySelectorAll('.testimonial');

  window.addEventListener('scroll', () => {
    testimonials.forEach((t, i) => {
      const isVisible = t.getBoundingClientRect().top < window.innerHeight - 50;
      if (isVisible && !t.classList.contains('shown')) {
        t.classList.add('shown');
        t.style.transition = 'all 0.6s';
        t.style.transform = 'translateX(0)';
        t.style.opacity = '1';
      }
    });
  });
})();

// ========================
// Animated Counters
// ========================
(() => {
  const counters = {
    clientsCounter: 150,
    projectsCounter: 300,
    experienceCounter: 5
  };

  const animate = (id, target, duration = 4000) => {
    const el = document.getElementById(id);
    if (!el) return;

    let count = 0;
    const step = Math.ceil(target / (duration / 50));
    const interval = setInterval(() => {
      count += step;
      if (count >= target) {
        el.textContent = target;
        clearInterval(interval);
      } else {
        el.textContent = count;
      }
    }, 50);
  };

  const achievements = document.getElementById("achievements");
  if (achievements) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        Object.entries(counters).forEach(([id, target]) => animate(id, target));
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(achievements);
  }
})();
