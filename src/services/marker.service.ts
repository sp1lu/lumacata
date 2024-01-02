export class MarkerService {
    static _iconNames: string[] = ['bus', 'festival', 'shuttle'];
    static _iconsUrl = './assets/icons/';
    static _instance: MarkerService;
    _icons!: HTMLElement[];

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

    set icons(icons: HTMLElement[]) {
        this._icons = icons;
    }

    getIcons() {
        if (this.icons.length !== 0) {            
            return this.icons;
        } else {           
            return this.icons = this.createIcons(this.fetchUrls());
        }
    }

    fetchUrls(): string[] {
        let iconsUrl: string[] = [];
        MarkerService._iconNames.map(name => {
            let url = `${MarkerService._iconsUrl}${name}-icon.svg`;
            iconsUrl.push(url);
        });        
        return iconsUrl;
    }

    createIcons(urls: string[]): HTMLElement[] {
        let icons: HTMLElement[] = []
        urls.forEach(url => {
            let icon = document.createElement('img');
            icon.setAttribute('src', url);
            icons.push(icon);
        });
        return icons;
    }
}