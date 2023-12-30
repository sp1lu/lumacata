import { Dish } from '../models/dish.model.ts';

export class DishComponent extends HTMLElement {
    shadow: ShadowRoot;
    _dish: Dish;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
        this._dish = { name: '', price: 0 };
    }

    get dish() {
        return this._dish;
    }

    set dish(dish: Dish) {
        this._dish = dish;
    }

    connectedCallback() {
        // html
        this.shadow.innerHTML =
            `
            <div>
                <p class="name"></p>
                <div class="price">
                    <span class="currency">€</span>
                    <p class="value"></p>
                </div>
            </div>
            `
            ;

        const text = this.shadow.querySelector('.name')!;
        const price = this.shadow.querySelector('.value')!;
        text.innerHTML = this.dish.name;
        price.innerHTML = this.dish.price.toFixed(2);

        // css
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', './css/dish.css');
        this.shadow.append(style);
    }
}

customElements.define('app-dish', DishComponent);