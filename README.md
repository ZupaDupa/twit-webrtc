# WebRTC app for TWiT
==============

This is a WebRTC video calling app customized to be suitable for use in the [http://twit.tv/](TWiT.tv netcasting network).

##Features

* Shows a full screen remote video
* Does not show the local video
* Shows a little help/indicator text when not on a call
* Currently only works on Chrome

##TODO

* Only accept one participant and ignore other connections
* Test the support for different video aspect ratios
* Firefox support ([http://www.webrtc.org/interop](webrtc.org) has a list of API differences between Chrome and Firefox that need to be addressed)
* Maybe a control for toggling local video preview


##Installing and running

Run in your terminal

```bash 
git clone git@github.com:ZupaDupa/twit-webrtc.git
```

```bash 
cd zupchat
```

```bash 
npm install
```

```bash 
cd src
```

Install these dependencies if you don't already have them
```bash 
npm install express
npm install webrtc.io
```

Run the server
```bash 
node server.js
```


In a version of Chrome that has WebRTC support.

go to [localhost:8000](http://localhost:8000)

click allow to see your camera

go to [localhost:8000](http://localhost:8000)

click allow to see your camera and the connection will be made between your to open windows.


##Thanks to

This app is based on [https://github.com/webRTC/webrtc.io-demo](webrtc.io-demo) by Ben Brittain, Dennis Mårtensson and David Peter.
