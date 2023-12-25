export class Index extends HTMLElement {
    private shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        // html
        this.shadow.innerHTML =
            `
            <div>
                <span class="intro">Il Circolo PD Valcerusa presenta</span>
                <h1>
                    <span class="first-row">LUMA</span>
                    <span class="second-row">CATA</span>
                    <span class="year">2024</span>
                </h1>
                <h2>10 - 15 GIUGNO</h2>
            </div>
            `
            ;

        // css
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', './css/index.css');
        this.shadow.append(style);
    }
}

customElements.define('page-index', Index);