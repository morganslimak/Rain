$("document").ready(function() {

var canvas = $("#canvas");
var ctx = document.getElementById("canvas").getContext("2d");
var rainX;
var rainY;
var rain = [];
var splashX;
var splashY;
var splash = [];
var rainsound = document.getElementById("rainsound");

rainsound.loop= true;
rainsound.play();

setInterval(update, 15);

function createRain(rainNum) {
	for (var i = 0; i < rainNum; i++) {
		rainX = Math.floor(Math.random() * 1000);
		while (rainX >= canvas.width()) rainX = Math.floor(Math.random() * 1000);
		rainY = 0;
		rain.push({x: rainX, y: rainY})
	}
}

function drawRain() {
	for (var i = 0; i < rain.length; i++) {
		if (rain[i].y >= canvas.height()) {
			splashX = rain[i].x;
			splashY = rain[i].y;
			createSplash();
			rain.shift();
		}
		ctx.beginPath();
		ctx.moveTo(rain[i].x, rain[i].y);
		ctx.lineTo(rain[i].x, rain[i].y + 10);
		ctx.lineWidth = 3;
		ctx.globalAlpha = .25;
		ctx.strokeStyle = "#15D1FF";
		ctx.stroke();
	}
}

function createSplash() {
	for (var i = 0; i < 3; i++) {
		splash.push({x: splashX - 3, y: splashY - 1, z: -1, limit: 0});
		splash.push({x: splashX + 3, y: splashY - 1, z: 1, limit: 0});
	}
}

function drawSplash() {
	for (var i = 0; i < splash.length; i++) {
		if (splash[i].limit > 2) splash.shift();
		ctx.globalAlpha = .25;
		ctx.fillStyle = "#15D1FF";
		ctx.fillRect(splash[i].x, splash[i].y, 2, 5);
	}
}

function update() {
	createRain(1);
	ctx.clearRect(0,0, canvas.width(), canvas.height());
	drawRain();
	drawSplash();
	for(var i = 0; i <rain.length; i++){
		rain[i].y += 10;
	}
	for(var i = 0; i <splash.length; i++){
		splash[i].y -= 10;
		splash[i].x += (splash[i].z * 2);
		splash[i].limit += 1;
	}
}

})
