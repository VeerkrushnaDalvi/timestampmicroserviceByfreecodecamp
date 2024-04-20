// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  const currentDate = new Date();
  const unixTime = currentDate.getTime();
  const utcDate = currentDate.toUTCString();
  return res.json({ unix: unixTime, utc: utcDate });
});

app.get("/api/:value", (req, res) => {
  const { value } = req.params;

  // Check if the value is empty
  if (!value) {
    // If the value is empty, set the current time
    const currentDate = new Date();
    const unixTime = currentDate.getTime();
    const utcDate = currentDate.toUTCString();
    return res.json({ unix: unixTime, utc: utcDate });
  }

  // Check if the value is a valid date
  const parsedDate = new Date(value);
  if (!isNaN(parsedDate.getTime())) {
    // If it's a valid date, return the corresponding UNIX timestamp and UTC string
    const unixTime = parsedDate.getTime();
    const utcDate = parsedDate.toUTCString();
    return res.json({ unix: unixTime, utc: utcDate });
  }

  // Check if the value is a valid timestamp
  const timestamp = Number(value);
  if (!isNaN(timestamp)) {
    // If it's a valid timestamp, create a Date object using the timestamp
    const date = new Date(timestamp);

    // Check if the Date object is valid
    if (!isNaN(date.getTime())) {
      // If it's a valid date, return the corresponding UTC string
      const utcDate = date.toUTCString();
      return res.json({ unix: timestamp, utc: utcDate });
    }
  }

  // If the value is neither a valid date nor a valid timestamp, return an error
  res.status(400).json({ error: "Invalid Date" });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
