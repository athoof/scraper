//browse to localhost:8080 to scrape
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require("cheerio");
var inspector = require('inspector');

var app = express();

//this will work as long as ibay doesn't change their url style
urlPre = 'http://ibay.com.mv/apartments-houses-for-rent-b25_';
urlPost = '.html';
urls = [];

generateURL = (first, last) => {
    for(var i = first; i < last; i++) {
        urls.push(''+ urlPre + i + urlPost);
    }
}


app.get('/', (req, res) => {
    let title, rooms, furnishing, location, rent;//temporary vars
    var json = {
        rooms: "",
        location: "",
        rent: ""
    };
    // generateURL(1, 13); //grab urls of pages 1 to 13

    // urls.forEach(url => {//will loop through each url, commented out for testing on one url for now
    request('http://ibay.com.mv/apartments-houses-for-rent-b25_3.html', (error, response, html) => {
        if (error)
            throw error;
        var $ = cheerio.load(html);

        console.log($);

        let data = $('.iw-list-view-heading-col').first();
        var rooms = data.find('span').text();
        json.rooms = rooms;
        json.release = 'test';

        if (response)
            res.send(json)
    })
    // });//urls.forEach
    console.log(json);
})

app.listen('8080');

console.log('Browse to port 8080');

exports = module.exports = app;