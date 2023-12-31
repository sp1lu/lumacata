export class MapService {
    static _dataUrl = './json/map.geojson';
    static _instance: MapService;
    _data: any;

    constructor() {
        if (MapService._instance) return MapService._instance;
        MapService._instance = this;
    }

    get data() {
        return this._data;
    }

    set data(data: any) {
        this._data = data;
    }

    static get instance() {
        if (!MapService._instance) {
            MapService._instance = new MapService();
        }
        return MapService._instance;
    }

    getData() {
        return this.data ?
            Promise.resolve(this.data) :
            fetch(MapService._dataUrl)
                .then(res => res.json())
                .then(data => {
                    this.data = data;
                    return data;
                });
    }
}