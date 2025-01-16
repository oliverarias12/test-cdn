// navbar.js
(function() {
    const navbarData = [
        { href: 'https://suite.frontsteps.com/', text: 'Suite Manager', icon: 'https://oliverarias12.github.io/test-cdn/icons/suite-manager-icon.svg' },
        { href: 'https://app.frontsteps.com', text: 'Community', icon: 'https://oliverarias12.github.io/test-cdn/icons/community-icon.svg' },
        { href: 'frontstepscaliber://', text: 'Caliber', icon: 'https://oliverarias12.github.io/test-cdn/icons/caliber-icon.svg' },
        { href: 'https://fspay-dashboard.frontsteps.com/', text: 'Payments', icon: 'https://oliverarias12.github.io/test-cdn/icons/payments-icon.svg' },
        { href: 'https://community.dwellinglive.com/', text: 'Dwelling', icon: 'https://oliverarias12.github.io/test-cdn/icons/dwelling-icon.svg' },
        { href: 'https://frontsteps.com/frontsteps-partners-integrations/', text: 'Verified Ambassadors', icon: 'https://oliverarias12.github.io/test-cdn/icons/verified-ambassadors-icon.svg' }
    ];

    function createNavbar() {
        const navbar = document.createElement('div');
        navbar.className = 'navbar';

        navbarData.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;

            // Create an icon element
            const icon = document.createElement('img');
            icon.src = link.icon;
            icon.className = 'product-icon';

            // Create a text node
            const linkName = document.createElement('span');
            linkName.innerText = link.text;
            linkName.className = 'link-name';
            
            // Append the icon and text to the anchor
            a.appendChild(icon);
            a.appendChild(linkName);

            // Add open-in icon for mobile view
            if (isMobile()) {
                const openInIcon = document.createElement('img');
                openInIcon.src = 'https://oliverarias12.github.io/test-cdn/icons/open-new-icon.svg';
                openInIcon.className = 'open-new-icon';
                a.appendChild(openInIcon);
            }

            navbar.appendChild(a);
        });

        return navbar;
    }

    function isMobile() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
        // Check for mobile devices
        return /android|iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    }

    // Append the navbar to the specified element
    document.getElementById('navbar').appendChild(createNavbar());

    // Toggle navbar visibility
    const toggleButton = document.getElementById('navbar-toggle');
    toggleButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click event from bubbling up
        const navbarElement = document.getElementById('navbar');
        navbarElement.classList.toggle('hidden');
    });

    // Dismiss navbar when clicking outside of it
    document.addEventListener('click', (event) => {
        const navbarElement = document.getElementById('navbar');
        const isClickInsideNavbar = navbarElement.contains(event.target);
        const isClickOnToggleButton = toggleButton.contains(event.target);

        if (!isClickInsideNavbar && !isClickOnToggleButton) {
            navbarElement.classList.add('hidden'); // Hide the navbar
        }
    });
})();