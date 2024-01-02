import { Experience } from '../models/experience.model.ts';

export class ExperienceComponent extends HTMLElement {
    shadow: ShadowRoot;
    _experience: Experience;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
        this._experience = new Experience(new Date(), '', '');
    }

    get experience() {
        return this._experience;
    }

    set experience(experience: Experience) {
        this._experience = experience;
    }

    connectedCallback() {
        // html
        this.shadow.innerHTML =
            `
            <div>
                <p class="dayNum"></p>
                <p class="dayName"></p>
            </div>
            `
            ;

        // console.log(this.experience.date.getDay());
        console.log(this.experience.date.getFullYear())

    }
}

customElements.define('app-experience', ExperienceComponent);