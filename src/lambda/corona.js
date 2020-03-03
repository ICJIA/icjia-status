/* eslint-disable no-unused-vars */
export async function handler(event, context) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Max-Age": "2592000",
    "Access-Control-Allow-Credentials": "true"
  };
  const content = {
    html: `
    View up to date information on how Illinois is handling the Coronavirus Disease 2019 (COVID-19) from the <a href="http://www.dph.illinois.gov/topics-services/diseases-and-conditions/diseases-a-z-list/coronavirus" style="text-decoration: underline;">Illinois Department of Public Health</a>
    `,
    markdown: `View up to date information on how Illinois is handling the Coronavirus Disease 2019 (COVID-19) from the [Illinois Department of Public Health](http://www.dph.illinois.gov/topics-services/diseases-and-conditions/diseases-a-z-list/coronavirus).`
  };
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(content)
  };
}
