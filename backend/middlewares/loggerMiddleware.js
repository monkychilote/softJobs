const fs = require("fs");
const path = require("path");

const loggerMiddleware = (req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  const logPath = path.join(__dirname, "../logs/server.log");
  fs.appendFile(logPath, log, (err) => {
    if (err) console.error("Error writing log:", err);
  });
  console.log(log.trim());
  next();
};
module.exports = loggerMiddleware;
