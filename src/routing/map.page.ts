export class MapPage extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {     
        // html
        this.shadow.innerHTML =
            `
            <app-map></app-map>
            `
            ;
    }
}

customElements.define('page-map', MapPage);