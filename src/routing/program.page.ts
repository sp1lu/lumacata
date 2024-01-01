export class ProgramPage extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        // html
        this.shadow.innerHTML =
            `
            <div>
                <p>PROGRAMMA</p>
            </div>
            `
            ;
    }
}

customElements.define('page-program', ProgramPage);