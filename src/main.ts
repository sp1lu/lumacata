// Import modules
import './routing/router.component.ts';
import './routing/index.page.ts';
import './routing/menu.page.ts';
import './routing/map.page.ts';

import './components/burger.component.ts';
import './components/nav.component.ts';
import './components/dish.component.ts';
import './components/map.component.ts';

import { Route } from './models/route.model.ts';
import { RouterComponent } from './routing/router.component.ts';

// Routing
const loadIndex = () => '<page-index></page-index>';
const loadProgram = () => '<div>PROGRAMMA</div>';
const loadMenu = () => '<page-menu></page-menu>';
const loadMap = () => '<page-map></page-map>';
const loadNotFound = () => '<div>404</div>';

const router = document.querySelector('app-router') as RouterComponent;
const routes: Route[] = [
  { url: 'index', routing: loadIndex, type: 'default' },
  { url: 'menu', routing: loadMenu, type: 'page' },
  { url: 'programma', routing: loadProgram, type: 'page' },
  { url: 'dove-siamo', routing: loadMap, type: 'page' },
  { url: '404', routing: loadNotFound, type: '404' }
];

router.addRoutes(routes);