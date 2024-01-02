export class ProgramService {
    static _dataUrl = './json/program.json';
    static _instance: ProgramService;
    _data: any;

    constructor() {
        if (ProgramService._instance) return ProgramService._instance;
        ProgramService._instance = this;
    }

    get data() {
        return this._data;
    }

    set data(data: any) {
        this._data = data;
    }

    static get instance() {
        if (!ProgramService._instance) {
            ProgramService._instance = new ProgramService();
        }
        return ProgramService._instance;
    }

    getData() {
        return this.data ?
            Promise.resolve(this.data) :
            fetch(ProgramService._dataUrl)
                .then(res => res.json())
                .then(data => {
                    this.data = data;
                    return data;
                });
    }
}