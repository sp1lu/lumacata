import { Route } from '../models/route.model.ts';

export class RouterComponent extends HTMLElement {
    private shadow: ShadowRoot;
    private routes: Route[];

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
        this.routes = [];
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
            const defaultRoute: Route[] = this.routes.filter(route => route.type === 'default');
            if (defaultRoute) {
                window.location.hash = '#' + defaultRoute[0].url;
            } else {
                this.sendToNotFound();
            }
        } else {
            const hashIndex: number = this.routes.findIndex(route => route.url == hash);
            this.shadow.innerHTML = this.routes[hashIndex] ? this.routes[hashIndex].routing() : this.sendToNotFound();
        }
    }

    addRoutes(routes: Route[]) {
        this.routes = [...routes];
        this.checkRoute();
    }

    sendToNotFound() {
        const notFoundRoute: Route[] = this.routes.filter(route => route.type === '404');
        if (notFoundRoute) {
            window.location.hash = '#' + notFoundRoute[0].url;
            this.changeRoute(notFoundRoute[0].url);
            return '404: Not Found';
        }
        return '404: Not Found';
    }

}

customElements.define('app-router', RouterComponent);