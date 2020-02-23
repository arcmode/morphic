'use strict';

const yargs = require('yargs/yargs');
const { start } = require('./start');

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
          'path': {
              alias: 'p',
              describe: 'path of the root package'
          },
      });
    },
    argv => start(argv)
  );

  return parser;
}
