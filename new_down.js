//Lets require/import the HTTP module
var http = require('http');
var request = require("request"),
  cheerio = require("cheerio"),
  url = "http://pagalworld.co/";
  // var url_arr = [], text_url = [[]];
  // var down_arr = [], text_down = [[]];
  var file = [], d_file = [], url_aud = [], text_url = [];
  var i = 0, j = 0,k = 0, mp3 = [], text_url = [];

//Lets define a port we want to listen toc
const PORT=8080;
main_method(url);

function main_method(url)
{
  request(url, function (error, response, body)
  {
  if (!error)
  {
    var $ = cheerio.load(body);
    $('a').each(function(i, ele)
    {
      //j++;
      var temp = $(this).attr('href');
      var x = temp.substr(temp.length-4,temp.length);
      if(x == 'html' || x == '.htm')
      {
        // this means this is a downal;od url.
        if(temp.indexOf("file") != -1)
        {
          // call download url to get the audio url
          url_file(temp);
        }
      }
    });
  }
});
}

//We need a function which anhdles requests and send response
function handleRequest(req, res){
  res.write(`
    <html>
    <body>
    <h4>Downlaod</h4>
    <button onclick="call()">Click here</button>
    <ul>
    `);
    for (var z = 0; z < text_url.length; z++) {
      // console.log(url_arr[z]);
      // res.write(url_aud[z]);
      res.write('<li>'+text_url[z]+'</li>');

    }
    res.write(`
      </ul>
      </body>
      </html>
      `);


  res.end('It Works!! Path Hit: ');
}


// getting the file url to get download url
function url_file(url)
{
  request(url, function (error, response, body)
  {
  if (!error)
  {
    var $ = cheerio.load(body);
    $('a').each(function(i, ele)
    {
      //j++;
      var temp = $(this).attr('href');
      var x = temp.substr(temp.length-4,temp.length);
      if(x == 'html' || x == '.htm')
      {
        // this means this is a downal;od url.
        if(temp.indexOf("filedownload") != -1)
        {
          // call download url to get the audio url
          url_file_down(temp);
        }
      }
    });
  }
});
}

function url_file_down(url)
{
  request(url, function (error, response, body)
  {
  if (!error)
  {
    var $ = cheerio.load(body);
    $('a').each(function(i, ele)
    {
      //j++;
      var temp = $(this).attr('href');
      var x = temp.substr(temp.length-4,temp.length);
      if(x == '.mp3' || x == '.mp4')
      {
        // this means this is a audio url.
        // console.log(temp);
        var div_main = $(this).parent();
        text_url.push((div_main.parent()).html());
        console.log((div_main.parent()).html());
        // url_aud.push(temp);

      }
    });
  }
});
}


//Create a server
var server = http.createServer(handleRequest);

// Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
