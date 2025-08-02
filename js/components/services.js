export function initServices() {
  const containers = document.querySelectorAll('.services-category');
  if (!containers.length) return;

  containers.forEach(container => {
    const carousel = container.querySelector('.services-carousel');
    const cards = Array.from(carousel.querySelectorAll('.service-card'));
    let currentIndex = 0;
    let intervalId;
    let isPaused = false;

    function updateCards() {
      cards.forEach((card, index) => {
        card.classList.remove('left', 'center', 'right', 'active');
        
        const diff = (index - currentIndex + cards.length) % cards.length;
        
        if (diff === 1) {
          card.classList.add('right');
        } else if (diff === cards.length - 1) {
          card.classList.add('left');
        } else if (index === currentIndex) {
          card.classList.add('center');
        } else {
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
        }
      });
    }

    function startCarousel() {
      intervalId = setInterval(() => {
        if (!isPaused) {
          currentIndex = (currentIndex + 1) % cards.length;
          updateCards();
        }
      }, 3000);
    }

    // Handle card clicks
    carousel.addEventListener('click', (e) => {
      const card = e.target.closest('.service-card');
      if (!card || !card.classList.contains('center')) return;
      
      if (card.classList.contains('active')) {
        card.classList.remove('active');
        isPaused = false;
        startCarousel();
      } else {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        isPaused = true;
        clearInterval(intervalId);
      }
    });

    // Handle touch events
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      if (Math.abs(touchEndX - touchStartX) > 50) {
        currentIndex = touchEndX < touchStartX ? 
          (currentIndex + 1) % cards.length : 
          (currentIndex - 1 + cards.length) % cards.length;
        updateCards();
      }
    });

    // Initialize
    updateCards();
    startCarousel();
  });
}
