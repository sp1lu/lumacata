// Import services
import './services/DataService.ts';

// Import modules
import './routing/router.ts';
import './routing/index.ts';
import './components/burger.ts';
import './components/menu.ts';

import { Router, Route } from './routing/router.ts';
import { DataService } from './services/DataService.ts';

// Routing
const loadIndex = () => '<page-index></page-index>'
const loadProgram = () => '<div>PROGRAMMA</div>'
const loadMenu = () => '<div>MENU</div>'
const loadNotFound = () => '<div>404</div>';

const router = document.querySelector('app-router') as Router;
const routes: Route[] = [
  { url: 'index', routing: loadIndex, type: 'default' },
  { url: 'menu', routing: loadMenu, type: 'page' },
  { url: 'programma', routing: loadProgram, type: 'page' },
  { url: '404', routing: loadNotFound, type: '404' }
];

router.addRoutes(routes);

// Menu data
DataService.instance.getData().then(data => {
  console.log(data);
});