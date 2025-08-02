// Import all components
import { loadServices } from './components/load-services.js';
import { initAnimations } from './lib/animations.js';
import { initHero } from './components/hero.js';
import { initServices } from './components/services.js';
import { initTestimonials } from './components/testimonials.js';
import { initTypewriter } from './components/typewriter.js';
import { initPage } from './init.js';

// Initialize AOS
import AOS from 'aos';
AOS.init();

// Start all components
document.addEventListener('DOMContentLoaded', () => {
  initPage();
  initAnimations();
  initHero();
  await loadServices();
  initServices();
  initTestimonials();
  initTypewriter();
});
