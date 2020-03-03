import config from "@/config.json";
// import searchIndex from "../../public/searchIndex.json";

const computedPublicPath =
  process.env.NODE_ENV === `production` ? config.publicPath : "";

// function getSection(key) {
//   let root = key.split("/");
//   const isRoot = /^.*\.(md)$/i.test(root[1]);
//   if (isRoot) {
//     return "/";
//   } else {
//     return `/${root[1]}`;
//   }
// }
// const context = require.context("../../public/markdown", true, /\.md$/);
// const siteMeta = context.keys().map(key => ({
//   ...context(key),
//   path: `/${key.replace(".md", "").replace("./", "")}`,
//   root: `${getSection(key)}`
// }));

//const meetingContext = require.context("../../public/markdown/meetings/", true, /\.md$/);
//   const meetings =  meetingContext.keys().map(key => ({
//     ...meetingContext(key),
//     path: `/meetings/${key.replace(".md", "").replace("./", "")}`
//   }));
//   // console.log(meetings);
//   let filteredMeetings = meetings.filter(meeting => {
//     if (meeting.path.indexOf("placeholder") === -1) {
//       return meeting;
//     }
//   });

let myApp = {
  config,
  computedPublicPath
};

export { myApp };
