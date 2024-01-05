import leafletCss from 'leaflet/dist/leaflet.css?raw';
import Leaflet from 'leaflet';
import { MapService } from '../services/map.service.ts';
import { MarkerService } from '../services/marker.service.ts';
import { Icon } from '../models/icon.model.ts';

export class MapComponent extends HTMLElement {
    _data: any;
    _map: Leaflet.Map | any;
    _markerOptions: any;
    _icons: Icon[];

    constructor() {
        super();
        this._map = null;
        this._markerOptions = null;
        this._icons = [];
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

    set map(map: Leaflet.Map | any) {
        this._map = map;
    }

    get markerOptions() {
        return this._markerOptions;
    }

    set markerOptions(markerOptions: any) {
        this._markerOptions = markerOptions;
    }

    get icons() {
        return this._icons;
    }

    set icons(icons: Icon[]) {
        this._icons = icons;
    }

    async connectedCallback() {
        // services
        this.data = await MapService.instance.getData();
        this.icons = MarkerService.instance.getIcons();

        // css
        const css = document.createElement('style');
        css.innerHTML = leafletCss;
        this.append(css);

        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', './css/map.css');
        this.append(style);

        // js
        this.map = Leaflet.map(this, { zoomControl: false }).setView([44.44061405644311, 8.736987188621248], 14);

        Leaflet.control.zoom({ position: 'bottomright' }).addTo(this.map);

        Leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        // setTimeout(() => {
        //     if (!this.map) return;
        //     this.map.invalidateSize();
        // }, 100);

        this.render();
    }

    render() {
        Leaflet.geoJSON(this.data, {
            pointToLayer: (feature, latLng) => this.createMarker(feature, latLng),
            onEachFeature: this.createPopup
        }).addTo(this.map);
    }

    createMarker(feature: any, latLng: Leaflet.LatLng) {
        const iconName = feature.properties.icon;
        const chosenIcon = this.icons.find(icon => icon.name == iconName);

        if (chosenIcon) {       
            let svgIcon = new Leaflet.DivIcon({
                html: chosenIcon.object,
                className: `${chosenIcon.name}`,
                iconSize: [24, 40],
                iconAnchor: [12, 40],
                popupAnchor: [0, -48]
            });
            return Leaflet.marker(latLng, { icon: svgIcon });
        } else {
            return Leaflet.marker(latLng);
        }
    }

    createPopup(feature: any, layer: Leaflet.Layer) {
        if (!feature.properties && !feature.properties.title) return;
        layer.bindPopup(feature.properties.title);
    }
}

customElements.define('app-map', MapComponent);