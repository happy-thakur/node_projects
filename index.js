//Lets require/import the HTTP module
var http = require('http');
var request = require("request"),
  cheerio = require("cheerio"),
  url = "http://www.cs3.pe.hu/new_pro/preview.php";
//Lets define a port we want to listen toc
const PORT=8080;0

//We need a function which anhdles requests and send response
function handleRequest(req, res){
	request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body);
      // temperature = $("[data-variable='temperature'] .wx-value").html();

    // console.log("It’s " + temperature + " degrees Fahrenheit.");
    console.log($.text());
    res.end('It Works!! Path Hit: ' + req.url + '</br>' + $.text());
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});

}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
