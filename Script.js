document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('show');
    });

    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // About section observer
    const aboutMeSection = document.querySelector(".about-me");
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                aboutMeSection.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(aboutMeSection);

    // Timeline animation
    const observerOptions = {
        root: null,
        threshold: 0.2,
        rootMargin: '0px'
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.container').forEach(container => {
        timelineObserver.observe(container);
    });

    // Smooth scroll for about section links
    document.querySelectorAll('a[href^="#about"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact form handling
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        const formObj = {};
        formData.forEach((value, key) => {
            formObj[key] = value;
        });
    });
});