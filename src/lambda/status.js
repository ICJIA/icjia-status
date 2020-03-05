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
    category: "image",
    displayURL: true
  },
  {
    name: "ARI api server",
    proto: "https",
    options: {
      hostname: `ari.icjia-api.cloud`,
      path: "/_health",
      method: "HEAD"
    },
    category: "api",
    displayURL: true
  },

  {
    name: "SPAC api server",
    proto: "https",
    options: {
      hostname: `spac.icjia-api.cloud`,
      path: "/_health",
      method: "HEAD"
    },
    category: "api",
    displayURL: true
  },
  {
    name: "SPAC",
    proto: "https",
    options: {
      hostname: `spac.illinois.gov`,
      path: "/",
      method: "HEAD"
    },
    category: "site",
    badgeID: "71c65928-9986-4104-bd78-465726edb356",
    displayURL: true
  },
  {
    name: "ICJIA ResearchHub api server",
    proto: "https",
    options: {
      hostname: `researchhub.icjia-api.cloud`,
      path: "/_health",
      method: "HEAD"
    },
    category: "api",
    displayURL: true
  },
  {
    name: "ICJIA document archive api server",
    proto: "https",
    options: {
      hostname: `archive.icjia-api.cloud`,
      path: "/",
      method: "HEAD"
    },
    displayURL: true,
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
    category: "site",
    badgeID: "f93389c6-7593-495f-9309-6a3a9729eb81",
    displayURL: true
  },
  {
    name: "ICJIA GATA website",
    proto: "https",
    options: {
      hostname: `gatadev.netlify.com`,
      path: "/",
      method: "HEAD"
    },
    category: "site",
    badgeID: "2de6c7f6-eb69-4419-baf5-7e54a8943b00",
    displayURL: false
  },
  {
    name: "ICJIA GATA redirect",
    proto: "https",
    options: {
      hostname: `icjia.illinois.gov`,
      path: "/gata",
      method: "HEAD"
    },
    category: "redirect",
    displayURL: true
  },
  {
    name: "ICJIA R3",
    proto: "https",
    options: {
      hostname: `icjia-r3.netlify.com`,
      path: "/",
      method: "HEAD"
    },
    category: "site",
    badgeID: "90d739fc-a5ed-459d-8616-d05a6a9e235d",
    displayURL: false
  },
  {
    name: "ICJIA R3 redirect",
    proto: "https",
    options: {
      hostname: `icjia.illinois.gov`,
      path: "/r3",
      method: "HEAD"
    },
    category: "redirect",
    displayURL: true
  },
  {
    name: "ICJIA legacy grants",
    proto: "https",
    options: {
      hostname: `legacy-grants.icjia.cloud`,
      path: "/",
      method: "HEAD"
    },
    category: "site",
    badgeID: "36772a61-8687-4f4b-b7ed-75d6d3aeebf5",
    displayURL: true
  },
  {
    name: "ICJIA ResearchHub",
    proto: "https",
    options: {
      hostname: `researchhub.netlify.com`,
      path: "/",
      method: "HEAD"
    },
    category: "site",
    displayURL: false
  },
  {
    name: "ICJIA ResearchHub redirect",
    proto: "https",
    options: {
      hostname: `icjia.illinois.gov`,
      path: "/researchhub",
      method: "HEAD"
    },
    category: "redirect",
    displayURL: true
  },

  {
    name: "ICJIA ResearchHub Docs",
    proto: "https",
    options: {
      hostname: `researchhub-docs.netlify.com`,
      path: "/",
      method: "HEAD"
    },
    category: "site",
    displayURL: false
  },
  {
    name: "ICJIA ResearchHub Docs redirect",
    proto: "https",
    options: {
      hostname: `icjia.illinois.gov`,
      path: "/researchhub/docs",
      method: "HEAD"
    },
    category: "redirect",
    displayURL: true
  },

  {
    name: "ICJIA public",
    proto: "http",
    options: {
      hostname: `www.icjia.state.il.us`,
      path: "/",
      method: "HEAD"
    },
    category: "site",
    displayURL: true
  },
  {
    name: "ICJIA public redirect",
    proto: "https",
    options: {
      hostname: `icjia.illinois.gov`,
      path: "/",
      method: "HEAD"
    },
    category: "redirect",
    displayURL: true
  },
  {
    name: "ILHEALS",
    proto: "https",
    options: {
      hostname: `ilheals.com`,
      path: "/",
      method: "HEAD"
    },
    category: "site",
    badgeID: "f3ad230c-0ccc-421e-b822-484276a3069b",
    displayURL: true
  },
  {
    name: "ICJIA Coronavirus Information server",
    proto: "https",
    options: {
      hostname: `coronavirus.icjia-api.cloud`,
      path: "/healthcheck",
      method: "HEAD"
    },
    category: "site",
    displayURL: true
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
