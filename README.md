# lac

log and color

## INSTALL

```
npm install lac
```

## USAGE

```js
import {color, log, slog, logDeep, logd} from lac;

color('the string', '!red.-green'); // "!" => high intensity color; "-" => background color
log('^%s cyan color^', 'some text');  // "^...^" => cyan, only parse first paramater's markdown tag
logDeep('^%s color^', '**bold**'); // parse all paramaters markdown tag
// logd is an alias of logDeep

let cyanStr = slog('^str^');  // return colored string, not output;
```


## CUSTOM

```js
import {COLOR, MARKDOWN} from lac;

COLOR.darkgreen = '006400';
color('my custom color', 'darkgreen');

MARKDOWN.$ = '006400';
log('$my custom markdown$');
```

## DEFAULTS

```js
// COLOR
COLOR = {
  brown: 'A52A2A',
  chocolate: 'D2691E',
  ghostwhite: 'F8F8FF',
  gold: 'FFD700',
  navy: '000080',
  olive: '808000',
  orange: 'FFA500',
  orangered: 'FF4500',
  pink: 'FFC0CB',
  purple: '800080',
  seagreen: '2E8B57',
  silver: 'C0C0C0',
  skyblue: '87CEEB',
  yellowgreen: '9ACD32'
}

// MARKDOWN
MARKDOWN = {
  '**': 'bold',
  '*': 'gray',
  '`': 'red.-white',
  '__': 'underline',
  '_': 'italic',
  '!': 'yellow',
  '#': 'red',
  '@': 'blue',
  '&': 'green',
  '^': 'cyan',
  '~': 'magenta'
}
```
