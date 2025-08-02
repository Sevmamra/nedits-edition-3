export function initTypewriter() {
  const aboutText = document.getElementById('about-text');
  if (!aboutText) return;

  const fullText = aboutText.textContent;
  aboutText.textContent = '';
  let i = 0;
  let timeoutId;

  function type() {
    if (i < fullText.length) {
      aboutText.textContent += fullText.charAt(i++);
      timeoutId = setTimeout(type, 25);
    }
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      type();
      observer.unobserve(aboutText);
    } else {
      clearTimeout(timeoutId);
    }
  }, { threshold: 0.5 });

  observer.observe(aboutText);

  // Pause when tab is inactive
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearTimeout(timeoutId);
    } else if (observer.takeRecords().some(entry => entry.isIntersecting)) {
      type();
    }
  });
}
