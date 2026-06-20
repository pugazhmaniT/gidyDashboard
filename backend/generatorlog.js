const axios = require("axios");

const roles = ["admin", "developer", "analyst", "manager"];
const actions = ["DELETE_USER", "CREATE_USER", "UPDATE_PROFILE", "LOGIN"];
const resourceTypes = ["USER", "PROFILE", "AUTH"];
const regions = ["ap-south-1", "us-east-1", "eu-west-1"];
const severities = ["HIGH", "MEDIUM", "LOW"];
const statuses = ["Resolved", "Unresolved"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateLogs(count) {
  const logs = [];

  for (let i = 1; i <= count; i++) {
    logs.push({
      actor: `user${i}@company.com`,                 // unique email
      role: randomItem(roles),
      action: randomItem(actions),
      resource: `/api/users/${i}`,                  // unique resource
      resourceType: randomItem(resourceTypes),
      ipAddress: `192.168.${Math.floor(i / 255)}.${i % 255}`, // unique IP
      region: randomItem(regions),
      severity: randomItem(severities),
      status: randomItem(statuses),
      timestamp: new Date(Date.now() + i * 1000)    // unique timestamp
    });
  }

  return logs;
}

async function uploadLogs() {
  const logs = generateLogs(10000);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/logs/upload",
      logs
    );

    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

uploadLogs();