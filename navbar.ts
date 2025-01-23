class GlobalNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.handleClickOutside = this.handleClickOutside.bind(this); // Bind the method to the class context
    }

    connectedCallback() {
        this.render();
        document.addEventListener('click', this.handleClickOutside); // Add event listener for clicks outside
    }

    disconnectedCallback() {
        document.removeEventListener('click', this.handleClickOutside); // Clean up the event listener
    }

    get links() {
        const linksAttr = this.getAttribute('links');
        let result = linksAttr ? JSON.parse(linksAttr) : [];
        result.forEach((element: { label: string; icon: string; url: string; }) => {
            switch (element.label.toLocaleLowerCase()) {
                case 'suite manager':
                    element.icon = 'https://oliverarias12.github.io/test-cdn/icons/suite-manager-icon.svg';
                    break;
                case 'community':
                    element.icon = 'https://oliverarias12.github.io/test-cdn/icons/community-icon.svg';
                    break;
                case 'caliber':
                    element.icon = 'https://oliverarias12.github.io/test-cdn/icons/caliber-icon.svg';
                    break;
                case 'payments':
                    element.icon = 'https://oliverarias12.github.io/test-cdn/icons/payments-icon.svg';
                    break;
                case 'dwelling':
                    element.icon = 'https://oliverarias12.github.io/test-cdn/icons/dwelling-icon.svg';
                    break;
                case 'verified ambassadors':
                    element.icon = 'https://oliverarias12.github.io/test-cdn/icons/verified-ambassadors-icon.svg';
                    break;
                default:
                    break;
            }
        });
        return result;
    }

    get isMobile() {
        const isMobileAttr = this.getAttribute('isMobile');
        return isMobileAttr === 'true';
    }

    toggleMenu() {
        const menu = this.shadowRoot?.querySelector('.global-nav-menu-popover') as HTMLElement;
        if (menu) {
            menu.classList.toggle('invisible');
        }
    }

    handleClickOutside(event: MouseEvent) {
        const menu = this.shadowRoot?.querySelector('.global-nav-menu-popover') as HTMLElement;
        const menuButton = this.shadowRoot?.querySelector('.global-nav-menu-button') as HTMLElement;

        // Check if the click was outside the menu and the button
        if (menu && menuButton) {
            const path = event.composedPath() as Node[]; // Get the event path
            let isClickInsideMenu = false;
            let isClickInsideButton = false;

            for (const node of path) {
                if (node === menu) {
                    isClickInsideMenu = true;
                }
                if (node === menuButton) {
                    isClickInsideButton = true;
                }
            }

            if (!isClickInsideMenu && !isClickInsideButton) {
                menu.classList.add('invisible'); // Hide the menu
            }
        }
    }

    render() {
        if (!this.shadowRoot) {
            return;
        }

        this.shadowRoot.innerHTML = `
        <style>
          button.global-nav-menu-button {
            background-color: #15212F;
            color: white;
            border: none;
            padding: 20px 20px;
            cursor: pointer;
            border-right: 2px solid #15212F;
            width: 60px;
            height: 64px;
            font-size: 16px;
          }

          .global-nav-menu-button img {
            width: 20px;
            height: 20px;
          }
  
          .global-nav-menu-popover {
            display: flex;
            flex-direction: column;
            background-color: #15212F;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000; /* Ensure it appears above other elements */
            width: 300px;
            height: fit-content;
          }

          .invisible {
            display: none;
          }
  
          .global-nav-menu-popover a {
            display: flex;
            color: #A9C2D6;
            font-weight: 700;
            font-size: 13px;
            line-height: 20.56px;
            padding: 16px 12px 16px 12px;
            text-decoration: none;
            text-transform: uppercase;
            margin-left: 15px;
            letter-spacing: 2px;
          }
            .global-nav-mobile a {
                font-size: 12px;
            }
  
          .global-nav-menu-popover a:hover {
            color: #FFFFFF;
          }

            .product-icon {
                margin-right: 8px; /* Space between icon and text */
                height: 20px;
                width: 20px;
            }
            .product-icon-mobile {
                height: 16px;
                width: 16px;
            }

            .open-new-icon {
                margin-left: auto;
                width: 16px;
                height: 16px;
            }
        </style>
        <button class="global-nav-menu-button"><img src="https://oliverarias12.github.io/test-cdn/icons/menu-icon.svg"></button>
        <div class="global-nav-menu-popover invisible">
          ${this.links.map((link: { url: string; label: string; icon: string; }) => {

            var productIcon = '';
            var openNewIcon = '';

            if (this.isMobile) {
                productIcon = link.icon ? `<img src="${link.icon}" class="product-icon product-icon-mobile">` : '';
                openNewIcon = `<img src="https://oliverarias12.github.io/test-cdn/icons/open-new-icon.svg" class="open-new-icon">`;
            } else {
                productIcon = link.icon ? `<img src="${link.icon}" class="product-icon">` : '';
            }

            return `<a href="${link.url}" target="_blank">${productIcon}<span class="link-name">${link.label}</span>${openNewIcon}</a>`

        }).join('')}
        </div>
      `;

        // Add event listener to the menu button
        const menuButton = this.shadowRoot?.querySelector('.global-nav-menu-button') as HTMLElement;

        if (!menuButton) {
            console.log("no menu button");
            return;
        }

        menuButton?.addEventListener('click', () => this.toggleMenu());
    }
}

customElements.define('global-nav', GlobalNav);