import { MapComponent } from '../components/map.component.ts';
import { MapService } from '../services/map.service.ts';

export class MapPage extends HTMLElement {
    shadow: ShadowRoot;
    _data: any;
    private _map : MapComponent | null;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
        this._map = null;
    }

    get data() {
        return this._data;
    }

    set data(data: any) {
        this._data = data;
    }

    get map() {
        return this._map;
    }

    set map(map: MapComponent | null) {
        this._map = map;
    }

    async connectedCallback() {
        // services
        this.data = await MapService.instance.getData();        

        // html
        this.shadow.innerHTML =
            `
            <app-map></app-map>
            `
            ;

        this.map = this.shadow.querySelector('app-map') as MapComponent;
        if(!this.map) return;
        this.map.data = this.data;
    }
}

customElements.define('page-map', MapPage);