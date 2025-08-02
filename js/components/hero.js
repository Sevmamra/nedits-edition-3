export function initHero() {
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

  // Preload images
  imgs.forEach(src => {
    new Image().src = src;
  });

  let current = 0;
  
  function changeBg() {
    hero.style.opacity = '0';
    setTimeout(() => {
      current = (current + 1) % imgs.length;
      hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${imgs[current]}')`;
      hero.style.opacity = '1';
    }, 500);
  }

  // Initial background
  hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${imgs[0]}')`;
  
  // Change every 5 seconds
  setInterval(changeBg, 5000);
}
