export async function loadServices() {
  try {
    const response = await fetch('../data/services.json');
    if (!response.ok) throw new Error('Failed to load services');
    
    const { services } = await response.json();
    const container = document.getElementById('services-container');
    
    services.forEach(category => {
      const categoryHTML = `
        <div class="services-category" data-aos="fade-up">
          <div class="category-header">
            <img src="images/${category.icon}" alt="${category.category}"/>
            <h3>${category.category}</h3>
          </div>
          <div class="services-container">
            <div class="services-carousel">
              ${category.items.map(service => `
                <div class="service-card">
                  <div class="card-content">
                    <h4>${service.title}</h4>
                    <p>${service.description}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', categoryHTML);
    });

    return true;
  } catch (error) {
    console.error('Error loading services:', error);
    document.getElementById('services-container').innerHTML = `
      <div class="error-message">
        <p>Services failed to load. Please refresh the page.</p>
      </div>
    `;
    return false;
  }
}
