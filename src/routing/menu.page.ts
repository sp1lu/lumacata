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
        this.shadow.innerHTML =
        
            `
            <div class="page">
                <div class="menu">
                    <h1>Menu</h1>
                    <p class="info">I piatti contrasseganti da una lettera <span class="sunday-only">D</span> sono disponibili solo durante il pranzo di domenica 16 giugno.</p>
                </div>
            </div>
            `
            ;

        const div = this.shadow.querySelector('.menu');

        this.data.categorie.forEach((category: any) => {
            if (!category.name) return;
            const course = document.createElement('div');
            course.classList.add('course');
            const title = document.createElement('h2');
            title.classList.add('title');
            title.innerText = category.name;
            course?.append(title);
            div?.append(course);

            category.dishes.forEach((item: any) => {
                if (!item.name || !item.price) return;
                const dish = new Dish(item.name, item.price, item.sundayOnly);
                const dishComponent = document.createElement('app-dish') as DishComponent;
                dishComponent.dish = dish;
                course?.append(dishComponent);
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