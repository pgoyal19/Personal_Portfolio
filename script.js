const scriptURL = 'https://script.google.com/macros/s/AKfycbw1uBrLcYrFFfWqel8li8GC80O2ySj6mskR7pFesLD_BcsJyUE3wsHQOZA6x1lC3IEn1w/exec';
const form = document.forms['submit-to-google-sheet'];

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                console.log('Success!', response);
                alert("Message sent successfully!");
            })
            .catch(error => console.error('Error!', error.message));
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('show');
        });
    }

    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // About section observer
    const aboutMeSection = document.querySelector(".about-me");

    if (aboutMeSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutMeSection.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(aboutMeSection);
    }

    // Timeline animation
    const observerOptions = { root: null, threshold: 0.2, rootMargin: '0px' };
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
            const targetElement = document.querySelector(this.getAttribute('href'));

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const formData = new FormData(this);
            const formObj = {};
            formData.forEach((value, key) => {
                formObj[key] = value;
            });
        });
    }
});
