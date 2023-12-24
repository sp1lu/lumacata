export interface Route {
    routing: () => string;
    type: string;
}

export class Router extends HTMLElement {
    private shadow: ShadowRoot;
    private routes: { [key: string]: Route };

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
        this.routes = {};
    }

    connectedCallback() {
        window.addEventListener('hashchange', () => {
            this.checkRoute();
        });
    }

    checkRoute() {
        const hash: string = window.location.hash.slice(1);
        this.changeRoute(hash);
    }

    changeRoute(hash: string) {
        if (!hash) {
            const defaultRoute = Object.entries(this.routes).find(([key, value]: [string, Route]) => value.type === 'default');
            
            if (defaultRoute) {
                window.location.hash = '#' + defaultRoute[0];
            } else {
                this.sendToNotFound();
            }
        } else {
            this.shadow.innerHTML = this.routes[hash] ? this.routes[hash].routing() : this.sendToNotFound();
        }
    }

    addRoutes(routes: { [key: string]: Route }) {
        this.routes = routes;
        this.checkRoute();
    }

    sendToNotFound(): string {
        const notFoundRoute = Object.entries(this.routes).find(([key, value]: [string, Route]) => value.type === '404');
        if (notFoundRoute) {
            window.location.hash = '#' + notFoundRoute[0];
            this.changeRoute(notFoundRoute[0]);
            return 'Error 404: Not Found';
        } else {
            return 'Default Error Message';
        }
    }

}

customElements.define('app-router', Router);