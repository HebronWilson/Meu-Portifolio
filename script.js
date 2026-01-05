document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CUSTOM CURSOR EFFECT
    const cursor = document.querySelector('.cursor-dot');
    
    // Apenas ative o cursor customizado em dispositivos não-touch para melhor UX
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            // Move o cursor diretamente
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Efeito ao passar sobre links ou botões
        const hoverables = document.querySelectorAll('a, button, .project-card');
        
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
                cursor.style.mixBlendMode = 'normal'; // Opcional: muda o blend mode
                cursor.style.backgroundColor = 'rgba(204, 255, 0, 0.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.mixBlendMode = 'difference';
                cursor.style.backgroundColor = 'var(--accent-color)';
            });
        });
    }

    // 2. SCROLL REVEAL ANIMATION (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-card');

    const revealOptions = {
        threshold: 0.1, // Dispara quando 10% do elemento está visível
        rootMargin: "0px 0px -50px 0px" // Pequeno offset para animar antes de estar totalmente na tela
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 3. SMOOTH SCROLL PARA LINKS INTERNOS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});