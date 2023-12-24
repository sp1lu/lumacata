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
                <h1>
                    <span>LUMA</span>
                    <span>CATA</span>
                    <span>2024</span>
                </h1>
                <h2>10 - 15 giugno</h2>
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

customElements.define('app-index', Index);