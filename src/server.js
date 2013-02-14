var express = require('express');
var app = express();
var server = require('http').createServer(app);
var webRTC = require('webrtc.io').listen(server);


// Select which port to use
server.listen(9000);


// Let an HTTP server serve files from the www-directory
app.use( express.static(__dirname + '/www') );


// Console output with timestamps
function log_event( str ) {
	var d = new Date();
	console.log( d.toISOString().substring(0, 10) + ' ' + d.toLocaleTimeString() + ' > ' + str );
}


/*
	Display these events in the console
*/

log_event('SERVER STARTED');


webRTC.rtc.on('connect', function(rtc) {
	log_event('CONNECT');
});

webRTC.rtc.on('send answer', function(rtc) {
	log_event('ANSWER');
});

webRTC.rtc.on('disconnect', function(rtc) {
	log_event('DISCONNECT');
});

webRTC.rtc.on('join_room', function(rtc) {
	log_event('JOIN ROOM');
});

webRTC.rtc.on('send_offer', function(rtc) {
	log_event('SEND OFFER');
});

webRTC.rtc.on('send_ice_candidate', function(rtc) {
	//log_event('SEND ICE CANDIDATE');
});

webRTC.rtc.on('close', function(rtc) {
	log_event('CLOSE');
});