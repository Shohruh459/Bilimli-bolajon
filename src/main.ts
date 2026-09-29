import './styles/tokens.css';
import './styles/fonts.css';
import './styles/base.css';
import './styles/app.css';
import { createApp } from './app/app';
import { isStarted } from './app/app';
import { installChildGuard } from './engine/guard';
import { initPwa } from './engine/pwa';

installChildGuard();
initPwa(() => !isStarted());

const root = document.getElementById('app');
if (root) createApp(root);
