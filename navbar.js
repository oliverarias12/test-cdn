// navbar.js
(function() {
    const navbarData = [
      {
        id: 'suite-manager',
        href: "https://suite.frontsteps.com/",
        text: "Suite Manager",
        icon: "https://oliverarias12.github.io/test-cdn/icons/suite-manager-icon.svg",
      },
      {
        id: 'community',
        href: "https://app.frontsteps.com/auth/frontsteps_auth/callback?token=",
        mobileLinks: {
            app: 'com.everapps.evercondo.residents://',
            appStore: 'https://apps.apple.com/us/app/frontsteps-community/id1121372160',
            googlePlay: 'https://play.google.com/store/apps/details?id=com.everapps.evercondo.residents'
        },
        text: "Community",
        icon: "https://oliverarias12.github.io/test-cdn/icons/community-icon.svg",
      },
      {
        id: 'caliber',
        href: "frontstepscaliber://?token=",
        text: "Caliber",
        icon: "https://oliverarias12.github.io/test-cdn/icons/caliber-icon.svg",
      },
      {
        id: 'payments',
        href: "https://fspay-dashboard.frontsteps.com/?accessToken=",
        text: "Payments",
        icon: "https://oliverarias12.github.io/test-cdn/icons/payments-icon.svg",
      },
      {
        id: 'dwelling',
        href: "https://community.dwellinglive.com/login.aspx?smToken=",
        text: "Dwelling",
        icon: "https://oliverarias12.github.io/test-cdn/icons/dwelling-icon.svg",
      },
      {
        id: 'verifiedAmbassadors',
        href: "https://frontsteps.com/frontsteps-partners-integrations/",
        text: "Verified Ambassadors",
        icon: "https://oliverarias12.github.io/test-cdn/icons/verified-ambassadors-icon.svg",
      },
    ];

    function createNavbar() {
        const navbar = document.createElement('div');
        navbar.className = 'navbar';

        navbarData.forEach(link => {
            const a = document.createElement('a');
            a.id = link.id;
            a.href = link.href;

            // Create an icon element
            const icon = document.createElement('img');
            icon.src = link.icon;
            icon.className = 'product-icon';

            // Create a text node
            const linkName = document.createElement('span');
            linkName.innerText = link.text;
            linkName.className = 'link-name';

            // Add open-in icon for mobile view
            if (isMobile()) {
                const openInIcon = document.createElement('img');
                openInIcon.src = 'https://oliverarias12.github.io/test-cdn/icons/open-new-icon.svg';
                openInIcon.className = 'open-new-icon';

                icon.className = `${icon.className} product-icon-mobile`;
                const nav = document.getElementById('navbar');
                nav.style.width = '300px';
                nav.style.height = '320px';
                nav.style.borderTopRightRadius = '12px';
                nav.style.borderTopLeftRadius = '12px';
                a.appendChild(openInIcon);

                a.href = link.mobileLinks ? link.mobileLinks.app : link.href;
            }

            // Append the icon and text to the anchor
            a.appendChild(icon);
            a.appendChild(linkName);

            if (!(isMobile() && link.id === 'community') && link.id !== 'verifiedAmbassadors') {
                // Add click event to append the access token
                a.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevent the default anchor behavior
                    const tokenizedUrl = `${a.href}${localStorage.getItem('accessToken') ?? ''}`; // Append the token to the URL
                    window.open(tokenizedUrl, '_blank') // Navigate to the new URL with the token
                });
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

    if (isMobile()) {
        let redirectUrl = '';
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/iPad|iPhone|iPod/.test(userAgent)) {
            // iOS device detected, redirect to App Store
            redirectUrl = navbarData.find(link => link.id === 'community').mobileLinks.appStore;
        } else if (/android/i.test(userAgent)) {
            // Android device detected, redirect to Google Play
            redirectUrl = navbarData.find(link => link.id === 'community').mobileLinks.googlePlay;
        }

        const link = document.getElementById('community');
        // Event listener for opening the community app
        link.addEventListener('click', function(event) {
            // Prevent the default action of the link
            event.preventDefault();

            // Start a timer to redirect after a certain duration
            const timeoutId = setTimeout(function() {
                window.open(redirectUrl, '_blank')
            }, 2500);

            // Open the original link in a new tab
            const newTab = window.open(link.href, '_blank');

            // Check if the new tab was successfully opened
            if (newTab) {
                // If the new tab is opened, clear the timeout
                clearTimeout(timeoutId);
            } else {
                // If the new tab was blocked (e.g., by a popup blocker), redirect immediately
                window.open(redirectUrl, '_blank')
            }
        });
    }
})();