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
            <div class="event">
                <div class="time">
                    <span class="prefix">h.</span>
                    <p class="value"></p>
                </div>
                <div class="description">
                    <h3 class="title"></h3>
                    <p class="desc"></p>
                </div>
            </div>
            `
            ;

        const time = this.shadow.querySelector('.value')!;
        const title = this.shadow.querySelector('.title')!;
        const desc = this.shadow.querySelector('.desc')!;

        time.innerHTML = Intl.DateTimeFormat('it-IT', { hour: 'numeric', minute: 'numeric' }).format(this.experience.date);
        title.innerHTML = this.experience.title;
        desc.innerHTML = this.experience.desc;

        // css
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/css/experience.css');
        this.shadow.append(style);
    }
}

customElements.define('app-experience', ExperienceComponent);