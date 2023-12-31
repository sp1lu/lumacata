export class DataService {
    static _dataUrl = './json/menu.json';
    static _instance: DataService;
    _data: any;

    constructor() {
        if (DataService._instance) {
            return DataService._instance
        }
        DataService._instance = this;
    }

    get data() {
        return this._data;
    }

    set data(data: any) {
        this._data = data;
    }

    static get instance() {
        if (!DataService._instance) {
            DataService._instance = new DataService();
        }
        return DataService._instance;
    }

    getData() {
        return this.data ?
            Promise.resolve(this.data) :
            fetch(DataService._dataUrl)
                .then(res => res.json())
                .then(data => {
                    this.data = data;
                    return data;
                });
    }
}