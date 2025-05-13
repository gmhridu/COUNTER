// Calendar and Time Slot Initialization
function initializeCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    if (!calendarGrid) return;
    
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Clear existing days
    while (calendarGrid.children.length > 7) {
        calendarGrid.removeChild(calendarGrid.lastChild);
    }
    
    // Get first day of month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startingDay = firstDay.getDay();
    
    // Get days in month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Add empty cells for days before first day
    for (let i = 0; i < startingDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-day', 'disabled');
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day');
        dayCell.textContent = i;
        
        const currentDate = new Date(currentYear, currentMonth, i);
        
        // Disable past days and weekends
        if (currentDate < today || currentDate.getDay() === 0 || currentDate.getDay() === 6) {
            dayCell.classList.add('disabled');
        } else {
            dayCell.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Remove selected class from all days
                document.querySelectorAll('.calendar-day').forEach(day => {
                    day.classList.remove('selected');
                });
                
                // Add selected class to clicked day
                this.classList.add('selected');
                
                // Update the selected date in the form
                const selectedDate = new Date(currentYear, currentMonth, i);
                const dateInput = document.getElementById('selected-date');
                if (dateInput) {
                    dateInput.value = selectedDate.toISOString().split('T')[0];
                }
                
                // Update the date display
                const dateDisplay = document.getElementById('selected-date-display');
                if (dateDisplay) {
                    dateDisplay.textContent = selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                }
            });
        }
        
        calendarGrid.appendChild(dayCell);
    }
}

// Initialize time slots
function initializeTimeSlots() {
    const timeSlots = document.querySelectorAll('.time-slot');
    
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            if (!this.classList.contains('disabled')) {
                document.querySelectorAll('.time-slot').forEach(s => {
                    s.classList.remove('selected');
                });
                this.classList.add('selected');
            }
        });
    });
}

// Call initialization functions when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCalendar();
    initializeTimeSlots();
});

// Also initialize calendar when booking section is shown
function showBookingSection() {
    const bookingContainer = document.querySelector('.booking-container');
    if (bookingContainer) {
        bookingContainer.classList.add('visible');
        // Initialize calendar after a short delay to ensure DOM is ready
        setTimeout(initializeCalendar, 100);
    }
} 