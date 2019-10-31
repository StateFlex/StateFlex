import { formatter } from './formatter.util';
import { createReduxFiles } from './createReduxFiles.util';
import { StoreConfigInterface, ReducersInterface } from './InterfaceDefinitions';

function createIndexHtml(path, appName, zip, reduxView) {
  const filePath: string = 'index.html';
  const data: string =  
  `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>${appName}</title>
    </head>
    <link rel="stylesheet" type="text/css" href="./styles.css">
    <body>
      <div id="StateFlex-display">
        <div id="title">I'm a StateFlex app</div>
        <img id="stateflex" src="./stateflex.svg"></img>
      </div>
      <div id="root"></div>
      <script src="./build/bundle.js"></script>
    </body>
  </html>`;
  zip.file(filePath, data);
}

export const createIndexTsx = (
  path: string,
  appName: string,
  hasRedux: boolean,
  hasAsync: boolean,
  zip: any,
): void => {
  const filePath = 'src/index.tsx';
  const reactText = `
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './components/App';`;

  let reduxAndOrRemainingText;
  // if (!reduxView) hasRedux = false;
  if (hasRedux) {
    if (hasAsync) {
      reduxAndOrRemainingText = `import { reducers } from './reducers';
        import { createStore, applyMiddleware } from 'redux';
        import { Provider } from 'react-redux';
        import thunk from 'redux-thunk';\n
        const store = createStore(reducers, applyMiddleware(thunk));\n
        ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));`;
    } else {
      reduxAndOrRemainingText = `import { reducers } from './reducers';
        import { createStore} from 'redux';
        import { Provider } from 'react-redux';\n
        const store = createStore(reducers);\n
        ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));`;
    }
  } else {
    reduxAndOrRemainingText = "ReactDOM.render(<App />, document.getElementById('root'));";
  }
  zip.file(filePath, formatter(reactText + reduxAndOrRemainingText));
};

const createPackage = (
  path: string,
  appName: string,
  hasRedux: boolean,
  hasAsync: boolean,
  zip: any,
) => {
  const filePath = 'package.json';
  const data = `
  {
    "name": "${appName}",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "begin": "npm i && cross-env NODE_ENV=development webpack-dev-server --open",
      "start": "node server/server.js",
      "build": "cross-env NODE_ENV=production webpack",
      "dev": "cross-env NODE_ENV=development webpack-dev-server --open"
    },
    "nodemonConfig": {
      "ignore": [
        "build",
        "src"
      ]
    },
    "keywords": [],
    "author": "",
    "license": "MIT",
    "dependencies": {
      "webpack": "^4.29.6",
      "@types/react": "^16.8.13",
      "@types/react-dom": "^16.8.4",
      "express": "^4.16.4",
      "react": "^16.8.6",
      "react-dom": "^16.8.6"
      ${
  hasRedux ? ',"react-redux": "^7.1.0","redux": "^4.0.1", "@types/react-redux": "^7.1.0"' : ''
}
      ${hasAsync ? ',"redux-thunk": "^2.3.0"' : ''}
    },
    "devDependencies": {
      "@babel/core": "^7.4.3",
      "@babel/preset-env": "^7.4.3",
      "@babel/preset-react": "^7.0.0",
      "@babel/preset-typescript": "^7.3.3",
      "babel-loader": "^8.0.5",
      "cross-env": "^5.2.0",
      "css-loader": "^2.1.1",
      "file-loader": "^3.0.1",
      "isomorphic-fetch": "^2.2.1",
      "node-sass": "^4.11.0",
      "nodemon": "^1.18.9",
      "postcss-loader": "^3.0.0",
      "sass-loader": "^7.1.0",
      "source-map-loader": "^0.2.4",
      "style-loader": "^0.23.1",
      "tslint": "^5.15.0",
      "tslint-config-prettier": "^1.18.0",
      "tslint-react": "^4.0.0",
      "typescript": "^3.4.3",
      "webpack": "^4.29.6",
      "webpack-cli": "^3.3.0",
      "webpack-dev-server": "^3.2.1"
    }
  }  
`;
  zip.file(filePath, data);
};

function createStateFlexSVG(path, appName, zip) {
  const dir = path;
  const filePath: string = 'stateflex.svg';
  const data: string = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="404" height="417" viewBox="0 0 404 417">
  <defs>
    <style>
      .cls-1 {
        font-size: 58.375px;
        font-family: "DIN Alternate";
        font-weight: 700;
      }
    </style>
  </defs>
  <text id="STATEFLEX" class="cls-1" x="51.16" y="388.379">STATEFLEX</text>
</svg>`;
  zip.file(filePath, data);
}

function createStylesCss(path, appName, zip) {
  const dir = path;
  const filePath: string = 'styles.css';
  const data: string = `#StateFlex-display {
    margin: -8px -8px 0px -8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #60D7F9;
    height: 100vh;
  }
  
  #title {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
    margin: 40px 0px 80px 0px;
    font-size: 3em;
    text-align: center;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  #stateflex {
    animation: spin 6s linear infinite;
    width: 30vw;
  }`;
  zip.file(filePath, data);
}

const createWebpack = (path, appName, zip) => {
  const filePath = 'webpack.config.js';
  const data = `const status = process.env.NODE_ENV;
  const path = require('path');
  
  module.exports = {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    mode: status,
    devServer: {
      publicPath: '/build/'
    },
    module: {
      rules: [
        { test: /.tsx?$/, exclude: /node-modules/, loader: 'babel-loader' },
        {
          enforce: 'pre',
          test: /.js$/,
          exclude: /node-modules/,
          loader: 'source-map-loader'
        },
        {
          test: /.css$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    }
  };`;
  zip.file(filePath, data);
};

const createBabel = (path, appName, zip) => {
  const filePath = '.babelrc';
  const data = `
  {
    "presets": ["@babel/env", "@babel/react", "@babel/typescript"]
  }
  `;
  zip.file(filePath, data);
};

const createTsConfig = (path, appName, zip) => {
  const filePath = 'tsconfig.json';
  const data = `
  {
    "compilerOptions": {
      "outDir": "./dist/",
      "sourceMap": true,
      "noImplicitAny": false,
      "module": "commonjs",
      "target": "es6",
      "jsx": "react",
      "allowSyntheticDefaultImports": true
    },
    "include": ["./src/**/*"]
  }
  `;
  zip.file(filePath, data);
};

const createTsLint = (path, appName, zip) => {
  const filePath = 'tslint.json';
  const data = `
  {
    "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
    "tslint.autoFixOnSave": true,
    "linterOptions": {
      "exclude": ["config/**/*.js", "node_modules/**/*.ts"]
    },
    "rules": {
      "quotemark": [true, "single", "avoid-escape", "avoid-template", "jsx-double"],
      "jsx-boolean-value": false,
      "jsx-no-lambda": false,
      "jsx-no-multiline-js": false,
      "object-literal-sort-keys": false,
      "member-ordering": false,
      "no-console": false,
      "ordered-imports": false,
      "comment-format": false
    }
  }
  `;
  zip.file(filePath, data);
};

const createServer = (path, appName, zip) => {
  const filePath = 'server/server.js';
  const data = `
  const express = require('express');
  const path = require('path');
  const app = express();

  app.get('/testDev', (req, res) => {
    res.send({ dev: 'testDev endpoint hit' });
  });

  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

  app.listen(8080, () => {
    console.log('listening on port 8080');
  }); //listens on port 8080 -> http://localhost:8080/
  `;
  zip.file(filePath, data);
};

async function createApplicationUtil({
  path,
  appName,
  genOption,
  storeConfig,
  zip,
  reduxView
}: {
path: string;
appName: string;
genOption: number;
storeConfig: StoreConfigInterface;
zip: any;
reduxView: boolean;
}) {
  if (genOption === 1) {
    const reducerNames = Object.keys(storeConfig.reducers);
    const hasRedux = reducerNames.length > 0;
    let hasAsync = false;
    reducerNames.forEach((reducerName) => {
      Object.keys(storeConfig.reducers[reducerName].actions).forEach((actionName) => {
        if (storeConfig.reducers[reducerName].actions[actionName].async) {
          hasAsync = true;
        }
      });
    });

    await createIndexHtml(path, appName, zip, reduxView);
    await createStylesCss(path, appName, zip);
    await createStateFlexSVG(path, appName, zip);
    await createReduxFiles(path, appName, storeConfig, zip);
    // all of the redux stuff goes here.
    await createIndexTsx(path, appName, hasRedux, hasAsync, zip);
    await createPackage(path, appName, hasRedux, hasAsync, zip);
    await createWebpack(path, appName, zip);
    await createBabel(path, appName, zip);
    await createTsConfig(path, appName, zip);
    await createTsLint(path, appName, zip);
    await createServer(path, appName, zip);
  }
}
export default createApplicationUtil;
