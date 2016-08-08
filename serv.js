var express = require('express');
var fs 		= require('fs');
var request = require('request');
var cheerio = require('cheerio');
var promise = require('promise');
var app     = express();



	var box = ["apple", "orange"];


app.get('/scrape', function(req, res){

	url = 'https://www.mtbproject.com/directory/8007188/bay-area';

	var i = 1;


	//var pageSource = fs.readFileSync(__dirname + "/index.html", "utf8");

	//var page = cheerio.load(pageSource);
    //var bd = page('body');


	//console.log(pageSource);



    request(url, function(error, response, html){
        if(!error){


        	

            var $ = cheerio.load(html);


            $("td").filter(function(){


                var data = $(this);
                var the = data.text();
                var patt = new RegExp("\n{2,}");
                var result = patt.exec(the);
                //console.log(i, result);
                if(result === null){
                	var interum = the.split("\n"|',');


                	//var interum = pars.split(",");
                	//console.log(interum);
                	box.push(interum);
                	console.log(interum);
                	//var wrk = $("<div></div>").text(interum);
                	//bd.append(wrk);
                	//bd.html();
                	//append("<div>"+interum +"</div>")
                	// var div = document.createElement("div");
                	// var divTxt = document.createTextNode(interum);
                	// div.appendChild(divTxt);
                	// document.getElementByTagName('body')[0].appendChild(div);
                	// //console.log(i, the);
                }
            });
        }else{
			console.log(error);
		}
		//page.append(bd);
		//console.log(bd);
		//console.log(pageSource);
		var parse = box.toString();
		res.send(parse);
        
    }).then(function(){
		fs.writeFile("check.html", box.toString(), function(){
			console.log("file written");
		});
	});
    console.log("out of the request!");
});

app.listen('8080');

console.log('Magic happens on port 8080');

exports = module.exports = app;