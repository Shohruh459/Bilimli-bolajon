import './styles/tokens.css';
import './styles/fonts.css';
import './styles/base.css';
import { installChildGuard } from './engine/guard';

installChildGuard();
const root = document.getElementById('app');
if (root) root.textContent = 'Ilmli Bolajon — oʻyin, gʻoya';
