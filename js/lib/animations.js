export function initAnimations() {
  // Section heading animations
  const h2Titles = document.querySelectorAll('.section h2');
  
  h2Titles.forEach(h2 => {
    h2.style.opacity = '0';
    h2.style.transform = 'translateY(20px)';
    h2.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(h2);
  });
}
