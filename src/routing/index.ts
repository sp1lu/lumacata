export class Index extends HTMLElement {
    private shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        this.shadow.innerHTML = '<div>INDEX</div>';
    }
}

customElements.define('app-index', Index);