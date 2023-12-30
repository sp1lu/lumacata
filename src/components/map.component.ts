import leafletCss from 'leaflet/dist/leaflet.css?raw';
import Leaflet from 'leaflet';

export class MapComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // css
        const css = document.createElement('style');
        css.innerHTML = leafletCss;
        this.append(css);

        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', './css/map.css');
        this.append(style);

        this.render();
    }

    render() {
        const map = Leaflet.map(this, { zoomControl: false }).setView([44.44771081525607, 8.71992801811008], 15);
        Leaflet.control.zoom({ position: 'bottomright' }).addTo(map);
        Leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        setTimeout(() => { map.invalidateSize(); }, 100);

        const icon = Leaflet.icon({
            iconUrl: '../node_modules/leaflet/dist/images/marker-icon.png',
            iconAnchor: [12.5, 41],
            popupAnchor: [0, -48]
        });

        const marker = Leaflet.marker([44.44771081525607, 8.71992801811008], { icon: icon }).addTo(map);
        marker.bindPopup("<b>Hello world!</b><br>I am a popup.");

        // const circle = Leaflet.circle([44.44771081525607, 8.71992801811008], {
        //     color: 'red',
        //     fillColor: '#f03',
        //     fillOpacity: 0.5,
        //     radius: 10
        // }).addTo(map);
    }
}

customElements.define('app-map', MapComponent);