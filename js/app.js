document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navbarList = document.getElementById('navbar__list');
    const scrollToTopBtn = document.getElementById('scrollToTop');

    // Build the nav
    sections.forEach(section => {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = `#${section.id}`;
        anchor.textContent = section.dataset.nav;
        anchor.classList.add('menu__link');
        listItem.appendChild(anchor);
        navbarList.appendChild(listItem);
    });

    // Add class 'active' to section when near top of viewport
    const setActiveSection = () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const link = navbarList.querySelector(`a[href="#${section.id}"]`);
            if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                section.classList.add('active');
                link.classList.add('active');
            } else {
                section.classList.remove('active');
                link.classList.remove('active');
            }
        });
    };

    // Scroll to section on link click
    navbarList.addEventListener('click', event => {
        event.preventDefault();
        if (event.target.nodeName === 'A') {
            const targetSection = document.querySelector(event.target.getAttribute('href'));
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Show scroll to top button
    const toggleScrollToTopBtn = () => {
        if (window.scrollY > window.innerHeight) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    };

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        setActiveSection();
        toggleScrollToTopBtn();
    });

    setActiveSection();
});
