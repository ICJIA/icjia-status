import config from "@/config.json";

const computedPublicPath =
  process.env.NODE_ENV === `production` ? config.publicPath : "";

const lambdaPath =
  process.env.NODE_ENV === `production`
    ? config.deploymentURL + config.netlifyPath
    : "http://localhost:9000" + config.netlifyPath;

let myApp = {
  config,
  computedPublicPath,
  lambdaPath
};

export { myApp };
