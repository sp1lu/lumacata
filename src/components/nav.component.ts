import facebook  from '/assets/icons/facebook.svg?url';

interface MenuToggledEventData {
    isOpen: boolean;
}

export class Nav extends HTMLElement {
    shadow: ShadowRoot;
    isOpen: boolean;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
        this.isOpen = false;
    }

    connectedCallback() {        
        // html
        this.shadow.innerHTML =
            `
            <div class="logo">
                <a href="/" class="logo-text">
                    <span class="first-row">LUMA</span>
                    <span class="second-row">CATA</span>
                    <span class="year">2024</span>
                </a>
            </div>
            <div class="menu">
                <ul>
                    <li><a href="#menu">MENU</a></li>
                    <li><a href="#programma">PROGRAMMA</a></li>
                    <li><a href="#dove-siamo">DOVE SIAMO</a></li>
                </ul>
            </div>
            <div class="contacts">
                <a href="https://www.facebook.com/profile.php?id=100068877053488" target="_blank">
                    <img src="${facebook}" class="fb-icon">
                </a>
            </div>
            `
            ;

        if (!this.hasAttribute('is-open')) this.setAttribute('is-open', this.isOpen + '');
        const links = this.shadow.querySelectorAll('a');

        // js
        document.addEventListener('menu-toggle', (event: Event) => {
            const customEvent = event as CustomEvent<MenuToggledEventData>;
            this.isOpen = customEvent.detail.isOpen;
            this.setAttribute('is-open', this.isOpen + '');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                document.dispatchEvent(new CustomEvent('menu-click'));
            });
        })

        // css
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', './css/nav.css');
        this.shadow.append(style);
    }

    static observedAttributes = ['is-open'];
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (newValue != oldValue) {
            if (name == 'is-open') {
                this.isOpen = JSON.parse(newValue);
                this.isOpen == true ? this.classList.add('is-open') : this.classList.remove('is-open');
            }
        }
    }
}

customElements.define('app-menu', Nav);