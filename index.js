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

app.get("/api/:value", (req, res) => {
  const { value } = req.params;

  // Check if the value represents a valid number (timestamp)
  if (!isNaN(value)) {
    const unixTime = Number(value);
    if (!isNaN(unixTime)) {
      const date = new Date(unixTime);
      if (!isNaN(date.getTime())) {
        const utcDate = date.toUTCString();
        return res.json({ unix: unixTime, utc: utcDate });
      }
    }
  }

  // Check if the value represents a valid date
  const parsedDate = new Date(value);
  if (!isNaN(parsedDate.getTime())) {
    const unixTime = parsedDate.getTime();
    const utcDate = parsedDate.toUTCString();
    return res.json({ unix: unixTime, utc: utcDate });
  }

  // If the value is neither a timestamp nor a valid date, return an error
  return res.status(400).json({ error: "Invalid input" });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
