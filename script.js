document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    // Mobilmeny
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            const isOpen = sidebar.classList.toggle('open');
            menuToggle.setAttribute('aria-label', isOpen ? 'Stäng meny' : 'Öppna meny');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    // Navigering
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }

                if (window.innerWidth <= 760 && sidebar && menuToggle) {
                    sidebar.classList.remove('open');
                    menuToggle.setAttribute('aria-label', 'Öppna meny');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Markera aktiv sektion
    function updateActiveNavigation() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            const targetId = link.getAttribute('href')?.slice(1);
            link.classList.toggle('active', targetId === currentSection);
        });
    }

    window.addEventListener('scroll', updateActiveNavigation);
    window.addEventListener('load', updateActiveNavigation);
    updateActiveNavigation();
});
