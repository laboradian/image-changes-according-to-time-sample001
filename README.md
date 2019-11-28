時間とともに風景画像の色が変わっていくサンプル001
================

Usage
-------

```
$ npm install
$ npm run
```

Build
-------

### 開発用のビルドコマンド

```
$ npm run build
```

### 本番用のビルドコマンド

```
$ npm run build-p
```


dist/js/main_for_laboradian.js
------------

- laboradian.com で使用するファイル
- add-time-color-top-header-image.js という名前にリネームして実際に使用している。


風景画像に対して夕方や夜の効果を与える
-------

- 要素の背景画像に対して半透明な色を重ねる。
- そのため、その要素と子要素との間に1階層挟む込んで、そこに `background: rgba()` で半透明な色を重ねる。


