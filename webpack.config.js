// Installation prompt -> ng add @angular-architects/module-federation --project mf-angular-16 --port 4202 --type remote

const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mf-angular-16',

  exposes: {
    "./AppModule": "./src/app/app.module.ts",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: false }),
    // ...shareAll({ singleton: true, strictVersion: false, requiredVersion: 'auto' }),
  },

});
