---
to: <%=locals.in%>/<%=name%>/lib/cli.js
---
'use strict';

const yargs = require('yargs/yargs');
const { <%= h.changeCase.camel(name) %> } = require('./<% = name %>');

module.exports = cli;

function cli(cwd) {
  const parser = factory(null, cwd);

  parser.alias('h', 'help');
  parser.alias('v', 'version');

  parser.usage(
    "$0",
    "TODO: description",
    yargs => {
      yargs.options({
        // TODO: options
      });
    },
    argv => deleteme(argv)
  );

  return parser;
}
