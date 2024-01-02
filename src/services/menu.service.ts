export class MenuService {
    static _dataUrl = './json/menu.json';
    static _instance: MenuService;
    _data: any;

    constructor() {
        if (MenuService._instance) {
            return MenuService._instance
        }
        MenuService._instance = this;
    }

    get data() {
        return this._data;
    }

    set data(data: any) {
        this._data = data;
    }

    static get instance() {
        if (!MenuService._instance) {
            MenuService._instance = new MenuService();
        }
        return MenuService._instance;
    }

    getData() {
        return this.data ?
            Promise.resolve(this.data) :
            fetch(MenuService._dataUrl)
                .then(res => res.json())
                .then(data => {
                    this.data = data;
                    return data;
                });
    }
}