const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting () {
    this.appname = this.appname.replace(/ /g, '.');

    this.log(
      yosay('Welcome: ' + chalk.red('react-redux-generator') + ' generator!')
    );

    const prompts = [
      {
        type: 'input',
        name: 'appname',
        message: 'Would you like to create a folder to project?',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Informe uma breve descrição para o projeto',
        default: ''
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }
  writing () {
    if (this.appname !== this.props.appname) {
      this.destinationRoot(`./${this.props.appname}`);
    }

    this._writingPackage();
    this._writingReadme();
    this._writingGitIgnore();
    this._writingSrcFiles();
    this._writingScripts();
    this._writingPublic();
    this._writingConfig();
  }

  _writingPackage () {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.appname,
        description: this.props.description
      }
    );
  }

  _writingReadme () {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        name: this.props.appname,
        description: this.props.description
      }
    );
  }

  _writingGitIgnore () {
    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
  }

  _writingSrcFiles () {
    this._writingFilesSrc();
    this._writingFilesSrcComponents();
  }

  _writingConfig () {
    this.fs.copy(
      this.templatePath('config/webpackDevServer.config.js'),
      this.destinationPath('config/webpackDevServer.config.js')
    );
    this.fs.copy(
      this.templatePath('config/webpack.config.js'),
      this.destinationPath('config/webpack.config.js')
    );
    this.fs.copy(
      this.templatePath('config/pnpTs.js'),
      this.destinationPath('config/pnpTs.js')
    );
    this.fs.copy(
      this.templatePath('config/paths.js'),
      this.destinationPath('config/paths.js')
    );
    this.fs.copy(
      this.templatePath('config/modules.js'),
      this.destinationPath('config/modules.js')
    );
    this.fs.copy(
      this.templatePath('config/env.js'),
      this.destinationPath('config/env.js')
    );
    this.fs.copy(
      this.templatePath('config/jest/cssTransform.js'),
      this.destinationPath('config/jest/cssTransform.js')
    );
    this.fs.copy(
      this.templatePath('config/jest/fileTransform.js'),
      this.destinationPath('config/jest/fileTransform.js')
    );
  }

  _writingPublic () {
    this.fs.copy(
      this.templatePath('public/favicon.ico'),
      this.destinationPath('public/favicon.ico')
    );
    this.fs.copy(
      this.templatePath('public/index.html'),
      this.destinationPath('public/index.html')
    );
    this.fs.copy(
      this.templatePath('public/manifest.json'),
      this.destinationPath('public/manifest.json')
    );
  }

  _writingScripts () {
    this.fs.copy(
      this.templatePath('scripts/build.js'),
      this.destinationPath('scripts/build.js')
    );
    this.fs.copy(
      this.templatePath('scripts/start.js'),
      this.destinationPath('scripts/start.js')
    );
    this.fs.copy(
      this.templatePath('scripts/test.js'),
      this.destinationPath('scripts/test.js')
    );
  }

  _writingFilesSrc () {
    this.fs.copy(
      this.templatePath('src/index.js'),
      this.destinationPath('src/index.js')
    );
    this.fs.copy(
      this.templatePath('src/store/index.js'),
      this.destinationPath('src/store/index.js')
    );
    this.fs.copy(
      this.templatePath('src/store/Dev/configureStore.dev.js'),
      this.destinationPath('src/store/Dev/configureStore.dev.js')
    );
    this.fs.copy(
      this.templatePath('src/store/Prod/configureStore.prod.js'),
      this.destinationPath('src/store/Prod/configureStore.prod.js')
    );
    this.fs.copy(
      this.templatePath('src/reducers/index.js'),
      this.destinationPath('src/reducers/index.js')
    );
    this.fs.copy(
      this.templatePath('src/middleware/api.js'),
      this.destinationPath('src/middleware/api.js')
    );
    this.fs.copy(
      this.templatePath('src/containers/Dev/DevTools.js'),
      this.destinationPath('src/containers/Dev/DevTools.js')
    );
    this.fs.copy(
      this.templatePath('src/containers/Dev/Root.dev.js'),
      this.destinationPath('src/containers/Dev/Root.dev.js')
    );
    this.fs.copy(
      this.templatePath('src/containers/Prod/Root.prod.js'),
      this.destinationPath('src/containers/Prod/Root.prod.js')
    );
    this.fs.copy(
      this.templatePath('src/containers/index.js'),
      this.destinationPath('src/containers/index.js')
    );
  }

  _writingFilesSrcComponents () {
    this.fs.copy(
      this.templatePath('src/components/App.css'),
      this.destinationPath('src/components/App.css')
    );
    this.fs.copy(
      this.templatePath('src/components/App.js'),
      this.destinationPath('src/components/App.js')
    );
    this.fs.copy(
      this.templatePath('src/components/App.test.js'),
      this.destinationPath('src/components/App.test.js')
    );
    this.fs.copy(
      this.templatePath('src/components/index.css'),
      this.destinationPath('src/components/index.css')
    );
    this.fs.copy(
      this.templatePath('src/components/logo.svg'),
      this.destinationPath('src/components/logo.svg')
    );
    this.fs.copy(
      this.templatePath('src/components/Page404.js'),
      this.destinationPath('src/components/Page404.js')
    );
    this.fs.copy(
      this.templatePath('src/components/serviceWorker.js'),
      this.destinationPath('src/components/serviceWorker.js')
    );
  }

  install () {
    this.installDependencies({ bower: false });
  }
};
