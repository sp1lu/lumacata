import { Icon } from '../models/icon.model.ts';

export class MarkerService {
    static _iconNames: string[] = ['bus', 'festival', 'shuttle'];
    static _iconsUrl = './assets/markers/';
    static _instance: MarkerService;
    _icons!: Icon[];

    constructor() {
        if (MarkerService._instance) return MarkerService._instance;
        MarkerService._instance = this;
        this._icons = [];
    }

    static get instance() {
        if (!MarkerService._instance) {
            MarkerService._instance = new MarkerService();
        }
        return MarkerService._instance;
    }

    get icons() {
        return this._icons;
    }

    set icons(icons: Icon[]) {
        this._icons = icons;
    }

    getIcons(): Icon[] {
        if (this.icons.length !== 0) {
            return this.icons;
        } else {
            let icons: Icon[] = []
            MarkerService._iconNames.map(name => {
                let url = `${MarkerService._iconsUrl}${name}-icon.svg`;
                let iconObj = this.createIcon(url);
                let icon = new Icon(name, iconObj);
                icons.push(icon);
            });
            this.icons = icons;
            return icons;
        }
    }

    createIcon(url: string): HTMLElement {
        let icon = document.createElement('img');
        icon.setAttribute('src', url);
        return icon;
    }
}