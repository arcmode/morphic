'use strict';

const yargs = require('yargs/yargs');
const { ops } = require('./ops');

module.exports = cli;

function cli(cwd) {
  const parser = yargs(null, cwd);

  parser.alias('h', 'help');
  parser.alias('v', 'version');

  parser.usage(
    "$0",
    "TODO: description",
    yargs => {
      yargs.options({
          'name': {
              alias: 'n',
              describe: 'name of your program'
          },
          'context': {
              alias: 'c',
              describe: 'build context of your program'
          },
          'path': {
              alias: 'p',
              describe: 'path of your program source'
          },
      });
    },
    argv => ops(argv)
  );

  return parser;
}
