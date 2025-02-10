const scriptURL = 'https://script.google.com/macros/s/AKfycbw1uBrLcYrFFfWqel8li8GC80O2ySj6mskR7pFesLD_BcsJyUE3wsHQOZA6x1lC3IEn1w/exec';
const form = document.forms['submit-to-google-sheet'];

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) submitButton.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                alert("Message sent successfully!");
                form.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("Failed to send message. Please try again.");
            })
            .finally(() => {
                if (submitButton) submitButton.disabled = false;
            });
    });
}

document.addEventListener("DOMContentLoaded", () => {
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

    // Menu icon functionality
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            navbar.classList.toggle('active');
            menuIcon.classList.toggle('bx-x');
        };

        // Close menu when clicking a link
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuIcon.classList.remove('bx-x');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuIcon.contains(e.target) && !navbar.contains(e.target)) {
                navbar.classList.remove('active');
                menuIcon.classList.remove('bx-x');
            }
        });
    }
});
