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
        console.log(this.data);
        
        
        // html
        this.shadow.innerHTML =
            `
            <div class="page">
                <p>PROGRAMMA</p>
            </div>
            `
            ;
    }
}

customElements.define('page-program', ProgramPage);