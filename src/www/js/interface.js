var jquery_ready = false;
var auto_arrange = false;

var videos = []; // Stores the video elements
var rooms = [1,2,3,4,5];
var PeerConnection = window.PeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection;

$(function() {
	jquery_ready = true;
	console.log('jquery ready');
});



function callEstablished() {
	$('#notification_container').hide();
}

function waitingForParticipants() {
	$('#notification').html('Waiting for the other end to connect... <br/><br/><br/> <span class="small_notification">URL for this call:<br/><br/><a href="'+ window.location +'">'+ window.location +'</a></span>');
	$('#notification_container').show();
}


function createNewVideoElement(socketId) {
	var html = '<div class="remote_video_container" id="remote_video_cointainer_'+ socketId +'">'
		+'<video id="remote_video_' + socketId + '" autoplay '
		+' width="100%" height="100%" '
		+'</div>';
	$('#videos').append( html );
}

function removeVideo(socketId) {
	$('#remote_video_cointainer_' + socketId ).remove();
	videos.splice(videos.indexOf(socketId), 1);
	
	// If this was the last participant to leave
	if( videos.length == 0 )
		waitingForParticipants();
}



function init() {
	
	// If the browser supports some type of PeerConnection
	if( PeerConnection ) {

		// Create a stream out of the local video
		rtc.createStream({"video": true, "audio": true}, function(stream) {
			
			// Set the stream URL as the source for <div id="you">
			document.getElementById('you').src = URL.createObjectURL(stream);
			
			// Change the help text
			waitingForParticipants();
			
		});
	
	
	// If the browser doesn't support any type of PeerConnection
	} else {
		alert('Your browser is not supported or you have to turn on flags. In chrome you go to chrome://flags and turn on Enable PeerConnection remember to restart chrome');
	
	}

	// Get the room ID from the browser's URL
	var room = window.location.hash.slice(1);
	var addr = window.location.href.substring(window.location.protocol.length);
	
	if( room.length > 0 )
		addr = addr.substring( 0, addr.length - ( room.length + 2 ) );

	// Connect to the NodeJS server to discover other participants
	rtc.connect("ws:" + addr, room);


	// What to do when there's a new remote stream
	rtc.on('add remote stream', function(stream, socketId) {
		
		if( videos.length == 0 ) {
			
			console.log("ADDING REMOTE STREAM...");
			
			// Create the HTML element for the video
			createNewVideoElement( socketId );
			
			// Attach the stream to the new element
			rtc.attachStream(stream, 'remote_video_'+socketId );
			
			// Add the socketId of this video to the videos array
			videos.push( socketId );
			
			// Remove the help text when call is established
			callEstablished();
		
		} else {
			console.log('Someone tried to connect, but there already is a remote stream. Ignoring...');
		}
		
	});


	// What to do when a remote stream disconnects
	rtc.on('disconnect stream', function(data) {
		console.log('remove ' + data);

		// Remove the video (from the array and the screen)
		removeVideo(data);
	});

}
