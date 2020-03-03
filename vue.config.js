const config = require("./src/config.json");

module.exports = {
  publicPath: process.env.NODE_ENV === `production` ? config.publicPath : "/",
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    moment: {
      locales: ["en"]
    }
  },
  devServer: {
    proxy: {
      "/.netlify/functions": {
        target: "http://localhost:9000",
        pathRewrite: {
          "^/\\.netlify/functions": ""
        }
      }
    }
  }
};
