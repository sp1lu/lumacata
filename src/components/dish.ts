export class Dish extends HTMLElement {
    shadow: ShadowRoot;
    _name : string;
    _price: string;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
        this._name = '';
        this._price = '';
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get price() {
        return this._price;
    }

    set price(price) {
        this._price = price;
    }

    connectedCallback() {
        // html
        this.shadow.innerHTML =
            `
            <div>
                <p class="name"></p>
                <span class="price">€</span>
            </div>
            `
            ;

        const text = this.shadow.querySelector('.name')!;
        const price = this.shadow.querySelector('.price')!;
        text.innerHTML = this.name;
        price.innerHTML += this.price;

        
        // css
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', './css/dish.css');
        this.shadow.append(style);
    }
}

customElements.define('app-dish', Dish);