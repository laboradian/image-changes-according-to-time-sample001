/* global */
import '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';
import 'babel-polyfill'
import moment from 'moment';

//import _ from 'lodash'

// index.html ファイルをコピーする
require('file-loader?name=../../dist/[name].[ext]!../index.html');

require('file-loader?name=../../dist/img/[name].[ext]!../img/nagoya-city-v2.1.jpg');

console.log('%c 🌈 Laboradian.com 🌈 %c http://laboradian.com ',
  'background: #2383BF; color: #fff; font-size: 1.4em;',
  'background: #e3e3e3; color: #000; margin-bottom: 1px; padding-top: 4px; padding-bottom: 1px;');

const middleLayer = document.querySelector('#middleLayer');

window.addEventListener('load', () => {

  const dt = moment();
  dt.utcOffset('+0900');

  // test
  //dt.hour(6);

  //console.log(dt.format());
  //console.log(`${dt.year()}-${dt.month() + 1}-${dt.date()} ${dt.hour()}:${dt.minute()}:${dt.second()}`);

  const HOUR_EVENING_START = 18; // 夕方が始まる時間
  const HOUR_NIGHT_START = 19; // 夜が始まる時間
  let HOUR_NIGHT_END = 7; // 夜が終わる時間
  const month = dt.month() + 1;
  const hour = dt.hour();

  // 夏
  if (month >= 7 && month <= 9) {
    HOUR_NIGHT_END = 6;
  }

  // 昼間
  if (hour >= HOUR_NIGHT_END && hour < HOUR_EVENING_START) {
    // do nothing
  // 夕方
  } else if (hour >= HOUR_EVENING_START && hour < HOUR_NIGHT_START) {
    setSize(middleLayer);
    middleLayer.classList.add('middleBgEvening');
  // 夜間
  } else {
    setSize(middleLayer);
    middleLayer.classList.add('middleBgNight');
  }
});

const setSize = (elm) => {
  // 親要素を取得
  const parentElm = elm.parentNode;

  // 幅、高さを親要素に合わせる
  elm.style.width = `${parentElm.clientWidth}px`;
  elm.style.height = `${parentElm.clientHeight}px`;
};

document.querySelector('#btnApplyClass1').addEventListener('click', () => {
  setSize(middleLayer);
  middleLayer.classList.toggle('middleBgDaytime');
});

document.querySelector('#btnApplyNight').addEventListener('click', () => {
  setSize(middleLayer);
  middleLayer.classList.toggle('middleBgNight');
});

document.querySelector('#btnApplyEvening').addEventListener('click', () => {
  setSize(middleLayer);
  middleLayer.classList.toggle('middleBgEvening');
});

document.querySelector('#btnClearClass').addEventListener('click', () => {
  middleLayer.classList.remove('middleBgDaytime');
  middleLayer.classList.remove('middleBgNight');
  middleLayer.classList.remove('middleBgEvening');
});
