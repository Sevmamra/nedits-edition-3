import { debounce } from './lib/helpers.js';

export function initPage() {
  // Update copyright year
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Handle window resize
  window.addEventListener('resize', debounce(() => {
    // Responsive adjustments here
  }, 200));
}
