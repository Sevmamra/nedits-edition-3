export function initTestimonials() {
  const testimonials = document.querySelectorAll('.testimonial');
  if (!testimonials.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transition = `all 0.6s ${index * 0.1}s ease`;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  testimonials.forEach((t, i) => {
    t.style.opacity = '0';
    t.style.transform = i % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
    observer.observe(t);
  });
}
