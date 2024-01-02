import { Experience } from '../models/experience.model.ts';

export class ExperienceComponent extends HTMLElement {
    shadow: ShadowRoot;
    _experience: Experience;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
        this._experience = { date: new Date(Date.now()), title: '', desc: '' }
    }

    connectedCallback() {
        // html
        this.shadow.innerHTML =
            `
            <div>

            </div>
            `
            ;
    }
}

customElements.define('app-experience', ExperienceComponent);