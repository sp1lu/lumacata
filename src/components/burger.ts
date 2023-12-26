export class BurgerBtn extends HTMLElement {
    shadow: ShadowRoot;
    isOpen: boolean;
    checkbox!: HTMLInputElement;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
        this.isOpen = false;
    }

    connectedCallback() {
        // html
        this.shadow.innerHTML =
            `
            <div id="wrapper">
                <input type="checkbox" id="checkbox">
                <label for="checkbox" class="toggle">
                    <div class="bars" id="bar1"></div>
                    <div class="bars" id="bar2"></div>
                    <div class="bars" id="bar3"></div>
                </label>
            </div>
            `
            ;

        if (!this.hasAttribute('is-open')) this.setAttribute('is-open', this.isOpen + '');
        this.checkbox = this.shadow.querySelector('input')!;

        // js
        this.checkbox.addEventListener('change', () => {
            this.isOpen = !this.isOpen;          
            this.setAttribute('is-open', this.isOpen + '');
        });

        // css
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', './css/burger.css');
        this.shadow.append(style);
    }

    static observedAttributes = ['is-open'];
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (newValue != oldValue) {
            if (name == 'is-open') {                
                this.isOpen = JSON.parse(newValue);
                document.dispatchEvent(new CustomEvent('menu-toggled', { detail: { isOpen: JSON.parse(newValue) } }));
            }
        }
    }
}

customElements.define('app-burger', BurgerBtn);