document.addEventListener('DOMContentLoaded', () => {
    // Select all sections
    const sections = document.querySelectorAll('section');
    // Select the navigation list
    const navbarList = document.getElementById('navbar__list');
    // Select the scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');

    // Build the navigation menu dynamically based on the sections
    sections.forEach(section => {
        // Create a list item for each section
        const listItem = document.createElement('li');
        // Create an anchor tag for each section
        const anchor = document.createElement('a');
        // Set the href attribute to the section's ID
        anchor.href = `#${section.id}`;
        // Set the anchor text to the section's data-nav attribute
        anchor.textContent = section.dataset.nav;
        // Add a class to the anchor for styling
        anchor.classList.add('menu__link');
        // Append the anchor to the list item
        listItem.appendChild(anchor);
        // Append the list item to the navigation list
        navbarList.appendChild(listItem);
    });

    // Add class 'active' to section when near top of viewport
    const setActiveSection = () => {
        // Loop through each section
        sections.forEach(section => {
            // Get the bounding rectangle of the section
            const rect = section.getBoundingClientRect();
            // Select the corresponding navigation link
            const link = navbarList.querySelector(`a[href="#${section.id}"]`);
            // Check if the section is in the viewport
            if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                // Add 'active' class to the section and the corresponding link
                section.classList.add('active');
                link.classList.add('active');
            } else {
                // Remove 'active' class from the section and the corresponding link
                section.classList.remove('active');
                link.classList.remove('active');
            }
        });
    };

    // Scroll to section on link click
    navbarList.addEventListener('click', event => {
        // Prevent the default link click behavior
        event.preventDefault();
        // Check if the clicked element is an anchor
        if (event.target.nodeName === 'A') {
            // Get the target section
            const targetSection = document.querySelector(event.target.getAttribute('href'));
            // Scroll to the target section smoothly
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Show or hide the scroll to top button based on scroll position
    const toggleScrollToTopBtn = () => {
        // Check if the scroll position is past the first viewport height
        if (window.scrollY > window.innerHeight) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    };

    // Scroll to the top smoothly when the scroll to top button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Add event listeners for scroll events
    window.addEventListener('scroll', () => {
        // Set the active section based on scroll position
        setActiveSection();
        // Toggle the visibility of the scroll to top button
        toggleScrollToTopBtn();
    });

    // Initialize the active section and the scroll to top button on page load
    setActiveSection();
});
