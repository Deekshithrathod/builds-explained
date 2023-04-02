var CronJob = require("cron").CronJob;
const getHimalayaJobs = require("./tasks/fetch-himalaya-jobs");

const seconds = 5;
var job = new CronJob(
  `* * * * * *`,
  function () {
    console.log(`You will see this message every ${seconds} seconds`);
    // call the fetch-jobs function
    getHimalayaJobs();
  },
  null,
  true,
  "America/Los_Angeles"
);
