var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.index;
handle["/newyork"] = requestHandlers.newyork;

server.start(router.route, handle);