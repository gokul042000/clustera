// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
});


// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(current);
        }
    }, 10);
}

// Initialize counters when they come into view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statsElements = entry.target.querySelectorAll('.stat-item h2');
            statsElements.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Stats Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const value = parseInt(stat.getAttribute('data-value'));
        let current = 0;
        const increment = value / 50; // Adjust for animation speed
        const duration = 1500; // Animation duration in milliseconds
        const interval = duration / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= value) {
                stat.textContent = value + '+';
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, interval);
    });
}

// Intersection Observer for Stats Section
const statsSectionNew = document.querySelector('.stats-section');
if (statsSectionNew) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSectionNew);
}

// Stats Counter Animation
let statsAnimated = false;

const animateStatsCounter = () => {
    if (statsAnimated) return;
    
    const stats = document.querySelectorAll('.fact-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50; // Will complete in 50 steps
        const duration = 1500; // 1.5 seconds
        const stepTime = duration / 50;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, stepTime);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
    
    statsAnimated = true;
};

// Intersection Observer for stats animation
const observeStats = () => {
    const statsSection = document.querySelector('.fun-facts-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatsCounter();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3 // Start when 30% of the section is visible
    });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
};

// Logo Marquee Clone
const logoTrack = document.querySelector('.logo-track');
if (logoTrack) {
    // Clone the logos for seamless scrolling
    logoTrack.innerHTML += logoTrack.innerHTML;

    // Pause animation on hover
    logoTrack.addEventListener('mouseenter', () => {
        logoTrack.style.animationPlayState = 'paused';
    });

    logoTrack.addEventListener('mouseleave', () => {
        logoTrack.style.animationPlayState = 'running';
    });
}





// Remove testimonial slider code
/* const slides = document.querySelectorAll('.testimonial-slide');
if (slides.length) {
    // Slider functionality removed
} */

let sliderInitialized = false;

const initializeSlider = () => {
    if (sliderInitialized) return;
    
    const slider = document.querySelector('.campaign-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.campaign-slide');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const progressBar = document.querySelector('.progress-bar');
    
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        // Handle wrapping
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Add active class to new slide
        slides[index].classList.add('active');
        
        // Reset progress bar
        if (progressBar) {
            progressBar.style.width = '0%';
            setTimeout(() => {
                progressBar.style.width = '100%';
            }, 50);
        }

        currentSlide = index;
    }

    function startAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000); // 5 seconds per slide
    }

    // Set initial active slide
    slides[0].classList.add('active');
    
    // Add click events to navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(currentSlide - 1);
            startAutoSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(currentSlide + 1);
            startAutoSlide();
        });
    }

    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Start auto-sliding
    startAutoSlide();
    sliderInitialized = true;
};

// Intersection Observer for slider initialization
const observeSlider = () => {
    const sliderSection = document.querySelector('.campaign-slider-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initializeSlider();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Start when 20% of the slider is visible
    });
    
    if (sliderSection) {
        observer.observe(sliderSection);
    }
};

// Initialize observers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    observeSlider();
    observeStats();
});

// Navbar active state on scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    function onScroll() {
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.querySelector('a').getAttribute('href') === '#' + sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });

        // Special case for home section when at the top
        if (scrollPos < 100) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.querySelector('a').getAttribute('href') === '#home') {
                    item.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', onScroll);
});
