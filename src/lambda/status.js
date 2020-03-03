var https = require("https");
require("dotenv").config();
const axios = require("axios");

let request;

const servers = [
  {
    name: "ICJIA image server",
    proto: "https",
    options: {
      hostname: `image.icjia.cloud`,
      path: "/healthcheck",
      method: "GET"
    },
    category: "image"
  },
  {
    name: "ARI api server",
    proto: "https",
    options: {
      hostname: `ari.icjia-api.cloud`,
      path: "/_health",
      method: "HEAD"
    },
    category: "api"
  },

  {
    name: "SPAC api server",
    proto: "https",
    options: {
      hostname: `spac.icjia-api.cloud`,
      path: "/_health",
      method: "HEAD"
    },
    category: "api"
  },
  {
    name: "ICJIA ResearchHub api server",
    proto: "https",
    options: {
      hostname: `researchhub.icjia-api.cloud`,
      path: "/_health",
      method: "HEAD"
    },
    category: "api"
  },
  {
    name: "ICJIA document archive api server",
    proto: "https",
    options: {
      hostname: `archive.icjia-api.cloud`,
      path: "/",
      method: "HEAD"
    },

    category: "api"
  },

  {
    name: "ICJIA document archive",
    proto: "https",
    options: {
      hostname: `archive.icjia.cloud`,
      path: "/",
      method: "HEAD"
    },
    category: "web"
  },
  {
    name: "ICJIA GATA website",
    proto: "https",
    options: {
      hostname: `gatadev.netlify.com`,
      path: "/",
      method: "HEAD"
    },
    category: "web",
    actualPath: "https://icjia.illinois.gov/gata"
  },
  {
    name: "ICJIA R3",
    proto: "https",
    options: {
      hostname: `icjia-r3.netlify.com`,
      path: "/",
      method: "HEAD"
    },
    category: "web",
    actualPath: "https://icjia.illinois.gov/r3"
  },
  {
    name: "ICJIA legacy grants",
    proto: "https",
    options: {
      hostname: `legacy-grants.icjia.cloud`,
      path: "/",
      method: "HEAD"
    },
    category: "web"
  },
  {
    name: "ICJIA ResearchHub",
    proto: "https",
    options: {
      hostname: `researchhub.netlify.com`,
      path: "/",
      method: "HEAD"
    },
    category: "web",
    actualPath: "https://icjia.illinois.gov/researchhub"
  },
  {
    name: "ICJIA ResearchHub Docs",
    proto: "https",
    options: {
      hostname: `researchhub-docs.netlify.com`,
      path: "/",
      method: "HEAD"
    },
    category: "web",
    actualPath: "https://icjia.illinois.gov/researchhub/docs"
  },

  {
    name: "ICJIA public",
    proto: "http",
    options: {
      hostname: `www.icjia.state.il.us`,
      path: "/",
      method: "HEAD"
    },
    category: "web",
    actualPath: "https://icjia.illinois.gov"
  }
];

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  "Content-Type": "application/json",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Max-Age": "2592000",
  "Access-Control-Allow-Credentials": "true"
};

function queryHttps(server) {
  // eslint-disable-next-line no-unused-vars
  return new Promise(function(resolve, reject) {
    let start = new Date();
    request = https.get(server.options, response => {
      let end = new Date();
      let duration = end - start;
      server.status = response.statusCode;
      server.statusMessage = response.statusMessage;
      server.duration = duration + "ms";
      server.headers = response.headers;

      resolve(server);
    });
    request.on("error", error => {
      server.status = error;
      resolve(server);
    });
  });
}
// eslint-disable-next-line no-unused-vars
async function queryHttp(server) {
  // eslint-disable-next-line no-unused-vars
  let start = new Date();
  return axios
    .head(`${server.proto}://${server.options.hostname}`)
    .then(res => {
      let end = new Date();

      let duration = end - start;
      server.status = res.status;
      server.duration = duration + "ms";
      server.headers = res.headers;
      return server;
    });
}
// eslint-disable-next-line no-unused-vars
exports.handler = async (event, context) => {
  let serverArr = servers.map(server => {
    if (server.proto === "https") {
      return queryHttps(server);
    } else {
      return queryHttp(server);
    }
  });
  let response = await Promise.all(serverArr);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(response)
  };
};
