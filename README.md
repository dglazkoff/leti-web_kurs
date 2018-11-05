# 4xxi frontend boilerplate project

## Documentation

This project uses `yarn` as a package manager.
You should install yarn https://yarnpkg.com/en/docs/install

After that use:

* `yarn` - to install project dependencies
* `yarn dev` - to run webpack-dev-server for local development
* `yarn build` - to get a final bundle with source-map in `/build/` folder

We're have `.editorconfig` file in our repository, which is a great way to sync whitespace settings across team members.
Please install editorconfig plugin from "Download a Plugin" section of [editorconfig official site](http://editorconfig.org/).

## Preview your final bundle in `/build`
If you want to preview your final bundle - you'd better start a local webserver that set with `/build` as a root folder.

If you have access to Command Line Interface with python executable installed you can do this with one simple command.
But first you should check `python --version`:

* if it's `2.*` then your command is `pyton -m SimpleHTTPServer <portnumber>`
* if it's `3.*` then your command is `python -m http.server <portnumber>`

Where `<portnumber>` is a number of port, on which you want to start server (I'm using `8000` most of the time).
Use CLI to enter `/build` folder, then launch your command. After that you'll be able to access you server by visiting `http://localhost:<portnumber>` url in your browser...

## Technology
#### JS
JavaScript ES6+ with code styleguide mostly based on [Airbnb JS](https://github.com/airbnb/javascript) and [Airbnb React](https://github.com/airbnb/javascript/tree/master/react).
JS stylguide is enforced via [ESLint linter](http://eslint.org/) called in precommit.

#### CSS
PostCSS with plugins with css styleguide mostly based on [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) with custom css-rules order (based on best practices from HTMLAcademy and others - you can look at it in `.eslintrc` file).
CSS styleguide is enforced via [stylelint PostCSS plugin](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/postcss-plugin.md) and reported right on a webpage were compiled styles used (in body::before);
`stylelint` itself are also called in precommit.

PostCSS plugins we're using:

* [postcss-import](https://github.com/postcss/postcss-import)
* [postcss-normalize](https://github.com/seaneking/postcss-normalize)
* [precss](https://github.com/jonathantneal/precss)
* [cssnext](https://github.com/MoOx/postcss-cssnext)
* [postcss-short](https://github.com/jonathantneal/postcss-short)
* [postcss-focus](https://github.com/postcss/postcss-focus)
* [css-mqpacker](https://github.com/hail2u/node-css-mqpacker)
* [lost](https://github.com/peterramsing/lost)
* [postcss-csso](https://github.com/lahmatiy/postcss-csso)
* [postcss-browser-reporter](https://github.com/postcss/postcss-browser-reporter)


### Browser support
* Chrome (latest 2)
* Safari (latest 2)
* Firefox (latest 2)
* Edge (latest 2)
* Internet Explorer 11+
* Opera (latest 2)

## Steps
### First step
* webpack-svgstore-plugin
* hot reload
* choose and install some webpack plugin to build sprites from raster images and use them in CSS
* inegrate mjml for email's

### Second step
* css modules
* React
* React Router
* Redux
* Redux Dev Tools
* redux-form
* React Helmet
* classnames

### Third step
* Merge with backend boilerplate repo

#### Possible to use
* react-motion
* multireducer
* momentum
* multi select
* react immutable
* bem-linting
* fetch
* redbox
