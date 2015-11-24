import util from 'util';
import supportsColor from 'supports-color';

export {supportsColor};
export const rAnsi = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
export function stripAnsi(str) { return typeof str === 'string' ? str.replace(rAnsi, '') : str; }
export function hasAnsi(str) { return rAnsi.test(str); }


// KEY 最长不能超过两位
export let MARKDOWN = {
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
};

export let COLOR = {
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
};

const PREFIX = '\x1b[',
  RESET = PREFIX + '0m',
  MODIFIERS = {
    bold: 1,      // 21
    faint: 2,     // 22
    italic: 3,    // 23
    underline: 4, // 24
    reverse: 7    // 27
  },
  NAMES = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];


function hexToRgb5(hex) {
  var r, g, b, gap,
    toInt = v => Math.round((parseInt(v, 16) || 0) * 5 / 255);

  hex = hex.replace(/^#/, '');
  gap = hex.length === 3 ? 1 : 2;

  r = toInt(hex.substring(0, gap)),
  g = toInt(hex.substring(gap, gap * 2)),
  b = toInt(hex.substring(gap * 2, gap * 3));
  return 16 + r * 36 + g * 6 + b;
}

function decode(color) {
  let base = 30, bg, index;
  if (color.indexOf('-') >= 0) bg = true, base += 10;  // background color
  if (color.indexOf('!') >= 0) base += 60;  // high intensity color

  color = color.replace(/[\!\-]/g, '').toLowerCase();
  index = NAMES.indexOf(color);
  if (index >= 0) return base + index;
  if (color in MODIFIERS) return MODIFIERS[color];

  if (color in COLOR) color = COLOR[color];
  return (bg ? '48;5;' : '38;5;') + hexToRgb5(color);
}


export function slog(str) {

  let tokens = str.split('');
  let result = '', t, i, len = tokens.length;
  let openTags = {}, tag, md, lastTokenIsTag, origIndex;


  for (i = 0; i < len; i++) {
    t = tokens[i];
    origIndex = i;

    // 转义 markdown
    if (t === '\\') {
      if (tokens[i + 2] && str.substr(i + 1, 2) in MARKDOWN) {
        result += str.substr(i + 1, 2);
        i += 2;
      } else if (tokens[i + 1] && tokens[i + 1] in MARKDOWN) {
        result += tokens[i + 1];
        i += 1;
      } else {
        result += t;
      }
    } else {
      if (tokens[i + 1] && str.substr(i, 2) in MARKDOWN) {
        tag = str.substr(i, 2);
        i += 1;
      } else if (t in MARKDOWN) {
        tag = t;
      } else {
        tag = null;
      }

      if (tag) {
        md = MARKDOWN[tag];
        if (openTags[tag]) {
          openTags[tag] = false;
          lastTokenIsTag = true;
          result += md in MODIFIERS ? PREFIX + (20 + MODIFIERS[md]) + 'm' : RESET;
        } else {
          // open 一个 tag 必须是上一个是 tag 或者 上一个是一个空白字符
          // ，。：；？ => \uFF0C\u3002\uFF1A\uFF1B\uFF1F
          if (origIndex === 0 || /[\s,\.:;?\uFF0C\u3002\uFF1A\uFF1B\uFF1F]/.test(tokens[origIndex - 1]) || lastTokenIsTag) {
            openTags[tag] = true;
            lastTokenIsTag = true;
            result += color('', md, false);
          } else {
            result += tag;
            lastTokenIsTag = false;
          }
        }
      } else {
        result += t;
        lastTokenIsTag = false;
      }
    }
  }

  return result + (Object.keys(openTags).some(tag => openTags[tag]) ? RESET : '');
}

export function log(str, ...args) {
  args.unshift(slog(str));
  console.log(util.format.apply(util, args));
}

export function logDeep() {
  let str = util.format.apply(util, arguments);
  console.log(slog(str));
}

export const logd = logDeep;

export function color(str, colors, close = true) {

  if (!supportsColor) return str;

  colors = colors.split('.').reduce((all, color) => {
    all += PREFIX + decode(color) + 'm';
    return all;
  }, '');

  return colors + str + (close ? RESET : '');
}




