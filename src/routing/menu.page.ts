import { DishComponent } from '../components/dish.component.ts';
import { Dish } from '../models/dish.model.ts';
import { MenuService } from '../services/menu.service.ts';

export class MenuPage extends HTMLElement {
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
        this.data = await MenuService.instance.getData();

        // html
        this.shadow.innerHTML = '<div></div>';
        const div = this.shadow.querySelector('div');

        this.data.categorie.forEach((category: any) => {
            if (!category.name) return;
            const title = document.createElement('h2');
            title.classList.add('category-title');
            title.innerText = category.name;
            div?.append(title);

            category.dishes.forEach((item: any) => {
                if (!item.name || !item.price) return;
                const dish = new Dish(item.name, item.price);
                const dishComponent = document.createElement('app-dish') as DishComponent;
                dishComponent.dish = dish;
                div?.append(dishComponent);
            });
        });

        // css
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', './css/menu.css');
        this.shadow.append(style);
    }
}

customElements.define('page-menu', MenuPage);