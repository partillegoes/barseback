const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".page-section");

menuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");

    menuToggle.setAttribute("aria-label", isOpen ? "Stäng meny" : "Öppna meny");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

        if (window.innerWidth <= 760) {
            sidebar.classList.remove("open");
            menuToggle.setAttribute("aria-label", "Öppna meny");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
});

function updateActiveNavigation() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        const linkTarget = link.getAttribute("href").replace("#", "");

        link.classList.toggle(
            "active",
            linkTarget === currentSection ||
            (currentSection === "main-info" && linkTarget === "home")
        );
    });
}

window.addEventListener("scroll", updateActiveNavigation);
window.addEventListener("load", updateActiveNavigation);
