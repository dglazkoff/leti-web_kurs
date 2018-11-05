const postcssImport = require('postcss-import');
const precss = require('precss');
const short = require('postcss-short');
const hoverFocus = require('postcss-focus');
const cssnext = require('postcss-cssnext');
const lostGrid = require('lost');
const cssMqpacker = require('css-mqpacker');
const csso = require('postcss-csso');
const reporter = require('postcss-browser-reporter');
const stylelint = require('stylelint');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = function(postcss) {
  const postCSSPluginsArray = [
    postcssImport({ addDependencyTo: postcss }),
    precss,
    short,
    hoverFocus,
    cssnext({
      browsers: ['last 2 versions', 'IE >= 11'],
    }),
    lostGrid,
    cssMqpacker,
    csso,
  ];
  if (NODE_ENV !== 'production') {
    postCSSPluginsArray.unshift(stylelint);
    postCSSPluginsArray.push(
      reporter({
        selector: 'body:before',
      })
    );
  }

  return {
    plugins: postCSSPluginsArray,
  };
};
