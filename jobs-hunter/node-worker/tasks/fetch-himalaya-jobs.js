const fetch = require("node-fetch");
const redis = require("redis");

const url = "https://himalayas.app/jobs/api";
const client = redis.createClient();
client.connect();

const allJobs = [];

async function getHimalayaJobs() {
  let offset = 0;
  let currJobsLength = 201;

  while (currJobsLength >= 200) {
    const res = await fetch(`${url}/?limit=200&offset=${offset}`);
    const data = await res.json();

    const { jobs } = data;
    currJobsLength = jobs.length;
    console.log(`Fetched ${currJobsLength} jobs`);
    allJobs.push(...jobs);
    offset += 200;
  }

  console.log(`Total Fetched Jobs ${allJobs.length}`);

  // filter the jobs for junior only roles
  const juniorJobs = allJobs.filter((job) => isJuniorRole(job));

  console.log(`Filtered to ${juniorJobs.length} jobs`);

  // write to DB
  await client.set("himalaya", JSON.stringify(juniorJobs.slice(0, 50)));

  await client.disconnect();
}

function isJuniorRole(job) {
  return !(
    job.title.includes("Senior") ||
    job.title.includes("Architect") ||
    job.title.includes("Sr.")
  );
}

getHimalayaJobs();

module.exports = getHimalayaJobs;
