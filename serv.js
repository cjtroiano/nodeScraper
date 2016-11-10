/*
Simple web scraping program used to experiment with node.js

Chris Troiano
*/

var express = require('express');
var fs 		= require('fs');
var request = require('request');
var cheerio = require('cheerio');
var promise = require('promise');
var app     = express();
const readline = require('readline');

app.listen('8080');
exports = module.exports = app;


// globals
var HTMLText = [];
var url;



// Instantiating the url prompt 
const rl = readline.createInterface(
	{
		input: process.stdin,
		output: process.stdout
	}
);

// url prompt
rl.question('Please enter the url you want to scrape into a file, if a url is not provided, we will scrape the results of olyimpic mens basketball: ', (answer) => {
	console.log('visit localhost:8080/scrape to initate', answer);
    if (answer) url = answer;
    else{
        url = 'http://www.sbnation.com/2016/8/6/12376006/2016-olympic-basketball-mens-bracket-schedule-scores-results';
    }
    
	rl.close();
})

// write contents of HTML text to HTMLDump.txt
function HtmlTextToFile(txt){
    fs.writeFile("HTMLDump.txt", txt, function(){
            console.log("file written");
    });
}

// express handling a get request to the /scrape path
app.get('/scrape', function(req, res){

    // initiate a request to the provided url
    request(url, function(error, response, html){
        if(!error){

            //console.log(html);
            //var re = html.match(">(.*)<")
            // var htmltxt = html.toString();
            // var shh = htmltxt.split("\n{2,}"|"\s")
            // shh.forEach(function(word){
            //     var re = word.substring(word.lastIndexOf(">")+1,word.lastIndexOf("<"));
            //     console.log(re);
            // });
            //var re = htmltxt.substring(htmltxt.lastIndexOf(">")+1,htmltxt.lastIndexOf("<"));
            //console.log(re);

            // parse the html for text
            var $ = cheerio.load(html);
            var getText = $('html *').contents().map(function() {
                return (this.type === 'text') ? $(this).text() : '';
            }).get().join(' ');
            getText.split("\n"| "\t"|"\n{2,}"|"\s{2,}");
            
            console.log(getText.toString());



            // filter out uncessecary newlines with regex and put remaining text into global var HTMLText
            // $('#txt').filter(function(){
            //     var data = $(this);
            //     console.log(data);
            //     var unfilteredText = data.text();
            //     var pattern = new RegExp("\n{2,}");
            //     var regex = pattern.exec(unfilteredText);
            //     if(regex === null){
            //     	var words = unfilteredText.split("\n"|',');
            //     	HTMLText.push(words);
            //     	//console.log(words);

            //     }
            // });
        }else{
            // error with the request: show the details in the server command line and send
            // invalid URL message to the localhost
			console.log(error);
            HtmlTextToFile("Scrape Failed\n");
            res.send("invalid URL");

		}
        // request was succesful: write scraped HTML text to a file and send confirmation to localhost 
		var parse = HTMLText.toString();
		res.send("Success!");
        HtmlTextToFile(HTMLText.toString());
    });
    console.log("out of the request!");
});


