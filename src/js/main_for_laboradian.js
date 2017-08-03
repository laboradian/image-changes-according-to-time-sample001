/* global */
import BackgroundCreator from './BackgroundCreator';

window.addEventListener('load', () => {
  const headerImageBkId = 'lr-header-image-bg';
  //const headerImageBkId = 'middleLayer';
  const headerImageBk = document.querySelector(`#${headerImageBkId}`);
  const bgCreator = new BackgroundCreator();
  bgCreator.update();
  bgCreator.translateToCurrentBackground(headerImageBk, 3);
});
