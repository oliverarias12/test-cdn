class GlobalNav extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    get links() {
      const linksAttr = this.getAttribute('links');
      return linksAttr ? JSON.parse(linksAttr) : [];
    }
  
    toggleMenu() {
      const menu = this.shadowRoot?.querySelector('.menu-popover') as HTMLElement;
      if (menu) {
        menu.classList.toggle('invisible');
      }
    }
  
    render() {
  
      if (!this.shadowRoot) {
        return;
      }
  
      this.shadowRoot.innerHTML = `
        <style>
          button.menu-button {
            height: 64px;
            width: 64px;
            background-color: #243141;
            color: white;
            padding: 1rem;
            border: none;
            cursor: pointer;
            font-size: 16px;
          }
  
          .menu-popover {
            position: fixed;
            background-color: #243141;
            border-radius: 8px;
            box-shadow: 0px 4px 16px 0px #00000073;
            padding: 1rem;
            z-index: 10000000;
            min-width: 150px;
            height: fit-content;
            display: block;
          }
  
          .invisible {
            display: none;
          }
  
          .menu-popover a {
            display: block;
            margin: 0.5rem 0;
            color: #A9C2D6;
            text-decoration: none;
          }
  
          .menu-popover a:hover {
            text-decoration: underline;
          }
        </style>
        <button class="menu-button">☰</button>
        <div class="menu-popover invisible">
          ${this.links.map((link: { url: any; label: any; }) => `<a href="${link.url}">${link.label}</a>`).join('')}
        </div>
      `;
  
      // Add event listener to the menu button
      const menuButton = this.shadowRoot?.querySelector('.menu-button') as HTMLElement;
  
      if (!menuButton) {
        console.log("no menu button");
        return;
      }
  
      menuButton?.addEventListener('click', () => this.toggleMenu());
  
      // Close the menu when clicking outside of it
      // document.addEventListener('click', (event) => {
      //   const menu = this.shadowRoot?.querySelector('.menu-popover') as HTMLElement;
      //   if (menu && !this.shadowRoot?.contains(event.target as Node)) {
      //     if (menu.classList.contains('invisible')) {
      //       menu.classList.add('invisible');
      //     }
      //   }
      // });
    }
  }
  
  customElements.define('global-nav', GlobalNav);