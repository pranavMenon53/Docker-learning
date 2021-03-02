const express = require("express");
const redis = require("redis");
const process = require("process");

const app = express();
const client = redis.createClient({
  // Usually we provide some kind of address here
  // But since we are using Docker, we only provide the name of the container that we use for our specific purpose
  // So in our case, it is "redis-server"
  // look in stephenGrider-Course-Notes for more information
  host: "redis-server",
  // Express does not know what "redis-server" is
  // It just assumes that it is a wokring url like "https.."
  // When Express sends out a connection request for "redis-server", Docker identifies the request and redirects it to
  // to the container running rh "redis-server" running a redis instance
});
client.set("visits", 0);

app.get("/", (req, res) => {
  process.exit(0);
  client.get("visits", (err, visits) => {
    res.send("Number of visits: " + visits);
    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log("\nListening on port 8081 in the container!\n");
});
