export class Route {
    url: string;
    routing: () => string;
    type: string;

    constructor(url: string, routing: () => string, type: string) {
        this.url = url;
        this.routing = routing;
        this.type = type;
    }
}