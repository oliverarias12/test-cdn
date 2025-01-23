var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GlobalNav = /** @class */ (function (_super) {
    __extends(GlobalNav, _super);
    function GlobalNav() {
        var _this = Reflect.construct(HTMLElement, [], new.target);
        _this.attachShadow({ mode: 'open' });
        _this.handleClickOutside = _this.handleClickOutside.bind(_this); // Bind the method to the class context
        return _this;
    }
    Object.defineProperty(GlobalNav, "observedAttributes", {
        get: function () {
            return ['links', 'isMobile'];
        },
        enumerable: false,
        configurable: true
    });
    GlobalNav.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        // React to attribute changes
        if ((name === 'links' || name === 'isMobile') && oldValue !== newValue) {
            this.render();
        }
    };
    GlobalNav.prototype.connectedCallback = function () {
        this.render();
        document.addEventListener('click', this.handleClickOutside); // Add event listener for clicks outside
    };
    GlobalNav.prototype.disconnectedCallback = function () {
        document.removeEventListener('click', this.handleClickOutside); // Clean up the event listener
    };
    Object.defineProperty(GlobalNav.prototype, "links", {
        get: function () {
            var linksAttr = this.getAttribute('links');
            var result = linksAttr ? JSON.parse(linksAttr) : [];
            result.forEach(function (element) {
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
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GlobalNav.prototype, "isMobile", {
        get: function () {
            var isMobileAttr = this.getAttribute('isMobile');
            return isMobileAttr === 'true';
        },
        enumerable: false,
        configurable: true
    });
    GlobalNav.prototype.toggleMenu = function () {
        var _a;
        var menu = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.global-nav-menu-popover');
        if (menu) {
            menu.classList.toggle('invisible');
        }
    };
    GlobalNav.prototype.handleClickOutside = function (event) {
        var _a, _b;
        var menu = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.global-nav-menu-popover');
        var menuButton = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('.global-nav-menu-button');
        // Check if the click was outside the menu and the button
        if (menu && menuButton) {
            var path = event.composedPath(); // Get the event path
            var isClickInsideMenu = false;
            var isClickInsideButton = false;
            for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
                var node = path_1[_i];
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
    };
    GlobalNav.prototype.render = function () {
        var _this = this;
        var _a;
        if (!this.shadowRoot) {
            return;
        }
        this.shadowRoot.innerHTML = "\n        <style>\n          button.global-nav-menu-button {\n            background-color: #15212F;\n            color: white;\n            border: none;\n            padding: 20px 20px;\n            cursor: pointer;\n            border-right: 2px solid #15212F;\n            width: 60px;\n            height: 64px;\n            font-size: 16px;\n          }\n\n          .global-nav-menu-button img {\n            width: 20px;\n            height: 20px;\n          }\n  \n          .global-nav-menu-popover {\n            display: flex;\n            flex-direction: column;\n            background-color: #15212F;\n            border-bottom-left-radius: 12px;\n            border-bottom-right-radius: 12px;\n            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);\n            z-index: 1000; /* Ensure it appears above other elements */\n            width: 300px;\n            height: fit-content;\n          }\n\n          .invisible {\n            display: none;\n          }\n  \n          .global-nav-menu-popover a {\n            display: flex;\n            color: #A9C2D6;\n            font-weight: 700;\n            font-size: 13px;\n            line-height: 20.56px;\n            padding: 16px 12px 16px 12px;\n            text-decoration: none;\n            text-transform: uppercase;\n            margin-left: 15px;\n            letter-spacing: 2px;\n          }\n            .global-nav-mobile a {\n                font-size: 12px;\n            }\n  \n          .global-nav-menu-popover a:hover {\n            color: #FFFFFF;\n          }\n\n            .product-icon {\n                margin-right: 8px; /* Space between icon and text */\n                height: 20px;\n                width: 20px;\n            }\n            .product-icon-mobile {\n                height: 16px;\n                width: 16px;\n            }\n\n            .open-new-icon {\n                margin-left: auto;\n                width: 16px;\n                height: 16px;\n            }\n        </style>\n        <button class=\"global-nav-menu-button\"><img src=\"https://oliverarias12.github.io/test-cdn/icons/menu-icon.svg\"></button>\n        <div class=\"global-nav-menu-popover invisible\">\n          ".concat(this.links.map(function (link) {
            var productIcon = '';
            var openNewIcon = '';
            if (_this.isMobile) {
                productIcon = link.icon ? "<img src=\"".concat(link.icon, "\" class=\"product-icon product-icon-mobile\">") : '';
                openNewIcon = "<img src=\"https://oliverarias12.github.io/test-cdn/icons/open-new-icon.svg\" class=\"open-new-icon\">";
            }
            else {
                productIcon = link.icon ? "<img src=\"".concat(link.icon, "\" class=\"product-icon\">") : '';
            }
            return "<a href=\"".concat(link.url, "\" target=\"_blank\">").concat(productIcon, "<span class=\"link-name\">").concat(link.label, "</span>").concat(openNewIcon, "</a>");
        }).join(''), "\n        </div>\n      ");
        // Add event listener to the menu button
        var menuButton = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.global-nav-menu-button');
        if (!menuButton) {
            console.log("no menu button");
            return;
        }
        menuButton === null || menuButton === void 0 ? void 0 : menuButton.addEventListener('click', function () { return _this.toggleMenu(); });
    };
    return GlobalNav;
}(HTMLElement));
customElements.define('global-nav', GlobalNav);
