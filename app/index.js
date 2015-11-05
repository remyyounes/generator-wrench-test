const yeoman = require('yeoman-generator');
const yosay = require('yosay');
const parseDir = require('./lib/parseDir');

const WrenchTestGenerator = yeoman.generators.Base.extend({
  initializing() {
    this.pkg = require('../package.json');
  },

  prompting() {
    const done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to Procore\'s wrench Test generator!'
    ));

    const prompts = [
      {
        // name: 'componentName',
      }, {
        type: 'checkbox',
        name: 'features',
        message: 'What more would you like?',
        choices: [],
      },
    ];

    this.prompt(prompts, props => {
      this.componentName = props.componentName;
      done();
    });
  },

  findtest

  writing: {
    app() {
      const files = parseDir('.');
      files.map( (file) {
        maketest(file);
      };
      // this.fs.copyTpl(
      //   this.templatePath('component-example/views/live/handler.jsx'),
      //   this.destinationPath(componentPath + '/views/live/handler.jsx'),
      //   { componentName, routeName }
      // );
    },
  },
});

module.exports = WrenchTestGenerator;
