import {Application} from 'pixi.js'
import {preloadAssets} from './loader';
import {setupGame} from './game';
import './style.css';

//Create new application
const app = new Application();

//Init the app
await app.init({
    resizeTo: window,
    backgroundColor: 0xA8D5BA,
});

//Add canvas to webpage
document.body.appendChild(app.canvas);

//This will start the loader and the game eventually
preloadAssets(app, setupGame);