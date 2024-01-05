import { ExperienceComponent } from '../components/experience.component.ts';
import { Experience } from '../models/experience.model.ts';
import { ProgramService } from '../services/program.service.ts';

export class ProgramPage extends HTMLElement {
    shadow: ShadowRoot;
    _data: any;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
    }

    get data() {
        return this._data;
    }

    set data(data: any) {
        this._data = data;
    }

    async connectedCallback() {
        // services
        this.data = await ProgramService.instance.getData();

        // html
        this.shadow.innerHTML = 
            `
            <div class="page">
                <div class="program">
                    <h1>Programma</h1>
                </div>
            </div>
            `
            ;
            
        const div = this.shadow.querySelector('.program');

        this.data.program.forEach((category: any) => {
            if (!category.date) return;
            const date = document.createElement('div');
            date.classList.add('date');
            const title = document.createElement('h2');
            title.classList.add('title');            
            title.innerText = Intl.DateTimeFormat('it-IT', { day: 'numeric', weekday: 'long', month: 'long' }).format(new Date(category.date));
            date?.append(title);
            div?.append(date);

            category.events.forEach((event: any) => {
                const experience = new Experience(new Date(event.date), event.title, event.desc);
                const experienceComponent = document.createElement('app-experience') as ExperienceComponent;
                experienceComponent.experience = experience;
                date?.append(experienceComponent);
            });
        });

        // css
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', './css/program.css');
        this.shadow.append(style);
    }
}

customElements.define('page-program', ProgramPage);