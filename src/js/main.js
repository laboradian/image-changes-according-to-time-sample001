/* global */
//import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
//import 'babel-polyfill'
//import moment from 'moment';
import BackgroundCreator from './BackgroundCreator.js';

//import _ from 'lodash'

// index.html ファイルをコピーする
//require('file-loader?name=../../dist/[name].[ext]!../index.html');

//require('file-loader?name=../../dist/img/[name].[ext]!../img/nagoya-city-v2.1.jpg');

console.log('%c 🌈 Laboradian.com 🌈 %c http://laboradian.com ',
  'background: #2383BF; color: #fff; font-size: 1.4em;',
  'background: #e3e3e3; color: #000; margin-bottom: 1px; padding-top: 4px; padding-bottom: 1px;');


let myReq;
const middleLayer = document.querySelector('#middleLayer');
//const initLayer = document.querySelector('#initLayer');

window.addEventListener('load', () => {
  //setSize(middleLayer);
  //setSize(initLayer);

  const bgCreator = new BackgroundCreator();
  //const dt = moment();
  //dt.utcOffset('+0900');
  //dt.year(2017).month(7).date(1).hour(1).minute(30).seconds(0);
  //bgCreator.update(dt);
  bgCreator.update();
  bgCreator.translateToCurrentBackground(middleLayer, 3);
});

//const setSize = (elm) => {
//  // 親要素を取得
//  const parentElm = elm.parentNode;
//
//  // 幅、高さを親要素に合わせる
//  elm.style.width = `${parentElm.clientWidth}px`;
//  elm.style.height = `${parentElm.clientHeight}px`;
//};

document.querySelector('#btnApplyClass1').addEventListener('click', () => {
  //setSize(middleLayer);
  middleLayer.classList.toggle('middleBgDaytime');
});

document.querySelector('#btnApplyNight').addEventListener('click', () => {
  //setSize(middleLayer);
  middleLayer.classList.toggle('middleBgNight');
});

document.querySelector('#btnApplyEvening').addEventListener('click', () => {
  //setSize(middleLayer);
  middleLayer.classList.toggle('middleBgEvening');
});

document.querySelector('#btnClearClass').addEventListener('click', () => {
  middleLayer.classList.remove('middleBgDaytime');
  middleLayer.classList.remove('middleBgNight');
  middleLayer.classList.remove('middleBgEvening');
  middleLayer.style.backgroundColor = '';
  document.querySelector('#outputSimulate1').textContent = '';
  document.querySelector('#outputSimulate2').textContent = '';
  document.querySelector('#outputSimulate3').textContent = '';
  window.cancelAnimationFrame(myReq);
});

/**
 *
 */
document.querySelector('#btnSimulate1').addEventListener('click', () => {
  const dt = moment();
  dt.utcOffset('+0900');
  dt.year(2017).month(7).date(1).hour(17).minute(0).seconds(0);

  simulateTime(dt, 2.1, document.querySelector('#outputSimulate1'));
});

document.querySelector('#btnSimulate2').addEventListener('click', () => {
  const dt = moment();
  dt.utcOffset('+0900');
  dt.year(2017).month(7).date(1).hour(18).minute(0).seconds(0);

  simulateTime(dt, 1.1, document.querySelector('#outputSimulate2'));
});

document.querySelector('#btnSimulate3').addEventListener('click', () => {
  const dt = moment();
  dt.utcOffset('+0900');
  dt.year(2017).month(7).date(1).hour(5).minute(0).seconds(0);

  simulateTime(dt, 1.1, document.querySelector('#outputSimulate3'));
});

/**
 *
 * @param {object} momentObj - moment object
 * @param {number} hours - 何時間シミュレーションするか
 * @param {object} outputElm - 経過情報を出力するDOMオブジェクト
 */
const simulateTime = (momentObj, hours, outputElm) => {
  const bgCreator = new BackgroundCreator();

  const startTime = momentObj.unix();
  const loop = () => {

    //console.log(dt.format());
    outputElm.textContent = momentObj.format();

    //console.log(`a:${startTime + 60*60*7}, b:${dt.unix()}`);
    if ((startTime + 60*60*hours) < momentObj.unix()) {
      window.cancelAnimationFrame(myReq);
      return false;
    }

    bgCreator.update(momentObj);
    middleLayer.style.backgroundColor = bgCreator.getBackgroundColorString();

    momentObj.add(1, 'seconds');
    myReq = window.requestAnimationFrame(loop);
  };
  myReq = window.requestAnimationFrame(loop);
};
