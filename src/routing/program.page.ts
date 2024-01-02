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
                <p>PROGRAMMA</p>
            </div>
            `
            ;

        const div = this.shadow.querySelector('.page');       

        this.data.programma.forEach((item: any) => {            
            const experience = new Experience(new Date(item.date), item.title, item.desc);            
            const experienceComponent = document.createElement('app-experience') as ExperienceComponent;            
            experienceComponent.experience = experience;            
            div?.append(experienceComponent);
        });
    }
}

customElements.define('page-program', ProgramPage);