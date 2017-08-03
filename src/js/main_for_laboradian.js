/* global */
import BackgroundCreator from './BackgroundCreator';

window.addEventListener('load', () => {
  const headerImageBkId = 'lr-header-image-bg';
  //const headerImageBkId = 'middleLayer';
  const headerImageBk = document.querySelector(`#${headerImageBkId}`);
  const bgCreator = new BackgroundCreator();
  bgCreator.update();
  headerImageBk.style.backgroundColor = bgCreator.getBackgroundColorString();

  const loop = () => {
    bgCreator.update();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
});
