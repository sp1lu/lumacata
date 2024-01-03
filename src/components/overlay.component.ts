export class OverlayComponent extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        // html
        this.shadow.innerHTML =
            `
            <span class="eat">eat</span>
            <span class="drink">drink</span>
            <span class="fun">fun</span>
            `
        ;

        // css
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', './css/overlay.css');
        this.shadow.append(style);
    }
}

customElements.define('app-overlay', OverlayComponent);