var wallabyWebpack = require('wallaby-webpack');
var babel = require('babel');

var wallabyPostprocessor = wallabyWebpack({
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        { test: /\.css$/, loader: "style!css" },
        { test: /\.scss$/, loader: "style!css!sass" }
      ]
    }
  }
);


module.exports = function (wallaby) {
  return {
    files: [
      {pattern: 'lib/**/*.js', load: false}
    ],

    tests: [
      {pattern: 'test/**/*-test.js', load: false}
    ],
    
    compilers: {
        'lib/**/*.js': wallaby.compilers.babel({
            babel: babel,
            stage: 0
        })
    },

    postprocessor: wallabyPostprocessor,

    bootstrap: function () {
      window.__moduleBundler.loadTests();
    },
    
    "testFramework": "mocha@2.0.1"
  };
};