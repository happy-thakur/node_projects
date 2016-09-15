var request = require("request"),
  cheerio = require("cheerio"),
  url = "http://www.cs3.pe.hu/new_pro/main_code.php";

request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body);
      // temperature = $("[data-variable='temperature'] .wx-value").html();

    // console.log("It’s " + temperature + " degrees Fahrenheit.");
    console.log($.text());
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});
