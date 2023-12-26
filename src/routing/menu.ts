import { Dish } from '../components/dish.ts';
import { DataService } from '../services/DataService.ts';

export class Menu extends HTMLElement {
    shadow: ShadowRoot;
    _data: any;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
    }

    async connectedCallback() {
        // services
        this.data = await DataService.instance.getData();

        // html
        this.shadow.innerHTML = '<div></div>';
        const div = this.shadow.querySelector('div');

        this.data.categorie.forEach((category: any) => {
            const title = document.createElement('h2');
            title.classList.add('category-title');
            title.innerText = category.name;
            div?.append(title);

            category.dishes.forEach((dish: any) => {
                const dishItem = document.createElement('app-dish') as Dish;
                dishItem.name = dish.name;
                dishItem.price = dish.price;
                div?.append(dishItem);
            });
        });

        // css
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', './css/menu.css');
        this.shadow.append(style);
    }
}

customElements.define('page-menu', Menu);