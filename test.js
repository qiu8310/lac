import {color, COLOR, log, slog, logDeep, logd, MARKDOWN} from './src/index';


console.log(color('red text', 'red'))
console.log(color('bright red text', '!red'))
console.log(color('red background', '-red'))
console.log(color('bright red background', '-!red'), '\n')


console.log(color('bold', 'bold'))
console.log(color('faint', 'faint'))
console.log(color('italic', 'italic'))
console.log(color('underline', 'underline'))
console.log(color('reverse', 'reverse.red'), '\n')


console.log(color('hex FFEBCD', 'FFEBCD'))
console.log(color('hex background FFEBCD', '-FFEBCD'), '\n')

console.log(color('pre-defined gold', 'gold'))
console.log(color('pre-defined gold background', '-gold'))
console.log(color('pre-defined navy', 'navy'))
console.log(color('pre-defined navy background', '-navy'), '\n')

COLOR.custom = '8B008B';
console.log(color('custom color', 'custom'));
console.log(color('custom color', '-custom'), '\n');


Object.keys(MARKDOWN).forEach(md => {
  let v = MARKDOWN[md];
  logd('%smd: \\%s => %s%s', md, md, v, md);
});
console.log();

log('pre ^**bold and cyan**^ post')
log('pre **^bold and cyan^** post')
log('pre ^**bold and cyan^** post\n')

log('^%s color %s^', '**bold**', '#red#');
logd('^%s color %s^', '**bold**', '#red#');
logDeep('^%s color %s^', '**bold**', '#red#');

