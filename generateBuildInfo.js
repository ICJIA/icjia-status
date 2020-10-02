/* eslint-disable no-unused-vars */
const fs = require("fs");
const pkg = require("./package.json");
var moment = require("moment-timezone");
const chicagoTime = moment().tz("America/Chicago");

const banner = `

<!-- 

*************************************************************************************************************************
build:          ${chicagoTime}
name:           ${pkg.name}
description:    ${pkg.description}
homepage:       ${pkg.homepage}
version:        ${pkg.version}
author:         ${pkg.author.name} (${pkg.author.email})
repository:     ${pkg.repository.url}
license:        ${pkg.license}
*************************************************************************************************************************

-->`;

fs.appendFile("./dist/index.html", `${banner}`, function(err) {
  if (err) throw err;
  console.log("Build banner inserted.");
});

console.log(banner);
