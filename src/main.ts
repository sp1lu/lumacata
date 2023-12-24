// Import modules
import './routing/router.ts';
import { Router, Route } from './routing/router.ts';

// Routing
const loadIndex = () => '<div>INDEX</div>'
const loadProgram = () => '<div>PROGRAMMA</div>'
const loadMenu = () => '<div>MENU</div>'
const loadNotFound = () => '<div>404</div>';

const router = document.querySelector('app-router') as Router;
const routes: { [key: string]: Route } = {
  index: { routing: loadIndex, type: 'default' },
  programma: { routing: loadProgram, type: 'page' },
  menu: { routing: loadMenu, type: 'page' },
  404: { routing: loadNotFound, type: '404' }
};

router.addRoutes(routes);