// Import modules
import './routing/router.ts';
import './routing/index.ts';

import { Router, Route } from './routing/router.ts';

// Routing
const loadIndex = () => '<app-index></app-index>'
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