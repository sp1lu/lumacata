export class HeaderComponent extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        // html
        this.shadow.innerHTML =
            `
            <div class="header">
                <a href="/" class="logo-text">
                    <span class="first-row">LUMA</span>
                    <span class="second-row">CATA</span>
                    <span class="year">2024</span>
                </a>
            </div>
            `
            ;

        // css
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/css/header.css');
        this.shadow.append(style);
    }
}

customElements.define('app-header', HeaderComponent);