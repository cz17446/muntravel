var fs = require('fs');

function htmlWriter(error, html, response) {
	if (error) {
        throw error; 
    }
	response.writeHead(200, {
		"Content-Type" : "text/html"
	});
	response.write(html);
	response.end();
}

function index(response) {
	htmlWriter.response = response;
	console.log("Request handler 'newyork' was called.");
	fs.readFile('index.html', function (error, html) {
		htmlWriter(error, html, response);
	});
}

function newyork(response) {
	htmlWriter.response = response;
	console.log("Request handler 'newyork' was called.");
	fs.readFile('newyork.html', function (error, html) {
		htmlWriter(error, html, response);
	});
}

exports.index = index;
exports.newyork = newyork;