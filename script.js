const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(item => item.classList.remove("active"));
        link.classList.add("active");

        // Stäng menyn automatiskt på mobil
        if (window.innerWidth <= 760) {
            sidebar.classList.remove("open");
        }
    });
});

// Markerar rätt menyval när man scrollar mellan sektionerna
const sections = document.querySelectorAll(".page-section");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        const linkTarget = link.getAttribute("href").replace("#", "");

        if (
            linkTarget === currentSection ||
            (currentSection === "main-info" && linkTarget === "home")
        ) {
            link.classList.add("active");
        }
    });
});
