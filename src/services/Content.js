// import { EventBus } from "@/event-bus";
// const config = require("@/config.json");

const getCensusData = async () =>
  await import(`../../public/downloads/EligibleAreasCensusTracts.json`).then(
    m => m.default || m
  );

export { getCensusData };
