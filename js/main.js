document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. UTILITY FUNCTIONS
    // ==========================================
    // Throttling utility to limit function calls over time
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ==========================================
    // 1.5 COMING SOON POPUP
    // ==========================================
    const comingSoonPopup = document.getElementById('coming-soon-popup');
    if (comingSoonPopup) {
        const closePopupBtn = document.getElementById('close-popup-btn');
        const popupContent = comingSoonPopup.querySelector('.popup-content');
        const closeIcon = comingSoonPopup.querySelector('.close-popup-icon');
        const popupOverlay = comingSoonPopup.querySelector('.popup-overlay');

        function openComingSoonPopup() {
            comingSoonPopup.classList.remove('opacity-0', 'pointer-events-none');
            popupContent.classList.remove('scale-95');
            popupContent.classList.add('scale-100');
        }

        function closeComingSoonPopup() {
            comingSoonPopup.classList.add('opacity-0', 'pointer-events-none');
            popupContent.classList.remove('scale-100');
            popupContent.classList.add('scale-95');
        }

        if(closePopupBtn) closePopupBtn.addEventListener('click', closeComingSoonPopup);
        if(closeIcon) closeIcon.addEventListener('click', closeComingSoonPopup);
        if(popupOverlay) popupOverlay.addEventListener('click', closeComingSoonPopup);

        // Show popup after 1.5 seconds
        setTimeout(openComingSoonPopup, 1500);
    }

    // ==========================================
    // 2. CANVAS PHOTON PARTICLES (HERO BACKGROUND)
    // ==========================================
    // Check for user's motion preference for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = document.getElementById('photon-canvas');

    // Only initialize canvas if it exists and user doesn't prefer reduced motion
    if (canvas && !prefersReducedMotion) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        
        const mouse = {
            x: null,
            y: null,
            radius: 150
        };
        
        window.addEventListener('resize', () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        });
        
        // Track mouse coordinates on hero scroll container
        const heroSection = document.getElementById('scrolly-hero');
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            });
            
            heroSection.addEventListener('mouseleave', () => {
                mouse.x = null;
                mouse.y = null;
            });
        }
        
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.density = (Math.random() * 20) + 15;
            }
            
            draw() {
                ctx.fillStyle = 'rgba(123, 192, 67, 0.7)'; // Slightly more opaque since we removed shadow

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            
            update() {
                // Drift movement
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Wrap around edges
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
                
                // Mouse interaction (repel effect)
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        let forceDirectionX = dx / distance;
                        let forceDirectionY = dy / distance;
                        let force = (mouse.radius - distance) / mouse.radius;
                        let directionX = forceDirectionX * force * this.density * 0.3;
                        let directionY = forceDirectionY * force * this.density * 0.3;
                        
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }
            }
        }
        
        function initParticles() {
            particlesArray = [];
            const numberOfParticles = Math.floor((width * height) / 12000);
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }
        
        initParticles();
        animateParticles();
    }

    // ==========================================
    // 3. INTERACTIVE SOLAR SAVINGS CALCULATOR
    // ==========================================
    const billSlider = document.getElementById('bill-slider');
    const areaSlider = document.getElementById('area-slider');
    const billVal = document.getElementById('bill-val');
    const areaVal = document.getElementById('area-val');
    
    // Outputs
    const outSize = document.getElementById('out-size');
    const outPanels = document.getElementById('out-panels');
    const outSubsidy = document.getElementById('out-subsidy');
    const outCost = document.getElementById('out-cost');
    const outGrossCost = document.getElementById('out-gross-cost');
    const outSavings = document.getElementById('out-savings');
    const outPayback = document.getElementById('out-payback');
    const outCo2 = document.getElementById('out-co2');
    const outTrees = document.getElementById('out-trees');
    const calcApplyBtn = document.getElementById('calc-apply-btn');
    
    const connBtns = document.querySelectorAll('.conn-btn');
    let connectionType = 'Residential';
    
    // Constants for calculator logic (improves readability and maintainability)
    const KILOWATT_PER_MONTHLY_BILL_UNIT = 1200; // Estimated monthly bill amount per kW of solar
    const SQ_FT_PER_KW = 100; // Square feet required per kW of solar
    const PANEL_WATTAGE_WATTS = 540; // Wattage of a single solar panel
    const RESIDENTIAL_SUBSIDY_1KW = 30000;
    const RESIDENTIAL_SUBSIDY_2KW = 60000;
    const RESIDENTIAL_SUBSIDY_3KW_PLUS = 78000;
    const COST_PER_KW_DEFAULT = 60000; // Default market rate per kW
    const COST_PER_KW_3KW_PLUS = 50000;
    const COST_PER_KW_10KW_PLUS = 45000;
    const AVERAGE_DAILY_YIELD_UNITS_PER_KW = 4; // Units generated per kW per day
    const AVERAGE_SUNNY_DAYS_PER_YEAR = 320;
    const CO2_OFFSET_PER_KW_TONS = 1.2; // Tons of CO2 offset per kW per year
    const TREES_PER_TON_CO2 = 45; // Equivalent trees planted per ton of CO2

    if (connBtns) {
        connBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                connBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                connectionType = btn.getAttribute('data-val');
                calculateSavings();
            });
        });
    }
    
    if (billSlider && areaSlider) {
        billSlider.addEventListener('input', () => {
            billVal.innerText = `₹${Number(billSlider.value).toLocaleString('en-IN')}`;
            calculateSavings();
        });
        
        areaSlider.addEventListener('input', () => {
            areaVal.innerText = `${areaSlider.value} Sq. Ft.`;
            calculateSavings();
        });
        
        calculateSavings(); // Initial call
    }
    
    function calculateSavings() {
        if (!billSlider || !areaSlider) return;
        
        const monthlyBill = Number(billSlider.value);
        const roofArea = Number(areaSlider.value);
        
        // 1. Recommended system capacity (kW)
        // Rule of thumb: 1kW requires approx 100 sq ft, and generates ~120 units/month.
        // Capped by actual roof area space.
        let recommendedKW = Math.round((monthlyBill / KILOWATT_PER_MONTHLY_BILL_UNIT) * 10) / 10;
        let areaCappedKW = Math.floor(roofArea / SQ_FT_PER_KW);
        
        if (recommendedKW > areaCappedKW) {
            recommendedKW = Math.max(1.0, areaCappedKW);
        }
        recommendedKW = Math.max(1.0, recommendedKW); // minimum 1kW
        
        // 2. Solar Panels Required (540W Mono PERC)
        const panelsNeeded = Math.ceil((recommendedKW * 1000) / PANEL_WATTAGE_WATTS);
        
        // 3. PM Surya Ghar Subsidy Structure (Residential Only)
        // 1 kW = ₹30,000, 2 kW = ₹60,000, 3 kW+ = ₹78,000
        let subsidy = 0;
        if (connectionType === 'Residential') {
            if (recommendedKW >= 3.0) {
                subsidy = RESIDENTIAL_SUBSIDY_3KW_PLUS;
            } else if (recommendedKW >= 2.0) {
                subsidy = RESIDENTIAL_SUBSIDY_2KW;
            } else {
                subsidy = RESIDENTIAL_SUBSIDY_1KW;
            }
        }
        
        // 4. Gross Cost & Net Cost (Standard market EPC rate in Jaipur)
        let costPerKW = COST_PER_KW_DEFAULT; // standard market rate per kW
        if (recommendedKW >= 10.0) {
            costPerKW = COST_PER_KW_10KW_PLUS;
        } else if (recommendedKW >= 3.0) {
            costPerKW = COST_PER_KW_3KW_PLUS;
        } else if (recommendedKW >= 2.0) {
            costPerKW = 55000; // This specific value is not a constant, could be added if needed.
        }
        
        const grossCost = recommendedKW * costPerKW;
        const netCost = Math.max(15000, grossCost - subsidy);
        
        // 5. Estimated Savings & Payback
        // Average yield in Jaipur: AVERAGE_DAILY_YIELD_UNITS_PER_KW units per kW per day for AVERAGE_SUNNY_DAYS_PER_YEAR sunny days.
        let tariff = 7.5; // Residential average
        if (connectionType === 'Commercial') tariff = 9.5;
        if (connectionType === 'Industrial') tariff = 10.5;
        
        const annualGeneration = recommendedKW * AVERAGE_DAILY_YIELD_UNITS_PER_KW * AVERAGE_SUNNY_DAYS_PER_YEAR;
        const annualSavings = Math.round(annualGeneration * tariff);
        const paybackPeriod = Math.round((netCost / annualSavings) * 10) / 10;
        
        // 6. Environmental impact
        // 1 kW offsets ~1.2 tons of CO2 per year. 1 ton CO2 = ~45 trees planted.
        const co2Saved = Math.round((recommendedKW * CO2_OFFSET_PER_KW_TONS) * 10) / 10;
        const treesPlanted = Math.round(co2Saved * TREES_PER_TON_CO2);
        
        // Render values
        if (outSize) outSize.innerText = `${recommendedKW.toFixed(1)} kW`;
        if (outPanels) outPanels.innerText = `Requires ~${panelsNeeded} panels (540W Mono PERC)`;
        if (outSubsidy) outSubsidy.innerText = connectionType === 'Residential' ? `₹${subsidy.toLocaleString('en-IN')}` : '₹0 (Not applicable)';
        if (outCost) outCost.innerText = `₹${netCost.toLocaleString('en-IN')}`;
        if (outGrossCost) outGrossCost.innerText = `Gross Cost: ~₹${grossCost.toLocaleString('en-IN')} ${connectionType === 'Residential' ? '(Subsidy deducted)' : ''}`;
        if (outSavings) outSavings.innerText = `₹${annualSavings.toLocaleString('en-IN')}/yr`;
        if (outPayback) outPayback.innerText = `Payback period: ~${paybackPeriod} Years`;
        if (outCo2) outCo2.innerText = `Offsetting ${co2Saved} Tons of CO2 / year`;
        if (outTrees) outTrees.innerText = `Equivalent to planting ~${treesPlanted} mature trees annually.`;
        
        // Populate values into modal forms for seamless UX
        const modalForm = document.querySelector('#welcome-modal form');
        const heroForm = document.querySelector('#hero-main-layer form');
        
        [modalForm, heroForm].forEach(form => {
            if (form) {
                const billInput = form.querySelector('input[name="monthly_bill"]');
                const connSelect = form.querySelector('select[name="connection_type"]');
                // Auto-fill logic removed per user request
                // if (billInput) billInput.value = '';
                // if (connSelect) connSelect.value = '';
            }
        });
    }

    if (calcApplyBtn) {
        calcApplyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll to contact form or open contact modal
            const welcomeModal = document.getElementById('welcome-modal');
            if (welcomeModal) {
                welcomeModal.style.display = 'flex';
                // Trigger transition
                setTimeout(() => {
                    welcomeModal.classList.add('bg-dark-navy/90', 'backdrop-blur-md');
                    welcomeModal.classList.remove('bg-transparent', 'backdrop-blur-none');
                    const wrapper = document.getElementById('modal-form-wrapper');
                    if (wrapper) {
                        wrapper.style.transform = 'translate(0, 0) scale(1)';
                        wrapper.style.opacity = '1';
                    }
                    const closeBtn = document.getElementById('close-modal-btn');
                    if (closeBtn) {
                        closeBtn.style.opacity = '1';
                        closeBtn.style.pointerEvents = 'auto';
                    }
                }, 10);
            }
        });
    }

    // ==========================================
    // 4. INTERACTIVE SCROLL-LINKED PROCESS TIMELINE
    // ==========================================
    const animatedPath = document.getElementById('animated-process-path');
    const stepNodes = document.querySelectorAll('.step-node');
    const processSection = document.getElementById('process');
    
    if (processSection && animatedPath) {
        window.addEventListener('scroll', () => {
            const rect = processSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Calculate scroll percentage through the process section
            const startScroll = rect.top - viewportHeight;
            const endScroll = rect.bottom - viewportHeight;
            const scrollDistance = endScroll - startScroll;
            
            let progress = -rect.top / (rect.height - viewportHeight * 0.5);
            progress = Math.max(0, Math.min(1, progress));
            
            // stroke-dasharray is 740, dashoffset moves from 740 down to 0
            const offsetVal = 740 - (progress * 740);
            animatedPath.style.strokeDashoffset = offsetVal;
            
            // Trigger active state on step nodes based on scroll progress
            stepNodes.forEach((node, idx) => {
                const threshold = (idx + 0.5) / stepNodes.length;
                if (progress >= threshold - 0.1) {
                    node.classList.add('active-step');
                } else {
                    node.classList.remove('active-step');
                }
            });
        });
    }

    // ==========================================
    // 5. LIVE SOLAR PERFORMANCE DASHBOARD SIMULATOR
    // ==========================================
    const liveKwVal = document.getElementById('live-kw');
    // Add aria-live region to the container of dynamic content for accessibility
    const liveDashboardContainer = document.getElementById('why-solar-glass-box');
    if (liveDashboardContainer) {
        liveDashboardContainer.setAttribute('aria-live', 'polite');
        liveDashboardContainer.setAttribute('aria-atomic', 'true'); // Announce entire region changes
    }

    const liveKwhVal = document.getElementById('live-kwh');
    const liveCo2Val = document.getElementById('live-co2');
    const chartTimeLine = document.getElementById('chart-time-line');
    const chartPoint = document.getElementById('chart-point');
    
    let simulatedKW = 4.82;
    let simulatedKWh = 22.4;
    let simulatedCO2 = 17.9;
    let chartX = 60;
    
    setInterval(() => {
        // Natural fluctuations (daytime simulation)
        const change = (Math.random() * 0.2 - 0.1);
        simulatedKW = Math.max(0.1, Math.min(6.5, simulatedKW + change));
        
        // Yield accumulates slowly over time
        simulatedKWh += (simulatedKW / 3600) * 1.5; 
        simulatedCO2 = simulatedKWh * 0.8; // ~0.8kg CO2 saved per kWh
        
        // Update values in HTML
        if (liveKwVal) liveKwVal.innerText = `${simulatedKW.toFixed(2)} kW`;
        if (liveKwhVal) liveKwhVal.innerText = `${simulatedKWh.toFixed(1)} kWh`;
        if (liveCo2Val) liveCo2Val.innerText = `${simulatedCO2.toFixed(1)} kg`;
        
        // Scan time indicator across SVG graph
        chartX = (chartX + 0.3) % 100;
        if (chartTimeLine) chartTimeLine.setAttribute('x1', chartX);
        if (chartTimeLine) chartTimeLine.setAttribute('x2', chartX);
        
        // Adjust chart point height based on solar curve quadratic shape
        // Curve formula: y = 30 - Area under quadratic peak
        // Q 25,5 50,5 Q 75,5 100,30
        let normX = chartX / 100; // 0 to 1
        let y = 30 - 25 * Math.sin(normX * Math.PI); // rough sine shape approximation
        
        if (chartPoint) {
            chartPoint.setAttribute('cx', chartX);
            chartPoint.setAttribute('cy', y);
        }
    }, 1500);

    // ==========================================
    // 6. SIDEBAR MENU LOGIC
    // ==========================================
    const openMenuBtn = document.getElementById('open-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const sidebarContainer = document.getElementById('sidebar-container');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuLinks = document.querySelectorAll('.menu-link');

    function openSidebar() {
        if (openMenuBtn) openMenuBtn.setAttribute('aria-expanded', 'true');
        if (sidebarContainer && sidebarMenu) {
            sidebarContainer.classList.remove('pointer-events-none', 'opacity-0');
            sidebarContainer.classList.add('pointer-events-auto', 'opacity-100');
            sidebarMenu.classList.remove('-translate-x-full');
            sidebarMenu.classList.add('translate-x-0');
            document.body.style.overflow = 'hidden'; 
            
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.remove('opacity-0');
                    item.classList.add('opacity-100');
                    item.style.transform = 'translateX(0)';
                }, index * 80);
            });
        }
    }

    function closeSidebar() {
        if (openMenuBtn) openMenuBtn.setAttribute('aria-expanded', 'false');
        if (sidebarContainer && sidebarMenu) {
            sidebarMenu.classList.remove('translate-x-0');
            sidebarMenu.classList.add('-translate-x-full');
            sidebarContainer.classList.remove('pointer-events-auto', 'opacity-100');
            sidebarContainer.classList.add('pointer-events-none', 'opacity-0');
            document.body.style.overflow = ''; 
            
            menuItems.forEach(item => {
                item.classList.add('opacity-0');
                item.classList.remove('opacity-100');
                item.style.transform = 'translateX(-20px)';
            });
        }
    }

    if (openMenuBtn && closeMenuBtn && sidebarContainer) {
        openMenuBtn.addEventListener('click', openSidebar);
        closeMenuBtn.addEventListener('click', closeSidebar);
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', closeSidebar);
        }
        menuLinks.forEach(link => {
            link.addEventListener('click', closeSidebar);
        });
    }

    // ==========================================
    // 7. SCROLL REVEAL LOGIC
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 8. DYNAMIC NUMBER COUNTER
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const duration = 2000; 
                const increment = target / (duration / 16); 
                
                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ==========================================
    // 9. 3D TILT EFFECT
    // ==========================================
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // ==========================================
    // 10. LEAD CAPTURE FORM SUBMISSION
    // ==========================================
    const leadForms = document.querySelectorAll('.lead-capture-form');
    const webhookUrl = 'https://hook.eu1.make.com/z14ylrq8mwzr9iu1vazvxwjhc3kwqu8r';

    leadForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .catch(() => {}) // Prevent console errors from blocking the UI flow

                    .catch(error => {
                        console.error("Form submission error:", error);
                        const successMsg = form.querySelector('#modal-success-msg, #hero-success-msg');
                        if (successMsg) {
                            successMsg.classList.remove('hidden');
                            successMsg.classList.add('bg-red-500/20', 'border-red-500'); // Example error styling
                            successMsg.innerText = 'Error: Could not send your request. Please try again.';
                        } else {
                            alert('Error: Could not send your request. Please try again.');
                        }
                    })
            .finally(() => {
                const successMsg = form.querySelector('#modal-success-msg, #hero-success-msg');
                if (successMsg) {
                    successMsg.classList.remove('hidden');
                } else {
                    alert('Thank you! Your request has been received.');
                }
                form.reset();
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                setTimeout(() => {
                    if (form.closest('#welcome-modal') && closeModalBtn) {
                        closeModalBtn.click();
                    }
                    if (successMsg) successMsg.classList.add('hidden');
                }, 2000);
            });
        });
    });

    // ==========================================
    // 11. TESTIMONIALS CAROUSEL
    // ==========================================
    const userIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%239ca3af' viewBox='0 0 24 24'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
    
    const testimonials = [
        {
            image: userIcon,
            avatar: userIcon,
            text: 'Neonix completely transformed how we use electricity. Our summer AC bills dropped to zero, and the installation process was entirely hassle-free! I couldn’t be happier with their professionalism.',
            author: 'Kanishka Sharma',
            role: 'Mansarovar, Jaipur'
        },
        {
            image: userIcon,
            avatar: userIcon,
            text: 'We were initially skeptical, but seeing our electricity bill drop from ₹8,000 to ₹300 was unbelievable. The Neonix team even took care of all the complex net-metering paperwork for us.',
            author: 'Asha Patel',
            role: 'Vaishali Nagar, Jaipur'
        },
        {
            image: userIcon,
            avatar: userIcon,
            text: 'Fantastic quality and service! From the initial site visit to the final grid connection, everything was handled perfectly. I highly recommend Neonix for any home looking to go solar.',
            author: 'Rohit Verma',
            role: 'Malviya Nagar, Jaipur'
        }
    ];

    let testIndex = 0;
    const testText = document.getElementById('testimonial-text');
    const testAuthor = document.getElementById('testimonial-author');
    const testRole = document.getElementById('testimonial-role');
    const testAvatar = document.getElementById('testimonial-avatar');
    const testImage = document.getElementById('testimonial-image');
    const dotsContainer = document.getElementById('test-dots');

    function renderTest(i) {
        const t = testimonials[i];
        if (!t || !testText) return;
        testText.innerText = t.text;
        if (testAuthor) testAuthor.innerText = t.author;
        if (testRole) testRole.innerText = t.role;
        if (testAvatar) testAvatar.src = t.avatar;
        if (testImage) testImage.src = t.image;
        
        if (dotsContainer) {
            Array.from(dotsContainer.children).forEach((d, idx) => {
                const dot = d.querySelector('span');
                if (dot) {
                    if (idx === i) {
                        dot.classList.remove('bg-gray-300');
                        dot.classList.add('bg-dark-navy');
                    } else {
                        dot.classList.remove('bg-dark-navy');
                        dot.classList.add('bg-gray-300');
                    }
                }
            });
        }
    }

    function buildDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        testimonials.forEach((_, i) => {
            const d = document.createElement('button');
            d.className = 'w-12 h-12 flex items-center justify-center group';
            d.setAttribute('aria-label', `Show testimonial ${i + 1}`);
            const dot = document.createElement('span');
            dot.className = 'w-2 h-2 rounded-full bg-gray-300 group-hover:bg-gray-400 transition-colors';
            d.appendChild(dot);
            d.addEventListener('click', () => {
                testIndex = i;
                renderTest(i);
            });
            dotsContainer.appendChild(d);
        });
    }

    const prevBtn = document.getElementById('test-prev');
    const nextBtn = document.getElementById('test-next');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => { 
            testIndex = (testIndex - 1 + testimonials.length) % testimonials.length; 
            renderTest(testIndex); 
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => { 
            testIndex = (testIndex + 1) % testimonials.length; 
            renderTest(testIndex); 
        });
    }

    buildDots();
    renderTest(0);

    let testTimer = setInterval(() => { 
        testIndex = (testIndex + 1) % testimonials.length; 
        renderTest(testIndex); 
    }, 6000);

    const testContainer = document.getElementById('testimonial-card');
    [testContainer, prevBtn, nextBtn].forEach(el => {
        if (!el) return;
        el.addEventListener('mouseenter', () => clearInterval(testTimer));
        el.addEventListener('mouseleave', () => { 
            testTimer = setInterval(() => { 
                testIndex = (testIndex + 1) % testimonials.length; 
                renderTest(testIndex); 
            }, 6000); 
        });
    });

    // ==========================================
    // 12. CURSOR GLOW EFFECT
    // ==========================================
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });
    }

    // ==========================================
    // 13. SCROLL PROGRESS BAR
    // ==========================================
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                const scrollPercentage = (window.scrollY / totalScroll) * 100;
                scrollProgress.style.width = `${scrollPercentage}%`;
            }
        });
    }

    // ==========================================
    // 14. SCROLLYTELLER CAROUSEL LOGIC
    // ==========================================
    const scrollyHero = document.getElementById('scrolly-hero');
    const heroMainLayer = document.getElementById('hero-main-layer');
    const heroCarousel = document.getElementById('hero-carousel');
    
    const titleGroup = document.getElementById('hero-title-group');
    const descGroup = document.getElementById('hero-desc-group');
    const formGroup = document.getElementById('hero-form-group');
    const statsGroup = document.getElementById('hero-stats-group');
    
    const slideAbout = document.getElementById('slide-about');
    const slideMission = document.getElementById('slide-mission');
    const slideVision = document.getElementById('slide-vision');
    
    const heroBgLayer = document.getElementById('hero-bg-layer');
    let statsTriggered = false;
    let formImprinted = false;
    
    // --- WELCOME MODAL TO HERO FORM IMPRINT LOGIC ---
    const welcomeModal = document.getElementById('welcome-modal');
    const modalFormWrapper = document.getElementById('modal-form-wrapper');
    const closeModalBtn = document.getElementById('close-modal-btn');
    
    if (welcomeModal && modalFormWrapper && closeModalBtn && formGroup) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollbarWidth}px`; // Prevent layout shift
        document.body.style.overflow = 'hidden'; // Lock scrolling
        
        closeModalBtn.addEventListener('click', () => {
            document.body.style.overflow = ''; // Restore scrolling
            document.body.style.paddingRight = ''; // Remove padding compensation
            formImprinted = true; // Set flag
            
            closeModalBtn.style.opacity = '0';
            closeModalBtn.style.pointerEvents = 'none';
            
            welcomeModal.classList.remove('bg-dark-navy/90', 'backdrop-blur-md');
            welcomeModal.classList.add('bg-transparent', 'backdrop-blur-none');
            
            // Reset target transform before measuring to get true final position
            formGroup.style.transition = 'none';
            formGroup.style.transform = 'translateY(0)';
            
            let targetRect = formGroup.getBoundingClientRect();
            let startRect = modalFormWrapper.getBoundingClientRect();
            
            // This logic is complex and can be fragile. Thorough cross-browser/device testing is recommended.
            if (targetRect.width === 0) {
                modalFormWrapper.style.transform = `scale(0)`;
                modalFormWrapper.style.opacity = '0';
            } else {
                const scaleX = targetRect.width / startRect.width;
                const scaleY = targetRect.height / startRect.height;
                const translateX = targetRect.left - startRect.left;
                const translateY = targetRect.top - startRect.top;
                
                modalFormWrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
                modalFormWrapper.style.opacity = '0.5';
            }
            
            setTimeout(() => {
                welcomeModal.style.display = 'none';
                formGroup.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                formGroup.style.opacity = '1';
            }, 1000);
        });
        // --- OPEN MODAL LOGIC ---
        const openModalBtns = document.querySelectorAll('.open-modal-btn');
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                welcomeModal.style.display = 'flex';
                
                const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                document.body.style.paddingRight = `${scrollbarWidth}px`; // Prevent layout shift
                document.body.style.overflow = 'hidden'; // Lock scrolling
                
                setTimeout(() => {
                    welcomeModal.classList.add('bg-dark-navy/90', 'backdrop-blur-md');
                    welcomeModal.classList.remove('bg-transparent', 'backdrop-blur-none');
                    
                    modalFormWrapper.style.transform = 'translate(0, 0) scale(1)';
                    modalFormWrapper.style.opacity = '1';
                    
                    closeModalBtn.style.opacity = '1';
                    closeModalBtn.style.pointerEvents = 'auto';
                }, 10); // Small delay to allow display:flex to apply before transitioning
            });
        });
    }
    const mainNav = document.getElementById('main-nav');

    // Scrollyteller scroll handler function
    const scrollytellerScrollHandler = () => {
        if (!scrollyHero) return;

        // Navbar must remain fixed/stuck to the top of the whole page.
        // Remove hero-only navbar styling toggles.
        if (mainNav) {
            mainNav.classList.add('bg-dark-navy/90', 'backdrop-blur-lg', 'shadow-lg', 'border-b', 'border-white/10');
            mainNav.classList.remove('bg-transparent', 'backdrop-blur-none', 'shadow-none', 'border-transparent');

            const logoImg = document.querySelector('#main-nav a img[alt="Neonix Infra Solutions Logo"]');
            const logoTextWrap = document.querySelector('#main-nav a .nav-text');

            if (logoImg) {
                logoImg.classList.remove('h-8', 'md:h-12');
                logoImg.classList.add('h-6', 'md:h-10');
            }
            if (logoTextWrap) {
                logoTextWrap.classList.add('text-xl');
                logoTextWrap.classList.remove('text-2xl');
            }
        }

        // Continue existing scrollyteller logic
        const rect = scrollyHero.getBoundingClientRect();
        
        // Calculate progress within the sticky section (0 to 1)
        const scrollDistance = rect.height - window.innerHeight;
        let progress = 0;
        if (scrollDistance > 0) {
            progress = -rect.top / scrollDistance;
            progress = Math.max(0, Math.min(1, progress));
        }
        // Background subtle cinematic zoom
        if (heroBgLayer) {
            heroBgLayer.style.transform = `scale(${1 + progress * 0.15})`;
        }
        // --- STATE MACHINE FOR SCROLL ANIMATIONS ---
        // Using constants for thresholds improves readability
        const THRESHOLD_STATE_0_TO_1 = 0.15;
        const THRESHOLD_STATE_1_TO_2 = 0.35;
        const THRESHOLD_STATE_2_TO_3 = 0.45;
        const THRESHOLD_STATE_3_TO_4 = 0.60;
        const THRESHOLD_STATE_4_TO_5 = 0.65;
        const THRESHOLD_STATE_5_TO_6 = 0.80;
        const THRESHOLD_STATE_6_TO_7 = 0.85;

        if (progress < THRESHOLD_STATE_0_TO_1) {
            // STATE 0: Intro Title Only
            heroMainLayer.style.opacity = '1';
            heroMainLayer.style.visibility = 'visible';
            heroCarousel.style.opacity = '0';
            heroCarousel.style.visibility = 'hidden';
            if (titleGroup) titleGroup.style.transform = 'translateY(10vh)';
            if (descGroup) {
                descGroup.style.opacity = '0';
                descGroup.style.transform = 'translateY(40px)';
            }
            
            if (formGroup) {
                if (!formImprinted) {
                    formGroup.style.opacity = '0';
                    formGroup.style.transform = 'translateY(40px)';
                } else {
                    formGroup.style.opacity = '1';
                    formGroup.style.transform = 'translateY(0)';
                }
            }
            
            if (statsGroup) {
                statsGroup.style.opacity = '0';
                statsGroup.style.transform = 'translateY(40px)';
            }
            
            if (slideAbout) {
                slideAbout.style.opacity = '0';
                slideAbout.style.transform = 'translateX(100px)';
            }
            if (slideMission) {
                slideMission.style.opacity = '0';
                slideMission.style.transform = 'translateX(100px)';
            }
            if (slideVision) {
                slideVision.style.opacity = '0';
                slideVision.style.transform = 'translateX(100px)';
            }
        } else if (progress >= THRESHOLD_STATE_0_TO_1 && progress < THRESHOLD_STATE_1_TO_2) {
            // STATE 1: Main Hero content revealed (Title up, Desc, Form & Stats appear)
            heroMainLayer.style.opacity = '1';
            heroMainLayer.style.visibility = 'visible';
            heroCarousel.style.opacity = '0';
            heroCarousel.style.visibility = 'hidden';
            if (titleGroup) titleGroup.style.transform = 'translateY(0)';
            if (descGroup) {
                descGroup.style.opacity = '1';
                descGroup.style.transform = 'translateY(0)';
            }
            
            if (formGroup) {
                formGroup.style.opacity = '1';
                formGroup.style.transform = 'translateY(0)';
            }
            
            if (statsGroup) {
                statsGroup.style.opacity = '1';
                statsGroup.style.transform = 'translateY(0)';
                
                // Trigger stats counter dynamically once
                if (!statsTriggered) {
                    statsTriggered = true;
                    const heroCounters = statsGroup.querySelectorAll('.hero-counter');
                    heroCounters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        let count = 0;
                        const duration = 2000; 
                        const increment = target / (duration / 16); 
                        const updateCount = () => {
                            count += increment;
                            if (count < target) {
                                counter.innerText = Math.ceil(count);
                                requestAnimationFrame(updateCount);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCount();
                    });
                }
            }
            if (slideAbout) {
                slideAbout.style.opacity = '0';
                slideAbout.style.transform = 'translateX(100px)';
            }
            if (slideMission) {
                slideMission.style.opacity = '0';
                slideMission.style.transform = 'translateX(100px)';
            }
            if (slideVision) {
                slideVision.style.opacity = '0';
                slideVision.style.transform = 'translateX(100px)';
            }
        } else if (progress >= THRESHOLD_STATE_1_TO_2 && progress < THRESHOLD_STATE_2_TO_3) {
            // STATE 2: Main Layer fades out, Carousel wrapper primes
            heroMainLayer.style.opacity = '0';
            heroMainLayer.style.visibility = 'hidden';
            heroCarousel.style.opacity = '1';
            heroCarousel.style.visibility = 'visible';
            if (slideAbout) {
                slideAbout.style.opacity = '0';
                slideAbout.style.transform = 'translateX(100px)';
            }
            if (slideMission) {
                slideMission.style.opacity = '0';
                slideMission.style.transform = 'translateX(100px)';
            }
            if (slideVision) {
                slideVision.style.opacity = '0';
                slideVision.style.transform = 'translateX(100px)';
            }
        } else if (progress >= THRESHOLD_STATE_2_TO_3 && progress < THRESHOLD_STATE_3_TO_4) {
            // STATE 3: Slide 1 (About) Slides In
            heroMainLayer.style.opacity = '0';
            heroMainLayer.style.visibility = 'hidden';
            heroCarousel.style.opacity = '1';
            heroCarousel.style.visibility = 'visible';
            if (slideAbout) {
                slideAbout.style.opacity = '1';
                slideAbout.style.transform = 'translateX(0)';
            }
            if (slideMission) {
                slideMission.style.opacity = '0';
                slideMission.style.transform = 'translateX(100px)';
            }
            if (slideVision) {
                slideVision.style.opacity = '0';
                slideVision.style.transform = 'translateX(100px)';
            }
        } else if (progress >= THRESHOLD_STATE_3_TO_4 && progress < THRESHOLD_STATE_4_TO_5) {
            // STATE 4: Slide 1 (About) Slides out to the left
            heroMainLayer.style.opacity = '0';
            heroMainLayer.style.visibility = 'hidden';
            heroCarousel.style.opacity = '1';
            heroCarousel.style.visibility = 'visible';
            if (slideAbout) {
                slideAbout.style.opacity = '0';
                slideAbout.style.transform = 'translateX(-100px)';
            }
            if (slideMission) {
                slideMission.style.opacity = '0';
                slideMission.style.transform = 'translateX(100px)';
            }
            if (slideVision) {
                slideVision.style.opacity = '0';
                slideVision.style.transform = 'translateX(100px)';
            }
        } else if (progress >= THRESHOLD_STATE_4_TO_5 && progress < THRESHOLD_STATE_5_TO_6) {
            // STATE 5: Slide 2 (Mission) Slides In
            heroMainLayer.style.opacity = '0';
            heroMainLayer.style.visibility = 'hidden';
            heroCarousel.style.opacity = '1';
            heroCarousel.style.visibility = 'visible';
            if (slideAbout) {
                slideAbout.style.opacity = '0';
                slideAbout.style.transform = 'translateX(-100px)';
            }
            if (slideMission) {
                slideMission.style.opacity = '1';
                slideMission.style.transform = 'translateX(0)';
            }
            if (slideVision) {
                slideVision.style.opacity = '0';
                slideVision.style.transform = 'translateX(100px)';
            }
        } else if (progress >= THRESHOLD_STATE_5_TO_6 && progress < THRESHOLD_STATE_6_TO_7) {
            // STATE 6: Slide 2 (Mission) Slides out to the left
            heroMainLayer.style.opacity = '0';
            heroMainLayer.style.visibility = 'hidden';
            heroCarousel.style.opacity = '1';
            heroCarousel.style.visibility = 'visible';
            if (slideAbout) {
                slideAbout.style.opacity = '0';
                slideAbout.style.transform = 'translateX(-100px)';
            }
            if (slideMission) {
                slideMission.style.opacity = '0';
                slideMission.style.transform = 'translateX(-100px)';
            }
            if (slideVision) {
                slideVision.style.opacity = '0';
                slideVision.style.transform = 'translateX(100px)';
            }
        } else {
            // STATE 7: Slide 3 (Vision) Slides In
            heroMainLayer.style.opacity = '0';
            heroMainLayer.style.visibility = 'hidden';
            heroCarousel.style.opacity = '1';
            heroCarousel.style.visibility = 'visible';
            if (slideAbout) {
                slideAbout.style.opacity = '0';
                slideAbout.style.transform = 'translateX(-100px)';
            }
            if (slideMission) {
                slideMission.style.opacity = '0';
                slideMission.style.transform = 'translateX(-100px)';
            }
            if (slideVision) {
                slideVision.style.opacity = '1';
                slideVision.style.transform = 'translateX(0)';
            }
        }
    };

    // Apply throttling to the scrollyteller scroll event listener
    window.addEventListener('scroll', throttle(scrollytellerScrollHandler, 100), { passive: true }); // Throttle to 100ms
});