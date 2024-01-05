export class FooterComponent extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        // html
        this.shadow.innerHTML =
            `
            <div class="footer">
                <p>La lumacata è organizzata dal direttivo del circolo Valcerusa del Partito Democratico.</p>
                <a href="https://www.facebook.com/profile.php?id=100068877053488" target="_blank">Pagina Facebook</a>
            </div>
            `
            ;

        // css
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/css/footer.css');
        this.shadow.append(style);
    }
}

customElements.define('app-footer', FooterComponent);