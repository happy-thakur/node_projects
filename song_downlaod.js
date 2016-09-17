//Lets require/import the HTTP module
var http = require('http');
var request = require("request"),
  cheerio = require("cheerio"),
  url = "http://pagalworld.co/files/11281/MS%20Dhoni%20-%20The%20Untold%20Story%20(2016)%20Ringtones.html";
  // var url_arr = [], text_url = [[]];
  // var down_arr = [], text_down = [[]];
  var file = [], d_file = [];
  var i = 0, j = 0,k = 0, mp3 = [], text_url = [];


//Lets define a port we want to listen toc
const PORT=8080;
call(url);

//We need a function which anhdles requests and send response
function handleRequest(req, res){

  res.write(`
    <html>
    <body>
    <h4>Downlaod</h4>
    <button onclick="call()">Click here</button>
    <ul>
    `);
    for (var z = 0; z < mp3.length; z++) {
      // console.log(url_arr[z]);
      res.write(mp3[z]);
      res.write('<li><a href="'+mp3[z]+'">'+text_url[z]+'</a></li>');

    }
    res.write(`
      </ul>
      </body>
      </html>
      `);


  res.end('It Works!! Path Hit: ');
}

function call(url)
{
  j = 0;
  request(url, function (error, response, body)
  {
  if (!error)
  {
    var $ = cheerio.load(body);
    $('a').each(function(i, ele)
    {
      j++;
      var temp = $(this).attr('href');
      var x = temp.substr(temp.length-4,temp.length);
      if(x == 'html' || x == '.htm')
      {
        //gives tthe link..
        //pushing the link in array..
        // url_arr.push(temp);

        //pushing the text in array..
        // text_url[j].push($(this).text());
        if(j < 45)
        {

          if(temp.indexOf("files") != -1){
            console.log(j+'----'+temp);
          file.push(temp);
        }
        else if (temp.indexOf("filedownload") != -1) {
          console.log(j+'----'+temp);
          d_file.push(temp);
        }
      }
      else if(x == '.mp3' || x == '.mp4')
      {
        //download arr..
        //  down_arr[j].push(temp);
        mp3.push(temp);
        console.log(j+'----'+temp);
        text_url.push($(this).text());
        //downalod text..
        // text_down[j].push(temp);
      }
    }


    });
    //console.log($.text());

    for(var w=0; w<3; w++)
    {
      call(d_file[w]);

    }
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
