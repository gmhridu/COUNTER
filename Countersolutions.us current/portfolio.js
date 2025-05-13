// Logo Animation
window.onload = () => {
    createLogoParticles();

    setTimeout(() => {
        document.getElementById('logo-container').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('logo-container').classList.add('hidden');
            document.getElementById('main-content').classList.add('show');
            document.getElementById('main-content').classList.remove('hidden');
        }, 500);
    }, 1000);
};


// Add this to your existing JavaScript
function createLogoParticles() {
    const container = document.getElementById('logo-container');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'logo-particle';

            // Random position around the logo
            particle.style.left = `${50 + (Math.random() - 0.5) * 30}%`;
            particle.style.top = `${50 + (Math.random() - 0.5) * 30}%`;

            container.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }, i * 100);
    }
}



// Testimonials Slider
const slider = document.getElementById('testimonialSlider');
let currentSlide = 0;
const slides = slider.children.length;

document.getElementById('testimonialPrevBtn').addEventListener('click', () => {
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : 0;
    updateSlider();
});

document.getElementById('testimonialNextBtn').addEventListener('click', () => {
    currentSlide = (currentSlide < slides - 1) ? currentSlide + 1 : slides - 1;
    updateSlider();
});

function updateSlider() {
    const slideWidth = slider.children[0].offsetWidth;
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}


function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");

    const navbar = document.querySelector(".sparkle-container");
    const maxWidth = navbar.clientWidth;
    const maxHeight = navbar.clientHeight;

    // Set random position within navbar
    sparkle.style.left = `${Math.random() * maxWidth}px`;
    sparkle.style.top = `${Math.random() * maxHeight}px`;

    // Set random movement in X and Y direction (smaller movement)
    sparkle.style.setProperty("--x-move", `${Math.random() * 10 - 5}px`); // Move -5px to +5px
    sparkle.style.setProperty("--y-move", `${Math.random() * 10 - 5}px`); // Move -5px to +5px

    // Random animation duration (longer for slower effect)
    sparkle.style.animationDuration = `${4 + Math.random() * 2}s`;

    navbar.appendChild(sparkle);

    // Remove sparkle after animation completes
    setTimeout(() => {
        sparkle.remove();
    }, 6000);
}

// Generate sparkles every 500ms (slower appearance)
setInterval(createSparkle, 500);

// Portfolio Data
const portfolioData = [
    {
        id: 1,
        image: 'images/portfolio/kitchen-1.jpg',
        title: 'Modern Kitchen Renovation',
        description: 'Complete kitchen transformation with premium granite countertops',
        categories: ['kitchen', 'granite'],
        value_increase: '$15,000',
        completion_time: '2 weeks',
        features: ['Custom edge profile', 'Undermount sink', 'Waterfall island']
    },
    {
        id: 2,
        image: 'images/portfolio/bathroom-1.jpg',
        title: 'Luxury Master Bathroom',
        description: 'Elegant marble vanity tops with double sinks',
        categories: ['bathroom', 'marble'],
        value_increase: '$8,000',
        completion_time: '1 week',
        features: ['Double vanity', 'Custom backsplash', 'Integrated towel bar']
    },
    {
        id: 3,
        image: 'images/portfolio/kitchen-2.jpg',
        title: 'Contemporary Kitchen Island',
        description: 'Stunning quartz waterfall island with breakfast bar',
        categories: ['kitchen', 'quartz'],
        value_increase: '$12,000',
        completion_time: '10 days',
        features: ['Waterfall edges', 'Extended overhang', 'Hidden storage']
    },
    {
        id: 4,
        image: 'images/portfolio/bathroom-2.jpg',
        title: 'Spa-Like Bathroom Remodel',
        description: 'Natural granite countertops with matching shower bench',
        categories: ['bathroom', 'granite'],
        value_increase: '$10,000',
        completion_time: '1.5 weeks',
        features: ['Custom shower bench', 'Integrated sink', 'Natural stone finish']
    },
    {
        id: 5,
        image: 'images/portfolio/kitchen-3.jpg',
        title: 'Minimalist Kitchen Design',
        description: 'Pure white quartz countertops with seamless integration',
        categories: ['kitchen', 'quartz'],
        value_increase: '$18,000',
        completion_time: '2 weeks',
        features: ['Seamless joints', 'Integrated drainboard', 'LED underlighting']
    },
    {
        id: 6,
        image: 'images/portfolio/bathroom-3.jpg',
        title: 'Classic Marble Vanity',
        description: 'Timeless marble vanity with custom edge detail',
        categories: ['bathroom', 'marble'],
        value_increase: '$7,000',
        completion_time: '1 week',
        features: ['Custom edge detail', 'Matching backsplash', 'Built-in soap dish']
    }
];

// DOM Elements
const portfolioGrid = document.querySelector('.portfolio-grid');
const filterButtons = document.querySelectorAll('.filter-button');
const searchInput = document.getElementById('portfolioSearch');
const loadingContainer = document.getElementById('loading-container');
const mainContent = document.getElementById('main-content');

// Initialize Portfolio
function initializePortfolio() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Setup event listeners
    setupEventListeners();

    // Render all portfolio items initially
    renderPortfolioItems(portfolioData);

    // Handle loading animation
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingContainer.classList.add('fade-out');
            mainContent.classList.remove('hidden');
            mainContent.classList.add('animate-fade-in');
        }, 1000);
    });
}

// Render Portfolio Items
function renderPortfolioItems(items) {
    portfolioGrid.innerHTML = '';
    
    items.forEach((item, index) => {
        const delay = index * 100;
        const itemElement = document.createElement('div');
        itemElement.className = 'portfolio-item';
        itemElement.setAttribute('data-aos', 'fade-up');
        itemElement.setAttribute('data-aos-delay', delay.toString());
        
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="portfolio-image">
            <div class="portfolio-overlay">
                <h3 class="text-xl font-bold mb-2">${item.title}</h3>
                <p class="text-sm mb-4">${item.description}</p>
                <div class="flex flex-wrap gap-2 mb-3">
                    ${item.categories.map(cat => `
                        <span class="text-xs bg-white/20 px-2 py-1 rounded-full">${cat}</span>
                    `).join('')}
                </div>
                <div class="text-sm">
                    <p>Value Increase: ${item.value_increase}</p>
                    <p>Completion Time: ${item.completion_time}</p>
                </div>
                <ul class="mt-3 text-sm">
                    ${item.features.map(feature => `
                        <li class="flex items-center gap-2">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                            ${feature}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
        
        portfolioGrid.appendChild(itemElement);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            const filteredItems = category === 'all' 
                ? portfolioData 
                : portfolioData.filter(item => item.categories.includes(category));
            
            renderPortfolioItems(filteredItems);
        });
    });

    // Search input
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredItems = portfolioData.filter(item => 
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.categories.some(cat => cat.toLowerCase().includes(searchTerm))
        );
        renderPortfolioItems(filteredItems);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePortfolio);
