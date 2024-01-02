export class MapPage extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {     
        // html
        this.shadow.innerHTML =
            `
            <div class="page">
                <app-map></app-map>
                <div class="directions">
                    <h1>Come raggiungerci</h1>
                    <div class="vehicle">
                        <h2>Con il servizio navetta</h2>
                        <p>Per raggiungerci in comodità senza la preoccupazione del parcheggio è a disposizione un servizio navetta assolutamente <b>gratuito</b>.</p>
                        <p>La navetta è offerta da <b>Diana Viaggi</b> con partenza da <b>Largo Carlo Dall'Orto</b> (piazzale che serve come <b>capolinea della linea 1</b> di AMT) indicativamente ogni mezz'ora a partire dalle ore 18:00.</p>
                        <p>Domenica 15 giugno in occasione dell'apertura della sagra anche a pranzo il servizio navetta è disponibile anche dalle 12:00 alle 14:00.</p>
                    </div>
                    <div class="vehicle">
                        <h2>Con i mezzi pubblici</h2>
                        <ul>
                            <li>Raggiungere la delegazione di Genova Voltri.</li>
                            <li>Prendere l'autobus della <b>linea 97 (o 97/)</b> di AMT. La linea parte da <b>Piazzale Rosa Parks</b> (davanti alla <b>stazione ferroviaria di Genova Voltri</b>) e fa diverse fermate attraversando la delegazione in direzione est.</li>
                            <li>Scendere alla fermata <b>Fabbriche 13</b> (od al capolinea nel caso del 97/).</li>
                        </ul>
                    </div>
                    <div class="vehicle">
                        <h2>Con l'auto</h2>
                        <ul>
                            <li>Uscire dall'autostrada A10 Genova - Ventimiglia al casello <b>Genova Pra'</b>.</li>
                            <li>Attraversare in direzione est tutta la delegazione di Genova Voltri.</li>
                            <li>All'altezza della foce del torrente Cerusa svoltare a destra in <b>Via delle Fabbriche</b>.</li>
                            <li>Percorrere Via delle Fabbriche per 3.5km circa fino al <b>circolo Arci Fabbriche</b>, in Via delle Fabbriche 179.</li>
                        </ul>
                    </div>
                </div>
            </div>
            `

            // css
            const style = document.createElement('link');
            style.setAttribute('rel', 'stylesheet');
            style.setAttribute('href', '/css/directions.css');
            this.shadow.append(style);
            ;
    }
}

customElements.define('page-map', MapPage);