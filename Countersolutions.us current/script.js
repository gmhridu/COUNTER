// Optimized JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Initialize gallery
    const galleries = document.querySelectorAll('.showroom-gallery');
    const categories = ['marble', 'granite', 'quartz'];

    function showCategory(category) {
        // Hide all collections first
        const collections = ['marble', 'granite', 'quartz'];
        collections.forEach(cat => {
            const element = document.getElementById(cat);
            if (element) {
                element.classList.add('hidden');
            }
        });

        // Show the selected collection
        const selectedCollection = document.getElementById(category);
        if (selectedCollection) {
            selectedCollection.classList.remove('hidden');
            selectedCollection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Initialize logo animation
    createLogoParticles();
    setTimeout(() => {
        const logoContainer = document.getElementById('logo-container');
        const mainContent = document.getElementById('main-content');
        
        if (logoContainer && mainContent) {
            logoContainer.style.opacity = '0';
            setTimeout(() => {
                logoContainer.classList.add('hidden');
                mainContent.classList.add('show');
                mainContent.classList.remove('hidden');
            }, 500);
        }
    }, 1500);

    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Initialize high-tech features
    initializeHighTechFeatures();

    // Initialize quote calculator
    const quoteForm = document.getElementById('quoteForm');
    const materialOptions = document.querySelectorAll('.material-option');
    const sqftRange = document.getElementById('sqft-range');
    const sqftInput = document.getElementById('sqft');
    const estPriceContainer = document.getElementById('est-price-container');
    const priceDisplay = document.getElementById('price');
    const progressSteps = document.querySelectorAll('.flex.flex-col.items-center');
    let currentStep = 0;
    let selectedMaterial = null;
    let pricePerSqft = 0;
    let userEmail = '';
    let userPhone = '';
    const pricePerSqftDisplay = document.getElementById('price-per-sqft');
    const totalSqftDisplay = document.getElementById('total-sqft');

    // Initialize the quote calculator when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Add smooth scroll to quote calculator
        const quoteSection = document.getElementById('get-estimate-price-section');
        if (quoteSection) {
            quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Initialize material selection with enhanced engagement
        const materialOptions = document.querySelectorAll('.material-option');
        const squareFootageSection = document.querySelector('.max-w-2xl.mx-auto.bg-white.rounded-xl.p-8.shadow-lg.mb-12');
        const progressBar = document.querySelector('.progress-bar');
        const stepNumbers = document.querySelectorAll('.step-number');

        materialOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove selected class from all options
                materialOptions.forEach(opt => opt.classList.remove('selected'));
                // Add selected class to clicked option
                option.classList.add('selected');
                selectedMaterial = option;
                
                // Update price if square footage is already entered
                if (sqftInput.value > 0) {
                    updatePriceDisplay();
                }
            });
        });

        // Square footage input
        sqftInput.addEventListener('input', () => {
            sqftRange.value = sqftInput.value;
            if (selectedMaterial) {
                updatePriceDisplay();
            }
        });

        sqftRange.addEventListener('input', () => {
            sqftInput.value = sqftRange.value;
            if (selectedMaterial) {
                updatePriceDisplay();
            }
        });

        function updatePriceDisplay() {
            if (!selectedMaterial) return;
            
            const sqft = parseFloat(sqftInput.value) || 0;
            const pricePerSqft = parseFloat(selectedMaterial.dataset.price);
            const totalPrice = sqft * pricePerSqft;
            
            // Update price display with animation
            priceDisplay.classList.add('price-update');
            priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
            
            // Update price per square foot
            pricePerSqftDisplay.textContent = `$${pricePerSqft.toFixed(2)}/sqft`;
            
            // Update total square footage
            totalSqftDisplay.textContent = `${sqft} sqft`;
            
            // Remove animation class after animation completes
            setTimeout(() => {
                priceDisplay.classList.remove('price-update');
            }, 500);
        }

        // Initialize get quote button with enhanced conversion focus
        const getQuoteBtn = document.getElementById('get-quote-btn');
        if (getQuoteBtn) {
            getQuoteBtn.addEventListener('click', (event) => {
                event.preventDefault();
                
                if (!selectedMaterial || !sqftInput || sqftInput.value <= 0) {
                    alert('Please select a material and enter a valid square footage to proceed.');
                    return;
                }

                // Show the contact popup
                // const contactPopup = document.getElementById('contactPopup');
                // if (contactPopup) {
                //     // Update popup content
                //     const summaryMaterial = document.getElementById('summary-material');
                //     const summaryUnits = document.getElementById('summary-units');
                //     const summaryPrice = document.getElementById('summary-estimatedprice');

                //     if (summaryMaterial) summaryMaterial.textContent = selectedMaterial.dataset.value;
                //     if (summaryUnits) summaryUnits.textContent = `${sqftInput.value} sqft`;
                //     if (summaryPrice) summaryPrice.textContent = priceDisplay.textContent;

                //     // Show popup with animation
                //     contactPopup.classList.remove('hidden');
                //     contactPopup.style.opacity = '0';
                //     contactPopup.style.transform = 'scale(0.95)';
                    
                //     // Force reflow
                //     contactPopup.offsetHeight;
                    
                //     // Animate in
                //     contactPopup.style.transition = 'all 0.3s ease-out';
                //     contactPopup.style.opacity = '1';
                //     contactPopup.style.transform = 'scale(1)';
                // }
            });
        }
    });

    // // Show contact popup with enhanced conversion focus
    // function showContactPopup() {
    //     const contactPopup = document.getElementById('contactPopup');
    //     if (contactPopup) {
    //         // Remove hidden class to show popup
    //         contactPopup.classList.remove('hidden');
            
    //         // Update the summary in the popup
    //         const summaryMaterial = document.getElementById('summary-material');
    //         const summaryUnits = document.getElementById('summary-units');
    //         const summaryPrice = document.getElementById('summary-estimatedprice');
            
    //         if (summaryMaterial) summaryMaterial.textContent = selectedMaterial.dataset.value;
    //         if (summaryUnits) summaryUnits.textContent = `${document.getElementById('sqft').value} sqft`;
            
    //         // Calculate and display price
    //         const totalPrice = (pricePerSqft * parseFloat(document.getElementById('sqft').value) || 0).toFixed(2);
    //         if (summaryPrice) summaryPrice.textContent = `$${totalPrice}`;
            
    //         // Initialize the booking process
    //         currentStep = 1;
    //         updateSteps();
            
    //         // Add animation to the popup
    //         contactPopup.style.opacity = '0';
    //         contactPopup.style.transform = 'scale(0.95)';
    //         contactPopup.style.transition = 'all 0.3s ease-out';
            
    //         setTimeout(() => {
    //             contactPopup.style.opacity = '1';
    //             contactPopup.style.transform = 'scale(1)';
    //         }, 50);

    //         // Add exit intent tracking
    //         document.addEventListener('mouseleave', handleExitIntent);
    //     }
    // }

    // Handle exit intent
    function handleExitIntent(e) {
        if (e.clientY <= 0) {
            // Show special offer or reminder
            const specialOffer = document.createElement('div');
            specialOffer.className = 'fixed top-4 right-4 bg-theme-color text-white px-4 py-2 rounded-lg shadow-lg animate-bounce';
            specialOffer.innerHTML = `
                <p class="font-semibold">Special Offer!</p>
                <p>Complete your quote now and get 5% off!</p>
            `;
            document.body.appendChild(specialOffer);
            
            setTimeout(() => {
                specialOffer.remove();
            }, 5000);
        }
    }

    // Update the progress steps with enhanced UX
    function updateSteps() {
        const steps = document.querySelectorAll('.step-number');
        const stepLabels = ['info-step', 'schedule-step', 'confirm-step'];
        
        steps.forEach((step, index) => {
            step.classList.remove('current', 'completed');
            if (index < currentStep) {
                step.classList.add('completed');
            } else if (index === currentStep) {
                step.classList.add('current');
            }
        });
        
        // Show/hide appropriate step content
        document.querySelectorAll('.booking-step').forEach((step, index) => {
            if (index === currentStep - 1) {
                step.classList.remove('hidden');
            } else {
                step.classList.add('hidden');
            }
        });
        
        // Update button visibility and text
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.classList.toggle('hidden', currentStep === 1);
        }
        
        if (nextBtn) {
            if (currentStep === 3) {
                nextBtn.textContent = 'Confirm Booking';
                nextBtn.classList.add('bg-green-500', 'hover:bg-green-600');
            } else {
                nextBtn.textContent = 'Next';
                nextBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
            }
        }
    }

    // Handle final booking confirmation with enhanced conversion focus
    function confirmBooking() {
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            // Update summary with form data
            const formData = new FormData(bookingForm);
            userEmail = formData.get('email');
            userPhone = formData.get('phone');
            
            document.getElementById('summary-name').textContent = formData.get('fullName');
            document.getElementById('summary-phonenumber').textContent = userPhone;
            document.getElementById('summary-email').textContent = userEmail;
            document.getElementById('summary-address').textContent = formData.get('address');
            document.getElementById('summary-date').textContent = selectedDate;
            document.getElementById('summary-time').textContent = selectedTime;
            
            // Show confirmation message with enhanced UX
            const bookingStepInnerDiv = document.getElementById('booking-step-inner-div');
            if (bookingStepInnerDiv) {
                bookingStepInnerDiv.classList.remove('hidden');
                bookingStepInnerDiv.innerHTML = `
                    <div class="text-center">
                        <div class="text-4xl mb-4">🎉</div>
                        <h3 class="text-2xl font-bold text-theme-color mb-2">Booking Confirmed!</h3>
                        <p class="text-gray-600 mb-4">We'll send you a confirmation email shortly.</p>
                        <div class="flex justify-center gap-4">
                            <a href="tel:${userPhone}" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                                Call Us Now
                            </a>
                            <a href="mailto:${userEmail}" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                                Email Us
                            </a>
                        </div>
                    </div>
                `;
            }
            
            // Hide the form
            bookingForm.classList.add('hidden');
            
            // Track conversion
            trackConversion();
        }
    }

    // Track conversion
    function trackConversion() {
        // Here you would typically send data to your analytics platform
        console.log('Conversion tracked:', {
            material: selectedMaterial.dataset.value,
            price: pricePerSqft,
            email: userEmail,
            phone: userPhone
        });
    }

    // Initialize navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateSteps();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentStep < 3) {
                currentStep++;
                updateSteps();
            } else if (currentStep === 3) {
                confirmBooking();
            }
        });
    }
});

// Optimized particle creation
function createLogoParticles() {
    const container = document.getElementById('logo-container');
    if (!container) return;

    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        createSparkle(container);
    }
}

// Optimized sparkle creation
function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.className = 'logo-particle';
    
    const size = Math.random() * 4 + 2;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    sparkle.style.left = `${x}%`;
    sparkle.style.top = `${y}%`;
    
    container.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// Show Gallery
function showCategory(category) {
    // Hide all collections first
    const collections = ['marble', 'granite', 'quartz'];
    collections.forEach(cat => {
        const element = document.getElementById(cat);
        if (element) {
            element.classList.add('hidden');
        }
    });

    // Show the selected collection
    const selectedCollection = document.getElementById(category);
    if (selectedCollection) {
        selectedCollection.classList.remove('hidden');
        selectedCollection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

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
    }, 1500);
};

// Best Sellers Collection Cards Animation

// Initial values
let countdownMinutes = 59;
let countdownSeconds = 59;

function updateReverseCountdown() {
    const minutesDisplay = document.getElementById("countdown-minutes");
    const secondsDisplay = document.getElementById("countdown-seconds");

    // Update the display
    minutesDisplay.textContent = String(countdownMinutes).padStart(2, "0");
    secondsDisplay.textContent = String(countdownSeconds).padStart(2, "0");

    // Countdown logic
    if (countdownSeconds > 0) {
        countdownSeconds--;
    } else {
        if (countdownMinutes > 0) {
            countdownMinutes--;
            countdownSeconds = 59;
        } else {
            // Reset when reaching 00:00
            countdownMinutes = 59;
            countdownSeconds = 59;
        }
    }
}

// Start countdown (updates every second)
setInterval(updateReverseCountdown, 1000);

// Card Animation
function initializeHighTechFeatures() {
    // Parallax effect for category cards
    const cards = document.querySelectorAll('.category-card-2');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });
}

// Initialize features when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeHighTechFeatures();

    // Add smooth scroll for all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function (e) {
            const target = this.getAttribute('data-scroll-to');
            if (target) {
                e.preventDefault();
                document.querySelector(target).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function () {
    // Add smooth scroll with gold progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
});

// Lightbox functionality
function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxName = document.getElementById('lightbox-name');
    const lightboxDescription = document.getElementById('lightbox-description');

    // Set image source and info
    lightboxImg.src = imgElement.src;
    lightboxName.textContent = imgElement.dataset.name;
    lightboxDescription.textContent = imgElement.dataset.description;

    // Show lightbox with animation
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    
    // Add zoom animation
    lightboxImg.style.transform = 'scale(0.8)';
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    
    // Trigger animation
    setTimeout(() => {
        lightboxImg.style.transform = 'scale(1)';
        lightboxImg.style.opacity = '1';
    }, 50);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    // Add zoom out animation
    lightboxImg.style.transform = 'scale(0.8)';
    lightboxImg.style.opacity = '0';
    
    // Hide lightbox after animation
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        lightboxImg.style.transform = 'scale(1)';
        lightboxImg.style.opacity = '1';
    }, 300);
}

// Add click handlers for images when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for all images with image-thumb class
    document.querySelectorAll('.image-thumb').forEach(img => {
        img.addEventListener('click', () => openLightbox(img));
    });

    // Close lightbox when clicking outside the image
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target === document.getElementById('lightbox')) {
            closeLightbox();
        }
    });

    // Close lightbox when clicking the close button
    document.getElementById('close-lightbox').addEventListener('click', closeLightbox);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Remove the scroll offer initialization
    // if (!localStorage.getItem('offerClosed')) {
    //     setTimeout(() => {
    //         scrollOffer.style.display = 'block';
    //         initializeCountdown();
    //     }, 1000);
    // }
});

// Update the countdown timer function
function initializeCountdown() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setHours(now.getHours() + 24);

    function updateCountdown() {
        const currentTime = new Date();
        const timeDifference = tomorrow - currentTime;

        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Video Background Handling
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('bg-hero-video');
    const videoLoading = document.getElementById('video-loading');
    
    if (video) {
        // Handle video loading
        video.addEventListener('loadeddata', () => {
            // Hide loading indicator
            if (videoLoading) {
                videoLoading.style.opacity = '0';
                setTimeout(() => {
                    videoLoading.style.display = 'none';
                }, 500);
            }
            // Show video
            video.style.opacity = '1';
        });

        // Handle video playback errors
        video.addEventListener('error', (e) => {
            console.error('Error loading video:', e);
            // Hide video and loading indicator
            video.style.display = 'none';
            if (videoLoading) {
                videoLoading.style.display = 'none';
            }
            // Show fallback image
            const fallbackImage = video.querySelector('img');
            if (fallbackImage) {
                fallbackImage.style.display = 'block';
            }
        });

        // Ensure video plays on mobile devices
        const playVideo = () => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch((e) => {
                    console.warn('Autoplay prevented:', e);
                    // Show play button or handle autoplay prevention
                    if (videoLoading) {
                        videoLoading.innerHTML = `
                            <button class="bg-theme-color text-white px-4 py-2 rounded-lg" onclick="document.getElementById('bg-hero-video').play()">
                                <i class="fas fa-play mr-2"></i>Play Video
                            </button>
                        `;
                    }
                });
            }
        };

        // Try to play video when it becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    playVideo();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(video);

        // Handle user interaction
        document.addEventListener('click', playVideo, { once: true });
        
        // Handle visibility change
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
                playVideo();
            } else {
                video.pause();
            }
        });
    }
});

// < !--Update the JavaScript-- >

// Update scroll detection for mobile
// window.addEventListener('scroll', () => {
//     const scrollPosition = window.scrollY;
//     const isMobile = window.innerWidth <= 768;

//     if (!offerShown && scrollPosition > 300) { // Show after 300px scroll
//         scrollOffer.classList.add('slide-in');
//         scrollOffer.classList.remove('slide-out');
//         offerShown = true;
//     }
// });

// Add touch event handlers
// let touchStartY = 0;

// scrollOffer.addEventListener('touchstart', (e) => {
//     touchStartY = e.touches[0].clientY;
// });

// scrollOffer.addEventListener('touchmove', (e) => {
//     const touchEndY = e.touches[0].clientY;
//     const diff = touchStartY - touchEndY;
// });

// Mobile Bottom close
// document.getElementById("closeOffer").addEventListener("click", function () {
//     document.getElementById("scrollOffer").style.display = "none";
// });

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-in {
        animation: fade-in 0.5s ease-out forwards;
    }

    .material-option {
        transition: all 0.3s ease;
    }

    .material-option:hover {
        transform: translateY(-5px);
    }

    #get-quote-btn {
        transition: all 0.3s ease;
    }

    #get-quote-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);

// Function to initialize calendar for date selection
function initializeCalendar() {
    const calendar = document.querySelector('.calendar-grid');
    const timeSlots = document.getElementById("time-slots-parent");
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    // Show next 30 days of availability
    const daysToShow = 30;
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 1); // Start from tomorrow

    // Hide the time slots div by default
    timeSlots.style.display = 'none';

    calendar.innerHTML = '';

    // Add month and year header
    const monthYearHeader = document.createElement('div');
    monthYearHeader.className = 'col-span-7 text-center font-semibold text-theme-color mb-2';
    monthYearHeader.textContent = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(startDate);
    calendar.appendChild(monthYearHeader);

    // Days of the week headers
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'text-center text-sm font-medium text-gray-500';
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    // Generate calendar days
    for (let i = 0; i < daysToShow; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day p-2 text-center cursor-pointer border rounded-lg transition-all duration-200 hover:bg-theme-color/10';
        dayElement.textContent = date.getDate();

        // Disable weekends and past dates
        if (date < today || date.getDay() === 0 || date.getDay() === 6) {
            dayElement.classList.add('disabled', 'text-gray-400', 'cursor-not-allowed', 'opacity-50');
        } else {
            dayElement.addEventListener('click', () => selectDate(date, dayElement));
        }

        calendar.appendChild(dayElement);
    }
}

// Function to handle date selection with enhanced feedback
function selectDate(date, element) {
    const timeSlotsParent = document.getElementById("time-slots-parent");
    timeSlotsParent.style.display = 'block';

    // Animate the selection
    if (selectedDateElement) {
        selectedDateElement.classList.remove('bg-theme-color', 'text-white', 'scale-110');
        selectedDateElement.classList.add('hover:bg-theme-color/10');
    }

    selectedDate = date.toDateString();
    selectedDateElement = element;
    element.classList.remove('hover:bg-theme-color/10');
    element.classList.add('bg-theme-color', 'text-white', 'scale-110');

    // Add smooth transition for time slots
    timeSlotsParent.style.opacity = '0';
    timeSlotsParent.style.transition = 'opacity 0.3s ease-in-out';
    setTimeout(() => {
        timeSlotsParent.style.opacity = '1';
    }, 50);

    // Update time slots availability
    disableBookedSlotsForSelectedDate(selectedDate);
}

// Function to disable booked time slots with enhanced visual feedback
function disableBookedSlots(bookedTimes) {
    const timeSlots = document.querySelectorAll(".time-slot");
    let availableSlots = 0;

    timeSlots.forEach(slot => {
        const time = slot.textContent.trim();
        const isBooked = bookedTimes.includes(time);

        if (isBooked) {
            slot.classList.add("bg-gray-100", "cursor-not-allowed", "opacity-50", "line-through");
            slot.classList.remove("hover:bg-theme-color/10", "hover:scale-105");
            slot.disabled = true;
        } else {
            slot.classList.remove("bg-gray-100", "cursor-not-allowed", "opacity-50", "line-through");
            slot.classList.add("hover:bg-theme-color/10", "hover:scale-105");
            slot.disabled = false;
            availableSlots++;
        }
    });

    // Update availability message
    const availabilityMessage = document.getElementById('availability-message');
    if (availabilityMessage) {
        availabilityMessage.textContent = `${availableSlots} time slots available`;
        availabilityMessage.className = `text-sm ${availableSlots > 0 ? 'text-green-600' : 'text-red-600'}`;
    }
}

// Function to initialize time slot selection with enhanced interaction
function initializeTimeSelection() {
    document.querySelectorAll(".time-slot").forEach(slot => {
        slot.addEventListener("click", () => {
            if (!slot.disabled) {
                // Animate deselection of other slots
                document.querySelectorAll(".time-slot").forEach(s => {
                    s.classList.remove("bg-theme-color", "text-white", "scale-110");
                    s.classList.add("hover:bg-theme-color/10", "hover:scale-105");
                });

                // Animate selection of clicked slot
                slot.classList.remove("hover:bg-theme-color/10", "hover:scale-105");
                slot.classList.add("bg-theme-color", "text-white", "scale-110");
                selectedTimeSlot = slot;

                // Enable the next button with animation
                const nextBtn = document.getElementById('nextBtn');
                if (nextBtn) {
                    nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    nextBtn.classList.add('hover:bg-theme-color/90', 'scale-105');
                    nextBtn.disabled = false;
                }
            }
        });
    });
}

// Enhanced booking confirmation
function confirmBooking() {
    const bookingData = {
        fullName,
        phone,
        email,
        address,
        selectedDate,
        selectedTime: selectedTimeSlot ? selectedTimeSlot.textContent : "No time selected",
        material,
        sqft,
        price
    };

    // Show loading state
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.innerHTML = '<span class="animate-spin">⌛</span> Confirming...';
        nextBtn.disabled = true;
    }

    // Push data to Firebase
    const bookingRef = ref(database, 'bookings');
    const newBookingRef = push(bookingRef);

    set(newBookingRef, bookingData)
        .then(() => {
            // Show success message with animation
            const successMessage = document.createElement('div');
            successMessage.className = 'fixed top-0 left-0 w-full bg-green-500 text-white p-4 text-center animate-fade-in';
            successMessage.innerHTML = `
                <div class="container mx-auto">
                    <p class="text-lg font-semibold">🎉 Appointment Confirmed!</p>
                    <p class="text-sm">We'll send you a confirmation email shortly.</p>
                </div>
            `;
            document.body.appendChild(successMessage);

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.add('animate-fade-out');
                setTimeout(() => successMessage.remove(), 500);
            }, 5000);

            // Reset form and show next steps
            resetBookingForm();
            showNextSteps();
        })
        .catch((error) => {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'fixed top-0 left-0 w-full bg-red-500 text-white p-4 text-center animate-fade-in';
            errorMessage.innerHTML = `
                <div class="container mx-auto">
                    <p class="text-lg font-semibold">⚠️ Booking Failed</p>
                    <p class="text-sm">Please try again or contact us directly.</p>
                </div>
            `;
            document.body.appendChild(errorMessage);

            // Remove error message after 5 seconds
            setTimeout(() => {
                errorMessage.classList.add('animate-fade-out');
                setTimeout(() => errorMessage.remove(), 500);
            }, 5000);

            // Reset button state
            if (nextBtn) {
                nextBtn.textContent = 'Confirm Booking';
                nextBtn.disabled = false;
            }
        });
}

// Function to show next steps after successful booking
function showNextSteps() {
    const nextSteps = document.createElement('div');
    nextSteps.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in';
    nextSteps.innerHTML = `
        <div class="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <h3 class="text-2xl font-bold text-theme-color mb-4">Next Steps</h3>
            <ol class="space-y-4 text-gray-700">
                <li class="flex items-start">
                    <span class="flex-shrink-0 w-6 h-6 bg-theme-color text-white rounded-full flex items-center justify-center mr-2">1</span>
                    <span>Check your email for confirmation and preparation instructions</span>
                </li>
                <li class="flex items-start">
                    <span class="flex-shrink-0 w-6 h-6 bg-theme-color text-white rounded-full flex items-center justify-center mr-2">2</span>
                    <span>Our team will call you within 24 hours to confirm details</span>
                </li>
                <li class="flex items-start">
                    <span class="flex-shrink-0 w-6 h-6 bg-theme-color text-white rounded-full flex items-center justify-center mr-2">3</span>
                    <span>Prepare your space for our visit</span>
                </li>
            </ol>
            <button onclick="this.closest('.fixed').remove()" class="mt-6 w-full bg-theme-color text-white py-2 px-4 rounded-lg hover:bg-theme-color/90 transition">
                Got it, thanks!
            </button>
        </div>
    `;
    document.body.appendChild(nextSteps);
}

// Function to handle the "Get Detailed Quote & Save 5%" button click
function handleDetailedQuoteClick() {
    // Get the current material and square footage values
    const material = document.getElementById('material').value;
    const sqft = parseFloat(document.getElementById('sqft').value) || 0;
    
    // Validate inputs
    if (!material || sqft <= 0) {
        alert('Please select a material and enter a valid square footage to get a detailed quote.');
        return;
    }

    // Calculate the price with 5% discount
    const basePrice = materialPrices[material] * sqft;
    const discountedPrice = basePrice * 0.95; // 5% discount

    // Show the contact popup with the discounted price
    const contactPopup = document.getElementById('contactPopup');
    if (contactPopup) {
        // Update the price display in the popup
        const priceDisplay = contactPopup.querySelector('#summaryEstimatedPrice');
        if (priceDisplay) {
            priceDisplay.textContent = `$${discountedPrice.toFixed(2)} (5% discount applied)`;
        }
        
        // Show the popup
        contactPopup.classList.remove('hidden');
        
        // Initialize the booking process
        currentStep = 1;
        updateSteps();
    }
}

// Add event listener for the detailed quote button
document.addEventListener('DOMContentLoaded', () => {
    const detailedQuoteBtn = document.getElementById('detailed-quote-btn');
    if (detailedQuoteBtn) {
        detailedQuoteBtn.addEventListener('click', handleDetailedQuoteClick);
    }
});

// Helper function to calculate total price
function calculateTotalPrice() {
    const sqftInput = document.getElementById('sqft');
    if (pricePerSqft && sqftInput && sqftInput.value > 0) {
        return (pricePerSqft * sqftInput.value).toFixed(2);
    }
    return '0.00';
}

// Function to update progress bar
function updateProgressBar(step) {
    const steps = document.querySelectorAll('.step-number');
    steps.forEach((stepElement, index) => {
        const circle = stepElement.querySelector('div');
        const text = stepElement.querySelector('span');
        
        if (index < step) {
            // Completed steps
            circle.classList.add('bg-theme-color', 'text-white');
            circle.classList.remove('bg-gray-200', 'text-gray-600');
            text.classList.add('text-theme-color');
            text.classList.remove('text-gray-600');
        } else if (index === step) {
            // Current step
            circle.classList.add('bg-theme-color', 'text-white');
            circle.classList.remove('bg-gray-200', 'text-gray-600');
            text.classList.add('text-theme-color');
            text.classList.remove('text-gray-600');
        } else {
            // Future steps
            circle.classList.add('bg-gray-200', 'text-gray-600');
            circle.classList.remove('bg-theme-color', 'text-white');
            text.classList.add('text-gray-600');
            text.classList.remove('text-theme-color');
        }
    });
}

