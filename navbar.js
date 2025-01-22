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
        return _this;
    }
    GlobalNav.prototype.connectedCallback = function () {
        this.render();
    };
    Object.defineProperty(GlobalNav.prototype, "links", {
        get: function () {
            var linksAttr = this.getAttribute('links');
            return linksAttr ? JSON.parse(linksAttr) : [];
        },
        enumerable: false,
        configurable: true
    });
    GlobalNav.prototype.toggleMenu = function () {
        var _a;
        var menu = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.menu-popover');
        if (menu) {
            menu.classList.toggle('invisible');
        }
    };
    GlobalNav.prototype.render = function () {
        var _this = this;
        var _a;
        if (!this.shadowRoot) {
            return;
        }
        this.shadowRoot.innerHTML = "\n        <style>\n          button.menu-button {\n            height: 64px;\n            width: 64px;\n            background-color: #243141;\n            color: white;\n            padding: 1rem;\n            border: none;\n            cursor: pointer;\n            font-size: 16px;\n          }\n  \n          .menu-popover {\n            position: fixed;\n            background-color: #243141;\n            border-radius: 8px;\n            box-shadow: 0px 4px 16px 0px #00000073;\n            padding: 1rem;\n            z-index: 10000000;\n            min-width: 150px;\n            height: fit-content;\n            display: block;\n          }\n  \n          .invisible {\n            display: none;\n          }\n  \n          .menu-popover a {\n            display: block;\n            margin: 0.5rem 0;\n            color: #A9C2D6;\n            text-decoration: none;\n          }\n  \n          .menu-popover a:hover {\n            text-decoration: underline;\n          }\n        </style>\n        <button class=\"menu-button\">\u2630</button>\n        <div class=\"menu-popover invisible\">\n          ".concat(this.links.map(function (link) { return "<a href=\"".concat(link.url, "\">").concat(link.label, "</a>"); }).join(''), "\n        </div>\n      ");
        // Add event listener to the menu button
        var menuButton = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.menu-button');
        if (!menuButton) {
            console.log("no menu button");
            return;
        }
        menuButton === null || menuButton === void 0 ? void 0 : menuButton.addEventListener('click', function () { return _this.toggleMenu(); });
        // Close the menu when clicking outside of it
        // document.addEventListener('click', (event) => {
        //   const menu = this.shadowRoot?.querySelector('.menu-popover') as HTMLElement;
        //   if (menu && !this.shadowRoot?.contains(event.target as Node)) {
        //     if (menu.classList.contains('invisible')) {
        //       menu.classList.add('invisible');
        //     }
        //   }
        // });
    };
    return GlobalNav;
}(HTMLElement));
customElements.define('global-nav', GlobalNav);
