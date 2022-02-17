var request = require("request");

var options = {method: 'GET', url: 'https://api.totle.com/tokens'};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(response);
});