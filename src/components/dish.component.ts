import { Dish } from '../models/dish.model.ts';

export class DishComponent extends HTMLElement {
    shadow: ShadowRoot;
    _dish: Dish;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
        this._dish = { name: '', price: 0, sundayOnly: false };
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
            <div class="component">
                <div class="dish">
                    <p class="name"></p>
                </div>
                <div class="price">
                    <span class="currency">€</span>
                    <p class="value"></p>
                </div>
            </div>
            `
            ;

        const dish = this.shadow.querySelector('.dish')!;
        const text = this.shadow.querySelector('.name')!;
        const price = this.shadow.querySelector('.value')!;

        text.innerHTML = this.dish.name;
        price.innerHTML = this.dish.price.toFixed(2);

        if (this.dish.sundayOnly) {        
            let sunday = document.createElement('span');
            sunday.classList.add('sunday-only');
            sunday.innerText = 'D';
            dish.append(sunday);
        }

        // css
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', './css/dish.css');
        this.shadow.append(style);
    }
}

customElements.define('app-dish', DishComponent);