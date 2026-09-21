/**
 * INSCAPES - LUXURY SIDEBAR CAROUSEL & REVEAL ANIMATIONS
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       SLIDES DATA DEFINITION
       ========================================== */
    const slidesData = [
        {
            id: 0,
            src: 'asstes/img/Artboard 18.webp',
            title: 'بديل الرخام والشاشات',
            category: 'بديل الرخام',
            tag: 'تصاميم عصرية فاخرة'
        },
        {
            id: 1,
            src: 'asstes/img/WhatsApp Image 2026-08-13 at 11-upscaled (122).webp',
            title: 'بديل الخشب والبارتشنات',
            category: 'بديل الخشب',
            tag: 'لمسات خشبية دافئة'
        },
        {
            id: 2,
            src: 'asstes/img/WhatsApp Image 2026-08-13 at 11-upscaled (21).webp',
            title: 'الفوم والمرايات الجدارية',
            category: 'الفوم والمرايات',
            tag: 'أبعاد بصرية واسعة'
        },
        {
            id: 3,
            src: 'asstes/img/WhatsApp Image 2026-08-13 at 11-upscaled (22).webp',
            title: 'تكسيات الفايبر والاستيل',
            category: 'الفايبر والاستيل',
            tag: 'ديكورات مبتكرة'
        }
    ];

    // State Variables
    let currentIndex = 0;
    const totalSlides = slidesData.length;
    let autoPlayTimer = null;
    const autoPlayIntervalMs = 5000;
    let isAnimating = false;

    // DOM Elements
    const mainDisplayImg = document.getElementById('mainDisplayImg');
    const mainImgCategory = document.getElementById('mainImgCategory');
    const revealMask = document.getElementById('revealMask');
    const currentSlideNum = document.getElementById('currentSlideNum');
    const totalSlidesNum = document.getElementById('totalSlidesNum');
    const prevSlideBtn = document.getElementById('prevSlideBtn');
    const nextSlideBtn = document.getElementById('nextSlideBtn');
    const galleryCards = document.querySelectorAll('.gallery-card');
    const sideThumbItems = document.querySelectorAll('.side-thumb-item');
    const heroMediaWrapper = document.querySelector('.hero-media-wrapper');

    // Set Total Counter
    if (totalSlidesNum) {
        totalSlidesNum.textContent = totalSlides < 10 ? `0${totalSlides}` : totalSlides;
    }

    /* ==========================================
       PROFESSIONAL IMAGE REVEAL & SWITCHING
       ========================================== */
    function goToSlide(index, manualTrigger = true) {
        if ((index === currentIndex && manualTrigger) || isAnimating) return;

        isAnimating = true;

        // Normalize index
        currentIndex = (index + totalSlides) % totalSlides;
        const currentSlide = slidesData[currentIndex];

        // 1. Trigger Curtain Reveal Animation Mask
        if (revealMask) {
            revealMask.classList.add('revealing');
        }

        if (mainDisplayImg) {
            mainDisplayImg.classList.add('changing');
        }

        setTimeout(() => {
            if (mainDisplayImg) {
                mainDisplayImg.src = currentSlide.src;
                mainDisplayImg.alt = currentSlide.title;
            }
            if (mainImgCategory) {
                mainImgCategory.textContent = currentSlide.title;
            }

            setTimeout(() => {
                if (mainDisplayImg) mainDisplayImg.classList.remove('changing');
                if (revealMask) revealMask.classList.remove('revealing');
                isAnimating = false;
            }, 300);

        }, 350);

        // 2. Update Counter
        if (currentSlideNum) {
            currentSlideNum.textContent = (currentIndex + 1) < 10 ? `0${currentIndex + 1}` : (currentIndex + 1);
        }

        // 3. Update Side Panel Active Thumbnail Item
        sideThumbItems.forEach((item, i) => {
            if (i === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // 4. Update Gallery Cards active state
        galleryCards.forEach((card, i) => {
            if (i === currentIndex) {
                card.classList.add('active-card');
            } else {
                card.classList.remove('active-card');
            }
        });

        // Reset Autoplay timer on manual click
        if (manualTrigger) {
            restartAutoPlay();
        }
    }

    // Event Listeners for Side Thumbnails
    sideThumbItems.forEach(item => {
        item.addEventListener('click', () => {
            const slideIdx = parseInt(item.dataset.slide, 10);
            if (!isNaN(slideIdx)) {
                goToSlide(slideIdx);
            }
        });
    });

    // Arrow Nav Buttons
    if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
    }

    if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
    }

    // Gallery section card click listeners
    galleryCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardIdx = parseInt(card.dataset.index, 10);
            if (!isNaN(cardIdx)) {
                goToSlide(cardIdx);
                const heroElem = document.getElementById('hero');
                if (heroElem) {
                    heroElem.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    /* ==========================================
       AUTOPLAY CAROUSEL
       ========================================== */
    function startAutoPlay() {
        if (!autoPlayTimer) {
            autoPlayTimer = setInterval(() => {
                goToSlide(currentIndex + 1, false);
            }, autoPlayIntervalMs);
        }
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    function restartAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Pause on hover
    if (heroMediaWrapper) {
        heroMediaWrapper.addEventListener('mouseenter', stopAutoPlay);
        heroMediaWrapper.addEventListener('mouseleave', startAutoPlay);
    }

    // Start auto-play initially
    startAutoPlay();

    /* ==========================================
       CONTACT FORM, NEWSLETTER & BACK TO TOP
       ========================================== */
    const inquiryForm = document.getElementById('inquiryForm');
    const formSuccessBanner = document.getElementById('formSuccessBanner');
    const newsletterForm = document.getElementById('newsletterForm');
    const backToTopBtn = document.getElementById('backToTopBtn');

    // 1. Inquiry Form Submit
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('formSubmitBtn');
            if (submitBtn) {
                submitBtn.innerHTML = '<span>جاري إرسال طلبك...</span><i class="fa-solid fa-spinner fa-spin"></i>';
            }

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.innerHTML = '<span>تم الإرسال بنجاح</span><i class="fa-solid fa-check"></i>';
                    submitBtn.disabled = true;
                }
                if (formSuccessBanner) {
                    formSuccessBanner.classList.add('active');
                }
            }, 1200);
        });
    }

    // 2. Newsletter Form Submit
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            if (input && input.value) {
                alert(`شكراً لاشتراكك! تم تسجيل البريد (${input.value}) بنجاح.`);
                input.value = '';
            }
        });
    }

    // 3. Back to Top Button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==========================================
       VIDEO SHOWCASE THEATER & PLAYLIST HANDLERS
       ========================================== */
    const playlistItems = document.querySelectorAll('.playlist-item, .cinema-reel-card');
    const mainVideoPlayer = document.getElementById('mainVideoPlayer');
    const mainVideoSource = document.getElementById('mainVideoSource');
    const videoMainTitle = document.getElementById('videoMainTitle');
    const videoMainSub = document.getElementById('videoMainSub');
    const videoDurationText = document.getElementById('videoDurationText');
    const masterPlayBtns = document.querySelectorAll('.master-play-btn, .cinema-center-play-btn');
    const cinemaAmbientGlow = document.querySelector('.cinema-ambient-glow');

    const videoModal = document.getElementById('videoModal');
    const videoModalClose = document.getElementById('videoModalClose');
    const modalVideoPlayer = document.getElementById('modalVideoPlayer');
    const modalVideoSource = document.getElementById('modalVideoSource');
    const modalVideoTitle = document.getElementById('modalVideoTitle');
    const modalVideoSub = document.getElementById('modalVideoSub');

    let currentVideoUrl = 'asstes/video/WhatsApp Video 2026-08-03 at 1.18.18 PM.mp4';
    let currentVideoTitleText = 'جولة تنفيذ بديل الرخام والشاشات';
    let currentVideoSubText = 'تغطية تشطيب بديل الرخام مع الإضاءة المخفية والديكورات العصرية.';

    // Color Glow themes for dynamic background ambiance
    const glowThemes = [
        'radial-gradient(circle, rgba(165, 19, 21, 0.3) 0%, rgba(12, 39, 76, 0.1) 50%, rgba(0, 0, 0, 0) 75%)',
        'radial-gradient(circle, rgba(12, 39, 76, 0.3) 0%, rgba(165, 19, 21, 0.1) 50%, rgba(0, 0, 0, 0) 75%)',
        'radial-gradient(circle, rgba(165, 19, 21, 0.3) 0%, rgba(12, 39, 76, 0.1) 50%, rgba(0, 0, 0, 0) 75%)',
        'radial-gradient(circle, rgba(12, 39, 76, 0.3) 0%, rgba(165, 19, 21, 0.1) 50%, rgba(0, 0, 0, 0) 75%)'
    ];

    // 1. Playlist item & Reel click listener
    playlistItems.forEach((item, idx) => {
        item.addEventListener('click', () => {
            const videoUrl = item.dataset.videoUrl;
            const poster = item.dataset.poster;
            const title = item.dataset.title;
            const sub = item.dataset.sub;
            const duration = item.dataset.duration;

            if (!videoUrl) return;

            currentVideoUrl = videoUrl;
            currentVideoTitleText = title;
            currentVideoSubText = sub;

            // Highlight active item
            playlistItems.forEach(p => {
                p.classList.remove('active');
                p.classList.remove('active-reel');
            });
            item.classList.add('active');
            item.classList.add('active-reel');

            // Update Master Video Player
            if (mainVideoPlayer && mainVideoSource) {
                mainVideoSource.src = videoUrl;
                if (poster) mainVideoPlayer.poster = poster;
                mainVideoPlayer.load();
                mainVideoPlayer.play().catch(() => { });
            }

            if (videoMainTitle && title) videoMainTitle.textContent = title;
            if (videoMainSub && sub) videoMainSub.textContent = sub;
            if (videoDurationText && duration) videoDurationText.textContent = `${duration} دقيقة`;

            // Dynamic Ambient Color Glow Shift
            if (cinemaAmbientGlow) {
                cinemaAmbientGlow.style.background = glowThemes[idx % glowThemes.length];
            }
        });
    });

    // 2. Open Fullscreen Video Modal Popup
    masterPlayBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (modalVideoPlayer && modalVideoSource) {
                modalVideoSource.src = currentVideoUrl;
                modalVideoPlayer.load();
                modalVideoPlayer.play().catch(() => { });
            }

            if (modalVideoTitle) modalVideoTitle.textContent = currentVideoTitleText;
            if (modalVideoSub) modalVideoSub.textContent = currentVideoSubText;

            if (videoModal) {
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });


    // 3. Close Video Modal Popup
    function closeVideoModal() {
        if (modalVideoPlayer) {
            modalVideoPlayer.pause();
        }
        if (videoModal) {
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (videoModalClose) videoModalClose.addEventListener('click', closeVideoModal);
    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeVideoModal();
        });
    }

    /* ==========================================
       SERVICES INQUIRY SMOOTH SCROLL HANDLERS
       ========================================== */
    const serviceActionLinks = document.querySelectorAll('.service-action-link');
    serviceActionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#contact') {
                e.preventDefault();
                const contactElem = document.getElementById('contact');
                if (contactElem) {
                    contactElem.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    /* ==========================================
       STATS ANIMATED COUNTER UP OBSERVER
       ========================================== */
    const statsRibbonCard = document.querySelector('.stats-ribbon-card');
    const counterElements = document.querySelectorAll('.counter-value');
    let hasAnimatedCounters = false;

    function animateCounters() {
        counterElements.forEach(counter => {
            const target = parseInt(counter.dataset.target, 10);
            if (isNaN(target)) return;

            let current = 0;
            const duration = 1800; // 1.8s duration
            const increment = Math.ceil(target / (duration / 25));

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = current;
                }
            }, 25);
        });

        if (statsRibbonCard) {
            statsRibbonCard.classList.add('animated');
        }
    }

    // Use IntersectionObserver to trigger counter animation on scroll into view
    if ('IntersectionObserver' in window && statsRibbonCard) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimatedCounters) {
                    hasAnimatedCounters = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsRibbonCard);
    } else {
        animateCounters(); // Fallback
    }

    /* ==========================================
       PORTFOLIO CATEGORY FILTERING & LIGHTBOX
       ========================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const previewHeroBtns = document.querySelectorAll('.preview-hero-btn');
    const lightboxOpenBtns = document.querySelectorAll('.lightbox-open-btn');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxLocation = document.getElementById('lightboxLocation');

    // 1. Category Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            portfolioCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 2. Preview directly in Hero Section
    previewHeroBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const heroIdx = parseInt(btn.dataset.heroIndex, 10);
            if (!isNaN(heroIdx)) {
                goToSlide(heroIdx);
                const heroElem = document.getElementById('hero');
                if (heroElem) {
                    heroElem.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // 3. Lightbox Full Screen Modal Open (Supports Stack Cards, Bento Cards & Standard Cards)
    const allExpandBtns = document.querySelectorAll('.lightbox-open-btn, .stack-expand-btn, .bento-expand-btn');
    allExpandBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const parentCard = btn.closest('.stack-card, .bento-card, .portfolio-card');

            let fullImg = btn.dataset.fullImg;
            let title = btn.dataset.title;
            let loc = btn.dataset.location;

            if (!fullImg && parentCard) {
                const imgElem = parentCard.querySelector('img');
                if (imgElem) fullImg = imgElem.src;
            }

            if (!title && parentCard) {
                const titleElem = parentCard.querySelector('.stack-title, .bento-title, .portfolio-title');
                if (titleElem) title = titleElem.textContent;
            }

            if (!loc && parentCard) {
                const locElem = parentCard.querySelector('.stack-location-pill, .bento-location-tag, .portfolio-location');
                if (locElem) loc = locElem.innerHTML;
            }

            if (lightboxImg && fullImg) lightboxImg.src = fullImg;
            if (lightboxTitle && title) lightboxTitle.textContent = title;
            if (lightboxLocation && loc) lightboxLocation.innerHTML = loc;

            if (lightboxModal) {
                lightboxModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });



    // Close Lightbox Modal
    function closeLightbox() {
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) closeLightbox();
        });
    }

    /* ==========================================
       ABOUT SECTION INTERACTIVE TABS
       ========================================== */
    const aboutTabBtns = document.querySelectorAll('.about-tab-btn');
    const aboutTabPanels = document.querySelectorAll('.about-tab-panel');

    aboutTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            if (!targetTab) return;

            // Remove active class from all buttons and panels
            aboutTabBtns.forEach(b => b.classList.remove('active'));
            aboutTabPanels.forEach(p => p.classList.remove('active'));

            // Activate clicked button and corresponding panel
            btn.classList.add('active');
            const activePanel = document.getElementById(`tab-${targetTab}`);
            if (activePanel) {
                activePanel.classList.add('active');
            }
        });
    });

    /* ==========================================
       INTERACTIVE DECOR PALETTE SWATCHES & TILT
       ========================================== */
    const swatchCircles = document.querySelectorAll('.swatch-circle');
    swatchCircles.forEach(circle => {
        circle.addEventListener('click', (e) => {
            const color = e.target.style.backgroundColor;
            const accentFrame = document.querySelector('.accent-arch-frame');
            if (accentFrame && color) {
                accentFrame.style.borderColor = color;
                accentFrame.style.boxShadow = `0 0 25px ${color}`;
                setTimeout(() => {
                    accentFrame.style.boxShadow = 'none';
                }, 1200);
            }
        });
    });

    // Subtly tilt hero arch image on mouse movement
    if (heroMediaWrapper && window.innerWidth > 992) {
        heroMediaWrapper.addEventListener('mousemove', (e) => {
            const rect = heroMediaWrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const archImageCard = document.querySelector('.hero-main-image-card');
            const sidePanel = document.querySelector('.side-switcher-panel');

            if (archImageCard) {
                archImageCard.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
            }
            if (sidePanel) {
                sidePanel.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
            }
        });

        heroMediaWrapper.addEventListener('mouseleave', () => {
            const archImageCard = document.querySelector('.hero-main-image-card');
            const sidePanel = document.querySelector('.side-switcher-panel');

            if (archImageCard) archImageCard.style.transform = 'none';
            if (sidePanel) sidePanel.style.transform = 'none';
        });
    }

    /* ==========================================
       MOBILE DRAWER NAVIGATION
       ========================================== */
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerClose = document.getElementById('drawerClose');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function openDrawer() {
        if (mobileDrawer) mobileDrawer.classList.add('active');
        if (drawerOverlay) drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        if (mobileDrawer) mobileDrawer.classList.remove('active');
        if (drawerOverlay) drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    /* ==========================================
       STICKY HEADER SCROLL SHADOW
       ========================================== */
    const siteHeader = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            siteHeader.style.padding = '0.75rem 0';
            siteHeader.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
            siteHeader.style.backgroundColor = 'rgba(255, 255, 255, 0.96)';
        } else {
            siteHeader.style.padding = '1.1rem 0';
            siteHeader.style.boxShadow = 'none';
            siteHeader.style.backgroundColor = 'rgba(250, 250, 248, 0.94)';
        }
    });

    /* ==========================================
       INTERACTIVE FAQ ACCORDION TOGGLE
       ========================================== */
    const faqItems = document.querySelectorAll('.faq-accordion-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question-btn');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all items
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    const btn = faq.querySelector('.faq-question-btn');
                    const panel = faq.querySelector('.faq-answer-panel');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                    if (panel) panel.style.maxHeight = null;
                });

                // Toggle clicked item
                if (!isActive) {
                    item.classList.add('active');
                    questionBtn.setAttribute('aria-expanded', 'true');
                    const panel = item.querySelector('.faq-answer-panel');
                    if (panel) {
                        panel.style.maxHeight = (panel.scrollHeight + 30) + 'px';
                    }
                }
            });
        }
    });

    /* ==========================================
       PORTFOLIO & BENTO CATEGORY FILTERING SYSTEM
    /* ==========================================
       3D FLOATING STACK CAROUSEL SYSTEM
       ========================================== */
    const stackCards = document.querySelectorAll('.stack-card');
    const stackPrevBtn = document.getElementById('stackPrevBtn');
    const stackNextBtn = document.getElementById('stackNextBtn');
    const stackCounterText = document.getElementById('stackCounterText');
    const stackDotsContainer = document.getElementById('stackDotsContainer');

    if (stackCards.length > 0) {
        let activeStackIdx = 0;
        const totalCards = stackCards.length;

        // Render Dots Indicators
        if (stackDotsContainer) {
            stackDotsContainer.innerHTML = '';
            for (let i = 0; i < totalCards; i++) {
                const dot = document.createElement('div');
                dot.className = `stack-dot ${i === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => updateStack(i));
                stackDotsContainer.appendChild(dot);
            }
        }

        function updateStack(newIndex) {
            activeStackIdx = (newIndex + totalCards) % totalCards;

            stackCards.forEach((card, idx) => {
                let diff = idx - activeStackIdx;

                // Adjust diff for seamless circular rotation
                if (diff > Math.floor(totalCards / 2)) {
                    diff -= totalCards;
                } else if (diff < -Math.floor(totalCards / 2)) {
                    diff += totalCards;
                }

                if (diff >= -2 && diff <= 2) {
                    card.setAttribute('data-stack-pos', diff.toString());
                } else {
                    card.setAttribute('data-stack-pos', 'hidden');
                }
            });

            // Update counter text
            if (stackCounterText) {
                const currentFormatted = (activeStackIdx + 1) < 10 ? `0${activeStackIdx + 1}` : (activeStackIdx + 1);
                const totalFormatted = totalCards < 10 ? `0${totalCards}` : totalCards;
                stackCounterText.textContent = `${currentFormatted} / ${totalFormatted}`;
            }

            // Update dots
            if (stackDotsContainer) {
                const dots = stackDotsContainer.querySelectorAll('.stack-dot');
                dots.forEach((dot, i) => {
                    if (i === activeStackIdx) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }

        // Initialize stack positions
        updateStack(0);

        // Controls Click Listeners
        if (stackPrevBtn) {
            stackPrevBtn.addEventListener('click', () => {
                updateStack(activeStackIdx - 1);
            });
        }

        if (stackNextBtn) {
            stackNextBtn.addEventListener('click', () => {
                updateStack(activeStackIdx + 1);
            });
        }

        // Click directly on side cards to bring them into center
        stackCards.forEach((card, idx) => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.stack-expand-btn, .stack-cta-btn')) return;

                const pos = card.getAttribute('data-stack-pos');
                if (pos === '1' || pos === '2') {
                    updateStack(activeStackIdx + 1);
                } else if (pos === '-1' || pos === '-2') {
                    updateStack(activeStackIdx - 1);
                }
            });
        });

        // Category Filter Connection
        const portfolioFilterBtns = document.querySelectorAll('.portfolio-filter-bar .filter-btn');
        portfolioFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterVal = btn.dataset.filter;
                portfolioFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (filterVal === 'all') {
                    updateStack(0);
                    return;
                }

                // Find index of first card matching filter
                let targetIdx = -1;
                stackCards.forEach((c, i) => {
                    if (targetIdx === -1 && c.dataset.category === filterVal) {
                        targetIdx = i;
                    }
                });

                if (targetIdx !== -1) {
                    updateStack(targetIdx);
                }
            });
        });
    }

    /* ==========================================
       FLOATING SPEEDDIAL CONTACT TOGGLE
       ========================================== */
    const speeddialBtns = document.querySelectorAll('.speeddial-btn');
    speeddialBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const triggerBox = btn.closest('.speeddial-trigger-box');
            const popover = triggerBox ? triggerBox.querySelector('.speeddial-popover') : null;
            if (popover) {
                const wasActive = popover.classList.contains('active');
                // Close all popovers
                document.querySelectorAll('.speeddial-popover.active').forEach(p => p.classList.remove('active'));
                // Toggle clicked popover
                if (!wasActive) {
                    popover.classList.add('active');
                }
            }
        });
    });

    // Close speeddial popovers when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.speeddial-trigger-box')) {
            document.querySelectorAll('.speeddial-popover.active').forEach(p => p.classList.remove('active'));
        }
    });

    /* ==========================================
       ULTRA-LUXURY SCROLL REVEAL OBSERVER
       ========================================== */
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

});



