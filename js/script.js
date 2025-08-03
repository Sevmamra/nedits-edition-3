/**
 * Nedits Edition - Main JavaScript File
 * Contains all animations and interactive elements
 */

// Initialize AOS animation library
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  
  // ----------------------------
  // 1. TYPEWRITER EFFECT
  // ----------------------------
  const aboutText = document.getElementById('about-text');
  if (aboutText) {
    const fullText = aboutText.textContent;
    aboutText.textContent = '';
    
    const typewriterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let i = 0;
        function type() {
          if (i < fullText.length) {
            aboutText.textContent += fullText.charAt(i++);
            setTimeout(type, 25);
          }
        }
        type();
        typewriterObserver.disconnect();
      }
    });
    typewriterObserver.observe(aboutText);
  }

  // ----------------------------
  // 2. HERO BACKGROUND SLIDESHOW
  // ----------------------------
  const hero = document.querySelector('.hero');
  if (hero) {
    const heroImages = [
      'images/hero-bg1.jpg',
      'images/hero-bg2.jpg',
      'images/hero-bg3.jpg',
      'images/hero-bg4.jpg',
      'images/hero-bg5.jpg',
      'images/hero-bg6.jpg'
    ];
    let availableImages = [...heroImages];

    function changeBackground() {
      if (availableImages.length === 0) availableImages = [...heroImages];
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      const selectedImage = availableImages.splice(randomIndex, 1)[0];
      hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${selectedImage}')`;
    }

    changeBackground();
    setInterval(changeBackground, 3000);
  }

  // ----------------------------
  // 3. SERVICES CAROUSEL
  // ----------------------------
  const serviceContainers = document.querySelectorAll('.services-category');
  if (serviceContainers.length > 0) {
    serviceContainers.forEach(container => {
      const carousel = container.querySelector('.services-carousel');
      const cards = Array.from(carousel.querySelectorAll('.service-card'));
      const totalCards = cards.length;
      let currentIndex = 0;
      let carouselInterval;
      let isPaused = false;
      let isAnimating = false;

      // Update card positions in carousel
      function updateCards() {
        if (isAnimating) return;
        isAnimating = true;

        // Reset all cards
        cards.forEach(card => {
          card.classList.remove('center', 'left', 'right', 'active');
          card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          card.style.opacity = '0';
          card.style.transform = 'translate(-50%, -50%) scale(0.6)';
        });

        // Calculate indexes
        const leftIndex = (currentIndex - 1 + totalCards) % totalCards;
        const rightIndex = (currentIndex + 1) % totalCards;

        // Position left card
        cards[leftIndex].classList.add('left');
        cards[leftIndex].style.opacity = '0.5';
        cards[leftIndex].style.transform = 'translate(-150%, -50%) scale(0.7) rotateY(30deg)';

        // Position center card
        cards[currentIndex].classList.add('center');
        cards[currentIndex].style.opacity = '1';
        cards[currentIndex].style.transform = 'translate(-50%, -50%) scale(1.1)';

        // Position right card
        cards[rightIndex].classList.add('right');
        cards[rightIndex].style.opacity = '0.5';
        cards[rightIndex].style.transform = 'translate(50%, -50%) scale(0.7) rotateY(-30deg)';

        setTimeout(() => isAnimating = false, 800);
      }

      // Start auto-rotation
      function startCarousel() {
        if (isPaused) return;
        carouselInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % totalCards;
          updateCards();
        }, 3000);
      }

      // Handle card clicks
      carousel.addEventListener('click', (e) => {
        const clickedCard = e.target.closest('.service-card');
        if (!clickedCard || isAnimating) return;

        clearInterval(carouselInterval);
        isPaused = true;

        if (clickedCard.classList.contains('center')) {
          clickedCard.classList.toggle('active');
        } else {
          currentIndex = cards.indexOf(clickedCard);
          updateCards();
        }

        // Resume if no card is active
        if (!carousel.querySelector('.service-card.active')) {
          isPaused = false;
          startCarousel();
        }
      });

      // Resume carousel when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.services-category') && isPaused) {
          const activeCard = carousel.querySelector('.service-card.active');
          if (activeCard) activeCard.classList.remove('active');
          isPaused = false;
          startCarousel();
        }
      });

      // Initialize
      updateCards();
      startCarousel();
    });
  }

  // ----------------------------
  // 4. SCROLL ANIMATIONS
  // ----------------------------
  
  // Animate about sections
  document.querySelectorAll('#about [data-anim]').forEach(el => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        el.classList.add('visible');
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
  });

  // Animate testimonials
  const testimonials = document.querySelectorAll('.testimonial');
  if (testimonials.length > 0) {
    window.addEventListener('scroll', () => {
      testimonials.forEach((testimonial, i) => {
        if (testimonial.getBoundingClientRect().top < window.innerHeight - 50 && !testimonial.classList.contains('shown')) {
          testimonial.classList.add('shown');
          testimonial.style.transform = (i % 2 === 0) ? 'translateX(-100px)' : 'translateX(100px)';
          setTimeout(() => {
            testimonial.style.transition = 'all 0.6s';
            testimonial.style.transform = 'translateX(0)';
            testimonial.style.opacity = '1';
          }, 50);
        }
      });
    });
  }

  // Animate section headings
  const sectionHeadings = document.querySelectorAll('.section h2');
  if (sectionHeadings.length > 0) {
    const headingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          headingObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    sectionHeadings.forEach(h2 => headingObserver.observe(h2));
  }

  // ----------------------------
  // 5. SMOOTH SCROLLING
  // ----------------------------
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      if (link.hash && document.querySelector(link.hash)) {
        e.preventDefault();
        document.querySelector(link.hash).scrollIntoView({ 
          behavior: 'smooth' 
        });
      }
    });
  });

  // ----------------------------
  // 6. COUNTER ANIMATIONS
  // ----------------------------
  const achievements = document.getElementById("achievements");
  if (achievements) {
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Clients counter
        animateCounter("clientsCounter", 150, 4000);
        // Projects counter
        animateCounter("projectsCounter", 300, 4000);
        // Experience counter
        animateCounter("experienceCounter", 5, 2000);
        counterObserver.disconnect();
      }
    }, { threshold: 0.3 });
    counterObserver.observe(achievements);
  }

  /**
   * Animate a counter from 0 to target value
   * @param {string} elementId - ID of the counter element
   * @param {number} target - Target number to count up to
   * @param {number} duration - Duration of animation in ms
   */
  function animateCounter(elementId, target, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const updateCounter = () => {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };
    
    requestAnimationFrame(updateCounter);
  }

  // ----------------------------
  // 7. TIMELINE ANIMATIONS
  // ----------------------------
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length > 0) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    timelineItems.forEach(item => timelineObserver.observe(item));
  }
});
